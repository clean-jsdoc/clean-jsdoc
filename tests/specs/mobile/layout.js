let HOME_PAGE = require('../../wdio.mobile.conf.js').config.baseUrl;

if (process.env.IOS) {
    HOME_PAGE = require('../../wdio.ios.conf').config.baseUrl;
}

describe('Mobile page layout', () => {
    let originalTimeout = 10000;

    beforeEach(async () => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;

        await (async () => {
            await browser.url(`${HOME_PAGE}`);
        })();
    });

    it('should display navigation toggle button without scrolling', async () => {
        const navicon = await browser.$('#mobile-menu');

        expect(await navicon.isClickable()).toBeTrue();
    });

    it('should toggle nav bar when button is tapped', async () => {
        const navicon = await browser.$('#mobile-menu');
        const target = await browser.$('#mobile-sidebar');

        await navicon.click();


        expect(await target.isDisplayedInViewport()).toBeTrue();

        await navicon.click();

        await browser.waitUntil(async () => !await target.isDisplayedInViewport(),
        {
            'timeout': 1000,
            'timeoutMsg': 'expected nav bar to disappear after 1s'
        });

        const classList = await target.getAttribute('class');

        expect(classList).not.toContain('show');
    });

/*
    it('should hide nav bar on link navigation', async () => {
        const navicon = await browser.$('#navbar-ham');

        await navicon.click();
        let searchBox = await browser.$('#search-box-input');

        await searchBox.clearValue();
        await searchBox.setValue('cr');
        const foundMethod = await browser.$('[href="Tree.html#crop"]');

        await browser.waitUntil(() => foundMethod.isClickable(),
            {
                'timeout': 10000,
                'timeoutMsg': 'expected link to respond to clicks'
            }
        );
        await foundMethod.click();
        await browser.waitUntil(async () => !await foundMethod.isDisplayedInViewport(),
        {
            'timeout': 1000,
            'timeoutMsg': 'expected search list to disappear after 1s'
        });

        const title = await browser.getTitle();

        searchBox = await browser.$('#search-box');

        expect(title).toContain('Tree');
        expect(await searchBox.isDisplayedInViewport()).toBe(false);
    });
*/

    afterAll(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
