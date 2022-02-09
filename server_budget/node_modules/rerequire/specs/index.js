var rerequire = require('../index');

describe('rerequire', function () {

  it('can require a file without an extension', function () {
    var test_file = rerequire('./test_files/index');
  });

  it('can require an index file', function () {
    var test_file = rerequire('./test_files');
  });


  it('can require a file with an extension', function () {
    var test_file = rerequire('./test_files/index.js');
  });

  it('can mock mock module from nodes_modules', function () {

    var test_file = rerequire('./test_files/index', {
      'http': 'http mock'
    });

    test_file.http.should.eql('http mock');

  });

  it('can mock a local module', function () {

    var test_file = rerequire('./test_files/index', {
      './mod': 'mock mod'
    });

    test_file.mod.should.eql('mock mod');

  });

  it('can mock a global', function () {

    var test_file = rerequire('./test_files/index', {}, {
      'Date': 'mock date'
    });

    test_file.date.should.eql('mock date');

  });

  it('can combine modules and globals', function () {

    var test_file = rerequire('./test_files', {
      'http': 'http mock',
      './mod': 'mock mod',
    }, {
      'Date': 'mock date',
    });

    // Wrap result because it doesnt have should

    ({ test_file: test_file }).should.eql({
      test_file: {
        http: 'http mock',
        mod: 'mock mod',
        date: 'mock date',
      }
    });

  });

});
