const axios = require('axios');
const cheerio = require('cheerio');

const pLimit = require('p-limit').default;
const limit = pLimit(24); // I arrived at this number entirely by guesswork and it was the best value I found. 

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
        return limit(() => potusParse(completeUrl));
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