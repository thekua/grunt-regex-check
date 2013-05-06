'use strict';

var grunt = require('grunt');
var RegexCheck = require('../tasks/lib/regex-check');

var sinon = require ('sinon');

describe("regex-check", function() {
    it("should do another thing", function() {
        var logger = sinon.stub();
        var file = sinon.stub();
        var pattern = /console/g;
        var excluded = [];

        var regexCheck = new RegexCheck(pattern, excluded, logger, file);

    });

    describe("initialisation", function() {
        it("should fail if no pattern present", function() {
            (function() {
                new RegexCheck(undefined, [], sinon.stub(), sinon.stub());
            }).should.throw();
        });

        it("should fail if pattern looks like a string", function() {
            (function() {
                new RegexCheck("invalidRegularExpresssion", [], sinon.stub(), sinon.stub());
            }).should.throw();
        });


        it("should not error if excluded is undefined", function() {
            var regexCheck = new RegexCheck(/aPattern/g, undefined, sinon.stub(), sinon.stub());
            regexCheck.check([]);
        });
    });
});
