## 4.2.2

### Fixed
- don't escape operators like `&` and `>` in source code pages [4cd6813]
- remove all CodePen markup from code examples when browsing in IE, and
  make the inline template scripts more backward-compatible [2a02216]

### Changed
- bump overlayscrollbars to 1.13.2

[4cd6813]: https://github.com/rdipardo/clean-jsdoc-theme/commit/4cd6813
[2a02216]: https://github.com/rdipardo/clean-jsdoc-theme/commit/2a02216

## 4.2.1

### Fixed
- minor regression in menu link generation (due to [6c34f1c]): [cfd2e453c]

[cfd2e453c]: https://github.com/rdipardo/clean-jsdoc-theme/commit/cfd2e453c

## 4.2.0

### Added
- new option to list only selected [doc sections][] in the nav menu (ported from upstream)
- new dynamic theme option: [453a2a3]

### Fixed
- several causes of improper HTML: [6c34f1c], [26f6b23]

[doc sections]: https://rdipardo.github.io/clean-jsdoc-theme/#sections_option
[453a2a3]: https://github.com/rdipardo/clean-jsdoc-theme/commit/453a2a3
[6c34f1c]: https://github.com/rdipardo/clean-jsdoc-theme/commit/6c34f1c
[26f6b23]: https://github.com/rdipardo/clean-jsdoc-theme/commit/26f6b23

## 4.1.1

### Fixed
- remove unmatched `</div>` from `@example` template

## 4.1.0

### Added
- two new options from upstream:
  + [`codepen`][] - adds an ["Edit on CodePen" button](https://rdipardo.github.io/clean-jsdoc-theme/#codepen_option) to code examples
  + [`menuLocation`][] - sets the position of the [user-defined link menu](https://rdipardo.github.io/clean-jsdoc-theme/#basic)

## 4.0.1

### Fixed
- removed the peer dependency on `jsdoc` because it was pulling in a
  vulnerable version of `underscore`.

  See <https://www.npmjs.com/advisories/1674>

## 4.0.0

### BREAKING CHANGES
- rename package so that releases can be pushed to the
  [GitHub Package Registry][] directly from the default branch

  **Note.**
  Installing from the repo will work as before using the `npm` CLI, i.e.

        npm i rdipardo/clean-jsdoc-theme

  You should, however, update any dependent `package.json`:

```diff
    "devDependencies": {
-       "clean-jsdoc": "github:rdipardo/clean-jsdoc-theme",
+       "@rdipardo/clean-jsdoc": "github:rdipardo/clean-jsdoc-theme",
```

   and change the template path in your `.jsdoc.json`:

```diff
        "opts": {
-       "template": "node_modules/clean-jsdoc",
+       "template": "node_modules/@rdipardo/clean-jsdoc",
```

- drop options we don't intend to support, and give new names to the
  [remaining options][]

### Fixed
- give sufficient padding to inline code quotations, even when inside `<kbd>` or
  `<samp>` tags
- increase contrast of code quotations in both themes

[GitHub Package Registry]: https://github.com/rdipardo/clean-jsdoc-theme/packages/707496
[remaining options]: https://github.com/rdipardo/clean-jsdoc-theme#contents

## 3.0.2

### Fixed
- give `<blockquotes>` a visible background in the dark theme

### Changed
**README page**
- preserve numbers in ordered lists
- make tables more discreet

## 3.0.1

### Fixed
- clean up names of _"inner"_ module members in search results (**publish.js**)
  and parameter descriptions (**tmpl/type.tmpl**)
- make the _Properties_ subheading visible in tabular parameter descriptions
- remove empty heading when a return value has no description
- use consistent style for exceptions and fired events
- make line numbers the same colour in both themes

## 3.0.0

### Changed
- require npm version >=7.0.0
- integrate [upstream style enhancements][]

## 2.5.1

### Fixed
**publish.js**
- remove invalid option from `minifyOpts`
- correct file filter so that `minify` can actually process HTML
- prevent legacy HTML from being invalidated by overly aggressive optimization

### Changed
- slightly better contrast in JSON syntax highlighting

## 2.5.0

### Fixed
- restore list style to `<ul>`s in README pages and make bullets solid to match
  with `@see` metadata

### Changed
- update [clean-jsdoc colorscheme][] to make punctuation bolder

### Added
- recognize JSON syntax in code blocks

[clean-jsdoc colorscheme]: static/styles/clean-jsdoc-colorscheme.css

## 2.4.1

### Fixed
- keep the bottom margin consistent when `plugins/markdown` doesn't find a `-`
  after the `@returns` tag -- i.e., when the return value description is wrapped
  in `<p>` tags instead of `<ul>`s

## 2.4.0

### Ported from upstream
- [fold navigation link hierarchies][]
- move `@see` metadata to [its own section][]

### Fixed
- display `@see` metadata as a list
- apply bold font weight to folded link lists as well as childless ones

### Changed
- use _SEE ALSO_ as external link section heading

## 2.3.1

### Fixed
- prevent regex literals from matching with the division operator

## 2.3.0

### Fixed
- restore `fs-extra` dependency removed in last release
- defer loading font-awesome assets until DOM is ready so that
  error-handler actually works

### Changed
- use the [`overlayscrollbars`][] npm package
- compile and minify all non-third-party scripts
- minify all non-third-party static assets

[`overlayscrollbars`]: https://www.npmjs.com/package/overlayscrollbars

### Added
- improve code prettifier with more keywords and smarter regex matching
- give regex literals their own style rule

## 2.2.0

### Fixed
- render `@example` metadata with proper code block style
- modify `prettify.js` to stop syntax highlighting in code blocks with
  the `text` file type so that markup like this:

  <code>
  &#96;&#96;&#96;text<br/><br/>
        npm i && npm i jsdoc --no-save</br><br/>
  &#96;&#96;&#96;
  </code>

  looks like this:

  ![fixed_text_block](https://raw.githubusercontent.com/rdipardo/clean-jsdoc-theme/master/.github/img/v2.2.0/after.png)

  and _not_ like this:

  ![v2.1.0_text_block](https://raw.githubusercontent.com/rdipardo/clean-jsdoc-theme/master/.github/img/v2.2.0/before.png)

### Changed
- make one default set of code style rules; keep some thematic variations
  for better contrast

## 2.1.0

### Fixed
- restore the `dynamicStyle` property that was accidentally removed
  from the layout template in the previous release
- restrict the `.pre-top-bar-container` style to actual code blocks so
  that markup like this:

```markdown
##Example

    /full/name/of/some/path
```

  looks like this:

  ![fixed_code_container](https://raw.githubusercontent.com/rdipardo/clean-jsdoc-theme/master/.github/img/v2.1.0/after.png)

  and _not_ like this:

  ![v2.0.0_code_container](https://raw.githubusercontent.com/rdipardo/clean-jsdoc-theme/master/.github/img/v2.1.0/before.png)

## 2.0.0

### Added
- new features introduced [upstream][]
- the `add_assets` option will generate a `link` tag for stylesheets and
  image icons (so far) when only an `href` attribute is provided.
  Otherwise, it behaves the same as the (removed) `add_style_path` option

### Changed
- ~~add_style_path~~

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

[upstream style enhancements]: https://github.com/ankitskvmdam/clean-jsdoc-theme/releases/tag/v3.1.0
[upstream]: https://github.com/ankitskvmdam/clean-jsdoc-theme/commit/44e76bae8804e0fd17a961347024117b37275a0a#diff-5e733ad892a637d40e61205f71cd63352d98d5ddfd929ab000003eb1eee67fbc
[fold navigation link hierarchies]: https://github.com/ankitskvmdam/clean-jsdoc-theme/commit/6d6f93123ac51bbb9a2f9bd3ee185deca56b9fd9
[its own section]: https://github.com/ankitskvmdam/clean-jsdoc-theme/commit/277998015dd209fa548a89081001617df26a6753
[npm installation steps]: https://github.com/rdipardo/clean-jsdoc-theme#quick-start
[`menuLocation`]: https://github.com/ankitskvmdam/clean-jsdoc-theme/commit/36c86487b16c1971f6ada2ae56213e1212caf3c5
[`codepen`]: https://github.com/ankitskvmdam/clean-jsdoc-theme/commit/c309ebac641697d15f0ee3de2a5da9413aff9fec#diff-5e733ad892a637d40e61205f71cd63352d98d5ddfd929ab000003eb1eee67fbc
