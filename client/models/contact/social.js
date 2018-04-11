'use strict';

// Models
import config from 'models/global/config';

const twitter = {
  name: `Twitter`,
  label: `Fueled on Twitter`,
  verb: `Follow`,
  url: `https://twitter.com/${config.social.twitter}`,
};

const facebook = {
  name: `Facebook`,
  label: `Fueled on Facebook`,
  verb: `Follow`,
  url: `https://www.facebook.com/${config.social.facebook}`,
};

export {
  twitter,
  facebook,
};
