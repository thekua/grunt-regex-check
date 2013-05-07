'use strict';

var _ = require('underscore');


var RegexCheck = function (pattern, listOfExcludedFiles, gruntLog, gruntFile) {
    var log = gruntLog;
    var file = gruntFile;

    var excludedFiles = listOfExcludedFiles || [];
    if (pattern === undefined) {
        throw "Configuration option 'pattern' was not specified";
    }
    if (typeof pattern !== 'object') {
        throw "Configuration option 'pattern' should be a javascript regular expression";
    }

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
            var ranOnce = false;

            files.forEach(function (f) {
                var matchingFiles = f.src.filter(function (filepath) {
                    // Warn on and remove invalid source files (if nonull was set).
                    if (!file.exists(filepath)) {
                        log.warn('Source file "' + filepath + '" not found.');
                        return false;
                    } else {
                        return true;
                    }
                }).filter(function (filepath) {
                        ranOnce = true;
                        var source = file.read(filepath);
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
            if(!ranOnce) {
                log.warn("No files were processed. You may want to check you configuration. Files detected: " + files.join(','));
            }
        }
    };
};


module.exports = RegexCheck;


