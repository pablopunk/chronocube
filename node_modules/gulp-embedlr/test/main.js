var fs = require('fs');
var es = require('event-stream');
var assert = require('assert');
var gutil = require('gulp-util');
var gulp = require('gulp');
var embedlr = require('../');
var Stream = require('stream');
var rimraf = require('rimraf');

describe('gulp-embedlr', function () {

  it('should not touch empty files', function(done) {
    var srcFile = new gutil.File({
      path: __dirname + '/fixtures/hello.html',
      contents: null
    });

    var s = embedlr();

    var n = 0;
    s.pipe(es.through(function(file) {
      assert.equal(file.path, srcFile.path);
      assert.equal(file.contents, null);
      n++;
    }, function(){
      assert.equal(n, 1);
      done();
    }));

    s.write(srcFile);
    s.end();
  });

  it('should let non-html files pass through', function(done) {

    var s = embedlr();
    s.pipe(es.through(function(file) {
      assert.equal(file.path,'style.css');
      assert.equal(file.contents.toString('utf-8'), 'somecontent');
    }, function() {
        done();
    }));
    s.write(new gutil.File({
      path: 'style.css',
      contents: new Buffer('somecontent')
    }));
    s.end();

  });

  describe('in stream mode', function() {
    it('should produce the correct output with default options', function(done) {
      var srcFile = new gutil.File({
        path: 'test/fixtures/hello.html',
        contents: fs.createReadStream('test/fixtures/hello.html')
      });

      gulp.src(__dirname + '/fixtures/hello.html', {buffer: false})
        .pipe(embedlr()).on('data', function(file) {
          assert.equal(file.isStream(), true);

          file.pipe(es.wait(function(err, data) {
            assert.equal(err, undefined);
            assert.equal(
              data,
              fs.readFileSync(__dirname + '/expected/hello.html', 'utf8')
            );
            done();
          }));
        });

    });

    it('should produce the correct output with port option set', function(done) {
      var srcFile = new gutil.File({
        path: 'test/fixtures/hello.html',
        contents: fs.createReadStream('test/fixtures/hello.html')
      });

      gulp.src(__dirname + '/fixtures/hello.html', {buffer: false})
        .pipe(embedlr({port: 1337})).on('data', function(file) {
          assert.equal(file.isStream(), true);

          file.pipe(es.wait(function(err, data) {
            assert.equal(err, undefined);
            assert.equal(
              data,
              fs.readFileSync(__dirname + '/expected/hello-1337.html', 'utf8')
            );
            done();
          }));
        });

    });

    it('should produce the correct output with src option set', function(done) {
      var srcFile = new gutil.File({
        path: 'test/fixtures/hello.html',
        contents: fs.createReadStream('test/fixtures/hello.html')
      });

      gulp.src(__dirname + '/fixtures/hello.html', {buffer: false})
        .pipe(embedlr({src: 'somehost'})).on('data', function(file) {
          assert.equal(file.isStream(), true);

          file.pipe(es.wait(function(err, data) {
            assert.equal(err, undefined);
            assert.equal(
              data,
              fs.readFileSync(__dirname + '/expected/hello-somehost.html', 'utf8')
            );
            done();
          }));
        });

    });

  });

  describe('in buffer mode', function() {
    it('should produce the correct output with default options', function(done) {

      gulp.src(__dirname + '/fixtures/hello.html', {buffer: true})
        .pipe(embedlr()).on('data', function(file) {
          assert.equal(file.isBuffer(), true);
          assert.equal(
            file.contents.toString('utf8'),
            fs.readFileSync(__dirname + '/expected/hello.html')
          );
          done();
        });
    });

    it('should produce the correct output with port option set', function(done) {

      gulp.src(__dirname + '/fixtures/hello.html', {buffer: true})
        .pipe(embedlr({port: 1337})).on('data', function(file) {
          assert.equal(file.isBuffer(), true);
          assert.equal(
            file.contents.toString('utf8'),
            fs.readFileSync(__dirname + '/expected/hello-1337.html')
          );
          done();
        });
    });

    it('should produce the correct output with src option set', function(done) {

      gulp.src(__dirname + '/fixtures/hello.html', {buffer: true})
        .pipe(embedlr({src: 'somehost'})).on('data', function(file) {
          assert.equal(file.isBuffer(), true);
          assert.equal(
            file.contents.toString('utf8'),
            fs.readFileSync(__dirname + '/expected/hello-somehost.html')
          );
          done();
        });
    });
  });

  describe('interaction with gulp.dest', function() {
    afterEach(function() {
      rimraf.sync(__dirname + '/build');
    });

    it('should produce the correct output with default options (buffer)', function(done) {
      gulp.src(__dirname + '/fixtures/hello.html', {buffer: true})
        .pipe(embedlr())
        .pipe(gulp.dest(__dirname + '/results/'))
        .on('end', function() {
            assert.equal(
              fs.readFileSync(__dirname + '/results/hello.html').toString(),
              fs.readFileSync(__dirname + '/expected/hello.html').toString()
            );
            fs.unlinkSync(__dirname + '/results/hello.html');
            fs.rmdirSync(__dirname + '/results/');
            done();
        });

    });

  });
});