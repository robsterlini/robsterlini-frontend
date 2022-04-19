const global = require('./global.js')();
const links = global.links;
const social = global.social;

console.log(links);

module.exports = () => ({
  '301': {
    '/life': links.home.link,
    '/about': links.home.link,
    '/cv': links.work.link,
    '/resume': links.work.link,
    '/curriculum-vitae': links.work.link,
    '/site-history': links.archive.link,
    '/journal': links.archive.link,
    '/journal/archive': links.archive.link,
    '/journal/past': links.archive.link,
    '/journal/dev': links.archive.link,
    '/journal/typography': links.archive.link,
    '/journal/type': links.archive.link,
    '/journal/life': links.archive.link,
    '/fundraising': social.justgiving,
    '/triathlon': '/2015/triathlete'
  },
  '410': [
    '/now'
  ],
  journal: {
    '301': {
      '/parkrun-changed-my-life/': '/2016/parkrun-changed-my-life/',
      '/triathlete/': '/2015/triathlete/',
      '/triathlon': '/2015/triathlete',
      '/opentype-and-selection-dont-mix/': '/2014/opentype-and-selection-dont-mix/',
      '/three-months-at-fueled': '/2013/three-months-at-fueled',
      '/2020/a-new-start': '/2020/a-fresh-lick-of-paint',
    },
    '410': [
      '/good-bye-reading',
      '/new-stuff',
      '/the-best-city',
      '/the-london-triathon',
    ],
  },
});
