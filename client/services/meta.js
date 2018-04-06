'use strict';

function createMeta(meta) {
  /*
    ** TO ADD **
    - <html> language/locale
    - Canonical
    - Next
    - Prev
    - og:image:width
    - og:image:height
    */

  const array = [];
  const legend = [
    // Standard
    {
      name: `description`,
      value: `description`,
    }, {
      name: `generator`,
      value: `generator`,
    },

    // Facebook (og)
    {
      property: `og:title`,
      value: `title`,
    }, {
      property: `og:description`,
      value: `description`,
    }, {
      property: `og:locale`,
      value: `locale`,
    }, {
      property: `og:url`,
      value: `url`,
    }, {
      property: `og:type`,
      value: `type`,
    }, {
      property: `og:site_name`,
      value: `company`,
    }, {
      property: `og:image`,
      value: `image`,
    }, {
      property: `og:image:secure_url`,
      value: `image`,
    },

    // Twitter
    {
      name: `twitter:title`,
      value: `title`,
    }, {
      name: `twitter:description`,
      value: `description`,
    }, {
      name: `twitter:site`,
      value: `twitterHandle`,
    }, {
      name: `twitter:card`,
      value: `twitterCard`,
    }, {
      name: `twitter:image`,
      value: `image`,
    }, {
      name: `twitter:label1`,
      value: `labelOne`,
    }, {
      name: `twitter:data1`,
      value: `dataOne`,
    }, {
      name: `twitter:label2`,
      value: `labelTwo`,
    }, {
      name: `twitter:data2`,
      value: `dataTwo`,
    },
  ];

  for (let i = 0; i < legend.length; i++) {
    const key = legend[i];
    const metaItem = {};
    const name = key.name || key.property;
    const content = meta[key.value];

    if (content) {
      metaItem.vmid = name;
      metaItem[key.name ? `name` : `property`] = name;
      metaItem.content = meta[key.value];

      array.push(metaItem);
    }
  }

  const isProd = window.FUELED_ENV === `production`;
  const noFollow = !isProd || meta.noFollow === true;
  const noIndex = !isProd || meta.noIndex === true;

  array.push({
    vmid: `index`,
    name: `robots`,
    content: `${noIndex ? `no` : ``}index, ${noFollow ? `no` : ``}follow`,
  });

  return array;
}

export { createMeta };
