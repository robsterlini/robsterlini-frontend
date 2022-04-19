const global = require('./global.js')();
const links = global.links;
const social = global.social;

module.exports = () => ({
  '301': {
    '/life': links.home,
    '/about': links.home,
    '/cv': links.work,
    '/resume': links.work,
    '/curriculum-vitae': links.work,
    '/site-history': links.archive,
    '/journal': links.archive,
    '/journal/archive': links.archive,
    '/journal/past': links.archive,
    '/journal/dev': links.archive,
    '/journal/typography': links.archive,
    '/journal/type': links.archive,
    '/journal/life': links.archive,
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
