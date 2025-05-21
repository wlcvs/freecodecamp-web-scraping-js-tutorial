const rp = require('request-promise');
const cheerio = require('cheerio');

const potusParse = (url) => {
  return rp(url)
    .then((html) => {
      const $ = cheerio.load(html);

      const name = $('tr > th > .fn').text();

      const birthday = new Date(
        $('th.infobox-label:contains("Born")')
          .next('td')
          .contents()
          .filter((i, el) => el.type === 'text')[0]
          .data
          .trim()
        )
        .toISOString()
        .split("T")[0];

      return {
        name: name,
        birthday: birthday,
      };
    })
    .catch((err) => {
      throw new Error(err.message);
    })
};

module.exports = potusParse;