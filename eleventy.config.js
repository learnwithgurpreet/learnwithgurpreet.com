const { getAllPosts, groupBy, tagList } = require('./config/collections/index.js');
const { imageShortcode, includeRaw, liteYoutube } = require('./config/shortcodes/index.js');
const {
  toISOString,
  formatDate,
  toAbsoluteUrl,
  stripHtml,
  minifyJs,
  splitlines
} = require('./config/filters/index.js');
const { slugifyString } = require('./config/utils/index.js');
const { svgToJpeg } = require('./config/events/index.js');

module.exports = async function (eleventyConfig) {
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`);

  eleventyConfig.addNunjucksAsyncShortcode('eleventyImage', imageShortcode);
  eleventyConfig.addCollection('posts', getAllPosts);
  eleventyConfig.addCollection('tagList', tagList);

  // 	---------------------  Custom filters -----------------------
  eleventyConfig.addFilter('toIsoString', toISOString);
  eleventyConfig.addFilter('formatDate', formatDate);
  eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);
  eleventyConfig.addFilter('stripHtml', stripHtml);
  eleventyConfig.addFilter('slugify', slugifyString);
  eleventyConfig.addFilter('splitlines', splitlines);
  eleventyConfig.addFilter(
    'groupByYear',
    groupBy(post => post.date.getFullYear())
  );

  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', svgToJpeg);
  }

  // 	--------------------- Passthrough File Copy -----------------------
  // same path
  ['src/assets/fonts/', 'src/assets/images/template', 'src/assets/images/blog', 'src/assets/og-images', 'src/vercel.json'].forEach(
    path => eleventyConfig.addPassthroughCopy(path)
  );

  // to root
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/'
  });

  return {
    // Pre-process *.md, *.html and global data files files with: (default: `liquid`)
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    // Optional (default is set): If your site deploys to a subdirectory, change `pathPrefix`, for example with with GitHub pages
    pathPrefix: '/',

    dir: {
      output: 'dist',
      input: 'src',
      data: '_data',
      includes: '_includes',
      layouts: '_layouts'
    }
  };
};
