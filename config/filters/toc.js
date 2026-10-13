const cheerio = require('cheerio');
const { slugifyString } = require('../utils/index.js');

/**
 * Generate Table of Contents from HTML content
 * @param {string} content - HTML content
 * @returns {string} - TOC HTML
 */
function generateTOC(content) {
  if (!content || typeof content !== 'string') {
    return '';
  }

  try {
    const $ = cheerio.load(content, {
      decodeEntities: false,
      xmlMode: false
    });

    const headings = [];

    // Find all h2 headings
    $('h2').each((_, el) => {
      const $el = $(el);
      const level = parseInt(el.name.substring(1)); // Get number from h2, h3, etc.
      let text = $el.text().trim();

      // Remove the # anchor symbol if present
      text = text.replace(/\s*#\s*$/, '');

      // Get or generate ID
      let id = $el.attr('id');
      if (!id) {
        id = slugifyString(text);
      }

      if (text && id) {
        headings.push({ level, text, id });
      }
    });

    // If no headings found, return empty
    if (headings.length === 0) {
      return '';
    }

    // Build nested TOC
    let tocHtml = '<nav class="toc" aria-labelledby="table-of-contents"><h2 id="table-of-contents">Table of Contents</h2><ol>';
    let currentLevel = 2;

    headings.forEach((heading, index) => {
      const { level, text, id } = heading;

      if (level > currentLevel) {
        // Open nested list
        for (let i = currentLevel; i < level; i++) {
          tocHtml += '<ol>';
        }
      } else if (level < currentLevel) {
        // Close nested lists
        for (let i = level; i < currentLevel; i++) {
          tocHtml += '</ol></li>';
        }
      } else if (index > 0) {
        // Same level, close previous item
        tocHtml += '</li>';
      }

      tocHtml += `<li><a href="#${id}">${text}</a>`;
      currentLevel = level;
    });

    // Close remaining open tags
    for (let i = 2; i < currentLevel; i++) {
      tocHtml += '</ol></li>';
    }
    tocHtml += '</li></ol></nav>';

    return tocHtml;
  } catch (err) {
    console.warn('[TOC] Failed to generate table of contents:', err.message);
    return '';
  }
}

module.exports = generateTOC;
