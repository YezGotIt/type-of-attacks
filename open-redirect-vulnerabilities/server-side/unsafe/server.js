const express = require('express');
const app = express();

app.get('/redirect', (req, res) => {
  const targetUrl = req.query.url;
  res.redirect(targetUrl);
});

app.listen(3000, () => {
  console.log('Server is running on port http://localhost:3000');
});
