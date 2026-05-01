exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_REPO = process.env.GITHUB_REPO; // e.g. "yourusername/family-podcast"
  const FILE_PATH = 'episodes.json';
  const API_BASE = `https://api.github.com/repos/${GITHUB_REPO}/contents/${FILE_PATH}`;

  try {
    const newEpisode = JSON.parse(event.body);

    // Validate required fields
    if (!newEpisode.number || !newEpisode.date || !newEpisode.title || !newEpisode.description || !newEpisode.audioUrl) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    // Convert Google Drive URL if needed
    newEpisode.audioUrl = convertGoogleDriveUrl(newEpisode.audioUrl);

    // 1. Fetch current episodes.json from GitHub
    const getRes = await fetch(API_BASE, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    });

    let episodes = [];
    let sha = null;

    if (getRes.ok) {
      const data = await getRes.json();
      sha = data.sha;
      const decoded = Buffer.from(data.content, 'base64').toString('utf8');
      episodes = JSON.parse(decoded);
    }

    // 2. Add new episode at the top
    episodes.unshift({
      number: parseInt(newEpisode.number),
      date: newEpisode.date,
      title: newEpisode.title,
      description: newEpisode.description,
      audioUrl: newEpisode.audioUrl,
      publishedAt: new Date().toISOString(),
    });

    // 3. Write updated episodes.json back to GitHub
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

    if (!putRes.ok) {
      const err = await putRes.json();
      throw new Error(err.message || 'GitHub write failed');
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, episode: episodes[0] }),
    };

  } catch (err) {
    console.error(err);
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
