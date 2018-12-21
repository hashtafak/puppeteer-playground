const puppeteer = require('puppeteer');
const applyEvent = require('./apply-event');

(async () => {
    const screenResolution = [700, 600];
    const account = ['test', 'test'];

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--no-setuid-sandbox', '--disable-gpu', '--disable-infobars',
            `--window-size=${screenResolution.join(',')}`],
        headless: false,
        slowMo: 50,
    });
    const page = await browser.newPage();
    await applyEvent(page, account, screenResolution);

    await page.waitFor(5000);
    await page.close();

    browser.close();
})();
