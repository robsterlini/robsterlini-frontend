const baseUrl = 'robsterlini.co.uk';

module.exports = () => ({
  url: `https://${baseUrl}`,
  name: 'Rob Sterlini',
  email: `hi@${baseUrl}`,
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
  ],
});
