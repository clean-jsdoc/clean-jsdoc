const path = require('path');
const fs = require('jsdoc/fs');
const fse = require('fs-extra');
const glob = require('glob');
const logger = require('jsdoc/util/logger');
const showdown = require('showdown');

const mdToHTMLConverter = new showdown.Converter();
const pathExists = fse.existsSync;

function codepen(themeOpts) {
    const codepenOpts = themeOpts.codepen || {};

    return codepenOpts;
}

function getMetaTagData(themeOpts) {
    const meta = themeOpts.meta || undefined;

    return meta;
}

function getTheme(themeOpts) {
    const themeName = themeOpts.theme && themeOpts.theme.toLowerCase();
    const theme = !themeName || themeName === 'dynamic' ? 'light' : themeName;

    return theme;
}

function overlayScrollbarOptions(themeOpts, outdir) {
    const overlayOptions = themeOpts.overlay_scrollbar || undefined;

    if (overlayOptions) {
        const scriptPath = path.join(__dirname, 'node_modules/overlayscrollbars/browser');
        const stylePath = path.join(__dirname, 'node_modules/overlayscrollbars/styles');

        if (fse.existsSync(scriptPath) && fse.existsSync(stylePath)) {
            const scriptsOut = path.join(outdir, 'scripts/third-party');
            const styleOut = path.join(outdir, 'styles/third-party');

            glob.sync(`${scriptPath}/*es6*{min,map}*`)
                .forEach(src => {
                    fse.copySync(src, path.join(scriptsOut, path.basename(src)));
                });
            glob.sync(`${stylePath}/*min*`)
                .forEach(src => {
                    fse.copySync(src, path.join(styleOut, path.basename(src)));
                });
        }

        return JSON.stringify(overlayOptions.options ? overlayOptions.options : {});
    }

    return undefined;
}

function getBaseURL(themeOpts) {
    const url = themeOpts.base_url || '/';

    return url;
}

function copyStaticFolder(themeOpts, outdir) {
    const staticDir = themeOpts.asset_paths || [];
    const staticStyles = [];
    const staticScripts = [];

    if (staticDir.length) {
        staticDir.forEach(dir => {
            try {
                const staticFiles = fs.ls(dir, 3);

                staticFiles.forEach(file => {
                    const assetPath = path.dirname(file).split('.').filter(part => part.trim()).join('/');
                    const relativePath = assetPath[0] === '/' ? assetPath.slice(1) : assetPath;
                    const assetDir = path.join(outdir, relativePath);
                    const ext = path.extname(file).toLowerCase();
                    const uri = path.join(relativePath, path.basename(file));

                    if (!pathExists(assetDir)) {
                        fs.mkPath(assetDir);
                    }
                    fs.copyFileSync(uri, assetDir);

                    if (['.js', '.mjs'].includes(ext)) {
                        staticScripts.push(uri);
                    }
                    else if (ext === '.css') {
                        staticStyles.push(uri);
                    }
                });
            } catch (err) {
                logger.warn(`'${err.path}' is not in the working directory at '${__dirname}'`);
            }
        });
    }

    return { staticStyles, staticScripts };
}

/**
 * Currently for some reason yields markdown is
 * not processed by jsdoc. So, we are processing it here
 *
 * @param {Array<{type: string, description: string}>} yields
 */
function getProcessedYield(yields) {
    if (!Array.isArray(yields)) {
        return [];
    }

    return yields.map(y => ({
        ...y,
        'description': mdToHTMLConverter.makeHtml(y.description)
    }));
}

function getLayoutOptions(themeOpts, defaultOpts, outdir) {
    const themeName = themeOpts.theme || 'light';
    const hideLangNames = themeOpts.langNames !== undefined && !themeOpts.langNames;
    const displayModuleHeader = themeOpts.moduleNames !== undefined && !themeOpts.moduleNames;
    const noSearch = themeOpts.search !== undefined && !themeOpts.search;
    const noTOC = themeOpts.toc !== undefined && !themeOpts.toc;
    const wantDate = defaultOpts.includeDate !== false;
    const wantOverlay = overlayScrollbarOptions(themeOpts, outdir) !== undefined;
    const toAssetLink = src => {
        const [extension] = (src.href || '').split('.').reverse();
        const ext = extension.toLowerCase();

        if (ext === 'css') {
           src.type = 'text/css';
           src.media = 'screen';
           src.rel = 'stylesheet';
        } else if (!src.type || !src.rel &&
            ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'tif', 'tiff', 'ico', 'webp', 'svg'].includes(ext)) {
            const mime =
                ['jpg', 'jpeg'].includes(ext) ?
                'jpeg' :
                ['tif', 'tiff'].includes(ext) ?
                    'tiff' :
                    ext === 'svg' ?
                        'svg+xml' :
                        ext;

           src.type = src.type || ext === 'ico' ? 'image/x-icon' : `image/${mime}`;
           src.rel = src.rel || 'icon';
        }

        return src;
    };

    return {
        toAssetLink,
        themeName,
        hideLangNames,
        displayModuleHeader,
        noSearch,
        noTOC,
        wantDate,
        wantOverlay
    };
}

module.exports = {
    codepen,
    getBaseURL,
    getMetaTagData,
    getTheme,
    getLayoutOptions,
    overlayScrollbarOptions,
    copyStaticFolder,
    getProcessedYield,
    pathExists
};
