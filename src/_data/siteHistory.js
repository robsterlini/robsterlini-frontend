const years = {
  '2020': {
    title: 'Turn it up to\xa0Eleventy!',
    link: '/journal/2020/a-fresh-lick-of-paint/',
    label: 'Read the write-up',
    stack: 'Eleventy',
    type: 'P22 Mackinac, Clone Rounded',
    image: 'site-history/2020.png',
  },
  '2019': {
    title: 'Dev, triathlete, master builder&nbsp;<abbr title="version 2" class="sc">V2</abbr>',
    description: '<abbr title="Version 2" class="sc">V2</abbr> swapped the Freight family for Grad, and added a <a href="https://2019.robsterlini.co.uk/life" target="_blank" noopener>life</a>\xa0page. It also ditched the random colour in favour of a dark/light mode taken from the user’s <abbr title="operating system">OS</abbr> preferences, and removed the finicky hover states for the home <code>h1 > span</code>s.',
    link: 'https://2019.robsterlini.co.uk',
    label: '2019.robsterlini.co.uk',
    stack: 'Vue',
    type: 'Grad, Clone Rounded',
    image: 'site-history/2019.jpg',
  },
  '2018': {
    title: 'Dev, triathlete, master builder&nbsp;<abbr title="version 1" class="sc">V1</abbr>',
    link: 'https://2018.robsterlini.co.uk',
    label: '2018.robsterlini.co.uk',
    stack: 'Vue',
    type: 'Freight Text & Sans, Clone Rounded',
    image: 'site-history/2018.jpg',
  },
  '2017': {
    title: 'Implementing a baseline grid',
    link: 'https://2017.robsterlini.co.uk',
    label: '2017.robsterlini.co.uk',
    type: 'Skolar',
    stack: 'Middleman (Ruby)',
    image: 'site-history/2017.jpg',
  },
  '2015': {
    title: 'A year of the triathlons',
    description: '2015 was the year I really dived into the world of triathlon and my site was updated to match that. I was fundraising at the time, so had an ever-present banner to try and drum up extra donations. I’d begun to play with parallax at Fueled, so subtly introduced it into the large images that I’d added to the site.',
    stack: 'Middleman (Ruby)',
    type: 'Skolar',
    link: 'https://2015.robsterlini.co.uk',
    label: '2015.robsterlini.co.uk',
    image: 'site-history/2015.png',
  },
  '2014': {
    title: 'The detail mattered',
    description: 'Except it didn’t really! This one looks to have been left unfinished – lots of 404s, no <code>&lt;title&gt;</code> or <code>&lt;description&gt;</code> tags to be seen…',
    stack: 'Gulp',
    type: 'Skolar',
    link: 'https://2014.robsterlini.co.uk',
    label: '2014.robsterlini.co.uk',
    image: 'site-history/2014.png',
  },
};

module.exports = () => ({
  order: Object.keys(years).sort((a, b) => a < b ? 1 : -1),
  years,
});
