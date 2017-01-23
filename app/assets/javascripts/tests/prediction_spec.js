if(typeof describe !== "undefined"){


describe('Stats: {Min, Max, Avg}', function() {
  it("Takes and array or data and returns min,max,avg of a property", function() {
    var arr = [
      { value1: 5, value2: 2 },
      { value1: 3, value2: 3 },
      { value1: 7, value2: 4 },
      { value1: 5, value2: 1 },
      { value1: 4, value2: 3 },
      { value1: 6, value2: 2 }
    ]
    expect(predictionHelpers.stats("value1", arr)).toEqual({max: 7, min: 3, avg: 5});
    expect(predictionHelpers.stats("value2", arr)).toEqual({max: 4, min: 1, avg: 2.5});
    expect(predictionHelpers.stats("value2", [])).toEqual({max: -Infinity, min: Infinity, avg: 1});
  });
});

describe('ProbabilityA', function() {
  it("Takes a value (v) and a range ([a,b]), and returns a decimal [0-1] that serves as the probability or factor of how close 'v' is to 'a'", function() {
    expect(predictionHelpers.probabilityA(5, [0,10]).toFixed(2)).toBe((.5/1.05).toFixed(2));
    expect(predictionHelpers.probabilityA(2, [0,10], 1.15).toFixed(2)).toBe((.8/1.15).toFixed(2));
    expect(predictionHelpers.probabilityA(9, [0,10], 2).toFixed(2)).toBe((.1/2).toFixed(2));
  });
});

describe('WeightedProbability', function() {
  it("Takes multiple 'weighted' probabilities and generates a single probability", function() {
    expect(predictionHelpers.weightedProbability(1, 1)).toBe(1);
    expect(predictionHelpers.weightedProbability(.5, 1)).toBe(.75);
  });
});

describe('CrunchData', function() {
  it("Takes historical data and 'crunches' it into a format that is useful", function() {
    var historicalData = [
      {weight: 200, height: 100, cat: true, dog: false},
      {weight: 190, height: 90, cat: false, dog: true},
      {weight: 180, height: 80, cat: true, dog: false},
      {weight: 170, height: 70, cat: false, dog: true},
      {weight: 160, height: 60, cat: true, dog: false},
      {weight: 150, height: 50, cat: false, dog: true},
      {weight: 140, height: 40, cat: false, dog: true},
      {weight: 130, height: 30, cat: false, dog: true},
      {weight: 120, height: 20, cat: true, dog: false},
      {weight: 110, height: 10, cat: true, dog: false}
    ];

    var crunchedData = {
      catLovers: {
        weight: {max: 200, min: 110, avg: 154},
        height: {max: 100, min: 10, avg: 54}
      },
      dogLovers: {
        weight: {max: 190, min: 130, avg: 156},
        height: {max: 90, min: 30, avg: 56}
      }
    };

    expect(predictionHelpers.crunchData(historicalData)).toEqual(crunchedData);
  });
});

// The actual predictionAlgorithm is not 'exactly' testable since it depends on a random number,
// testing the probability functions assures that predictionAlgorithm  should run as expected (with correct probabilities)


}
