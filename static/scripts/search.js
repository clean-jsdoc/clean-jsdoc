function hideSearchList() {
    document.getElementById('search-item-ul').style.display = 'none';
}

function listenKey(event) {
  if (event.key === 'Escape') {
    hideSearch();
    // eslint-disable-next-line no-undef
    window.removeEventListener('keyup', listenKey);
  }
}

function showSearch() {
  var container = document.querySelector(searchContainerID);
  var input = document.querySelector(searchInputID);

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

function checkClick(e) {
    if (e.target.id !== 'search-box-input') {
        setTimeout(() => {
            hideSearchList();
        }, 60);

  fetch(url)
    .then(function(d) {
      return d.json();
    })
    .then(function(d) {
      searchData = d.list;
      if (typeof obj.onSuccess === 'function') {
        obj.onSuccess(d.list);
      }
    })
    .catch(function(error) {
      console.error(error);
      if (typeof obj.onError === 'function') {
        obj.onError();
      }
    });
}

// eslint-disable-next-line no-unused-vars
function onClickSearchItem(event) {
  var target = event.currentTarget;

  if (target) {
    var href = target.getAttribute('href') || '';
    var id = href.split('#')[1] || '';
    var element = document.getElementById(id);

    if (!element) {
      id = decodeURI(id);
      element = document.getElementById(id);
    }

    if (element) {
      setTimeout(function() {
        // eslint-disable-next-line no-undef
        bringElementIntoView(element); // defined in core.js
      }, 100);
    }
  }
}

function search(list, _, keys, searchKey) {
    const options = {
        'shouldSort': true,
        'threshold': 0.4,
        'location': 0,
        'distance': 100,
        'maxPatternLength': 32,
        'minMatchCharLength': 1,
        keys
    };

    // eslint-disable-next-line no-undef
    const searchIndex = Fuse.createIndex(options.keys, list);

    // eslint-disable-next-line no-undef
    const fuse = new Fuse(list, options, searchIndex);

    let result = fuse.search(searchKey);

    if (result.length > 20) {
        result = result.slice(0, 20);
    }

    const searchUL = document.getElementById('search-item-ul');

    if (result.length === 0) {
        searchUL.innerHTML = '<li class="p-h-n"> No Result Found </li>';
    } else {
        searchUL.innerHTML = result.reduce((html, obj) => {
            return `${html}<li>${obj.item.link}</li>`;
        }, '');
    }
    var output = buildSearchResult(res);

    resultBox.innerHTML = output;
  }

  if (!searchData) {
    resultBox.innerHTML = 'Loading...';

    fetchAllData({
      onSuccess: function(list) {
        var result = getSearchResult(list, keys, value);

        onSuccess(result);
      },
      onError: function() {
        resultBox.innerHTML = 'Failed to load result.';
      }
    });

    return;
  }

  var result = getSearchResult(searchData, keys, value);

  onSuccess(result);
}

/* eslint-disable-next-line */
function setupSearch(list) {
    const inputBox = document.getElementById('search-box-input');
    const keys = ['title'];

    inputBox.addEventListener('keyup', () => {
        if (inputBox.value !== '') {
            showSearchList();
            search(list, null, keys, inputBox.value);
        }
        else { hideSearchList(); }
    });
  }

    inputBox.addEventListener('focus', () => {
        showSearchList();
        if (inputBox.value !== '') {
            search(list, null, keys, inputBox.value);
        }

  if (searchWrapper) {
    searchWrapper.addEventListener('click', function(event) {
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
window.addEventListener('hashchange', function() {
  // eslint-disable-next-line no-undef
  if (window.location.hash === searchHash) {
    showSearch();
  }
});
