const formatDateFilter = require("./../filters/formatDate.js");

const journalEntry = (entry, titleClass, titleTag, lead, showLink = true) => {
  if (!entry || !entry.data) return "";

  const { data, date, link } = entry;
  const { title, description, descriptionHtml } = data;

  let descriptionText = "";
  if (descriptionHtml || description) {
    descriptionText = `&ensp;${descriptionHtml || description}`;
  }

  const formattedDate = formatDateFilter(date);

  const leadMarkup = lead ? `<span class="lead">${lead}</span>` : "";
  const titleMarkup = `<${titleTag} class="${titleClass}">${leadMarkup}${title}</${titleTag}>`;
  const descriptionMarkup = `<p><strong>${formattedDate}</strong>${descriptionText}</p>`;

  let linkMarkup = "";

  if (showLink) {
    linkMarkup = `<ul class="list--btns">
      <li>
        <a ${link.htmlAttrs}>
          Read the entry${link.domain ? ` on ${link.domain}` : ``}
        </a>
      </li>
    </ul>`;
  }

  return `${titleMarkup}${descriptionMarkup}${linkMarkup}`;
};

const journalEntryShort = (entry) => {
  if (!entry || !entry.data) return "";

  const { data, date, link } = entry;

  return `<a class="link--pseudo link--external" ${link.htmlAttrs}>
    <span class="link__pseudo">${data.title}</span>
    <span class="sr-only">Posted on</span>
    <span class="regular nowrap">${formatDateFilter(date)}</span>
  </a>`;
};

module.exports = {
  journalEntry,
  journalEntryShort,
};
