// TODO:: There are redundancies between this and the prediction_algorithm code, simplify!!
// TODO:: Much data funtionality can be abstracted out into a dedicated object (ex: new HistoricalData())

// Namespace/Accessor
const dataHelpers = {};

// Put data into groups so I can chart the statistics
dataHelpers.groupData = function(data, attr, delta, sections) {
  var data = data.sort((a,b) => a[attr] - b[attr]),
    grouped = [];

  if(data.length){
    var max = data[data.length-1][attr];

    delta = Math.ceil(delta || max/sections);
    sections = Math.ceil(sections || max/delta);

    // lastIndex
    for(var i=0; i<sections; i++){
      var lastGroup = i > 0 ? grouped[i-1] : {range:[0,0], indexRange: [0,0]};
      var begin = i > 0 ? lastGroup.range[1] : 0;
      var end = begin + delta;
      var beginIndex = _.findIndex(data, (d) => d[attr] >= begin && d[attr] < end);
      beginIndex = beginIndex > -1 ? Math.max(beginIndex, lastGroup.indexRange[1]) : -1; // 3. Let index stay -1 if none found BUT if found ensure no 'overlap'
      var endIndex = beginIndex > -1 ? _.findIndex(data, (d) => d[attr] > end, beginIndex) : beginIndex;
      var slice = beginIndex > -1 ? ( endIndex > -1 ? data.slice(beginIndex, endIndex) : data.slice(beginIndex) ) : [];

      grouped.push({
        indexRange: [beginIndex, endIndex], // 2. Now I must rely on indexes for precision (seems better anyway)
        range: [begin, Math.min(end, max)], // 1. Cap range at 'max'
        data: slice
      });
    }
  }

  return grouped;
},

// Compile data and return 'grouped' data with statistics
dataHelpers.analyzeData = function(data, delta, sections) {
  var groupedData = {
    height: dataHelpers.groupData(data, "height", delta, sections),
    weight: dataHelpers.groupData(data, "weight", delta, sections)
  };

  var analysis = {
    height: [],
    weight: []
  };

  for(attr in analysis){
    let attrGroup = groupedData[attr],
      analysisGroup = analysis[attr];

    for(var i=0; i<attrGroup.length; i++){
      let section = attrGroup[i],
        cats = section.data.filter((record) => record.cat === true),
        dogs = section.data.filter((record) => record.dog === true),
        catsPredicted = cats.filter((record) => record.predicted === true),
        dogsPredicted = dogs.filter((record) => record.predicted === true);

      analysisGroup.push({
        // indexes: section.indexes, ///////////////
        range: section.range,
        cats: cats.length,
        dogs: dogs.length,
        catsPredicted: catsPredicted.length,
        dogsPredicted: dogsPredicted.length
      });
    }
  }

  return analysis;
}
