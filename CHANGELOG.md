## 1.0.0

### Fixed
- use `position: absolute;` to keep the navigation toggle button inside
  the view-port on small mobile screens

### Changed
- versioning scheme is now independent of upstream

### Added
- provide fonts in `.eot`, `svg`, `.woff` and `woff2` file formats
- JS assets are now compiled to make them safe for IE 11

## 2.2.14.02

### Fixed
- the `langNames` option is now properly detected by the layout template
- the `demo/copy.cmd` script works now

### Changed
- the nav bar's top margin is always dynamically set, with or without the search box present
- show [npm installation steps][] in the README

### Added
-  special development scripts for Windows users

## 2.2.14.01

### Fixed
- only code is copied to the clipboard, with no extra HTML markup

### Changed
- use web-friendly Google fonts
- tweak styles, layout

### Added
- new `langNames` option to hide language names from code blocks
- new `project` option to display version and repo information

## In version 2.2.14

### Bug Fix

1.  Malformed HTML when parsing 'default' JSDoc tags [issue: [#48](https://github.com/ankitskvmdam/clean-jsdoc-theme/issues/48)]

## In version 2.2.13

### New

1.  Make the # before members and methods a clickable anchor. [pull request: [#44](https://github.com/ankitskvmdam/clean-jsdoc-theme/pull/44)] [Thanks to [GMartigny](https://github.com/GMartigny)]

### Other

1.  Change jsdoc into a peerDependency [pull request: [#45](https://github.com/ankitskvmdam/clean-jsdoc-theme/pull/45)][Thanks to [GMartigny](https://github.com/GMartigny)]

## In version 2.2.12

### New

1.  Add dark theme.

### Bug fix

1.  Fix typescript-eslint camelCase rule issue [issue: [#37](https://github.com/ankitskvmdam/clean-jsdoc-theme/issues/37)]
1.  Fix ordered list style [issue: [#40](https://github.com/ankitskvmdam/clean-jsdoc-theme/issues/40)]
1.  Fix code overflow issue.

[npm installation steps]: https://github.com/rdipardo/clean-jsdoc-theme#quick-start