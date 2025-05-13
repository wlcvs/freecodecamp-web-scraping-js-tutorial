const rp = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://en.wikipedia.org/wiki/George_Washington';

rp(url) 
  .then((html) => {
    // success!
    const $ = cheerio.load(html);
    console.log($('tr > th > .fn').text());
    console.log($('th.infobox-label:contains("Born")').next('td').text());
  })
  .catch((err) => {
    // handle error
    console.log(err);
  })

