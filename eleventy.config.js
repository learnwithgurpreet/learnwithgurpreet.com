const cheerio = require("cheerio");
const { getAllPosts, groupBy, tagList } = require('./config/collections/index.js');
const { imageShortcode } = require('./config/shortcodes/index.js');
const {
  toISOString,
  formatDate,
  toAbsoluteUrl,
  stripHtml,
  splitlines
} = require('./config/filters/index.js');
const { slugifyString } = require('./config/utils/index.js');
const { svgToJpeg } = require('./config/events/index.js');
const externalLinksPlugin = require("./config/utils/externalLinks.js");

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
  eleventyConfig.addPlugin(externalLinksPlugin);

  if (process.env.ELEVENTY_RUN_MODE === 'serve') {
    eleventyConfig.on('eleventy.after', svgToJpeg);
  }

  // 	--------------------- Passthrough File Copy -----------------------
  // same path
  ['src/assets/images/template', 'src/assets/images/blog', 'src/assets/og-images'].forEach(
    path => eleventyConfig.addPassthroughCopy(path)
  );

  // to root
  eleventyConfig.addPassthroughCopy({
    'src/assets/images/favicon/*': '/'
  });

  eleventyConfig.addTransform("content-heading-slugs", (content, outputPath) => {
    if (!outputPath || !outputPath.endsWith(".html")) return content;

    try {
      const $ = cheerio.load(content, { decodeEntities: false });

      // Only process headings inside the content area
      const $container = $("#post-content");
      if ($container.length === 0) {
        return $.html();
      }

      // Track all IDs in the document to ensure global uniqueness
      const used = new Set();
      $("[id]").each((_, el) => {
        const id = $(el).attr("id");
        if (id) used.add(id);
      });

      $container.find("h2, h3, h4, h5, h6").each((_, el) => {
        const $el = $(el);
        const existing = $el.attr("id");
        let idToUse;

        if (existing) {
          used.add(existing);
          idToUse = existing;
        } else {
          const base = slugifyString($el.text());
          if (!base) return;

          let slug = base;
          let i = 2;
          while (used.has(slug)) {
            slug = `${base}-${i++}`;
          }
          $el.attr("id", slug);
          used.add(slug);
          idToUse = slug;
        }

        // Wrap heading contents in a self-link when safe
        const hasDirectOnlyAnchor = $el.children("a").length === 1 && $el.contents().length === 1;
        const containsAnyAnchor = $el.find("a").length > 0;

        if (hasDirectOnlyAnchor) {
          const $a = $el.children("a").first();
          $a.attr("href", `#${idToUse}`);
        } else if (!containsAnyAnchor) {
          const inner = $el.html();
          const $a = $("<a></a>").attr("href", `#${idToUse}`).html(inner);
          $el.empty().append($a);
        }
      });

      return $.html();
    } catch (err) {
      console.warn("[content-heading-slugs] transform failed:", err && err.message ? err.message : err);
      return content; // Safe fallback
    }
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
