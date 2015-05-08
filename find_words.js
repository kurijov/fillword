var _ = require('lodash');

var inputIntoGraph = require('./input_into_graph');
console.log('read vocabulary...');
var vocabulary = require('./voc');
console.log('vocabulary ready...');

module.exports = function (sample) {

  // var sample = require('./sample_input');

  var events = new (require('events').EventEmitter);
  var graph = inputIntoGraph(sample);

  function process (nodes, words) {
    // console.log(_.pluck(nodes, 'title'));
    if (words.length === 0) {
      return ;
    }

    var partialWord = _.pluck(nodes, 'title').join('');

    var wordsThatMightFeet = _.filter(words, function (word) {
      return word.indexOf(partialWord) === 0;
    });

    _.each(wordsThatMightFeet, function (word, index) {
      if (word === partialWord) {
        events.emit('word', word);
        wordsThatMightFeet.splice(index, 1);
      }
    });

    var lastNode = nodes[nodes.length - 1];

    // var edges = graph.outboundEdges(lastNode);
    var nextNodes = _.chain(graph.outboundEdges(lastNode))
      .map(function (edge) {
        return graph.getNode(edge.to);
      })
      .reject(function (node) {
        return nodes.indexOf(node) > -1;
      })
      .value()
      ;


    _.each(nextNodes, function (node) {
      process(nodes.concat([node]), wordsThatMightFeet);
    });

  }

  var foundItems = [];

  events.on('word', function (found) {
    // console.log('found', found);
    foundItems.push(found)
  });

  for(i = 0; i <= 4; i++) {
    for (j = 0; j <= 4; j++) {
      var node = graph.getNode(i + '_' + j);
      process([node], vocabulary);
    }
  }

  var filteredItems = _.chain(foundItems)
    .unique()
    .reject(function (word) {
      return word.length <= 3;
    })
    .sort(function (a, b) {
      return b.length - a.length;
    })
    .reverse()
    .value()
    ;

  return filteredItems;
}

