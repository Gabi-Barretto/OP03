const path = require('path');

const getFallbackMimeType = (fileName) => {
  const extension = path.extname(fileName).toLowerCase();
  switch (extension) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    default:
      return 'application/octet-stream';
  }
};

module.exports = { getFallbackMimeType };
