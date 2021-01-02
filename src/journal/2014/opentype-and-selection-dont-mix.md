---
title: Opentype & ::selection don’t mix
date: 2014-04-29
description: Fixing the dubious way that Chrome on <abbr title="Mac OS X" class="sc">OSX</abbr> borks OpenType features when used with a custom ::selection.
layout: post
---

*[OSX]: Mac OS X
*[CSS]: Cascading Stylesheets
*[OT]: OpenType

## The problem

I’m a type-snob/type-nerd. I want to use the beautiful OpenType features on offer from *FF Tisa Pro* and I do, but Google Chrome seems to have a bit of a problem with it.

99.9% and maybe more of my browser issues come from Internet Explorer, but this is Chrome on <span class="sc">OSX</span> misbehaving.

It does do the OpenType bit really well, but if you’re using a custom `::selection` to add an extra level of detail then you’ll start to have problems!

Here’s the <span class="sc">CSS</span> that will recreate the problem:

```css
::selection {
  background: #ff4444;
  color: #fff;
  text-shadow: none;
}

p {
  font-family: "ff-tisa-web-pro", "Tisa Pro", "Tisa", "Cambo", serif;
  font-style: normal;
  font-weight: 400;
  -webkit-font-smoothing: antialiased;
  /* I’ve left out the other prefixes as this is a Chrome-only issue */
  -webkit-font-feature-settings: "kern", "liga", "case", "onum";
}
```

Which gives you this:

{% figureFull
  "journal/opentype-and-selection-dont-mix/ot-1.jpg",
  "1000x115",
  "The OpenType features looking beautiful",
  "The OpenType features looking beautiful"
%}

{% figureFull
  "journal/opentype-and-selection-dont-mix/ot-2.jpg",
  "1000x115",
  "::selection looking not-so-beautiful",
  "::selection looking not-so-beautiful"
%}

## The solutions

As with all of these things there are a few solutions

### 1. Leave it

The easiest solution is to not use a custom `::selection` or to not use the OpenType features, but they’re both things that I want to include.

{% figureFull
  "journal/opentype-and-selection-dont-mix/ot-3.jpg",
  "1000x115",
  "No OT features…",
  "No OT features…"
%}

{% figureFull
  "journal/opentype-and-selection-dont-mix/ot-4.jpg",
  "1000x115",
  "…but no ::selection problems",
  "…but no ::selection problems"
%}

### 2. Get some, but not all of it

Before switching over to using the `font-feature-settings` that I now use (having read [Elliot’s run down on them](http://elliotjaystocks.com/blog/a-recap-on-opentype-features/ "Elliot Jay Stocks’ recap on OT features")), I used `text-rendering: optimizeLegibility;` to sort the kerning, and ligatures; but that came with performance issues and still didn’t offer the ranging numerals.

It is however a solution to the problem.

```css
p {
  -webkit-font-feature-settings: normal;
  text-rendering: optimizeLegibility;
}
```

It would also mean sacrificing the tasty features on all the other browsers, but *A List Apart* had a similar issue and solved it with [a bit of JS browser-sniffing](https://github.com/alistapart/AListApart/issues/53 "Find out how A List Apart fixed it"):

```js
var b = document.documentElement;
b.setAttribute('data-useragent',  navigator.userAgent);
b.setAttribute('data-platform', navigator.platform);
```

…and then only applying the <span class="sc">CSS</span> to those that are using Chrome on <span class="sc">OSX</span>:

```css
html[data-useragent*='Chrome'][data-platform*='Mac'] p {
  -webkit-font-feature-settings: normal;
  text-rendering: optimizeLegibility;
}
```

{% figureFull
  "journal/opentype-and-selection-dont-mix/ot-5.jpg",
  "1000x115",
  "Problem solved?",
  "Problem solved?"
%}

But even this has a problem with the `::selection`…

{% figureFull
  "journal/opentype-and-selection-dont-mix/ot-6.jpg",
  "1000x115",
  "Nearly, but not quite",
  "Nearly, but not quite"
%}

And even then it still doesn’t deliver what I want.

### 3. Get the other bit of it instead

But from there I thought that instead of sacrificing ranging numbers, I’d sacrifice a level of the custom `::selection` instead.

```css
html[data-useragent*='Chrome'][data-platform*='Mac'] ::selection {
  background: #d1d4d9;
  color: inherit;
  text-shadow: inherit;
}
```

I worked out that it was the `colour` and `text-shadow`, but not the `background` that was breaking it, so remove them from the equation and there we have it: custom `::selection` with the beauty of the OT features.

The only caveat is that you need to use a contrasting colour to the text – in this case a light grey against the dark text. Not too-big-a sacrifice to keep both of it!

{% figureFull
  "journal/opentype-and-selection-dont-mix/ot-7.jpg",
  "1000x115",
  "Problem solved?",
  "Problem solved?"
%}

{% figureFull
  "journal/opentype-and-selection-dont-mix/ot-8.jpg",
  "1000x115",
  "You betcha!",
  "You betcha!"
%}

## Problem solved

Feel free to use any of the techniques shown until Chrome fix it, happy OpenType-ing.

## Let Google know

A while back I added this as a Chromium issue, but it seems to have lost traction so if you can [star the bug](https://code.google.com/p/chromium/issues/detail?id=362956 "See the Chromium Issue raised on this subject"), so we can get this fixed that’d be grand!
