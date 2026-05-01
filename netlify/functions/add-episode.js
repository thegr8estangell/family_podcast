exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO;
  const FILE_PATH = 'public/episodes.json';
  const API_BASE = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;

  console.log('GITHUB_REPO:', GITHUB_REPO);
  console.log('FILE_PATH:', FILE_PATH);
  console.log('API_BASE:', API_BASE);
  console.log('TOKEN exists:', !!GITHUB_TOKEN);

  try {
    const newEpisode = JSON.parse(event.body);

    if (!newEpisode.number || !newEpisode.date || !newEpisode.title || !newEpisode.description || !newEpisode.audioUrl) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    newEpisode.audioUrl = convertGoogleDriveUrl(newEpisode.audioUrl);

    const getRes = await fetch(API_BASE, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });

    console.log('GET status:', getRes.status);
    const getData = await getRes.json();
    console.log('GET response:', JSON.stringify(getData).slice(0, 200));

    let episodes = [];
    let sha = null;

    if (getRes.ok) {
      sha = getData.sha;
      const decoded = Buffer.from(getData.content, 'base64').toString('utf8');
      episodes = JSON.parse(decoded);
    }

    episodes.unshift({
      number: parseInt(newEpisode.number),
      date: newEpisode.date,
      title: newEpisode.title,
      description: newEpisode.description,
      audioUrl: newEpisode.audioUrl,
      publishedAt: new Date().toISOString(),
    });

    const body = {
      message: `Add episode ${newEpisode.number}: ${newEpisode.title}`,
      content: Buffer.from(JSON.stringify(episodes, null, 2)).toString('base64'),
    };
    if (sha) body.sha = sha;

    const putRes = await fetch(API_BASE, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log('PUT status:', putRes.status);
    const putData = await putRes.json();
    console.log('PUT response:', JSON.stringify(putData).slice(0, 200));

    if (!putRes.ok) {
      throw new Error(putData.message || 'GitHub write failed');
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, episode: episodes[0] }),
    };

  } catch (err) {
    console.error('ERROR:', err.message);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message }),
    };
  }
};

function convertGoogleDriveUrl(url) {
  const matchView = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  const matchOpen = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  const fileId = matchView?.[1] || matchOpen?.[1];
  if (fileId) return `https://drive.google.com/uc?export=download&id=${fileId}`;
  return url;
}
