const currentYear = '2020';
const currentSeason = 'autumn';

const SEASONS_MAP = [
  'Winter',
  'Spring',
  'Summer',
  'Autumn',
];

const YEARS_MAP = {
  '2020': require('./now/2020.js'),
};

const order = Object.keys(YEARS_MAP).sort((a, b) => a < b ? 1 : -1);

const years = order.map((year, yearIndex) => {
  const { title } = YEARS_MAP[year];

  const seasons = SEASONS_MAP.reduce((acc, title) => {
    const slug = title.toLowerCase();

    const season = YEARS_MAP[year][slug];

    return [
      ...acc,
      {
        slug: `${year}-${slug}`,
        title,
        ...season,
        empty: !season,
        current: slug === currentSeason && year === currentYear,
      },
    ];
  }, []);

  return {
    year,
    title,
    seasons,
  };
});

module.exports = () => ({
  meta: {
    current: '2020-autumn',
    currentYear: '2020',
    currentSeason: 'autumn',
    seasons: {
      winter: {
        title: 'Winter',
      },
      spring: {
        title: 'Spring',
      },
      summer: {
        title: 'Summer',
      },
      autumn: {
        title: 'Autumn',
      },
    },
  },
  years,
});
