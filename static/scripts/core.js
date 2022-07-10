const accordionLocalStorageKey = 'accordion-id';
const themeLocalStorageKey = 'theme';
const fontSizeLocalStorageKey = 'font-size';
const html = document.querySelector('html');

const MAX_FONT_SIZE = 30;
const MIN_FONT_SIZE = 10;

function getTheme() {
  const { body } = document;

  return body.getAttribute('data-theme');
}

function updateTheme(theme) {
  const { body } = document;
  const svgUse = document.querySelectorAll('.theme-svg-use');
  const iconID = theme === 'dark' ? '#light-theme-icon' : '#dark-theme-icon';
  const allStyles = Array.prototype.slice.call(document.styleSheets);
  const hiddenStyle = allStyles.find(s => s.media.mediaText === 'print');
  const displayName = document.getElementById('clean-jsdoc-theme');

  if (hiddenStyle && hiddenStyle.href.indexOf(theme) > -1) {
    hiddenStyle.media.mediaText = 'screen';
  }

  if (displayName) {
    displayName.innerText = theme;
  }

  body.setAttribute('data-theme', theme);
  body.classList.remove('dark', 'light');
  body.classList.add(theme);

  svgUse.forEach(svg => {
    svg.setAttribute('xlink:href', iconID);
  });

  localStorage.setItem(themeLocalStorageKey, theme);
}

function toggleTheme() {
  const newTheme = getTheme() === 'dark' ? 'light' : 'dark';

  updateTheme(newTheme);
}

(function() {
  const theme = getTheme();

  const themeStoredInLocalStorage = localStorage.getItem(themeLocalStorageKey);

  if (themeStoredInLocalStorage) {
    if (theme === themeStoredInLocalStorage) {
      return;
    }

    updateTheme(themeStoredInLocalStorage);
  } else {
    localStorage.setItem(themeLocalStorageKey, theme);
  }
})();

/**
 * Function to set accordion id to localStorage.
 * @param {string} id Accordion id
 */
function setAccordionIdToLocalStorage(id) {

  /**
     * @type {object}
     */
  const ids = JSON.parse(localStorage.getItem(accordionLocalStorageKey));

  ids[id] = id;
  localStorage.setItem(accordionLocalStorageKey, JSON.stringify(ids));
}

/**
 * Function to remove accordion id from localStorage.
 * @param {string} id Accordion id
 */
function removeAccordionIdFromLocalStorage(id) {

  /**
     * @type {object}
     */
  const ids = JSON.parse(localStorage.getItem(accordionLocalStorageKey));

  delete ids[id];
  localStorage.setItem(accordionLocalStorageKey, JSON.stringify(ids));
}

/**
 * Function to get all accordion ids from localStorage.
 *
 * @returns {object}
 */
function getAccordionIdsFromLocalStorage() {

  /**
     * @type {object}
     */
  const ids = JSON.parse(localStorage.getItem(accordionLocalStorageKey));

  return ids || {};
}

function toggleAccordion(element) {
  const currentNode = element;
  const isCollapsed = currentNode.getAttribute('data-isopen') === 'false';

  if (isCollapsed) {
    currentNode.setAttribute('data-isopen', 'true');
    setAccordionIdToLocalStorage(currentNode.id);
  } else {
    currentNode.setAttribute('data-isopen', 'false');
    removeAccordionIdFromLocalStorage(currentNode.id);
  }
}

function initAccordion() {
  if (
    localStorage.getItem(accordionLocalStorageKey) === undefined ||
        localStorage.getItem(accordionLocalStorageKey) === null
  ) {
    localStorage.setItem(accordionLocalStorageKey, '{}');
  }
  const allAccordion = document.querySelectorAll('.sidebar-section-title');
  const ids = getAccordionIdsFromLocalStorage();

  allAccordion.forEach(item => {
    item.addEventListener('click', () => {
      toggleAccordion(item);
    });
    if (item.id in ids) {
      toggleAccordion(item);
    }
  });
}

function isSourcePage() {
  return Boolean(document.querySelector('#source-page'));
}

function bringElementIntoView(element, updateHistory = true) {
  // If element is null then we are not going further
  if (!element) {
    return;
  }

  const navbar = document.querySelector('.navbar-container');
  const body = document.querySelector('.main-content');
  const elementTop = element.getBoundingClientRect().top;

  let offset = 16;

  if (navbar) {
    offset += navbar.scrollHeight;
  }

  if (body) {
    body.scrollBy(0, elementTop - offset);
  }

  if (updateHistory) {
    // eslint-disable-next-line no-undef
    history.pushState(null, null, `#${element.id}`);
  }
}

// eslint-disable-next-line no-unused-vars
function bringLinkToView(event) {
  event.preventDefault();
  event.stopPropagation();
  const id = event.currentTarget.getAttribute('href');

  if (!id) {
    return;
  }

  const element = document.getElementById(id.slice(1));

  if (element) {
    bringElementIntoView(element);
  }
}

function bringIdToViewOnMount() {
  if (isSourcePage()) {
    return;
  }

  // eslint-disable-next-line no-undef
  let id = window.location.hash;

  if (id === '') {
    return;
  }

  let element = document.getElementById(id.slice(1));

  if (!element) {
    id = decodeURI(id);
    element = document.getElementById(id.slice(1));
  }

  if (element) {
    bringElementIntoView(element, false);
  }
}

function createAnchorElement(id) {
  const anchor = document.createElement('a');

  anchor.textContent = '#';
  anchor.href = `#${id}`;
  anchor.classList.add('link-anchor');
  anchor.onclick = bringLinkToView;

  return anchor;
}

function addAnchor() {
  const main = document.querySelector('.main-content').querySelector('section');

  const h1 = main.querySelectorAll('h1');
  const h2 = main.querySelectorAll('h2');
  const h3 = main.querySelectorAll('h3');
  const h4 = main.querySelectorAll('h4');

  const targets = [h1, h2, h3, h4];

  targets.forEach(target => {
    target.forEach(heading => {
      const anchor = createAnchorElement(heading.id);

      heading.classList.add('has-anchor');
      heading.append(anchor);
    });
  });
}

/**
 *
 * @param {string} value
 */
function copy(value) {
  const el = document.createElement('textarea');

  el.value = value;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

function showTooltip(id) {
  const tooltip = document.getElementById(id);

  tooltip.classList.add('show-tooltip');
  setTimeout(() => {
    tooltip.classList.remove('show-tooltip');
  }, 3000);
}

/* eslint-disable-next-line */
function copyFunction(id) {
  // selecting the pre element
  const code = document.getElementById(id);

  // selecting the ol.linenums
  let element = code.querySelector('.linenums');

  if (!element) {
    // selecting the code block
    element = code.querySelector('code');
  }

  // copy
  copy(element.innerText);

  // show tooltip
  showTooltip(`tooltip-${id}`);
}

function hideTocOnSourcePage() {
  if (isSourcePage()) {
    document.querySelector('.toc-container').style.display = 'none';
  }
}

function getPreTopBar(id, lang = '') {
  // tooltip
  const tooltip = `<div class="tooltip" id="tooltip-${id}">Copied!</div>`;

  // template of copy to clipboard icon container
  const copyToClipboard =
        `<button type="button" aria-label="copy code" class="icon-button copy-code" onclick="copyFunction('${
        id
        }')"><svg class="sm-icon" alt="click to copy"><use xlink:href="#copy-icon"></use></svg>${
        tooltip
        }</button>`;

  const langNameDiv =
        `<div class="code-lang-name-container"><div class="code-lang-name">${
        lang.toLocaleUpperCase()
        }</div></div>`;

  const topBar =
        `<div class="pre-top-bar-container">${
        langNameDiv
        }${copyToClipboard
        }</div>`;

  return topBar;
}

function getPreDiv() {
  const divElement = document.createElement('div');

  divElement.classList.add('pre-div');

  return divElement;
}

function processAllPre() {
  const targets = document.querySelectorAll('pre');
  const footer = document.querySelector('#PeOAagUepe');
  const navbar = document.querySelector('#VuAckcnZhf');

  let navbarHeight = 0;
  let footerHeight = 0;

  if (footer) {
    footerHeight = footer.getBoundingClientRect().height;
  }

  if (navbar) {
    navbarHeight = navbar.getBoundingClientRect().height;
  }

  // eslint-disable-next-line no-undef
  const preMaxHeight = window.innerHeight - navbarHeight - footerHeight - 250;

  targets.forEach((pre, idx) => {
    const { classList } = pre;
    const parent = pre.parentNode;
    const prettifyName = (function() {
      let classStr = Array.prototype.slice.call(classList).join(' ');

      if (classStr.indexOf('lang-') > -1) {
        classStr = classStr.slice(classStr.indexOf('lang-') + 5);
        classStr = classStr.slice(0);

        return classStr;
      }

      return '';
    })();

    if (parent && parent.getAttribute('data-skip-pre-process') === 'true') {
      return;
    }

    const div = getPreDiv();
    const id = `ScDloZOMdL${idx}`;

    const lang = prettifyName || pre.getAttribute('data-lang') || 'code';
    const topBar = getPreTopBar(id, lang);

    div.innerHTML = topBar;

    pre.style.maxHeight = `${preMaxHeight}px`;
    pre.id = id;
    pre.parentNode.insertBefore(div, pre);
    div.appendChild(pre);
  });
}

function highlightAndBringLineIntoView() {
  // eslint-disable-next-line no-undef
  const lineNumber = window.location.hash.replace('#line', '');

  try {
    // const selector = `[data-line-number="${lineNumber}"`;
    const element = document.querySelector(`#line${lineNumber}`);

    if (element) {
      element.scrollIntoView();
      element.parentNode.classList.add('selected');
    }
  } catch (_) {}
}

function getFontSize() {
  let currentFontSize = 16;

  try {
    currentFontSize = Number.parseInt(
      html.style.fontSize.split('px')[0],
      10
    );
  } catch (_) {}

  return !isNaN(currentFontSize) ? currentFontSize : 16;
}

function updateFontSize(fontSize) {
  html.style.fontSize = `${fontSize}px`;
  localStorage.setItem(fontSizeLocalStorageKey, fontSize);
  const fontSizeText = document.querySelector(
    '#b77a68a492f343baabea06fad81f651e'
  );

  if (fontSizeText) {
    fontSizeText.innerHTML = fontSize;
  }
}

(function() {
  const fontSize = getFontSize();
  const fontSizeInLocalStorage = localStorage.getItem(fontSizeLocalStorageKey);

  if (fontSizeInLocalStorage) {
    const n = Number.parseInt(fontSizeInLocalStorage, 10);

    if (n === fontSize) {
      return;
    }
    updateFontSize(n);
  } else {
    localStorage.setItem(fontSizeInLocalStorage, fontSize);
  }
})();

// eslint-disable-next-line no-unused-vars
function incrementFont(event) {
  const n = getFontSize();

  if (n < MAX_FONT_SIZE) {
    updateFontSize(n + 1);
  }
}

// eslint-disable-next-line no-unused-vars
function decrementFont(event) {
  const n = getFontSize();

  if (n > MIN_FONT_SIZE) {
    updateFontSize(n - 1);
  }
}

function fontSizeTooltip() {
  const fontSize = getFontSize();

  return `
  <div class="font-size-tooltip">
    <button type="button" aria-label="decrease-font-size" class="icon-button ${
  fontSize >= MAX_FONT_SIZE ? 'disabled' : ''
}" onclick="decrementFont(event)">
      <svg>
        <use xlink:href="#minus-icon"></use>
      </svg>
    </button>
    <div class="font-size-text" id="b77a68a492f343baabea06fad81f651e">
      ${fontSize}
    </div>
    <button type="button" aria-label="increase-font-size" class="icon-button ${
  fontSize <= MIN_FONT_SIZE ? 'disabled' : ''
}" onclick="incrementFont(event)">
      <svg>
        <use xlink:href="#add-icon"></use>
      </svg>
    </button>
    <button type="button" aria-label="reset-font-size" class="icon-button" onclick="updateFontSize(16)">
      <svg>
        <use xlink:href="#reset-icon"></use>
      </svg>
    </button>
  </div>

  `;
}

function initTooltip() {
  // add tooltip to navbar item
  // eslint-disable-next-line no-undef
  tippy('.theme-toggle', {
    'content': 'Toggle Theme',
    'delay': 500
  });

  // eslint-disable-next-line no-undef
  tippy('.search-button', {
    'content': 'Search',
    'delay': 500
  });

  // eslint-disable-next-line no-undef
  tippy('.font-size', {
    'content': 'Change font size',
    'delay': 500
  });

  // eslint-disable-next-line no-undef
  tippy('.copy-code', {
    'content': 'Copy this code',
    'placement': 'left'
  });

  // eslint-disable-next-line no-undef
  tippy('.font-size', {
    'content': fontSizeTooltip(),
    'trigger': 'click',
    'interactive': true,
    'allowHTML': true,
    'placement': 'left'
  });
}

function fixTable() {
  const tables = document.querySelectorAll('table');
  let table;

  // eslint-disable-next-line no-undef
  if (window.innerWidth > 900) {
    // Only fixing table if width is smaller than 900px
    return;
  }

  for (table of tables) {
    if (table.classList.contains('hljs-ln')) {
      // don't want to wrap code blocks.
      return;
    }

    const div = document.createElement('div');

    div.classList.add('table-div');
    table.parentNode.insertBefore(div, table);
    div.appendChild(table);
  }
}

function onMobileMenuClick(event) {
  const mobileMenuContainer = document.querySelector('#mobile-sidebar');
  const target = event.currentTarget;
  const svgUse = target.querySelector('use');
  const isOpen = target.getAttribute('data-isopen') === 'true';

  if (mobileMenuContainer) {
    if (isOpen) {
      mobileMenuContainer.classList.remove('show');
      target.setAttribute('data-isopen', 'false');
      svgUse.setAttribute('xlink:href', '#menu-icon');
    } else {
      mobileMenuContainer.classList.add('show');
      target.setAttribute('data-isopen', 'true');
      svgUse.setAttribute('xlink:href', '#close-icon');
    }
  }
}

function initMobileMenu() {
  const menu = document.querySelector('#mobile-menu');

  if (menu) {
    menu.addEventListener('click', onMobileMenuClick);
  }
}

function addHrefToSidebarTitle() {
  const titles = document.querySelectorAll('.sidebar-title-anchor');

  titles.forEach(title => {
    // eslint-disable-next-line no-undef
    title.setAttribute('href', baseURL);
  });
}

function attachCodePen() {

  /**
   * CodePen hasn't supported IE 11 for a while
   * https://github.com/philipwalton/flexbugs/issues/274
   */
  if (window.navigator.userAgent.indexOf('Trident/') === -1) {
    const codeExs = document.querySelectorAll('div.pre-top-bar-container');

    for (let i = 0; i < codeExs.length; i++) {
      const { classList } = codeExs[i].firstElementChild;

      if (classList && Array.prototype.slice.call(classList).indexOf('code-lang-name-container') > -1) {
        const prefills = document.querySelectorAll('.codepen-data');

        if (prefills && prefills[i]) {
          const codepenLink =
            '<div><form action="https://codepen.io/pen/define" method="POST" target="_blank" class="codepen-form">' +
            `${prefills[i].innerHTML}</form></div>`;

          codeExs[i].firstElementChild.insertAdjacentHTML('afterend', codepenLink);
        }
      }
    }

    tippy('.codepen-button', {
      'content': 'Open code in CodePen',
      'placement': 'left'
    });
  }
}

function onDomContentLoaded() {
  const themeButton = document.querySelectorAll('.theme-toggle');

  initMobileMenu();

  if (themeButton) {
    themeButton.forEach(button => {
      button.addEventListener('click', toggleTheme);
    });
  }

  tocbot.init({
    'tocSelector': '#eed4d2a0bfd64539bb9df78095dec881',
    'contentSelector': '.main-content',
    'headingSelector': 'h1, h2, h3',
    'hasInnerContainers': true,
    'scrollContainer': '.main-content',
    'headingsOffset': 130,
    'onClick': bringLinkToView
  });

  // Highlighting code

  // eslint-disable-next-line no-undef
  prettyPrint();
  // eslint-disable-next-line no-undef
  numberSourceLines();

/*
  hljs.addPlugin({
    'after:highlightElement'(obj) {
      // Replace 'code' with result.language when
      // we are able to cross check the correctness of
      // result.
      obj.el.parentNode.setAttribute('data-lang', 'code');
    }
  });

  // eslint-disable-next-line no-undef
  hljs.highlightAll();
  // eslint-disable-next-line no-undef
  hljs.initLineNumbersOnLoad({
    'singleLine': true
  });
*/
  // Highlight complete

  initAccordion();
  addAnchor();
  processAllPre();
  hideTocOnSourcePage();
  setTimeout(() => {
    bringIdToViewOnMount();
    if (isSourcePage()) {
      highlightAndBringLineIntoView();
    }
  }, 1000);
  initTooltip();
  fixTable();
  attachCodePen();
  addHrefToSidebarTitle();
}

// eslint-disable-next-line no-undef
window.addEventListener('DOMContentLoaded', onDomContentLoaded);
