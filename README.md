# grunt-regex-check

> Grunt plugin to detect illegal expressions in javascript code with regular expressions

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-regex-check --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-regex-check');
```

## The ""regex-check"" task

### Overview
In your project's Gruntfile, add a section named `"regex-check"` to the data object passed into `grunt.initConfig()`.

### Options

#### options.excluded
Type: `String`
Default value: none
Mandatory: No

#### options.pattern
Type: `Regular expression` or an Array of Regular Expression
Default value: none
Mandatory: Yes

An Array of Regular Expression to match files content

#### options.breakOnError
Type: `boolean`
Default value: true
Mandatory: false

By setting to `false` you can only warn the user, but not break the build.

### Usage Examples

#### Options

_Note that there are no default options and you must specify the configuration values_

In this example, the configuration is looking through all javascript files in 'src', except for those excluded ones
and will fail the build if the string 'console' is found

__Example__: Check all source files to ensure they do not contain `console`. Exclude those that have excluded in the file name

```js
grunt.initConfig({
  "regex-check": {
    files: "src/**/*.js",
    options: {
      excluded : "src/**/*xcluded.js",
      pattern : /console/g
    },
  },
})
```

__Example__: Find `console` calls, but only warn the user without stopping the grunt build

```js
grunt.initConfig({
  "regex-check": {
    files: "src/**/*.js",
    options: {
      excluded : "src/**/*xcluded.js",
      pattern : /console/g,
      breakOnError: false
    },
  },
})
```

__Example__: Check all files in `src/server` and `src/logger` to ensure they do not contain `throw` or `catch`. Exclude three specific files

```js
grunt.initConfig({
  "regex-check": {
    files: ["src/server/**/*.js", "src/logger/**/*.js"],
    options: {
      excluded : ["src/server/ajax/requestErrors.js", "src/logger/defaultErrorLogger.js", "src/server/jqueryPluginWrapper.js"],
      pattern : /(throw)|(catch)/g
    },
  },
})
```

__Example__: [User contributed example - thanks eitanp461](https://github.com/thekua/grunt-regex-check/issues/6)

```js
grunt.initConfig({
  "regex-check": {
        directives: {
            files: [
                {src: ['app/js/**/*-drtv.js']}
            ],
            options: {
                // force file naming conventions
                pattern: /templateUrl(?!(.*-tmpl.html|.*\{|;))/g
            }
        },
        scopes: {
            files: [
                {src: ['app/js/**/*.js']}
            ],
            // Check that scopes that are created programatically with $new are eventually cleaned up
            options: {
                pattern: /\$new(?!(\$on('\$destroy')))/g
            }
        }
  },
})
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- 0.1.10 Merge in pull request for new grunt version and enhance output with target. See https://github.com/thekua/grunt-regex-check/pull/10
- 0.1.9 Update to include pattern regex patch https://github.com/thekua/grunt-regex-check/pull/9
- 0.1.8 Update documentation to keep in sync
- 0.1.7 Upgrade of npm to fix broken publish with old version
- 0.1.6 Apply pull request to add option breakOnError
- 0.1.5 Apply pull request to use grunt fail warn
- 0.1.4 Apply pull request to remove dependency on underscore
- 0.1.3 Bump version to update documentation and keep release in sync
- 0.1.2 Apply pull request to note which pattern caused the violation per file
- 0.1.1 Fix bug of "Cannot call method 'indexOf' of undefined" when you do not specify any exclusions
- 0.1.0 Initial release

## Future Enhancements

- Add automated tests for breakOnError
- Move pattern outside of options
- Support another configuration in the same file (e.g. another file set with a particular string)
