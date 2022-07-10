let HOME_PAGE = require('../../wdio.conf').config.baseUrl;

if (process.env.SAFARI) {
    HOME_PAGE = require('../../wdio.safari.conf').config.baseUrl;
}

describe('Page layout', () => {
    const linkTitle = '[title="View project on GitHub"]';
    let searchButton = null;
    let originalTimeout = 10000;

    beforeEach(async () => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;

        await browser.url(`${HOME_PAGE}`);

        searchButton = await browser.$('.icon-button.search-button');

        await browser.waitUntil(() => searchButton.isClickable(),
            {
                'timeout': 50000,
                'timeoutMsg': 'expected search button to be visible in 5s'
            }
        );
    });

    it('should have project\'s name in title', async () => {
        await browser.url(`${HOME_PAGE}`);

        const title = await browser.getTitle();

        expect(title).toContain('clean-jsdoc');
    });

    it('should display a link to project\'s homepage', async () => {
        const github = await browser.$(linkTitle);

        expect(await github.isExisting()).toBeTrue();
    });

    it('should display project\'s version number', async () => {
        const github = await browser.$(linkTitle);
        const projectVersion = await github.parentElement();
        const version = await projectVersion.previousElement();

        expect(await version.getText()).toMatch(/\d+\.\d+\.\d+/u);
    });

    it('should toggle style theme', async () => {
        const oldTheme = await browser.$('#clean-jsdoc-theme');
        const oldThemeName = await oldTheme.getText();
        const themeToggle = await browser.$('.theme-toggle');

        await browser.waitUntil(() => themeToggle.isClickable(),
            {
                'timeout': 50000,
                'timeoutMsg': 'expected theme toggle button to be visible in 5s'
            }
        );

        await themeToggle.click();
        let newTheme = await browser.$('#clean-jsdoc-theme');
        let newThemeName = await newTheme.getText();

        expect(oldThemeName).not.toEqual(newThemeName);

        await themeToggle.click();
        newTheme = await browser.$('#clean-jsdoc-theme');
        newThemeName = await newTheme.getText();

        expect(oldThemeName).toEqual(newThemeName);
    });

    it('should change font size', async () => {
        const fontSizeButton = await browser.$('.font-size');

        await browser.waitUntil(() => fontSizeButton.isClickable(),
            {
                'timeout': 50000,
                'timeoutMsg': 'expected font size button to be visible in 5s'
            }
        );

        await fontSizeButton.click();
        const upsizeButton = await browser.$('[aria-label="increase-font-size"]');

        await browser.waitUntil(() => upsizeButton.isClickable(),
            {
                'timeout': 10000,
                'timeoutMsg': 'expected bigger font size selector to be visible'
            }
        );

        const downsizeButton = await browser.$('[aria-label="decrease-font-size"]');

        await browser.waitUntil(() => downsizeButton.isClickable(),
            {
                'timeout': 10000,
                'timeoutMsg': 'expected smaller font size selector to be visible'
            }
        );

        const resetButton = await browser.$('[aria-label="reset-font-size"]');

        await browser.waitUntil(() => resetButton.isClickable(),
            {
                'timeout': 10000,
                'timeoutMsg': 'expected font reset selector to be visible'
            }
        );

        const title = await browser.$('a.sidebar-title');
        const oldSize = await title.getCSSProperty('font-size');

        await upsizeButton.click();

        let newSize = await title.getCSSProperty('font-size');

        expect(oldSize.parsed.value).toBeLessThan(newSize.parsed.value);

        await resetButton.click();

        newSize = await title.getCSSProperty('font-size');

        expect(oldSize.parsed.value).toEqual(newSize.parsed.value);

        await downsizeButton.click();

        newSize = await title.getCSSProperty('font-size');

        expect(newSize.parsed.value).toBeLessThan(oldSize.parsed.value);
    });

    it('should generate links to documented members', async () => {
        await searchButton.click();

        const searchBox = await browser.$('.search-input');

        await browser.waitUntil(() => searchBox.isClickable(),
            {
                'timeout': 50000,
                'timeoutMsg': 'expected search input to be responsive in 5s'
            }
        );

        await browser.keys(['c', 'r']);
        const foundMethod = await browser.$('[href="Tree.html#crop"]');

        await browser.waitUntil(() => foundMethod.isClickable(),
            {
                'timeout': 10000,
                'timeoutMsg': 'expected link to respond to clicks'
            }
        );

        await foundMethod.click();

        if ((/(bs-local)/iu).test(HOME_PAGE)) {
            await browser.waitUntil(async () => (/(Tree)/iu).test(await browser.getTitle()),
                {
                    'timeout': 20000,
                    'timeoutMsg': 'expected page navigation to complete in 2s'
                }
            );
        }

        const title = await browser.getTitle();

        expect(title).toContain('Tree');
    });

    afterAll(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
});
