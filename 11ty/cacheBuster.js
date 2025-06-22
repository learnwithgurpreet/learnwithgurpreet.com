function cacheBuster(url = "") {
  var string = new Date().getTime();
  return (url ? `${url}?v=${string}` : string);
}

module.exports = cacheBuster;
