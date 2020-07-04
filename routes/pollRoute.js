const express = require('express');
const router = express.Router();
const Data = require('./module/wikiScrape.js');

router.get('/polls/:pNum', async (req, res) => {
  const num = Number(req.params.pNum);
  let getPolls = await Data.getWikiPage(num);
  res.json(getPolls);
});

module.exports = router;