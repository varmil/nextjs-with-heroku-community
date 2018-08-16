const fs = require('fs');
const path = require('path');
const _ = require('lodash');

// services配下にあるfileをexports登録
_.forEach(fs.readdirSync(__dirname), (filename) => {
  if (path.extname(filename) !== '.js' || filename === 'index.js' || filename === 'passports.js') {
    return;
  }
  const jsname = path.basename(filename, '.js');
  module.exports[jsname] = require(`./${filename}`);
});
