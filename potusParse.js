const rp = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://en.wikipedia.org/wiki/George_Washington';

rp(url) 
  .then((html) => {
    // success!
    const $ = cheerio.load(html);
    console.log($('tr > th > .fn').text());
    let birthdayLongDateFormat = '';

    $('th.infobox-label:contains("Born")').next('td').contents().each((i, el) => {
      if (el.type === 'text') {
        birthdayLongDateFormat = $(el).text().trim();
        return false;
      }
    })

    const date = new Date(birthdayLongDateFormat);
    const isoBirthday = date.toISOString().split("T")[0];

    console.log(isoBirthday);
  })
  .catch((err) => {
    // handle error
    console.log(err);
  })

