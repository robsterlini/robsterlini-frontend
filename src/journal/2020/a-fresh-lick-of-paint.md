---
title: A fresh lick of paint
date: 2020-06-11
description: Quarantine gave me back a bunch of commuting time; I put mine towards yoga and Eleventy… you are viewing the result!
layout: post
---

{% from "components/figure.html" import figure %}

*[CI/CD]: Continuous integration/continuous delivery

‘Painting the Forth Bridge’.

Turns out that, that task isn’t as endless as [we were lead to believe it was…](https://www.bbc.co.uk/news/uk-scotland-edinburgh-east-fife-14789036)

I’d like to lead a motion to replace it with __‘building a personal site’__.

With commits like `Hate it` from [October 2019](https://github.com/robsterlini/robsterlini-frontend/commit/2d0db80d96a1f5e5978c6a09a6e3e7e6b8a97878), and a PR simply named [`2018`](https://github.com/robsterlini/robsterlini-frontend/pull/1) getting merged at around the same time, it’s no surprise that these tasks take so long; but extra time at home gave me the opportunity to really strip it down and start afresh.

## Where to start

The problem I've faced in the past is getting ahead of myself and trying to solve too many problems at once so I set a few rules:

### 1. No designing in the browser!

{{ figure(
  [{
    "src": "journal/a-new-start/sketch.png",
    "alt": "A screenshot of the work-in-progress design in Sketch",
    "width": 1514,
    "height": 815
  }],
  caption="You can probably see which aspects were kept from this&nbsp;design."
) }}

Sometimes it works, but with something where I’m the designer, developer, product owner _et al_ I find that I get too bogged down in the details so best to stick to Sketch to begin with.

### 2. Keep it simple

Photos make things complicated. Icons never quite match up. Scroll-based triggers are a pain to get right. To get a <abbr class="sc" title="version 1">V1</abbr> of the new site live quickly, I pushed all of these to the back of my mind and just got the layout down.

The previous iteration had a `/work`, a `/life`, a `/contact`, custom `/404` and `/410` pages, among others. This one only needed one – the homepage. We can add more later when we have reusable components, styles _etc_, which brings me to tooling…

### 3. Forget about tooling

With a rough design down, and some potential typefaces chosen this would be the time to start agonising over creating a build pipeline, or which framework is the flavour of the month, or how to most efficiently serve the webfonts. Don’t get me wrong, they’re important… but not vital to getting a proof of concept up and running.

{{ figure(
  [{
    "src": "journal/a-new-start/v0.png",
    "alt": "A screenshot of the work-in-progress build deployed on Netlify Drop",
    "width": 1571,
    "height": 1067
  }],
  caption="I cannot stress how straightforward it is to get a site live on Netlify, either with the drag and drop of files, or with an actual build pipeline."
) }}

I created `~/Sites/robsterlini-2020/index.html` and just wrote classic HTML and timeless (inlined) CSS – shock, horror, it just worked! Within an hour or so I had a directory uploaded to [Netlify&nbsp;Drop](https://app.netlify.com/drop) and a testable and iterable [build](https://5ee125740fe15994a7992f3f--agitated-leavitt-bb4762.netlify.app/). It wasn’t clean, or extensible, but that wasn’t important.

### 4. Get it live!

After a few rounds of testing to iron out any kinks, and a friends and family test to make sure none of the words were misspelt (a couple were caught here) it was time to push it live. A personal site doesn’t have to be precious like a client build.

Let’s iterate on production!

There is no way to change from build pipeline to the drag and drop on Netlify for existing repositories, but that wasn’t an issue as the plan was always to get CI/CD working in the end. So, instead I faked it!

{{ figure(
  [{
    "src": "journal/a-new-start/netlify-vanilla.png",
    "alt": "A partial screenshot of my production settings in Netlify",
    "width": 419,
    "height": 428
  }],
  caption="Creating an automated deployment of static sites was a breeze!"
) }}

Here’s how it works:

1. Checked out a new branch `2020-vanilla`
1. Deleted __absolutely everything__ – this is a really cathartic exercise
1. Created a `public` directory and dumped the contents of `robsterlini-2020` into it
1. Set the __Production branch__ on my Netlify build to `2020-vanilla`
1. Pushed it all up
1. …
1. Profit!

Well… not profit, but a build from nothing live on [robsterlini.co.uk](/) in a few hours from nothing? I was pretty happy with that.

### 5. Tweet about it

To really test whether I was okay shipping something unfinished, I had to release it into the wild and there’s no accountability quite like Twitter:

{% tweet "1270833777997160448" %}

## Next steps…

In the days that followed I built a few extra features (you can see them pretty plainly as you are reading one right now):

1. Port it to Eleventy and switch the CSS up for Sass
1. <del>Reinstate the journal (maybe with _some_ of the old posts)</del>
1. Add better colour and contrast preferences
1. <del>Add load animations for a smoother first impression</del>
1. Add a sitemap
1. <del>Write a journal entry about starting afresh</del>

All being well, there will be a follow-up entry to this to detail finishing off the list above, and most likely a few other ideas I had a long the way.

I’d absolutely love it if you took a moment to let me know what you think about the new site [in a tweet](https://twitter.com/robsterlini) or any of the other social channels listed on [the homepage](/) – good or bad, I can take it!
