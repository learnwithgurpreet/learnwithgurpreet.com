const fs = require("fs");
const path = require("path");
const postcss = require("postcss");
const tailwindcss = require("@tailwindcss/postcss");
const cssnano = require("cssnano");
const markdownItAnchor = require("markdown-it-anchor");
const pluginTOC = require("eleventy-plugin-toc");
const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");
const sharp = require('sharp');

const { getAllPosts, tagList } = require("./11ty/collections/index");
const markdownItAnchorOptions = require("./11ty/markItAnchor");
const generateOgImages = require('./generateOgImages.js');

// const StripTags = require("./11ty/stripTags");
// const GroupBy = require("./11ty/groupBy");
// const LazyImages = require("./11ty/lazyLoad");
// const CleanCSS = require("clean-css");

// const pluginRss = require("@11ty/eleventy-plugin-rss");
// const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
// const pluginNavigation = require("@11ty/eleventy-navigation");
// const cacheBuster = require("./11ty/cacheBuster");
// const htmlMinify = require("./11ty/htmlMinify");
// const {slugifyString} = require("./11ty/utils");

let cachedPosts = [];

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");

  const processor = postcss([tailwindcss(), cssnano()]);

  eleventyConfig.on("eleventy.before", async () => {
    const inPath = "./src/css/tailwind.css";
    const outPath = "./dist/css/output.css";
    const css = fs.readFileSync(inPath, "utf-8");
    const result = await processor.process(css, { from: inPath, to: outPath });
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, result.css);
  });

  eleventyConfig.addPlugin(pluginTOC, { "tags": ["h2", "h3"], "wrapper": "nav", "wrapperClass": "content-toc" });

  // Collections
  // eleventyConfig.addCollection("posts", getAllPosts);
  eleventyConfig.addCollection('posts', (collectionApi) => {
    const posts = getAllPosts(collectionApi);
    cachedPosts = posts; // cache it
    return posts;
  });
  eleventyConfig.addCollection("tagList", tagList);

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });


  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd MMMM yyyy"
    );
  });

  // // Add plugins
  eleventyConfig.on('eleventy.after', async () => {
    if (!Array.isArray(cachedPosts) || cachedPosts.length === 0) {
      console.error('⚠️ Posts collection not found or empty');
      return;
    }

    const outDir = 'dist/og-images';
    fs.mkdirSync(outDir, { recursive: true });

    for (const post of cachedPosts) {
      const title = post.data.title || 'Untitled';
      const slug = post.fileSlug;
      const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="200" height="200" patternUnits="userSpaceOnUse">
      <path d="M 200 0 V 200 H 0" fill="none" stroke="#e5e5e5" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="100%" height="100%" fill="#ffffff"/>
  <rect width="100%" height="100%" fill="url(#grid)" opacity="0.5"/>
  <text x="50%" y="50%"
    dominant-baseline="middle"
    text-anchor="middle"
    font-size="60"
    font-family="sans-serif"
    fill="#333333">
    ${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
  </text>
</svg>`;

      await sharp(Buffer.from(svg)).png().toFile(`${outDir}/${slug}.png`);
    }

    console.log(`✅ Generated ${cachedPosts.length} OG images`);
  });

  // eleventyConfig.addPlugin(pluginRss);
  // eleventyConfig.addPlugin(pluginSyntaxHighlight);
  // eleventyConfig.addPlugin(pluginNavigation);
  // eleventyConfig.addPlugin(LazyImages, {});
  // eleventyConfig.addPlugin(htmlMinify);
  eleventyConfig.setLibrary(
    "md",
    markdownIt({
      html: true,
      breaks: true,
      linkify: true,
    }).use(markdownItAnchor, markdownItAnchorOptions)
  );

  // eleventyConfig.addFilter("cacheBuster", cacheBuster);
  // eleventyConfig.addFilter("slugify", slugifyString);
  // eleventyConfig.addFilter(
  //   "readtime",
  //   (str) => `${Math.ceil(str.split(" ").length / 200)} min read`
  // );

  // // Get the first `n` elements of a collection.
  // eleventyConfig.addFilter("head", (array, n) => {
  //   if (!Array.isArray(array) || array.length === 0) {
  //     return [];
  //   }
  //   if (n < 0) {
  //     return array.slice(n);
  //   }

  //   return array.slice(0, n);
  // });

  // // Return the smallest number argument
  // eleventyConfig.addFilter("min", (...numbers) => {
  //   return Math.min.apply(null, numbers);
  // });

  function filterTagList(tags) {
    return (tags || []).filter(
      (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
    );
  }

  eleventyConfig.addFilter("filterTagList", filterTagList);
  // eleventyConfig.addFilter(
  //   "groupByYear",
  //   GroupBy((post) => post.date.getFullYear())
  // );
  // eleventyConfig.addCollection("tagList", function (collection) {
  //   let tagSet = new Set();
  //   collection.getAll().forEach((item) => {
  //     (item.data.tags || []).forEach((tag) => tagSet.add(tag));
  //   });

  //   return filterTagList([...tagSet]);
  // });

  // eleventyConfig.addFilter("postByTag", (array, tag) => {
  //   return array.filter((p) => {
  //     return p.data && p.data.tags && p.data.tags.includes(tag);
  //   });
  // });

  // eleventyConfig.addFilter("excerpt", (content) => StripTags(content));

  // eleventyConfig.addFilter("cssmin", function (code) {
  //   return new CleanCSS({}).minify(code).styles;
  // });

  return {
    // Pre-process *.md, *.html and global data files files with: (default: `liquid`)
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "dist",
    },
  };
};
