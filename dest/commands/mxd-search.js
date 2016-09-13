'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

module.exports = _ref => {
  let AssetsQuery = _ref.AssetsQuery;
  let heimdall = _ref.heimdall;
  let hostname = _ref.hostname;
  let pageSize = _ref.pageSize;
  return (() => {
    var _ref2 = _asyncToGenerator(function* (_ref3) {
      let args = _ref3.args;
      let reply = _ref3.reply;

      hostname = hostname || 'store.maxdome.de';
      const query = new AssetsQuery().filter('contentTypeSeriesOrMovies').filter('search', args).query('pageSize', pageSize);
      const assets = yield heimdall.getAssets(query);
      if (assets.length) {
        const texts = assets.map(function (asset) {
          return reply.link(`https://${ hostname }/${ asset.id }`, asset.title);
        });
        texts.push(reply.link(`https://${ hostname }/suche?search=${ encodeURIComponent(args) }`, 'show all...'));
        reply.send(texts);
      } else {
        reply.send(`no results found for "${ args }"`);
      }
    });

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  })();
};