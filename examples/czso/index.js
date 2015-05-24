// Copyright, 2013-2014, by Tomas Korcak. <korczis@gmail.com>
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

// For crawling http://vdb.czso.cz/vdb/ukazatele.jsp?typ=0

(function () {
    'use strict';

    var define = require('amdefine')(module);

    /**
     * Array of modules this one depends on.
     * @type {Array}
     */
    var deps = [];

    define(deps, function() {
        module.exports = function($, item) {
            var results = [];

            $('table.orient100 > tbody > tr').each(function() {
                var element = $(this);

                var first = element.find('td:nth-child(1)').text();
                var second = element.find('td:nth-child(2) > a:nth-child(1)').text();
                var href =  element.find('td:nth-child(2) > a:nth-child(2)').attr('href');

                if(!first || !second || !href) {
                    return;
                }
                
                var url = "http://vdb.czso.cz/vdb/" + href.trim();

                results.push({
                    type: 'url',
                    url: url,
                    processor: 'czso.details'
                });
            });

            return results;
        };
    });
}());
