var 
  find_words = require('./find_words')
  fs = require('fs'),
  _ = require('lodash'),
  fieldPath = __dirname + '/field.txt'
  ;


function read() {
  var field = fs.readFileSync(fieldPath).toString();
  var lines = _.map(field.split('\n'), function (line) {
    return line.split(' ');
  });
  console.log('going to use field');
  console.log(lines);
  console.log(find_words(lines));
}

read();

fs.watchFile(fieldPath, {interval: 2000}, read);

// var sample = require('./sample_input');

// console.log(find_words(sample));