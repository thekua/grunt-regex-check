'use strict';

var _ = require('underscore');
var grunt = require('grunt');


var RegexCheck = function (options, gruntLog) {
    var log = gruntLog || grunt.log;

    var pattern = options.pattern;
    var excluded = options.excluded === '' ? undefined : grunt.file.expandMapping(options.excluded).map(function (srcDestinationMapping) {
        return srcDestinationMapping.src;
    });
    if (pattern === undefined) {
        throw "Configuration option 'pattern' was not specified";
    }
    if (typeof pattern !== 'object') {
        throw "Configuration option 'pattern' should be a javascript regular expression";
    }

    var excludedFiles = _.flatten(excluded);
    var isExcluded = function (filepath) {
        var isExcluded = false;
        excludedFiles.forEach(function (excludedFile) {
            if (excludedFile === filepath) {
                isExcluded = true;
            }
        });
        return isExcluded;
    };

    return {
        check: function (files) {
            files.forEach(function (f) {
                var matchingFiles = f.src.filter(function (filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!grunt.file.exists(filepath)) {
                        log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                }).filter(function (filepath) {
                        var source = grunt.file.read(filepath);
                        var matchesPattern = source.match(pattern) !== null;
                        var isNotExcluded = !isExcluded(filepath, excludedFiles);
                        return matchesPattern && isNotExcluded;
                    });

                var allFiles = matchingFiles.join('\n');
                if (matchingFiles.length === 0) {
                    log.writeln('grunt-regex-check passed');
                } else {
                    log.error("The following files contained unwanted patterns:\n\n" + allFiles +
                        "\n\nFiles that were excluded:\n" + excludedFiles.join('\n'));
                }

            });
        }
    };
};


module.exports = RegexCheck;


