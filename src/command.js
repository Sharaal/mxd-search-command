const AssetsQuery = require('mxd-heimdall').AssetsQuery;

module.exports = ({ heimdall, pageSize }) => async ({ args, reply }) => {
  const query = (new AssetsQuery())
    .filter('contentTypeSeriesOrMovies')
    .filter('search', args)
    .query('pageSize', pageSize);
  const assets = await heimdall.getAssets(query);
  if (assets.length) {
    const texts = assets.map(asset => reply.link(`https://store.maxdome.de/${asset.id}`, asset.title));
    texts.push(reply.link(`https://store.maxdome.de/suche?search=${encodeURIComponent(args)}`, 'show all...'));
    reply.send(texts);
  } else {
    reply.send(`no results found for "${args}"`);
  }
};
