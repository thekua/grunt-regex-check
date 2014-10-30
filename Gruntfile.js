/*
 * grunt-regex-check
 * https://github.com/thekua/grunt-regex-check
 *
 * Copyright (c) 2014 Patrick Kua
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        "regex-check": {
            test: {
                src: 'test/fixtures/**/*.js',
                options: {
                    excluded : ["src/**/*xcluded.js", 'src2/shouldBeExcluded.js'],
                    pattern: /console/g
                }
            },
            testArray: {
                src: 'test/fixtures/invalid-constants/*.js',
                options: {
                    pattern: [/INVALID/g, /_CONSTANT/g],
                    breakOnError: false
                }
            },
            warnOnly: {
                src: 'test/fixtures/invalid-constants/*.js',
                options: {
                    pattern: /INVALID/,
                    breakOnError: false
                }
            }
        },

        mochaTest: {
            files: ['test/**/*test.js']
        },
        mochaTestConfig: {
            options: {
                require: 'node_modules/should/lib/should'
            }
        }


    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-mocha-test');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'regex-check', 'mochaTest']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
