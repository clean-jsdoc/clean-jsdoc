let searchData;
const searchId = 'LiBfqbJVcV';
const searchHash = `#${searchId}`;
const searchContainerID = '#PkfLWpAbet';
const searchWrapperID = '#iCxFxjkHbP';
const searchCloseButtonID = '#VjLlGakifb';
const searchInputID = '#vpcKVYIppa';
const searchResultCID = '#fWwVHRuDuN';

function hideSearch() {
  const container = document.querySelector(searchContainerID);

  // eslint-disable-next-line no-undef
  if (window.location.hash === searchHash) {
    // eslint-disable-next-line no-undef
    history.go(-1);
  }

  // eslint-disable-next-line no-undef
  window.onhashchange = null;

  if (container) {
    container.style.display = 'none';
  }
}

function listenKey(event) {
  if (event.key === 'Escape') {
    hideSearch();
    // eslint-disable-next-line no-undef
    window.removeEventListener('keyup', listenKey);
  }
}

function showSearch() {
  try {
    // Closing mobile menu before opening
    // search box.
    // It is defined in core.js
    // eslint-disable-next-line no-undef
    hideMobileMenu();
  } catch (_) {}

  const container = document.querySelector(searchContainerID);
  const input = document.querySelector(searchInputID);

  // eslint-disable-next-line no-undef
  window.onhashchange = hideSearch;

  // eslint-disable-next-line no-undef
  if (window.location.hash !== searchHash) {
    // eslint-disable-next-line no-undef
    history.pushState(null, null, searchHash);
  }

  if (container) {
    container.style.display = 'flex';
    // eslint-disable-next-line no-undef
    window.addEventListener('keyup', listenKey);
  }

  if (input) {
    input.focus();
  }
}

function fetchAllData(obj = {}) {
  // eslint-disable-next-line no-undef
  const url = `${baseURL}data/search.json`;

  fetch(url)
    .then(d => {
      return d.json();
    })
    .then(d => {
      searchData = d.list;
      if (typeof obj.onSuccess === 'function') {
        obj.onSuccess(d.list);
      }
    })
    .catch(error => {
      if (typeof obj.onError === 'function') {
        obj.onError();
      }
    });
}

// eslint-disable-next-line no-unused-vars
function onClickSearchItem(event) {
  const target = event.currentTarget;

  if (target) {
    const href = target.getAttribute('href') || '';
    let id = href.split('#')[1] || '';
    let element = document.getElementById(id);

    if (!element) {
      id = decodeURI(id);
      element = document.getElementById(id);
    }

    if (element) {
      setTimeout(() => {
        // eslint-disable-next-line no-undef
        bringElementIntoView(element); // defined in core.js
      }, 100);
    }
  }
}

function buildSearchResult(result) {
  let output = '';

  for (const res of result) {
    const data = res.item;

    const link = res.item.link.replace('<a href="', '').replace(/">.*/u, '');

    output += `

    <a onclick="onClickSearchItem(event)" href="${link}" class="search-result-item">
      <div class="search-result-item-title">
          ${data.title}
      </div>
      <div class="search-result-item-p">
          ${data.description ? data.description : 'No description available.'}
      </div>
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

    // var op = Object.assign({}, defaultOptions, options);
    const op = defaultOptions;

    // eslint-disable-next-line no-undef
    const searchIndex = Fuse.createIndex(op.keys, list);

    // eslint-disable-next-line no-undef
    const fuse = new Fuse(list, op, searchIndex);

    let result = fuse.search(searchKey);

    if (result.length > 20) {
        result = result.slice(0, 20);
    }

  return result;
}

function debounce(func, wait, immediate) {
  let timeout;

  return function(...args) {
    // eslint-disable-next-line consistent-this, no-invalid-this
    const context = this;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (immediate && !timeout) {
      func.apply(context, args);
    }
  };
}

function search(event) {
  const { value } = event.target;
  const resultBox = document.querySelector(searchResultCID);
  const keys = ['title', 'description'];

  if (!resultBox) {
    return;
  }

  if (!value) {
    resultBox.innerHTML = 'Type anything to view search result';

    return;
  }

  function onSuccess(res) {
    if (res.length === 0) {
      resultBox.innerHTML =
                'No result found! Try some different combination.';

      return;
    }
    const output = buildSearchResult(res);

    resultBox.innerHTML = output;
  }

  if (!searchData) {
    resultBox.innerHTML = 'Loading...';

    fetchAllData({
      'onSuccess'(list) {
        const result = getSearchResult(list, keys, value);

        onSuccess(result);
      },
      'onError'() {
        resultBox.innerHTML = 'Failed to load result.';
      }
    });

    return;
  }

  const result = getSearchResult(searchData, keys, value);

  onSuccess(result);
}

function onDomContentLoaded() {
  const input = document.querySelector(searchInputID);
  const searchButton = document.querySelectorAll('.search-button');
  const searchContainer = document.querySelector(searchContainerID);
  const searchWrapper = document.querySelector(searchWrapperID);
  const searchCloseButton = document.querySelector(searchCloseButtonID);

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

  if (input) {
    input.addEventListener('keyup', debouncedSearch);
  }

  // eslint-disable-next-line no-undef
  if (window.location.hash === searchHash) {
    showSearch();
  }
}

// eslint-disable-next-line no-undef
window.addEventListener('DOMContentLoaded', onDomContentLoaded);

// eslint-disable-next-line no-undef
window.addEventListener('hashchange', () => {
  // eslint-disable-next-line no-undef
  if (window.location.hash === searchHash) {
    showSearch();
  }
});
