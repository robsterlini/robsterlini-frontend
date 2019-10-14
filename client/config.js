const config = {
  name: `Fueled`,
  rootUrl: `https://fueled.com`,
  logoUrl: `https://fueled.com/assets/images/logo.png`,
  social: {
    twitter: `fueled`,
    facebook: `Fueled`,
  },
  meta: {
    separator: ` • `,
  },
  transitionDuration: 300,
};

const apiMap = {
  dev: `https://backend.popshop-dev.fueled.engineering/api`,
  qa: `https://backend.CHANGE_ME-dev.fueled.engineering/api`,
  prod: `https://backend.CHANGE_ME.com/api/`,
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
  api: apiMap[env],
};
