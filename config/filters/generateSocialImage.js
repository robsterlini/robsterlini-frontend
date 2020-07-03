const generateSocialImage = ({ header, title }) => {
  const cloudinaryEncode = (text = '') => {
    const unencodedText = `${text}`
      .replace(/&amp;/g, '%26')
      .replace(/\,/g, '%2C');

    return encodeURIComponent(unencodedText);
  };

  const imageProps = [
    'w_1440',
    'h_720',
    'q_100',
  ];

  const headerProps = [
    'w_800',
    'h_86',
    'c_fit',
    'y_160',
    'x_195',
    'g_north_west',
    'co_rgb:EEE7E7',
    `l_text:rs-b-600.otf_56_bold_left_:${cloudinaryEncode(header)}`,
  ];

  const titleProps = [
    'w_1200',
    'h_420',
    'y_280',
    'x_110',
    'c_fit',
    'g_north_west',
    'co_rgb:F75C6A',
    `l_text:rs-h-700.otf_90_bold_left_line_spacing_20_:${cloudinaryEncode(title)}`,
  ];

  return [
    'https://res.cloudinary.com/dym2d96h6/image/upload',
    imageProps.join(','),
    headerProps.join(','),
    titleProps.join(','),
    'v1592751314/robsterlini/meta.png',
  ].join('/');
};

module.exports = generateSocialImage;