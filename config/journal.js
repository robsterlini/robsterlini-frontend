const getJournalLink = (entry, eleventyConfig) =>  {
  if (!entry) return {};

  let domain, htmlAttrs;

  let {
    url,
    data: { title },
  } = entry;

  const { external_url } = entry.data;

  title = `Read ‘${title || 'the entry'}’`;

  if (!external_url) {
    url = eleventyConfig.getFilter('url')(url);
  }

  else {
    url = external_url;
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
