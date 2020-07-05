const express = require('express');
const router = express.Router();
const Data = require('../module/wikiScrape.js');

let cacheData;
let cacheTime;
let cachePNum;

router.get('/polls/:pNum', async (req, res) => {
  if(cacheTime && cacheTime > Date.now() - 1000 * 600) {
    if(cachePNum && cachePNum === req.params.pNum) {
      return res.json(cacheData);
    }
  }
  try {
    const num = Number(req.params.pNum);
    let getPolls = await Data.getWikiPage(num);
    cacheData = getPolls;
    cacheTime = Date.now();
    cachePNum = req.params.pNum;
    return res.json(getPolls);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;