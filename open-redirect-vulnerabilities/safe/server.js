const express = require('express');
const { URL } = require('url');
const app = express();

// Define a list of allowed domains
const ALLOWED_DOMAINS = ['trusted.com', 'example.com', 'ygi.li'];

function isSafeUrl(target) {
  try {
    const targetUrl = new URL(target);
    // Check if the domain of the target URL is in the allowed domains list
    return ALLOWED_DOMAINS.includes(targetUrl.hostname);
  } catch (err) {
    return false;
  }
}

app.get('/redirect', (req, res) => {
  const targetUrl = req.query.url;
  
  if (targetUrl && isSafeUrl(targetUrl)) {
    const encodedUrl = encodeURIComponent(targetUrl);
    console.log('encodedUrl:', encodedUrl)
    res.redirect(decodeURIComponent(encodedUrl));
  } else {
    res.status(400).send('Invalid redirect URL');
  }
});

app.listen(4000, () => {
  console.log('Server is running on port http://localhost:4000');
});
