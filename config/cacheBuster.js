function cacheBuster(url) {
  return `${url}?${String(Date.now())}`;
}

module.exports = cacheBuster;