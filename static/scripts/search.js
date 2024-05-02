const searchId = 'LiBfqbJVcV';
const searchHash = `#${searchId}`;
const searchContainer = document.querySelector('#PkfLWpAbet');
const searchWrapper = document.querySelector('#iCxFxjkHbP');
const searchCloseButton = document.querySelector('#VjLlGakifb');
const searchInput = document.querySelector('#vpcKVYIppa');
const resultBox = document.querySelector('#fWwVHRuDuN');

function showResultText(text) {
  resultBox.innerHTML = `<span class="search-result-c-text">${text}</span>`;
}

function hideSearch() {
  if (window.location.hash === searchHash) {
    history.go(-1);
  }

  window.onhashchange = null;

  if (searchContainer) {
    searchContainer.style.display = 'none';
  }
}

function listenCloseKey(event) {
  if (event.key === 'Escape') {
    hideSearch();
    window.removeEventListener('keyup', listenCloseKey);
  }
}

function showSearch() {
  try {
    // Closing mobile menu before opening
    // search box.
    // It is defined in core.js
    hideMobileMenu();
  } catch (_) {}

  window.onhashchange = hideSearch;

  if (window.location.hash !== searchHash) {
    history.pushState(null, null, searchHash);
  }

  if (searchContainer) {
    searchContainer.style.display = 'flex';
    window.addEventListener('keyup', listenCloseKey);
  }

  if (searchInput) {
    searchInput.focus();
  }
}

async function fetchAllData() {
  const { hostname, protocol, port, pathname } = location;

  const base = `${protocol}//${hostname}${port !== '' ? `:${port}` : ''}`;
  const url = new URL('data/search.json', pathname !== '' ? `${base}${pathname}` : base);
  const result = await fetch(url);
  const { list } = await result.json();

  return list;
}

function onClickSearchItem(event) {
  const target = event.currentTarget;

  if (target) {
    const href = target.getAttribute('href') || '';
    let elementId = href.split('#')[1] || '';
    let element = document.getElementById(elementId);

    if (!element) {
      elementId = decodeURI(elementId);
      element = document.getElementById(elementId);
    }

    if (element) {
      setTimeout(() => {
        bringElementIntoView(element); // defined in core.js
      }, 100);
    }
  }
}

function buildSearchResult(result) {
  let output = '';
  const removeHTMLTagsRegExp = /(<([^>]+)>)/igu;

  for (const res of result) {
    const { title = '', description = '' } = res.item;

    const _link = res.item.link.replace('<a href="', '').replace(/">.*/u, '');
    const _title = title.replace(removeHTMLTagsRegExp, '');
    const _description = description.replace(removeHTMLTagsRegExp, '');

    output += `
    <a onclick="onClickSearchItem(event)" href="${_link}" class="search-result-item">
      <div class="search-result-item-title">${_title}</div>
      <div class="search-result-item-p">${_description || 'No description available.'}</div>
    </a>
    `;
  }

  return output;
}

function getSearchResult(list, keys, searchKey) {
    const defaultOptions = {
        'shouldSort': true,
        'threshold': 0.4,
        'location': 0,
        'distance': 100,
        'maxPatternLength': 32,
        'minMatchCharLength': 1,
        keys
    };

    const options = { ...defaultOptions };

    const searchIndex = Fuse.createIndex(options.keys, list);

    const fuse = new Fuse(list, options, searchIndex);

    const result = fuse.search(searchKey);

    if (result.length > 20) {
        return result.slice(0, 20);
    }

  return result;
}

function debounce(func, wait, immediate) {
  let timeout;

  return function(...args) {
    /* eslint no-invalid-this: 0 */

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(this, args);
      }
    }, wait);
    if (immediate && !timeout) {
      func.apply(this, args);
    }
  };
}

function search(event) {
  const { value } = event.target;
  const keys = ['title', 'description'];
  let result = [];

  if (!resultBox) {
    return;
  }

  if (!value) {
    showResultText('Type anything to view search result');

    return;
  }

    if (!result.length) {
    showResultText('Loading...');

    fetchAllData().then(data => {
      result = getSearchResult(data, keys, value);
      if (!result.length) {
        showResultText('No result found! Try some different combination.');

        return;
      }
      resultBox.innerHTML = buildSearchResult(result);
    }).catch(_ => {
      showResultText('Failed to load result.');
    });
  }
}

function onDomContentLoaded() {
  const searchButton = document.querySelectorAll('.search-button');
  const debouncedSearch = debounce(search, 300);

  if (searchCloseButton) {
    searchCloseButton.addEventListener('click', hideSearch);
  }

  if (searchButton) {
    searchButton.forEach(item => {
      item.addEventListener('click', showSearch);
    });
  }

  if (searchContainer) {
    searchContainer.addEventListener('click', hideSearch);
  }

  if (searchWrapper) {
    searchWrapper.addEventListener('click', event => {
      event.stopPropagation();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('keyup', debouncedSearch);
  }

  if (window.location.hash === searchHash) {
    showSearch();
  }
}

window.addEventListener('DOMContentLoaded', onDomContentLoaded);

window.addEventListener('hashchange', () => {
  if (window.location.hash === searchHash) {
    showSearch();
  }
});
