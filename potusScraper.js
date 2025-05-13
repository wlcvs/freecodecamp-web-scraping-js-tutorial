const rp = require('request-promise');
const cheerio = require('cheerio');
const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

rp(url)
  .then((html) => {
    // success!
    const $ = cheerio.load(html)
    const wikiUrls = [];
    const quantityOfPresidents = $('td > b > a').length; 
    for (let i = 0; i < quantityOfPresidents; i++) {
      wikiUrls.push($('td > b > a', html)[i].attribs.href);
    }
    console.log(wikiUrls);
    console.log(quantityOfPresidents);
  })    
  .catch((err) => {
    // handle error
    console.log(err);
  });