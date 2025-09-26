const stripTags = require("striptags");

function extractExcerpt(content) {
  let excerpt = null;
  excerpt = stripTags(content)
    .substring(0, 200) // Cap at 200 characters
    .replace(/^\s+|\s+$|\s+(?=\s)/g, "")
    .replace(/\r?\n|\r/g, " ")
    .trim()
    .concat("...");
  return excerpt;
}

module.exports = extractExcerpt;
