const AssetsQuery = require('mxd-heimdall').AssetsQuery;

module.exports = ({ heimdall }) => async ({ args, reply }) => {
  const query = (new AssetsQuery())
      .filter('contentTypeSeriesOrMovies')
      .filter('search', args);
  const assets = await heimdall(query);
  if (assets.length) {
    const texts = assets.map(asset => reply.link(`https://store.maxdome.de/${asset.id}`, asset.title));
    texts.push(reply.link(`https://store.maxdome.de/suche?search=${args}`, 'show all...'));
    reply.send(texts);
  } else {
    reply.send(`no results found for "${args}"`);
  }
};
