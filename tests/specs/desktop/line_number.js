let HOME_PAGE = require('../../wdio.conf').config.baseUrl;

if (process.env.SAFARI) {
    HOME_PAGE = require('../../wdio.safari.conf').config.baseUrl;
}

describe('Line numbers', () => {
    const SOURCE_LINE = 'line29';

    beforeAll(() => browser.setTimeout({ 'pageLoad': 10000 }));

    beforeEach(async () => {
        await (async () => {
            await browser.url(`${HOME_PAGE}/Environment.html`);
            const sourceLink = await browser.$(`[href="Environment.js.html#${SOURCE_LINE}"]`);

            await sourceLink.click();
        })();
    });

    it('should have properly named hyperlinks', async () => {
        const foundLine = await browser.$('.selected');
        const idName = await foundLine.getAttribute('id');

        expect(idName).toEqual(SOURCE_LINE);
    });

    it('should be hightlighted', async () => {
        const foundLine = await browser.$('.selected');
        const ordinaryLine = await foundLine.previousElement();
        const lineStyle = await foundLine.getCSSProperty('background-color');
        const plainStyle = await ordinaryLine.getCSSProperty('background-color');

        expect(lineStyle.parsed.hex).not.toEqual(plainStyle.parsed.hex);
    });
});