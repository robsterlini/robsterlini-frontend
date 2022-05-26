# Rob Sterlini

## Under the bonnet

[robsterlini.co.uk](https://robsterlini.co.uk) is built using [Eleventy](11ty.dev). The templating is done in Nunjucks and spits out HTML based on data stored as a mixture of JavaScript and JSON. The styling is pre-processed using Sass and inlined to reduce the need for an extra HTTP request; some pages have extra styles which are inlined in the same way and served on a per-page basis.

The two main webfonts are [Mackinac by P22](https://p22.com/family-Mackinac) and [Clone by Rosetta](https://www.rosettatype.com/Clone) which are self-served and subset using [Font Squirrel](https://www.fontsquirrel.com/tools/webfont-generator). Code blocks are set in [Fira Code](https://github.com/tonsky/FiraCode) and served (only on pages that need it) by Google Fonts as a variable font.

A heavy focus on all things typographic come from a wonderful undergraduate education experienced at the Department of Typography and Graphic Communication at University of Reading – if you love type and/or design, it’s the place to be educated!

The embedded tweets (as found [here](https://robsterlini.co.uk/journal/2021/our-dad-makes-pizza/)) are built off the back of [Kyle Mit’s plugin](https://github.com/KyleMit/eleventy-plugin-embed-tweet].

The theme picker ([originally just a light/dark mode](https://robsterlini.co.uk/journal/2020/light-and-dark-mode-plus/)) is now heavily inspired by the one found on [Max Böck’s site](https://mxb.dev/), kudos if you understand the little references in there. It automatically selects a theme based on your browser and contrast preferences, but then stores an overriden selection in `localStorage` for next time you come back! The code for this can be found in [`theme-selector.html`](src/_includes/components/theme-selector.html)

## Core principles

### Don’t overcomplicate the build

It’s easy to keep adding things, but for a site this small, it’s important to validate it’s use. That said it’s a playground with no stakeholders, so it is always an opportunity to test things and have fun!

### Regularly update time-sensitive information

A site is no good if it’s not up-to-date, the [CV](https://robsterlini.co.uk/cv) should have information added wherever relevant.

### Make it work for everyone

* Everything should work without JavaScript enabled
* All colour contrast should be AA, and AAA with the high contrast preference

### It will never be finished

It’s okay for it to be improved iteratively… there will always be more to do!

## Styleguide

* Use British English with a casual tone
* Use single quotes for speech
* Separate items with a spaced en-dash, represent durations or ranges with an unspaced en-dash, join words with a hyphen
* Use correct micro-typographic glyphs – `&times;` not x _etc_
* Use non-breaking spaces – either `&nbsp;`, `\xa0`, or ` ` (<kbd>⇧</kbd>–<kbd>⌥</kbd>–<kbd>Space</kbd>) – between the final two words of anything that might split over two lines to avoid typographic orphans
* Immediate punctuation (full stops, commas, colons _etc_) lives outside links (as decided by [Twitter](https://twitter.com/robsterlini/status/1290545839748898821))

## Setup

To run the project locally:

```
$ npm i
$ npm start
```

To build the project:

```
$ npm run build
```

## License

[robsterlini.co.uk](https://github.com/robsterlini/robsterlini-frontend) by [Rob Sterlini](https://robsterlini.co.uk) is licensed under [CC BY-NC-ND 4.0<br/><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" width="16px" height="16px" /><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" width="16px" height="16px" /><img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" width="16px" height="16px" /><img src="https://mirrors.creativecommons.org/presskit/icons/nd.svg" width="16px" height="16px" />](https://creativecommons.org/licenses/by-nc-nd/4.0)
