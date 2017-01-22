function random(min=0, max=1) {
  var rand = Math.random() * (max - min) + min;
  return rand.toFixed(2);
}

function stats(attr, arr, defaults={}) {
  var {max=Math.min(), min=Math.max(), avg=1} = defaults;

  if(arr.length > 0){
    max = arr.reduce( (acc, cur) => Math.max(acc, cur[attr]), Math.max());
    min = arr.reduce( (acc, cur) => Math.min(acc, cur[attr]), Math.min());
    avg = arr.reduce( (acc, cur) => acc + cur[attr], 0) / arr.length;
  }

  return {max, min, avg};
}

// Returns the 'probability' that the point is like 'a' (the first number in rangeAB)
function probabilityA(point, rangeAB){
  var apDistance = Math.abs(rangeAB[0] - point),
    bpDistance = Math.abs(rangeAB[1] - point),
    sum = apDistance + bpDistance;

  return bpDistance / sum;
}

// ONLY for predicting a users favorite pet ('cat' or 'dog') given a users 'weight' and 'height'
const predictionAlgorithm = function(historicalData, userData) {
  var total = historicalData.length,
    likedCats = historicalData.filter((record) => record.cat === true),
    likedDogs = historicalData.filter((record) => record.dog === true);

  // Let's assume single event probability and equal attribute 'weight' so I can save some hours (days) worth of coding
  // Essentially I will just determine which average the current user's weight and height are closer to.

  // First let's compile the average stats for 'cat' vs 'dog' lovers
  var catLovers = {
    weight: stats("weight", likedCats),
    height: stats("height", likedCats)
  };

  var dogLovers = {
    weight: stats("weight", likedDogs),
    height: stats("height", likedDogs)
  }

  // The generated probability is based on 'cat' since it is the first element in the range (see: probabilityA)
  var weightProbability = probabilityA(userData.weight, [catLovers.weight.avg, dogLovers.weight.avg]),
    heightProbability = probabilityA(userData.height, [catLovers.height.avg, dogLovers.height.avg]),
    catProbability = (weightProbability + heightProbability) / 2;

  var percentile = random(),
    pick = percentile <= catProbability ? "cat" : "dog";

  console.debug("Prediction: ", percentile, catProbability, pick);
  return pick;
}
