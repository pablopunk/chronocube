#gulp-cson
[![Build Status](https://travis-ci.org/stevelacy/gulp-cson.png?branch=master)](https://travis-ci.org/stevelacy/gulp-cson)
[![NPM version](https://badge.fury.io/js/gulp-cson.png)](http://badge.fury.io/js/gulp-cson)

>  All options are passed to [CSON](https://github.com/bevry/cson) any output issues should be opened there

<table>
<tr>
<td>Package</td><td>gulp-cson</td>
</tr>
<tr>
<td>Description</td>
<td>Parse cson with gulp</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 0.9</td>
</tr>
<tr>
<td>Gulp Version</td>
<td>3.x</td>
</tr>
</table>

# Usage

## Install

```
npm install gulp-cson --save
```
##Example

```coffee-script
gulp = require 'gulp'
gcson = require 'gulp-cson'

gulp.task 'cson', ->
  gulp.src './normal.cson'
    .pipe gcson()
    .pipe gulp.dest './'

gulp.task 'default', ['cson']
```

####You can view more examples in the [example folder.](https://github.com/stevelacy/gulp-cson/tree/master/examples)



## LICENSE

(MIT License)

Copyright (c) 2015 Steve Lacy <me@slacy.me> http://slacy.me

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
