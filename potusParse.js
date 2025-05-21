const axios = require('axios');
const cheerio = require('cheerio');

const potusParse = async (url) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const name = $('tr > th > div.fn[style="font-size:125%;"]').text();

    const birthday = new Date(
      $('th.infobox-label:contains("Born")')
        .next('td')
        .contents()
        .filter((i, el) => el.type === 'text')[0]
        .data
        .trim()
        .replace(/[^a-zA-Z0-9, ]/g, '')
      )
      .toISOString()
      .split("T")[0];

    return {
      name: name,
      birthday: birthday,
    };
  } catch(err) {
      throw new Error(err.message);
  }
};

module.exports = potusParse;