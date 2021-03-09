---
title: Better CSS strikethroughs
date: 2021-03-09
description: "A quick tip to control the seemingly uncontrollable text-decoration: line-through."
descriptionHtml: "A quick tip to control the seemingly uncontrollable <code>text&#8209;decoration: line&#8209;through</code>."
layout: post
tlDr: "Use <code>text-underline-offset</code> and <code>@supports</code> to progressively enhance finer control over your strikethroughs – <a href=\"#the-complete-solution\">see the code</a>."
changes:
  - date: 2021-03-09
    changes:
      - "Added the caveat about <code>text-decoration-color</code> compromise; thanks to <a href=\"https://twitter.com/dannievinther/status/1369314893908836353\">@dannievinther</a>"
      - "Moved the <code>@support</code> wrapper outside of del to be valid CSS rather than Scss; thanks to <a href=\"https://twitter.com/PaulJMorel/status/1369323083149025280\">@PaulJMorel</a>."
---

Text decoration has been around since CSS Level 1, and it works.

More recently the introduction of `text-decoration-` modifying properties have allowed a greater control over the line, but there are still limitations…

## The problem

I ran into this while trying to get a more aesthetic position for the strikethrough on my journal post about [redesigning this site](/journal/2020/a-fresh-lick-of-paint/#next-steps):

The default position was too high.

{% figureFull
  "journal/better-css-strikethroughs/before.png",
  "533x222",
  "A screenshot showing the unbalanced strikethrough with the default text-decoration value",
  "This doesn’t actually cross the text out because it sits at 50% of the cap-height, not 50% of the x&#8209;height."
%}

You might ask why this matters, but these fine details are what stand in the way of something looking truly polished (not perfect mind you), so I set about fixing it!

I knew that there was an offset property for text decoration, so I tried `text-decoration-offset` only to find out that **only underlines could have an offset**… go figure.

Frustrated – but not beaten – I considered that `text-decoration: line-through` is basically an underline, but positioned in the middle. Could I fake a strikethrough using an offset underline?

```css
del {
  text-decoration: underline;
  /* -0.33em was the value (notice relative units to ensure that it scales as the
     parent `font-size` scales) needed for Clone Rounded, but for other webfonts this
     will need to be tinkered with slightly to get the right positioning. */
  text-underline-offset: -0.33em;
}
```

{% figureFull
  "journal/better-css-strikethroughs/during.png",
  "534x222",
  "A screenshot showing the obscured line-through",
  "The line is now correctly positioned, but the ink-skip means that it isn’t behaving as we would want it to."
%}

## The complete solution

The ink-skip issue is fixed by adding `text-decoration-skip-ink: none;`.

While `text-underline-offset` is reasonably [well supported](https://developer.mozilla.org/en-US/docs/Web/CSS/text-underline-offset#browser_compatibility), it is still new and can be wrapped in a `@supports` condition to be sure that any browsers that don’t support it fall back to `text-decoration: line-through`.

```css
del {
  text-decoration: line-through;
}

@supports(text-underline-offset: 1em) {
  del
    text-decoration: underline;
    text-underline-offset: -0.33em;
    text-decoration-skip-ink: none;
  }
}
```

{% figureFull
  ["journal/better-css-strikethroughs/before.png", "journal/better-css-strikethroughs/after.png"],
  ["533x222", "544x219"],
  ["A screenshot showing the unbalanced strikethrough with the default text-decoration value", "A screenshot showing the properly aligned strikethrough"],
  "Before and after… Great success!"
%}

## Caveats

Sadly this comes at a compromise. As the underline is rendered behind the text, using `text-decoration-color` no longer has the desired effect. Until we get something like `text-decoration-offset` we have to choose one or the other.
