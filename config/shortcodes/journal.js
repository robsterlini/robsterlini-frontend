const formatDateFilter = require('./../filters/formatDate.js');

const journalEntry = (entry, titleTag, lead, showLink = true) => {
  if (!entry) return '';

  const {
    data: {
      title,
      description,
      tags = [],
    } = {},
    date,
    link,
  } = entry;

  const titleMarkup = lead ?
    `<${titleTag}>
      <span class="p lead block">${lead}</span>
      <span class="${titleTag}">${title}</span>
    </${titleTag}>` :
    `<${titleTag} class="${titleTag}">${title}</${titleTag}>`;

  let tagsMarkup;

  if (tags.length) {
    tagsMarkup = ' ';
    tags.forEach((tag, index) => {
      tagsMarkup += `${index > 0 ? ', ' : ''}<a href="/journal/${tag}/">#${tag}</a>`;
    });
  }

  const descriptionMarkup = `<p><strong>${formatDateFilter(date)}</strong>${description ? `&ensp;${description}` : ``}${tagsMarkup}</p>`;

  const linkMarkup = `<p class="list__item">
    <a class="journal-first link--pseudo" ${link.htmlAttrs}>
      <span class="link__pseudo">Read the entry${link.domain ? ` on ${link.domain}` : ``}</span>
    </a>
  </p>`

  return `${titleMarkup}${descriptionMarkup}${showLink ? linkMarkup : ''}`;
};

const journalEntryShort = (entry, inline = false) => {
  if (!entry) return '';
  const {
    data: {
      title,
    },
    date,
    link,
  } = entry;

  return `<a class="link--pseudo link--external" ${link.htmlAttrs}>
    <span class="link__pseudo">${title}</span><span class="regular">${inline ? ', posted on ' : ''}<span class="nowrap${!inline ? ' block' : ''}">${formatDateFilter(date)}</span></span></a>`;
};

module.exports = {
  journalEntry,
  journalEntryShort,
};
