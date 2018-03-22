// Read package config
const pkgConfig = require('./package.json');

module.exports = {
    source: {
        include: 'src'
    },
    sourceType: 'module',
    opts: {
        destination: 'docs/' + pkgConfig.version,
        recurse: true
    }
};
