const fetch = require('node-fetch');
const cheerio = require('cheerio');
require('dotenv').config();

// eslint-disable-next-line no-undef
const url = process.env.BASE_URL;

async function getWikiPage() {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  let polls = [];
  let row = [];
  
  // select the 2020 polls table
  const dataTable = $('.wikitable').first();

  // find the total number of row or the app will break (allTheRows.length)
  for(let i = 3; i < 10; i++) {
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
  console.log(polls);  
}

module.exports = {
  getWikiPage
}