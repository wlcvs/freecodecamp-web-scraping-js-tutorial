const axios = require('axios');
const cheerio = require('cheerio');

const potusParse = require('./potusParse');

const url = 'https://en.wikipedia.org/wiki/List_of_Presidents_of_the_United_States';

const presidents = async () => {
  try {
    // success!
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html)

    const wikiUrls = [];
    const quantityOfPresidents = $('td > b > a').length; 

    for (let i = 0; i < quantityOfPresidents; i++) {
      wikiUrls.push($('td > b > a', html)[i].attribs.href);
    }

    const results = await Promise.all(
      wikiUrls.map((url) => {
        let completeUrl = 'https://en.wikipedia.org' + url;
        return potusParse(completeUrl);
      })
    ); 

    return results;

  } catch(err) {
    // handle error
    throw new Error(err.message);
  };
};

// Function running
(async () => {
  const result = await presidents();
  console.log(result);
})();