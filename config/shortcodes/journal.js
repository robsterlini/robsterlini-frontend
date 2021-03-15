const formatDateFilter = require('./../filters/formatDate.js');

const journalEntry = (entry, titleTag, lead, showLink = true, showRss = false) => {
  if (!entry) return '';

  const {
    data: {
      title,
      description,
      descriptionHtml,
    } = {},
    date,
    link,
  } = entry;

  const descriptionComputed = descriptionHtml || description;

  const titleMarkup = lead ?
    `<${titleTag} class="${titleTag}">
      <span class="lead">${lead}</span>
      ${title}
    </${titleTag}>` :
    `<${titleTag} class="${titleTag}">${title}</${titleTag}>`;

  const descriptionMarkup = `<p><strong>${formatDateFilter(date)}</strong>${descriptionComputed ? `&ensp;${descriptionComputed}` : ``}</p>`;

  const linkMarkup = `<ul class="list--btns">
    <li>
      <a class="journal-first link--pseudo" ${link.htmlAttrs}>
        <span class="link__pseudo">Read the entry${link.domain ? ` on ${link.domain}` : ``}</span>
      </a>
    </li>
    ${showRss ? '<li><a href="/feed.xml">Follow the <span class="sc">RSS</span>&nbsp;feed</a></li>' : ''}
  </ul>`;

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
    <span class="link__pseudo">${title}</span><span class="regular">${inline ? ', posted on ' : ''} <span class="nowrap">${formatDateFilter(date)}</span></span></a>`;
};

module.exports = {
  journalEntry,
  journalEntryShort,
};
