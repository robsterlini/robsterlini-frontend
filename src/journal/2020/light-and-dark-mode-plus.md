---
title: Light & dark mode, plus…
date: 2020-07-05
description: Colour preference media queries are a great start of respecting a user’s implied preference, but it’s possible to go a few steps further to create the perfect user experience!
layout: post
tags: 
  - dev
---

*[OS]: Operating system
*[UI]: User interface
*[HTML]: Hypertext markup language

## Respect the operating system

[`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) has been about for a little while now, and you’ve likely seen it in use across a number of websites. It is the easiest way to respect the colour preference as set by a user within their OS.

```css
body {
  background: black;
  color: white;
}

@media (prefers-color-scheme: light) {
  body {
    background: white;
    color: black;
  }
}
```

Note that the code above will treat the user’s preference as `dark` if their browser doesn’t support `prefers-color-scheme` (although the support is pretty solid), so it’s safe to use regardless of your browser support requirements.

This is a good start, but as we build the site out a bit more, duplicating the media query in loads of different places is a little inefficient. Combining `prefers-color-scheme` with [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) (which even better browser support) means we can reduce the code even as the site scales:


```css
:root {
  --body-background: black;
  --body-color: white;
}

@media (prefers-color-scheme: light) {
  :root {
    --body-background: white;
    --body-color: black;
  }
}

body {
  background: var(--body-background);
  color: var(--body-color);
}
```

This is a great start and means that we are respecting the user’s implied preference for the site, but there are many (myself included) that would prefer to choose themselves:

> Your assumption that I want the dark theme of your website because my OS is in ‘dark mode’ makes me close the browser tab. <cite>[@StuRobson](https://twitter.com/StuRobson/status/1278036990081073152)</cite>

I found that when developing this site that I prefered the light mode colour scheme even with my general preference for dark UI.

## Let ’em pick!

There are many options for native (i.e. non-custom) form elements to represent the choice we’re going to give a user, but for simplicity I’ll demonstrate it with a `<select>` with three options. We’ll also add a `data-color-preference` data attribute to the `<body>` – with `auto` as the default – for later.

```html
<html data-color-preference="auto">
  <head>…</head>
  <body>
    <!-- The rest of your page markup goes here… -->

    <select id="color-preference" aria-label="Select color scheme preference">
      <option value="auto">Auto</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </body>
</html>
```

We then need to use JavaScript to observe any changes made to `#color-preference`. It’s also important that we store the selected value so that when the user navigates around the site they’re not left wondering why it has defaulted back to their OS default.

```js
const selectEl = document.getElementById('color-preference');

// When the user changes the <select> value, the preference is changed for `data-color-preference`, and is stored in `localStorage`
selectEl.addEventListener('change', function(e) {
  const preference = e.target.value;

  document.documentElement.dataset.colorPreference = preference;
  localStorage.setItem('color-preference', preference);
});

// When arriving on the page a check is made to see if there is a stored preference, and if there is it is applied to `data-color-preference` and the <select>’s value is updated to match
const storedPreference = localStorage.getItem('color-preference');
if (storedPreference) {
  document.documentElement.dataset.colorPreference = storedPreference;
  selectEl.value = storedPreference;
}
```

The last step for this enhancement is to amend the CSS to match these new attributes:

```css
/* :root is switched for the [data-…] selector so that it only applies to when a user has made no preference selection */
[data-color-preference="auto"] {
  --body-background: black;
  --body-color: white;
}

@media (prefers-color-scheme: light) {
  [data-color-preference="auto"] {
    --body-background: white;
    --body-color: black;
  }
}

[data-color-preference="light"] {
  --body-background: white;
  --body-color: black;
}

[data-color-preference="dark"] {
  --body-background: black;
  --body-color: white;
}

body {
  /* This is the same as before */
}
```

You’ll maybe notice that this leads to a duplication of all of the variable declarations. While it might be tempting to refactor the `<select>` functionality to store the auto value and only ever set `data-color-preference` to be either `dark` or `light`, this would mean that any users without JavaScript enabled would only ever see the dark mode regardless of their implied preference as set by the OS.

You could reduce the duplication by using a pre-processor like Sass to create variables like `$light-mode-color`, or even use CSS Custom Properties to do the same with:

```css
/* This snippet has been shortened from the above to demonstrate the use of CSS Custom Properties for making the colour constants reusable */
:root {
  --light-mode-color: white;
}

[data-color-preference="auto"] {

  @media (prefers-color-scheme: light) {
    --body-color: var(--light-mode-color);
  }
}

[data-color-preference="light"] {
  --body-color: var(--light-mode-color);
}
```

I favour using Sass, but I’ll leave the choice up to you!

Excellent! Now we have a persistent colour scheme choice for a user that uses minimal code and leverages CSS Custom Properties to make reusing these colours maintainable.

## What about the ‘plus’?

The eagle-eyed among you will see that in the footer of this page there is also the ability to choose the level of contrast too.

Whereas `prefers-color-scheme` is widely supported, (at the time of writing) [`prefers-contrast`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) is still labelled an *experimental technology*, but that doesn’t mean we can’t use a similar approach as we have done for the colour scheme.

```html
<html data-color-preference="auto" data-contrast-preference="auto">
  <head>…</head>
  <body>
    <!-- This is the same as above (with the new colour select) -->

    <select id="contrast-preference" aria-label="Select contrast preference">
      <option value="auto">Auto</option>
      <option value="regular">Regular</option>
      <option value="high">High</option>
    </select>
  </body>
</html>
```

The JavaScript looks very similar (with some name changes to ensure there are no clashes with the colour selector):

```js
const contrastSelectEl = document.getElementById('contrast-preference');

contrastSelectEl.addEventListener('change', function(e) {
  const preference = e.target.value;

  document.documentElement.dataset.contrastPreference = preference;
  localStorage.setItem('contrast-preference', preference);
});

const storedContrastPreference = localStorage.getItem('contrast-preference');
if (storedContrastPreference) {
  document.documentElement.dataset.contrastPreference = storedContrastPreference;
  contrastSelectEl.value = storedContrastPreference;
}
```

The CSS is a little more complex than before because we now have two interdependant variants, each with three options which creates the following combinations:

* `auto` (light), `auto` (regular)
* `auto` (dark), `auto` (high)
* `auto` (light), `regular`
* `auto` (dark), `regular`
* `auto` (dark), `regular`
* `auto` (light), `high`
* `auto` (dark), `high`…

And those are just for the `auto` colour preference. At first glance that makes it look like there is likely to be a complex or repetitive solution, but we can further leverage the power of CSS Custom Properties:

```scss
// You’ll notice I’ve switched the default colours from `black` and `white` to less contrasting colours to demonstrate a change to the higher contrast. If you are just using `black` and `white` then the `prefers-contrast` isn’t going to make any difference as there’s no higher contrast.

// This snippet is also in Sass to demonstrate how to avoid the repeated colour declarations.

@mixin dark-mode-colors {
  --body-background: #261F2D;
  --body-color: #E0D4ED;

  --body-background-high-contrast: black;
  --body-color-high-contrast: white;
}

@mixin light-mode-colors {
  --body-background: #E0D4ED;
  --body-color: #261F2D;

  --body-background-high-contrast: white;
  --body-color-high-contrast: black;
}

[data-color-preference="auto"] {
  @include dark-mode-colors;
}

@media (prefers-color-scheme: light) {
  [data-color-preference="auto"] {
    @include light-mode-colors;
  }
}

[data-color-preference="light"] {
  @include dark-mode-colors;
}

[data-color-preference="dark"] {
  @include dark-mode-colors;
}

@mixin high-contrast-colors {
  --body-background: var(--body-background-high-contrast);
  --body-color: var(--body-color-high-contrast);
}

// As described above, this is not yet supported, but having it in means that if all goes ahead with the proposed spec, your users will benefit from your future-proofing with no deployments needed!
@media (prefers-contrast: high) {
  [data-contrast-preference="auto"] {
    @include high-contrast-colors;
  }
}

[data-contrast-preference="high"] {
  @include high-contrast-colors;
}

body {
  /* This is the same as before */
}
```

Rather than creating `@media` combinations of `prefers-contrast` and `prefers-color-scheme`, and creating `[data-color-preference=""][data-contrast-preference=""]` declarations for every possible permutation, the `light` and `dark` colour schemes now have `-high-contrast` variants of their values which are used in the `high-contrast-colors` mixin to redefine their values (whilst maintaining the colour preference).

This abstraction comes into its own when there are more than just `background` and `color` variables, and means a few variables can be used to keep consistent styling for every possible combiniation of colour and contrast preference throughout your site.

Remember that if specific adjustments are required based on one of these preferences outside of the `:root` declarations, you’ll need to declare them twice. An example might be that the background for your code blocks is now the same as the background (as it is on this page, try switching to high contrast in the footer), which could be solved by adding a border to distinguish the two.

```css
[data-contrast-preference="high"] {
  pre {
    border-width: 1px;
  }
}

@media (prefers-contrast: high) {
  [data-contrast-preference="auto"] {
    pre {
      border-width: 1px;
    }
  }
}
```

## But why bother?

I considered opening with justification for all this effort, but I wanted to show how little code was required for allowing users to select their colour and contrast preference.

Accessibility is important, and respecting users’ defaults whilst offering overrides (or in `prefers-contrast`’s situation, enabling proposed improvements) is a low-friction route to do so.

## Further considerations

Now that we’re respecting user’s preferences over contrast and colour scheme, why not explore [`prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion), [`prefers-reduced-transparency`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-transparency), or any of the other user preference media queries proposed in [Media Queries Level 5](https://www.w3.org/TR/mediaqueries-5/#mf-user-preferences).

There are two things to bare in mind:

1. Implementing every combination of every media query will likely lead to more code that is less maintainable
2. A lot of the Media Queries Level 5 features are still experimental – use them at your own risk!

## Final thoughts

For a full HTML example of the techniques described above, check out [this Gist]({{ global.github.branchUrl }}/gists/light-and-dark-mode-plus.html) (you can download, save it and then open the file locally in your browser with no extra steps needed). Keep in mind that there are lots of ways to neaten up the code; it is deliberately unabstracted to make it as easily understood as possible – you can see it abstracted a little and with some extra features (notably changing the `auto` label to include the user’s preference more obviously) within [the repository for this site]({{ global.github.branchUrl }}/src/_includes/layouts/base.njk). There’s also a more fully fleshed out implementation of CSS Custom Properties for colour schemes in there too.
