/*
 * grunt-regex-check
 * https://github.com/thekua/grunt-regex-check
 *
 * Copyright (c) 2013 Patrick Kua
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    var _ = require('underscore');
    var regexCheck = require('./lib/regex-check');

    grunt.registerMultiTask('regex-check', 'Look for patterns in code that should fail the build', function () {
        var options = this.options();
        try {
            var validatedOptions = regexCheck.init(options);
        } catch (error) {
            grunt.log.error(error);
            return false;
        }

        var excludedFiles = _.flatten(validatedOptions.excluded);
        regexCheck.check(this.files, validatedOptions.pattern, excludedFiles);
    });

};
