async function getRandomInt(min, max) {
    const minInt = await parseInt(min < 0 ? 0 : min, 10);
    const maxInt = await parseInt(max, 10);
    return Math.floor(Math.random() * (maxInt - minInt + 1) + minInt);
}

const mouseClickNature = async (page, elementXY) => {
    const mouseMoveSteps = await getRandomInt(10, 50);
    await page.mouse.move(elementXY[0], elementXY[1], {
        steps: mouseMoveSteps,
    });

    await page.mouse.click(elementXY[0], elementXY[1]);
};

const keyboardTypeNature = async (page, text, slowMo) => {
    const keyTypeMs = await getRandomInt(0, slowMo);

    await page.keyboard.type(text, {
        delay: keyTypeMs,
    });
};

const mouseMoveIntoBrowserNature = async (page, screenResolution) => {
    switch (await getRandomInt(1, 4)) {
    case 1:
        await page.mouse.move(await getRandomInt(0, screenResolution[0]), 0);
        break;
    case 2:
        await page.mouse.move(0, await getRandomInt(0, screenResolution[1]));
        break;
    case 3:
        await page.mouse.move(
            screenResolution[0], screenResolution[1] - (await getRandomInt(0, screenResolution[1])),
        );
        break;
    case 4:
        await page.mouse.move(
            (await getRandomInt(0, screenResolution[0])) - screenResolution[0], screenResolution[1],
        );
        break;
    default:
        break;
    }
};

const getMixedBoundingClientRect = async (page, element, type) => {
    try {
        let elementXY;
        switch (type) {
        case 'class':
            elementXY = JSON.parse(await page.evaluate((_el) => {
                const x = document.querySelector(`.${_el.replace(' ', '.')}`);
                x.scrollIntoViewIfNeeded();
                return JSON.stringify(x.getBoundingClientRect());
            }, element));

            break;
        case 'id':
            elementXY = JSON.parse(await page.evaluate((_el) => {
                const x = document.querySelector(`#${_el}`);
                x.scrollIntoViewIfNeeded();
                return JSON.stringify(x.getBoundingClientRect());
            }, element));

            break;
        case 'name':
            elementXY = JSON.parse(await page.evaluate((_el) => {
                const x = document.querySelector(`input[name="${_el}"]`);
                x.scrollIntoViewIfNeeded();
                return JSON.stringify(x.getBoundingClientRect());
            }, element));

            break;
        case 'selector':
            elementXY = JSON.parse(await page.evaluate((_el) => {
                const x = document.querySelector(_el);
                x.scrollIntoViewIfNeeded();
                return JSON.stringify(x.getBoundingClientRect());
            }, element));

            break;
        default:
            return null;
        }

        return [await getRandomInt(elementXY.left + 5, elementXY.right - 5),
            await getRandomInt(elementXY.top + 5, elementXY.bottom - 5)];
    } catch (e) {
        return null;
    }
};

module.exports = {
    mouseClickNature,
    keyboardTypeNature,
    mouseMoveIntoBrowserNature,
    getMixedBoundingClientRect,
};
