const baseUrl = 'robsterlini.co.uk';

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
  nav: [
    {
      title: 'Rob Sterlini',
      link: '/',
      links: [
        {
          link: '/about',
          label: 'About',
          nav: 'about',
        },
        {
          link: '/now',
          label: 'Now',
          nav: 'now',
        },
        {
          link: '/#contact',
          label: 'Contact',
        }
      ],
    },
    {
      title: 'Work',
      links: [
        {
          label: 'Projects',
        },
        {
          link: '/curriculum-vitae',
          label: '<abbr title="Curriculum Vitae">CV</abbr>',
          nav: 'cv',
        },
      ],
    },
    {
      title: 'Journal',
      links: [
        {
          link: '/journal',
          label: 'Latest',
          nav: 'journal',
        },
        {
          link: '/journal/archive',
          label: 'Archive',
          nav: 'archive',
        },
      ],
    },

    // {
    //   link: '/journal',
    //   label: 'Journal',
    //   // nav: 'journal',
    // },
    // {
    //   link: '/#contact',
    //   label: 'Contact',
    // },
  ],
});
