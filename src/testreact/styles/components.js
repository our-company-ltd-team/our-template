var exports = {};
function requireAll(r) { r.keys().forEach((p) => exports[p] = r(p)); }
requireAll(require.context('./../components/', true, /\.less$/i));

module.exports = exports;