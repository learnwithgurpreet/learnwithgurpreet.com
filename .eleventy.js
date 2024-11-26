const cacheBuster = require('./config/cacheBuster');

// module import shortcodes
const {imageShortcode} = require('./config/shortcodes/index.js');

// module import filters
const {
  toISOString,
  formatDate
} = require('./config/filters/index.js');

// module import collections
const {getAllPosts, groupBy} = require('./config/collections/index.js');
const {onlyMarkdown} = require('./config/collections/index.js');
const {tagList} = require('./config/collections/index.js');

module.exports = function(eleventyConfig){

  // 	---------------------  Custom filters -------------------------
  eleventyConfig.addFilter('cacheBuster', cacheBuster);
  eleventyConfig.addFilter('toIsoString', toISOString);
  eleventyConfig.addFilter('formatDate', formatDate);


  // 	--------------------- Custom collections -----------------------
  eleventyConfig.addCollection('posts', getAllPosts);
  eleventyConfig.addCollection('onlyMarkdown', onlyMarkdown);
  eleventyConfig.addCollection('tagList', tagList);

  // 	--------------------- Custom shortcodes ------------------------
  eleventyConfig.addNunjucksAsyncShortcode('eleventyImage', imageShortcode);

  // to root
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/'
  });

  return {
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    pathPrefix: '/',

    dir: {
      input: "src",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
}