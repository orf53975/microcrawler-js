// Copyright, 2013-2016, by Tomas Korcak. <korczis@gmail.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import chai from 'chai';
const should = chai.should();

import request from '../../lib/helper/request';

describe('Request', function() {
  const invalidUrlMsg = 'This should not happen. Invalid hostname should by handled by error handler';

  describe('request()', function() {
    it('Is defined', function() {
      request.should.not.equal(null);
    });

    it('Handles valid url - http://google.com', function(done) {
      request('http://google.com').then(function(data) {
        data.should.not.equal(null);
        done();
      });
    });

    it('Handles "" URL', function(done) {
      request('').then(function() {
        done(new Error(invalidUrlMsg));
      }, function() {
        done();
      });
    });

    let url = null;
    it('Handles null URL', function(done) {
      request(url).then(function() {
        done(new Error(invalidUrlMsg));
      }, function() {
        done();
      });
    });

    url = 'http://google.com/invalid';
    it('Handles invalid url ' + url, function(done) {
      request(url).then(function() {
        done(new Error(invalidUrlMsg));
      }, function() {
        done();
      });
    });
  });
});
