if(typeof describe !== "undefined"){


describe('GroupData', function() {
  it("Takes data and 'groups' them together in sections based on the size of each section or the desired number of sections", function() {
    var data = [
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

    var heightGroup = [
      {
        indexRange: [0, 3],
        range: [0, 34],
        data: [
          {weight: 110, height: 10, cat: true, dog: false},
          {weight: 120, height: 20, cat: true, dog: false},
          {weight: 130, height: 30, cat: false, dog: true}
        ]
      },
      {
        indexRange: [3, 6],
        range: [34, 68],
        data: [
          {weight: 140, height: 40, cat: false, dog: true},
          {weight: 150, height: 50, cat: false, dog: true},
          {weight: 160, height: 60, cat: true, dog: false}
        ]
      },
      {
        indexRange: [6, -1],
        range: [68, 100],
        data: [
          {weight: 170, height: 70, cat: false, dog: true},
          {weight: 180, height: 80, cat: true, dog: false},
          {weight: 190, height: 90, cat: false, dog: true},
          {weight: 200, height: 100, cat: true, dog: false}
        ]
      }
    ];

    var weightGroup = [
      {
        indexRange: [-1, -1],
        range: [0, 50],
        data: []
      },
      {
        indexRange: [-1, -1],
        range: [50, 100],
        data: []
      },
      {
        indexRange: [0, 5],
        range: [100, 150],
        data: [
          {weight: 110, height: 10, cat: true, dog: false},
          {weight: 120, height: 20, cat: true, dog: false},
          {weight: 130, height: 30, cat: false, dog: true},
          {weight: 140, height: 40, cat: false, dog: true},
          {weight: 150, height: 50, cat: false, dog: true}
        ]
      },
      {
        indexRange: [5, -1],
        range: [150, 200],
        data: [
          {weight: 160, height: 60, cat: true, dog: false},
          {weight: 170, height: 70, cat: false, dog: true},
          {weight: 180, height: 80, cat: true, dog: false},
          {weight: 190, height: 90, cat: false, dog: true},
          {weight: 200, height: 100, cat: true, dog: false}
        ]
      }
    ];

    expect(dataHelpers.groupData(data, "height", null, 3)).toEqual(heightGroup);
    expect(dataHelpers.groupData(data, "weight", 50, null)).toEqual(weightGroup);
  });
});



describe('AnalyzeData', function() {
  it("Takes groups of data and generates the totals for each respective group (ex: cats, dogs, catsPredicted...)", function() {
    var data = [
      {weight: 200, height: 100, cat: true, dog: false, predicted: true},
      {weight: 190, height: 90, cat: false, dog: true, predicted: true},
      {weight: 180, height: 80, cat: true, dog: false, predicted: true},
      {weight: 170, height: 70, cat: false, dog: true, predicted: false},
      {weight: 160, height: 60, cat: true, dog: false, predicted: true},
      {weight: 150, height: 50, cat: false, dog: true, predicted: true},
      {weight: 140, height: 40, cat: false, dog: true, predicted: false},
      {weight: 130, height: 30, cat: false, dog: true, predicted: true},
      {weight: 120, height: 20, cat: true, dog: false, predicted: false},
      {weight: 110, height: 10, cat: true, dog: false, predicted: false}
    ];

    var analyzedGroup = {
      height: [
        {
          range: [0, 34],
          cats: 2,
          dogs: 1,
          catsPredicted: 0,
          dogsPredicted: 1
        },
        {
          range: [34, 68],
          cats: 1,
          dogs: 2,
          catsPredicted: 1,
          dogsPredicted: 1
        },
        {
          range: [68, 100],
          cats: 2,
          dogs: 2,
          catsPredicted: 2,
          dogsPredicted: 1
        }
      ],
      weight: [
        {
          range: [0, 67],
          cats: 0,
          dogs: 0,
          catsPredicted: 0,
          dogsPredicted: 0
        },
        {
          range: [67, 134],
          cats: 2,
          dogs: 1,
          catsPredicted: 0,
          dogsPredicted: 1
        },
        {
          range: [134, 200],
          cats: 3,
          dogs: 4,
          catsPredicted: 3,
          dogsPredicted: 2
        }
      ]
    };

    expect(dataHelpers.analyzeData(data, null, 3)).toEqual(analyzedGroup);
  });
});


}
