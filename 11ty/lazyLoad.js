const { JSDOM } = require("jsdom");

function lazyImages(eleventyConfig, userOptions = {}) {
  const options = {
    name: "lazy-images",
    ...userOptions,
  };

  eleventyConfig.addTransform(options.extensions, (content, outputPath) => {
    if (outputPath.endsWith(".html")) {
      const dom = new JSDOM(content);
      const document = dom.window.document;

      const [...images] = document.querySelectorAll("article img");
      images.forEach((img) => {
        img.setAttribute("loading", "lazy");
      });
      return "<!DOCTYPE html> \n" + document.documentElement.outerHTML;
    }
    return content;
  });
}

module.exports = lazyImages;
