'use strict';

var grunt = require('grunt');
var RegexCheck = require('../tasks/lib/regex-check');

var sinon = require ('sinon');

describe("Something with mohca", function() {
    it("should do another thing", function() {
        var logger = sinon.stub();
        var file = sinon.stub();
        var pattern = /console/g;
        var excluded = [];

        var regexCheck = new RegexCheck(pattern, excluded, logger, file);

    });
});
