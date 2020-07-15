# Rob Sterlini

## Under the hood

[robsterlini.co.uk](https://robsterlini.co.uk) is built using [Eleventy](11ty.dev). The templating is done in Nunjucks and spits out HTML based on data stored as a mixture of JavaScript and JSON. The styling is pre-processed using Sass and inlined to reduce the need for an extra HTTP request; some pages have extra styles which are inlined in the same way and served on a per-page basis.

The two main webfonts are [Mackinac by P22](https://p22.com/family-Mackinac) and [Clone by Rosetta](https://www.rosettatype.com/Clone) which are self-served and subset using [Font Squirrel](https://www.fontsquirrel.com/tools/webfont-generator). Code blocks are set in [Fira Code](https://github.com/tonsky/FiraCode) and served (only on pages that need it) by Google Fonts as a variable font.

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
* Use correct micro-typographic glyphs – &times; not x _etc_

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
