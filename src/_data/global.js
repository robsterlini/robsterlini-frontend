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
  },
  nav: [
    {
      link: '/journal',
      label: 'Journal',
      nav: 'journal',
    },
    {
      link: '/#contact',
      label: 'Contact',
    },
    {
      link: '/curriculum-vitae',
      label: '<abbr title="Curriculum Vitae">CV</abbr>',
      nav: 'cv',
    },
    {
      link: '/now',
      label: 'Now',
      nav: 'now',
    }
  ],
});
