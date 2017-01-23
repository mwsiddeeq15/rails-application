// Namespace/Accessor
const predictionHelpers = {};

predictionHelpers.random = function(min=0, max=1) {
  var rand = Math.random() * (max - min) + min;
  return rand.toFixed(2);
}

predictionHelpers.stats = function(attr, arr, defaults={}) {
  var {max=Math.max(), min=Math.min(), avg=1} = defaults;

  if(arr.length > 0){
    max = arr.reduce( (acc, cur) => Math.max(acc, cur[attr]), Math.max());
    min = arr.reduce( (acc, cur) => Math.min(acc, cur[attr]), Math.min());
    avg = arr.reduce( (acc, cur) => acc + cur[attr], 0) / arr.length;
  }

  return {max, min, avg};
}

predictionHelpers.crunchData = function(historicalData) {
  var likedCats = historicalData.filter((record) => record.cat === true),
    likedDogs = historicalData.filter((record) => record.dog === true);

  return {
    catLovers: {
      weight: predictionHelpers.stats("weight", likedCats),
      height: predictionHelpers.stats("height", likedCats)
    },
    dogLovers: {
      weight: predictionHelpers.stats("weight", likedDogs),
      height: predictionHelpers.stats("height", likedDogs)
    }
  };
}

// Returns the 'probability' that the point is like 'a' (the first number in rangeAB)
predictionHelpers.probabilityA = function(point, rangeAB, padding=1.05){
  var apDistance = Math.abs(rangeAB[0] - point),
    bpDistance = Math.abs(rangeAB[1] - point),
    sum = apDistance + bpDistance;

  return bpDistance / (sum*padding);//Make it impossible for anything to be certain
}

// TODO:: should evolve to take any number of 'probabilities' w/ their respected weight
predictionHelpers.weightedProbability = function(probA, probB){
  return (probA + probB) / 2;
}

// ONLY for predicting a users favorite pet ('cat' or 'dog') given a users 'weight' and 'height'
predictionHelpers.predictionAlgorithm = function(historicalData, userData) {
  // Let's assume single event probability and equal attribute 'weight' so I can save some hours (days) worth of coding
  // Essentially I will just determine which average the current user's weight and height are closer to.

  // First let's crunch the data
  var data = predictionHelpers.crunchData(historicalData);

  // The generated probability is based on 'cat' since it is the first element in the range (see: probabilityA)
  var weightProbability = predictionHelpers.probabilityA(userData.weight, [data.catLovers.weight.avg, data.dogLovers.weight.avg]),
    heightProbability = predictionHelpers.probabilityA(userData.height, [data.catLovers.height.avg, data.dogLovers.height.avg]),
    catProbability = predictionHelpers.weightedProbability(weightProbability, heightProbability);

  var percentile = predictionHelpers.random(),
    pick = percentile <= catProbability ? "cat" : "dog";

  console.debug("Prediction: ", percentile, catProbability, pick);
  return pick;
}
