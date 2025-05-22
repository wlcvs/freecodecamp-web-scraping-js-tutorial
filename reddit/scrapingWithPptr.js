const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
puppeteer.use(StealthPlugin());

const cheerio = require('cheerio');

const url = 'https://www.reddit.com';

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();

    // Configuring the page.
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36');
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'en-US,en;q=0.9'
    });
    await page.setViewport({ width: 1366, height: 768 });
    await page.emulateTimezone('America/New_York');
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));
    await page.setRequestInterception(true);
    page.on('request', (req) => {
      if (['image', 'stylesheet', 'font'].includes(req.resourceType())) {
        req.abort();
      } else {
        req.continue();
      }
    });

    // Here below we access the content and manipulate it.
    await page.goto(url, { waitUntil: 'networkidle2' });
    const html = await page.content();
    const $ = cheerio.load(html);

    const titles = [];
    
    $('a > faceplate-screen-reader-content').map((_, el) => {
      titles.push($(el).text().trim().replace(/[^\w\s.,!?'"()-]/g, ''));
    });

    console.log(titles);
    
    await browser.close()

  } catch (err) {
    console.error(err);
  }
})();
