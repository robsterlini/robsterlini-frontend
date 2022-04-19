const baseUrl = 'robsterlini.co.uk';

const SOCIAL = {
  twitter: 'robsterlini',
  instagram: 'robsterlini',
  strava: 'https://www.strava.com/athletes/6578573',
  justgiving: "https://www.justgiving.com/fundraising/robsterlini",
};

const LINKS = {
  home: {
    link: '/',
    label: 'Home',
  },
  about: {
    link: '/about',
    label: 'About',
    nav: 'about',
  },
  contact: {
    link: '/contact',
    label: 'Contact',
    nav: 'contact',
  },
  work: {
    link: '/work',
    label: 'Work',
    nav: 'work',
  },
  // journal: {
  //   link: '/journal',
  //   label: 'Journal',
  //   nav: 'journal',
  // },
  // now: {
  //   link: '/now',
  //   label: 'Now',
  //   nav: 'now',
  // },
  archive: {
    label: 'Archive',
    link: '/archive',
  },
  cv: {
    abbr: 'CV',
    link: '/cv',
    download: true,
    label: 'Curriculum Vitae',
  },
  colophon: {
    label: 'Colophon',
    link: 'https://github.com/robsterlini/robsterlini-frontend',
  },
  donate: {
    label: 'Donate',
    link: '/fundraising',
    external: true
  }
};

const {
  HEAD: envBranch = 'master',
} = process.env || {};

module.exports = () => ({
  url: `https://${baseUrl}`,
  name: 'Rob Sterlini',
  email: `hi@${baseUrl}`,
  github: {
    branchUrl: `https://github.com/robsterlini/robsterlini-frontend/blob/${envBranch}`,
  },
  social: SOCIAL,
  links: LINKS,
  nav: [
    LINKS.work,
    LINKS.contact,
  ],
  footer: [
    LINKS.work,
    // LINKS.journal,
    LINKS.contact,
    // LINKS.cv,
    // LINKS.now,
    LINKS.archive,
    LINKS.donate,
    LINKS.colophon,
  ],
});
