---
title: The right tool for the wrong person
date: 2020-12-20
description: Revisiting some old projects has left me wondering whether we choose the right tools for the wrong people, and how to avoid overcomplicating the beautiful simplicity of HTML and CSS.
tlDr: Not all projects need complicated tooling; updating a few old projects has made it clear that in some circumstances they make it more challenging for maintainers, and could/need to be greatly simplified.
layout: post
---

*[CI/CD]: Continuous integration/continuous delivery
*[ETL]: Eat The Lemon
*[PTA]: Permission To Appeal
*[JS]: JavaScript
*[FTP]: File Transfer Protocol
*[SSG]: Static Site Generator
*[SSGs]: Static Site Generators
*[CMS]: Content Management System
*[UX]: User Experience
*[TL;DR]: Too Long, didn’t read

So much of development these days is about selecting the right tool for the job at hand.

As developers we put a great deal of energy into deciding which stack to go with – frameworks, bundlers, preprocessors, CI/CD tools, and more. Frankly it's exhausting, but often we settle on a setup that we like and stick with it for a bit until perhaps something more streamlined (or more likely just a bit glitzier) comes along to distract us from actually building the damn site.

Whilst I was at home over Christmas (as a single person household I bubbled with my folks long before new tiers were added in London; no need to notify the blonde buffoon), my dad asked me whether I could lend a hand updating a few of the band websites I’ve made for him over the years.

There were three requests:

1. Add a few links and a new album to [eatthelemon.co.uk](http://eatthelemon.co.uk)
1. Add two videos to [permissiontoappeal.co.uk](https://permissiontoappeal.co.uk)
1. Create a new one-pager for him to upload the music he made through lockdown

There was also a long-standing desire to facilitate making changes more easily to PTA, but we’ll come back to that.

## The requests

### Eat The Lemon

Firstly, if you’ve never listened to Eat The Lemon, you’re missing out. If you’re on Spotify, why not [pop them on in the background](https://open.spotify.com/artist/6Z3MDlhPolDOsTTCTPstHS?si=UpcHDjSiQ76BXRUKMiTCSA) while you read this journal entry?

In 2017 they released [Rumblestrips](https://open.spotify.com/album/0SjF8KGK0akceIjurTVbTp?si=uPk9rxjWQvOEBJN7B_fBBA) which needed to be added to their online discography, with an accompanying page with sound clips and the like.

If I were building this site now – using modern tooling – I’d expect to have some sort of data model with the album information (title, tracklist _etc_) combined with a templating framework that would be used to generate the pages in question, and would also create the list of links to each album that is present on the individual pages.

No such luck here.

This site was one of the first I built, with code originating back nearly a decade. This predates my knowledge of compilers (and some compilers themselves), and so exists as a series of `.html` and `.css` files (there’s no JS at all).

Using the existing pages and markup, I created `.html` file for the new record and then set about adding the links to each of the existing album pages one at a time; with only eight to change this took little time at all. Once updated, I whizzed the files through an FTP client and onto the web.

While updating a handful of pages wasn’t ideal, it was quick and painless. The second request to add a Spotify link to the side nav, though, did not fill me with joy… My gut told me to port the site over to Eleventy (my SSG of choice), convert the pages into templates and only update it one place. My head told me that, that approach would be 10&times;longer (if not more) than just painfully changing all 43 pages.

So, rueing my lack of knowledge and the lack of early 2010s framework technology, I changed them all. Granted, I was able to use a find-and-replace for a number of them, but the inconsistencies in those pages from years of manual changes meant that a few slipped through the cracks, and some subpages needed image path adjustments, so all in all it took a good chunk of time.

### Permission To Appeal

The second request to add a few videos to the PTA site was, on the face of it, a much more straightforward request – two YouTube embeds and a section title change.

This project has a repo, a framework that underpins it, Scss using the BEM methodology for consistent class names. Ideal, right?

Well this repo was from 2015 – back when Middleman was my flavour of the month for SSGs, but hasn’t been a part of my regular tooling for a long time so it meant running the Homebrew update gauntlet. Thankfuly past-Rob was surprisingly kind and took the guess work out, having documented `middleman server` as the necessary command to run the project locally.

```
➜ permission-to-appeal git:(add-videos) middleman server
Could not find json-1.8.3 in any of the sources
Run `bundle install` to install missing gems.
```

Gotcha, `bundle install` it is…

```
make failed, exit code 2

Gem files will remain installed in
/Users/rob/.rvm/gems/ruby-2.4.1/gems/json-1.8.3 for inspection.
Results logged to
/Users/rob/.rvm/gems/ruby-2.4.1/extensions/x86_64-darwin-18/2.4.0/json-1.8.3/gem_make.out

An error occurred while installing json (1.8.3), and Bundler cannot
continue.
Make sure that `gem install json -v '1.8.3'` succeeds before bundling.

In Gemfile:
  middleman was resolved to 3.3.12, which depends on
    middleman-sprockets was resolved to 3.4.2, which depends on
      middleman-core was resolved to 3.3.12, which depends on
        padrino-helpers was resolved to 0.12.5, which depends on
          padrino-support was resolved to 0.12.5, which depends on
            activesupport was resolved to 4.1.10, which depends on
              json
```

Okay, so `gem install json -v '1.8.3'` then?

```
make failed, exit code 2

Gem files will remain installed in /Users/rob/.rvm/gems/ruby-2.4.1/gems/json-1.8.3 for inspection.
Results logged to /Users/rob/.rvm/gems/ruby-2.4.1/extensions/x86_64-darwin-18/2.4.0/json-1.8.3/gem_make.out
```

Errr, right… What now?

I haven’t troubleshot Ruby gems in a long time, and to be totally honest, was never super sure that I understood how any of it worked back when I was using it more frequently.

Again my mind turned to moving it to Eleventy. This one was at least already in templates. I’d only have to convert the Ruby syntax to Nunjucks, but even that still felt too much, so I set about trying to find a fix. Turns out it was just `bundle update` I needed, but that took a while of trawling GitHub issues and StackOverflow questions and left me feeling mighty frustrated.

I made the title change to the YAML file which automatically updated the `id` and title of the section and the label of the link in the nav – thank you data-driven site generation, and added the videos with minimal issues.

## The right tools…

Having spent the better part of an afternoon updating these two websites, I began thinking about a CMS for PTA. I wasn’t confident that the Middleman version in use had any easy way of collecting data from an external service, so without moving the site to a modern framework or updating to the latest version of MM that left a client-side content collection approach, which for a static one-page website felt like a huge regression in UX for the sake of a small improvement in the content owner’s experience.

While thinking about that conundrum I moved the site to Netlify for automated deployments and easy SSL certificate management, I realised that the time required to set up and maintain any CMS (again) hugely dwarfed just making changes where necessary. Netlify enables me to make a change on the fly, and with one push the site is updated. As annoying as little requests like this can be, it’s far more palatable than maintaining and integrating a CMS into a very small website.

On paper, content from a Contentful CMS that is compiled by Eleventy feels like a great solution, but in reality it vastly overcomplicates the simple task of updating and maintaining HTML and CSS for these specific usecases.

For ETL I was frustrated by the lack of templating that led to repetitive changes across a multitude of files, and for PTA I was annoyed by the time wasted troubleshooting a 5 year old Middleman set up to add what amounted to 3 lines of HTML to a site that is literally only one `.html` file!

## …for the wrong person

All of this was put sharply into focus when my dad asked if we could add another album to ETL, and whether I could show him how to do it so he could maintain these pages himself in the future.

ETL is static HTML with no build steps, no dependencies, no externalities, nothing. My dad is a smart man, but he isn’t a developer; even so I still felt confident with giving him the keys to his own website and showing him the methods for keeping it updated as he saw fit.

He asked if the same was possible of the PTA site, and I had to say no. The MM build means that it isn’t possible. It will be faster for me to make changes when he needs them, than it would be helping troubleshoot some niche Ruby error in his terminal over FaceTime in six months time.

Still satisfied that he could at least make changes to ETL, he wrote down the instructions I gave him. I found out later that he’d created a PDF with screenshots and arrows to the buttons to click in the FTP client – turning the steps I gave him into a reusable format that he himself would undertand; and he has since made several updates without asking me how to do any of them. For me that’s a success!

By day, at Fueled, we build enterprise-grade web apps with thousands of lines of code, complex routes, and content that comes from a variety of build- and runtime sources; but here these are straightforward, static sites that don’t need to be weighed down by the complexity of compilation steps.

---

With all this in mind, I intend to do three things:

Firstly, create a user-friendly build of PTA with unminified CSS and HTML to allow my dad to take ownership of updates on his site – a template-based build for this is overkill and prevents him from getting timely content updates.

Secondly, for his music side project, I want to set up a bare-bones HTML file with a rough, reusable structure and then work with him to build it so that he can have total ownership and control of the whole site. Netlify drop means that he doesn’t have to faff around with an FTP at all for this, and doesn’t risk losing all of his work with some accidental overwrite.

And lastly, to be a bit more considerate to the maintainer (and more aware of the time I am able to dedicate to assisting in the maintenance) of any small sites like this I built to ensure that I'm not grossly overcomplicating the generation of HTML and CSS that are fundamentally very straightforward to maintain (not to be confused with easy.

**There is great skill in writing HTML and CSS, and 100% constitute programming, don’t @ me).**
