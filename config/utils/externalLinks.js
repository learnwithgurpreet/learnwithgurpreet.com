const { load } = require("cheerio");

module.exports = function externalLinksPlugin(eleventyConfig) {
  eleventyConfig.addTransform("external-links", function (content) {
    if (!this.page.outputPath?.endsWith(".html")) {
      return content;
    }

    const $ = load(content, null, false);

    $("a[href]").each(function () {
      const link = $(this);
      const href = link.attr("href");

      if (
        !href ||
        href.startsWith("/") ||
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      ) {
        return;
      }

      try {
        const url = new URL(href);

        if (
          url.hostname === "learnwithgurpreet.com" ||
          url.hostname === "www.learnwithgurpreet.com"
        ) {
          return;
        }

        url.searchParams.set(
          "utm_source",
          "learnwithgurpreet.com"
        );

        link.attr("href", url.toString());
        link.attr("target", "_blank");
        link.attr("rel", "noopener noreferrer");
      } catch {
        // Ignore malformed/non-http links
      }
    });

    return $.html();
  });
};