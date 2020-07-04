const express = require('express');
const Data = require('./module/wikiScrape.js');

const app = express();

app.get('/polls/:pNum', async (req, res) => {
  const num = Number(req.params.pNum);
  let getPolls = await Data.getWikiPage(num);
  res.json(getPolls);
})

const port = 3030;
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});