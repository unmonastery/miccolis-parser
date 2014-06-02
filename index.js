var csvjson = require('csvjson');
var _ = require('lodash');

var lineIds = ['1', '2', '3', '4', '5', '6A', '6B', '7', '8', '9', '10', '11', '12', '13', '14', '15'];

var data = {};

function tidyUp(lineData){
  var result;

  // remove rows with no stop
  result = _.reject(lineData, function(obj){ return obj.id === ''; });

  return result;
}

var matrix = {};

_.each(lineIds, function(lineId){
  data[lineId] = tidyUp(csvjson.toObject('./data/simplified-for-export - MT'+ lineId + '.csv').output);
  _.each(data[lineId], function(row){
    if(!matrix[row.id]){
      matrix[row.id] = [];
    }
    matrix[row.id].push(lineId);
  });
});

_.forOwn(matrix, function(val, key){
  console.log(key, _.uniq(val));
});
