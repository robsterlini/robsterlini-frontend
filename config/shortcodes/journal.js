const formatDateFilter = require('./../filters/formatDate.js');

const journalEntry = (entry, titleTag, lead, showLink = true) => {
  if (!entry) return '';

  const {
    data: {
      title,
      description,
    } = {},
    date,
    link,
  } = entry;

  const titleMarkup = lead ?
    `<${titleTag}>
      <span class="p lead">${lead}</span>
      <span class="${titleTag}">${title}</span>
    </${titleTag}>` :
    `<${titleTag} class="${titleTag}">${title}</${titleTag}>`;

  const descriptionMarkup = `<p><strong>${formatDateFilter(date)}</strong>${description ? ` ${description}` : ``}</p>`;

  const linkMarkup = `<p class="list__item">
    <a class="journal-first link--pseudo" ${link.htmlAttrs}>
      <span class="link__pseudo">Read the entry${link.domain ? ` on ${link.domain}` : ``}</span>${link.domain ? `<span class="accent">&#8239;&#8599;</span>` : ``}
    </a>
  </p>`

  return `${titleMarkup}${descriptionMarkup}${showLink ? linkMarkup : ''}`;
};

const journalEntryShort = (entry) => {
  if (!entry) return '';
  const {
    data: {
      title,
    },
    date,
    link,
  } = entry;

  return `<a class="link--pseudo" ${link.htmlAttrs}>
    <span class="link__pseudo">${title}</span>${link.domain ? '<span class="accent">&#8239;&#8599;</span>' : ''}
    <span class="regular nowrap">${formatDateFilter(date)}</span>
  </a>`;
};

module.exports = {
  journalEntry,
  journalEntryShort,
};
