const { DateTime } = require("luxon");
const StripTags = require("./11ty/stripTags");
const GroupBy = require("./11ty/groupBy");
const LazyImages = require("./11ty/lazyLoad");
const CleanCSS = require("clean-css");

const pluginRss = require("@11ty/eleventy-plugin-rss");
const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginNavigation = require("@11ty/eleventy-navigation");
const cacheBuster = require("./11ty/cacheBuster");
const htmlMinify = require("./11ty/htmlMinify");
const {slugifyString} = require("./11ty/utils");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({
    "./src/site.webmanifest": "site.webmanifest",
    "./node_modules/chart.js/dist/chart.umd.js": "assets/js/chart.umd.js",
    "./node_modules/chart.js/dist/chart.umd.js.map":
      "assets/js/chart.umd.js.map",
  });

  // Add plugins
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(LazyImages, {});
  eleventyConfig.addPlugin(htmlMinify);

  eleventyConfig.addFilter("cacheBuster", cacheBuster);
  eleventyConfig.addFilter("slugify", slugifyString);
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd MMMM yyyy"
    );
  });
  eleventyConfig.addFilter(
    "readtime",
    (str) => `${Math.ceil(str.split(" ").length / 200)} min read`
  );

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if (!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
    );
  }

  eleventyConfig.addFilter("filterTagList", filterTagList);
  eleventyConfig.addFilter(
    "groupByYear",
    GroupBy((post) => post.date.getFullYear())
  );
  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAll().forEach((item) => {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    });

    return filterTagList([...tagSet]);
  });

  eleventyConfig.addFilter("postByTag", (array, tag) => {
    return array.filter((p) => {
      return p.data && p.data.tags && p.data.tags.includes(tag);
    });
  });

  eleventyConfig.addFilter("excerpt", (content) => StripTags(content));

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  return {
    // Control which files Eleventy will process
    // e.g.: *.md, *.njk, *.html, *.liquid
    templateFormats: ["md", "njk", "html", "liquid"],

    // Pre-process *.md files with: (default: `liquid`)
    markdownTemplateEngine: "njk",

    // Pre-process *.html files with: (default: `liquid`)
    htmlTemplateEngine: "njk",

    // Optional (default is shown)
    pathPrefix: "/",
    // -----------------------------------------------------------------

    // These are all optional (defaults are shown):
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
  };
};
