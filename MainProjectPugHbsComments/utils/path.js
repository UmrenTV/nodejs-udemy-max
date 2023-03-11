const path = require("path");

// module.exports = path.dirname(process.mainModule.filename);
module.exports = path.dirname(require.main.filename);
// This is easy utility that allows us to use the rootDir in our files instead of join(__dirname, "../") or something. This way we always start from the root directory of the project, so we don't have to add .. or ./ or . or antyhing like that.
// require.main.filename is basically asking where app.js is
