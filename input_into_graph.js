var Graph = require('node-graph');
var _ = require('lodash');


module.exports = function (sample) {
  var nodes = [];
  var edges = [];

  _.each(sample, function (firstRow, indexI) {

    _.each(firstRow, function (letter, indexJ) {

      var currentNodeName = indexI + '_' + indexJ;

      nodes.push({
        name: currentNodeName,
        title: letter
      });

      for (i = indexI - 1; i <= indexI + 1; i++) {
        for (j = indexJ - 1; j <= indexJ + 1; j++) {
          if (sample[i] && sample[i][j]) {
            var toNodeName = i + '_' + j;

            if (currentNodeName != toNodeName) {

              edges.push({
                name: currentNodeName + '->' + toNodeName,
                from: currentNodeName,
                to: toNodeName
              });

            }

            
          }
        }
      }

    });

  });

  var structure = {
    nodes: nodes,
    edges: edges
  }
   
  return new Graph(structure);
};