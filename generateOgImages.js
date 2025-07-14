// generate-og-images.js
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

module.exports = function (eleventyConfig) {
  eleventyConfig.on('eleventy.after', async ({ collections }) => {
    const posts = collections?.posts;
    if (!Array.isArray(posts)) {
      console.error('⚠️ Posts collection not found or empty');
      return;
    }

    const outDir = path.join('dist', 'og-images');
    fs.mkdirSync(outDir, { recursive: true });

    for (const post of posts) {
      const title = post.data.title || 'Untitled';
      const slug = post.fileSlug;

      const svg = `
        <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="white"/>
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="48" fill="black">
            ${title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}
          </text>
        </svg>`;

      const pngPath = path.join(outDir, `${slug}.png`);
      await sharp(Buffer.from(svg))
        .png()
        .toFile(pngPath);
    }

    console.log(`✅ Generated ${posts.length} OG images in ${outDir}`);
  });
};
