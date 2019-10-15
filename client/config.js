const config = {
  name: `Rob Sterlini-Aitchison`,
  rootUrl: `https://robsterlini.co.uk`,
  logoUrl: `https://robsterlini.co.uk/assets/images/logo.png`,
  social: {
    twitter: `robsterlini`,
  },
  meta: {
    separator: ` • `,
  },
  transitionDuration: 300,
};

const envMap = {
  qa: `qa`,
  production: `prod`,
  development: `dev`,
};

const env = envMap[process.env.NODE_ENV] || `dev`; // eslint-disable-line no-undef

export default {
  ...config,
  env,
};
