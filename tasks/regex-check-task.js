/*
 * grunt-regex-check
 * https://github.com/thekua/grunt-regex-check
 *
 * Copyright (c) 2013 Patrick Kua
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var RegexCheck = require('./lib/regex-check');

    var expand = function(excluded) {
        return excluded === undefined ? [] : grunt.file.expandMapping(excluded).map(function (srcDestinationMapping) {
            return srcDestinationMapping.src;
        });
    };

    grunt.registerMultiTask('regex-check', 'Look for patterns in code that should fail the build', function () {
        var options = this.options({
            breakOnError: true
        });
        try {
            var pattern = options.pattern;
            var excluded = grunt.util._.flatten(expand(options.excluded));
            var regexCheck = new RegexCheck(pattern, excluded, grunt.log, grunt.file, !options.breakOnError, this.target);
            regexCheck.check(this.files);
        } catch (error) {
            grunt.log.error(error);
            return false;
        }
    });

};
