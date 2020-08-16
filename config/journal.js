const getJournalLink = (entry, eleventyConfig) =>  {
  if (!entry) return {};

  let domain, htmlAttrs;

  let {
    url,
    data: { title },
  } = entry;

  const { externalUrl } = entry.data;

  title = `Read ‘${title || 'the entry'}’`;

  if (!externalUrl) {
    url = eleventyConfig.getFilter('url')(url);
  }

  else {
    url = externalUrl;
    domain = url.match(/^(?:https?:)?(?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/)[1];
    title += ` on ${domain}`;
  }

  htmlAttrs = `href="${url}" title="${title}"`;

  if (domain) {
    htmlAttrs += ' target="_blank" rel="noopener"';
  }

  return {
    domain,
    url,
    title,
    htmlAttrs,
  };
};

module.exports = {
  getJournalLink,
};
