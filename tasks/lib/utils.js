'use strict';
var utils =
{
    fileContentChecker: function (pattern, source, filepath, excludedFiles) {
        var matches = [];
        var isExcluded = utils.isExcluded(filepath, excludedFiles);
        if (!isExcluded) {
            pattern.forEach(function (element) {
                var match = source.match(element);
                if (match)
                    matches.push(match);
            });
        }
        return {
            filepath: filepath,
            matches: matches,
            isNotExcluded: !isExcluded
        };
    },

    isExcluded: function (filepath, excludedFiles) {
        var isExcluded = false;
        excludedFiles.forEach(function (excludedFile) {
            if (excludedFile === filepath) {
                isExcluded = true;
            }
        });
        return isExcluded;
    },

    isRegExp: function (value) {
        return toString.call(value) === '[object RegExp]';
    },

    checkPattern: function (pattern) {
        //Check if pattern is valued
        if (pattern === undefined || (Array.isArray(pattern) && pattern.length === 0)) {
            throw "Configuration option 'pattern' was not specified";
        }
        //Check if array, if not, wrap it
        if (!Array.isArray(pattern)) {
            pattern = [pattern];
        }

        //Check each element to be a regex
        pattern.forEach(function (element) {
            if (!utils.isRegExp(element)) {
                throw "Configuration option 'pattern' should be a javascript regular expression or an array of regular expression. ('" + element + "' is not a valid regular expression)";
            }
        });

        return pattern;
    }
};

module.exports = utils;