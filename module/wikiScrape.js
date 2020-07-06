const fetch = require('node-fetch');
const cheerio = require('cheerio');

// eslint-disable-next-line no-undef
const url = process.env.BASE_URL;

async function getWikiPage(pNum) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  let polls = [];
  let row = [];
  const pollsNumber = pNum;
  
  // select the 2020 polls table
  const dataTable = $('.wikitable').first();

  // find the total number of row or the app will break (allTheRows.length)
  for(let i = 3; i < pollsNumber + 4; i++) {
    let dataRow = dataTable.find(`tbody > tr:nth-child(${i})`);
    if(i > 3) {
      polls = polls.concat([row]);
    } 
    row = []; 
    for(let j = 1; j < 17; j++) {
      let dataCell = dataRow.find(`td:nth-child(${j})`).text();
      dataCell = dataCell.replace(/(\r\n|\n|\r)/gm, '');  // remove break line
      row.push(dataCell);
    }
  }
  const pollsObject = polls.map(poll => {
    return {
      date: poll[0],
      pollingFirm: poll[1],
      sampleSize: poll[2],
      M5S: poll[3],
      PD: poll[4],
      Lega: poll[5],
      FI: poll[6],
      FdI: poll[7],
      LS: poll[8],
      EU: poll[9],
      EV: poll[10],
      C: poll[11],
      A: poll[12],
      IV: poll[13],
      other: poll[14],
      lead: poll[15]
    }
  });
  return pollsObject;  
}

module.exports = {
  getWikiPage
}