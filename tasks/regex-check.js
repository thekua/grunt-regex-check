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
    var task = require('./lib/regex-check');

    grunt.registerMultiTask('regex-check', 'Look for patterns in code that should fail the build', function () {
        var options = this.options();
        try {
            var regexCheck = new task(options);
            regexCheck.check(this.files);
        } catch (error) {
            grunt.log.error(error);
            return false;
        }

    });

};
