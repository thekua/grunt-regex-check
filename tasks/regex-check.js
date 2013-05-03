/*
 * grunt-regex-check
 * https://github.com/thekua/grunt-regex-check
 *
 * Copyright (c) 2013 Patrick Kua
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
    // TODO: Replace with underscore
    var internalFlatten = function (input, output) {
        input.forEach(function (value) {
            if (Array.isArray(value)) {
                var flattened = flatten(value, output);
                flattened.forEach(function (item) {
                    output.push(item);
                });
            } else {
                output.push(value);
            }
        });
        return output;
    };

    // Return a completely flattened version of an array.
    var flatten = function (array) {
        return internalFlatten(array, []);
    };


    grunt.registerMultiTask('regex-check', 'Look for patterns in code that should fail the build', function () {
        var options = this.options();
        var pattern = options.pattern;
        var excluded = options.excluded === '' ? undefined : grunt.file.expandMapping(options.excluded).map(function (srcDestinationMapping) {
            return srcDestinationMapping.src;
        });
        if (pattern === undefined) {
            grunt.log.error("Configuration option 'pattern' was not specified");
            return false;
        }
        if (typeof pattern !== 'object') {
            grunt.log.error("Configuration option 'pattern' should be a javascript regular expression");
            return false;
        }

        var excludedFiles = flatten(excluded, false);
        var isExcluded = function (filepath) {
            var isExcluded = false;
            excludedFiles.forEach(function (excludedFile) {
                if (excludedFile === filepath) {
                    isExcluded = true;
                }
            });
            return isExcluded;
        };


        this.files.forEach(function (f) {
            var matchingFiles = f.src.filter(function (filepath) {
                // Warn on and remove invalid source files (if nonull was set).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).filter(function (filepath) {
                    var source = grunt.file.read(filepath);
                    var matchesPattern = source.match(pattern) !== null;
                    var isNotExcluded = !isExcluded(filepath);
                    return matchesPattern && isNotExcluded;
                });

            var allFiles = matchingFiles.join('\n');
            if (matchingFiles.length === 0) {
                grunt.log.writeln('grunt-regex-check passed');
            } else {
                grunt.log.error("The following files contained unwanted patterns:\n\n" + allFiles +
                    "\n\nFiles that were excluded:\n" + excludedFiles.join('\n'));
            }

        });
    });

};
