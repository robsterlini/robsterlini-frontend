'use strict';

export const getLinkType = (link) => {
  let type = `router-link`;

  if (!link) {
    type = `button`;
  } else if (/^((f|ht)tps?:\/\/|mailto:)/i.test(link)) {
    type = `a`;
  } else if (typeof(link) === `string` && link.charAt(0) === `#`) {
    type = `anchor`;
  }

  return type;
};


export const getLinkTag = (link) => {
  const linkType = getLinkType(link);

  return linkType === `anchor` ? `a` : linkType;
};


export const createLinkProps = (link, label = ``, title = ``) => {
  const linkType = getLinkType(link);

  const isEmail = /^mailto:/i.test(link);
  let titleSuffix = ``;

  if (linkType === `a`) {
    titleSuffix = `(opens ${isEmail ? `native email client` : `in new tab`})`;
  }

  if (linkType === `anchor`) {
    titleSuffix = `(scrolls to ${link})`;
  }

  if (!title) {
    title = `${label}${label && titleSuffix ? ` ` : ``}${titleSuffix}`;
  }

  const props = {
    title: title || false,
  };

  if (linkType === `a` || linkType === `anchor`) {
    props.href = link;
  }

  if (linkType === `a` && !isEmail) {
    props.target = `_blank`;
  }

  if (linkType === `router-link`) {
    props.to = link.name ? link : { name: link };
  }

  return props;
};
