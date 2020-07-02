const express = require('express');
const Data = require('./wikiScrape.js');

const app = express();

Data.getWikiPage();

const port = 3030;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});