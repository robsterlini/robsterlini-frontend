import axios from 'axios';

const envMap = {
  qa: `qa`,
  production: `prod`,
};

const env = envMap[process.env.NODE_ENV] || `dev`; // eslint-disable-line no-undef

const apiMap = {
  dev: `https://backend.popshop-dev.fueled.engineering/api`,
  qa: `https://backend.CHANGE_ME-qa.fueled.engineering/api`,
  prod: `https://backend.CHANGE_ME.com/api/`,
};

export const HTTP = axios.create({
  baseURL: apiMap[env],
  headers: {
    'Content-Type': `application/json`,
  },
});
