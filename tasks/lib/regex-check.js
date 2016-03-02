'use strict';
var grunt = require('grunt');
var utils = require('./utils.js');

var RegexCheck = function (pattern, listOfExcludedFiles, gruntLog, gruntFile, warnOnly, name) {

    var log = gruntLog;
    var file = gruntFile;
    var excludedFiles = listOfExcludedFiles || [];

    pattern = utils.checkPattern(pattern);

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
                }).map(function (filepath) {
                    ranOnce = true;
                    var result = utils.fileContentChecker(pattern, file.read(filepath), filepath, excludedFiles);
                    return result;

                }).filter(function (result) {
                    return result.matches.length !== 0 && result.isNotExcluded;
                });

                if (matchingFiles.length === 0) {
                    log.writeln('grunt-regex-check passed');
                } else {
                    var filesMessages = matchingFiles.map(function (matchingFile) {
                        var message = name + ': ' + matchingFile.filepath + " - failed because it matched following patterns : ";
                        var prefix = "";
                        matchingFile.matches.forEach(function (element) {
                            message += prefix + "'" + element + "'";
                            prefix = ", "
                        });
                        return message;
                    }).join('\n');
                    var msg = "The following files contained unwanted patterns:\n\n" + filesMessages +
                        "\n\nFiles that were excluded:\n" + excludedFiles.join('\n');
                    if (warnOnly) {
                        log.warn(msg);
                    } else {
                        grunt.fail.warn(msg);
                    }
                }

            });
            if (!ranOnce) {
                log.warn("No files were processed. You may want to check you configuration. Files detected: " + files.join(','));
            }
        }
    };
};

module.exports = RegexCheck;