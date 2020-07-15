# Rob Sterlini

## Under the hood

[robsterlini.co.uk](https://robsterlini.co.uk) is built using [Eleventy](11ty.dev). The templating is done in Nunjucks and spits out HTML based on data stored as a mixture of JavaScript and JSON. The styling is pre-processed using Sass and inlined to reduce the need for an extra HTTP request; some pages have extra styles which are inlined in the same way and served on a per-page basis.

The two main webfonts are [Mackinac by P22](https://p22.com/family-Mackinac) and [Clone by Rosetta](https://www.rosettatype.com/Clone) which are self-served and subset using [Font Squirrel](https://www.fontsquirrel.com/tools/webfont-generator). Code blocks are set in [Fira Code](https://github.com/tonsky/FiraCode) and served (only on pages that need it) by Google Fonts as a variable font.

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
