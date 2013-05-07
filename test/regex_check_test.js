'use strict';

var grunt = require('grunt');
var RegexCheck = require('../tasks/lib/regex-check');

var sinon = require ('sinon');

describe("regex-check", function() {
    describe("initialisation", function() {
        it("should fail if no pattern present", sinon.test(function() {
            (function() {
                new RegexCheck(undefined, [], this.stub(grunt.log), this.stub(grunt.file));
            }).should.throw();
        }));

        it("should fail if pattern looks like a string", sinon.test(function() {
            (function() {
                new RegexCheck("invalidRegularExpresssion", [], this.stub(grunt.log), this.stub(grunt.file));
            }).should.throw();
        }));


        it("should not error if excluded is undefined", sinon.test(function() {
            var regexCheck = new RegexCheck(/aPattern/g, undefined, this.stub(grunt.log), this.stub(grunt.file));
            regexCheck.check([]);
        }));

        it("should warn if no files were processed", sinon.test(function() {
            var log = this.stub(grunt.log);

            var regexCheck = new RegexCheck(/aPattern/g, undefined, log, this.stub(grunt.file));
            regexCheck.check([]);

            log.warn.called.should.be.true;
        }));
    });
});
