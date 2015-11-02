gulp = require 'gulp'
gcson = require '../'

gulp.task 'cson', ->
  gulp.src './normal.cson'
    .pipe gcson()
    .pipe gulp.dest './'

gulp.task 'default', ['cson']
