const formatDate = date => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-GB', options).format(date);
};

module.exports = formatDate;
