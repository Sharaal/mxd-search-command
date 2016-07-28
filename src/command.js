const AssetsQuery = require('mxd-heimdall').AssetsQuery;

module.exports = ({ heimdall }) => async ({ args, reply }) => {
  const query = (new AssetsQuery())
      .filter('contentTypeSeriesOrMovies')
      .filter('search', args);
  const assets = await heimdall(query);
  if (assets.length) {
    const lines = assets.map(asset => reply.link(`https://store.maxdome.de/${asset.id}`, asset.title));
    lines.push(reply.link(`https://store.maxdome.de/suche?search=${args}`, 'show all...'));
    reply.send(lines);
  } else {
    reply.send(`no results found for "${args}"`);
  }
};
