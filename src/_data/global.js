const baseUrl = 'robsterlini.co.uk';

const LINKS = {
  about: {
    link: '/about',
    label: 'About',
    nav: 'about',
  },
  contact: {
    link: '/#contact',
    label: 'Contact',
  },
  cv: {
    link: '/curriculum-vitae',
    label: '<abbr title="Curriculum Vitae">CV</abbr>',
    nav: 'cv',
  },
  journal: {
    link: '/journal',
    label: 'Latest',
    nav: 'journal',
  },
  journalPast: {
    link: '/journal/past',
    label: 'Past entries',
    nav: 'journalPast',
  },
  now: {
    link: '/now',
    label: 'Now',
    nav: 'now',
  },
  projects: {
    label: 'Projects',
  },
  archive: {
    label: 'Archive',
    link: '/archive',
  },
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
  social: {
    twitter: 'robsterlini',
    instagram: 'robsterlini',
    strava: 'https://www.strava.com/athletes/6578573',
  },
  links: LINKS,
  nav: [
    {
      title: 'Rob Sterlini',
      link: '/',
      links: [
        LINKS.about,
        LINKS.now,
        LINKS.contact,
      ],
    },
    {
      title: 'Work',
      links: [
        LINKS.projects,
        LINKS.cv,
      ],
    },
    {
      title: 'Journal',
      links: [
        LINKS.journal,
        LINKS.journalPast,
      ],
    },
  ],
  footer: [
    LINKS.contact,
    LINKS.about,
    LINKS.now,
    {
      ...LINKS.journal,
      label: 'Journal'
    },
    LINKS.cv,
    LINKS.archive,
  ],
});
