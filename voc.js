var _ = require('lodash'),
  fs = require('fs'),
  Iconv = require('iconv').Iconv
  ;

var words = fs.readFileSync(__dirname + '/voc.txt');

var iconv = new Iconv('CP1251', 'utf8');

var words = iconv.convert(words).toString().split('\n');

words = _.chain(words)
  .map(function (word) {
    return word.split('|')[0].toLowerCase();
  })
  .filter(function (word) {
    return word.match(/^[а-я]+$/i);
  })
  .unique()
  .value()
  ;

module.exports = words;