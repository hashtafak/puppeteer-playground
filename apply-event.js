/*
* debug some event in browser define by browser screen resolution
*/

const debug = require('debug');
const playground = require('./lib/nature-mouse-n-keyboard');

let debugId = [];

module.exports = async (page, account, screenResolution) => {
    debugId = screenResolution;
    debug(`Browser:${debugId}`)('goto www.starbucks.com');

    await page.goto('https://www.starbucks.com/account/signin', {
        waitUntil: 'networkidle0',
    });

    // * to view the mouse simulate on page
    await page.addScriptTag({ path: './mouse-helper.js' });

    debug(`Browser:${debugId}`)('mouse move into browser');
    await playground.mouseMoveIntoBrowserNature(page, screenResolution);

    // =================================
    const inputUsername = await playground.getMixedBoundingClientRect(page, 'username', 'id');
    debug(`Browser:${debugId}`)('ElementXY', inputUsername);
    await playground.mouseClickNature(page, inputUsername);

    debug(`Browser:${debugId}`)('Input Email');
    await playground.keyboardTypeNature(page, account[0]);
    // =================================

    // =================================
    const inputPassword = await playground.getMixedBoundingClientRect(page, 'password', 'id');
    debug(`Browser:${debugId}`)('ElementXY', inputPassword);
    await playground.mouseClickNature(page, inputPassword);

    debug(`Browser:${debugId}`)('Input Password');
    await playground.keyboardTypeNature(page, account[1]);
    // =================================

    // =================================
    const btnSubmit = await playground.getMixedBoundingClientRect(page, 'sb-frap', 'class');
    debug(`Browser:${debugId}`)('ElementXY', btnSubmit);
    debug(`Browser:${debugId}`)('Click Signin');

    await playground.mouseClickNature(page, btnSubmit);
    // =================================
};
