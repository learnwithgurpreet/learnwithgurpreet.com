/** All blog posts as a collection. */
const getAllPosts = collection => {
  const posts = collection.getFilteredByGlob('./src/posts/**/*.md');
  return posts.reverse();
};

/** All markdown files as a collection for sitemap.xml */
const onlyMarkdown = collection => {
  return collection.getFilteredByGlob('./src/**/*.md');
};

/* All blog posts by in groupBy manner */
const groupBy = transformer => {
  return function (arr) {
    const grouped = {};
    arr.forEach(a => {
      const _key = transformer(a);
      if (grouped[_key]) grouped[_key].push(a);
      else grouped[_key] = [a];
    });

    return Object.entries(grouped);
  };
};

/** All tags from all posts as a collection. */
const tagList = collection => {
  const tagsSet = new Set();
  collection.getAll().forEach(item => {
    if (!item.data.tags) return;
    item.data.tags
      .filter(tag => !['posts', 'all'].includes(tag))
      .forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
};

module.exports = {
  getAllPosts,
  onlyMarkdown,
  tagList,
  groupBy
};
