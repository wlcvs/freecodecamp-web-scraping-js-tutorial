const axios = require('axios');

const url = 'https://www.reddit.com';

(async () => {
	try {
  	const response = await axios.get(url);
    const html = response.data;

    console.log(html);
  } catch (err) {
		  throw new Error(err.message);
  }
})();