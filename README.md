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

A string value that is used to do something with whatever.

#### options.pattern
Type: `Regular expression`
Default value: none
Mandatory: Yes

A string value that is used to do something else with whatever else.

### Usage Examples

#### Options

_Note that there are no default options and you must specify the configuration values_

In this example, the configuration is looking through all javascript files in 'src', except for those excluded ones
and will fail the build if the string 'console' is found

Example: Check all source files to ensure they do not contain `console`. Exclude those that have excluded in the file name

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

Example: Check all files in `src/server` and `src/logger` to ensure they do not contain `throw` or `catch`. Exclude three specific files

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


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
- 0.1.5 Apply pull request to use grunt fail warn
- 0.1.4 Apply pull request to remove dependency on underscore
- 0.1.3 Bump version to update documentation and keep release in sync
- 0.1.2 Apply pull request to note which pattern caused the violation per file
- 0.1.1 Fix bug of "Cannot call method 'indexOf' of undefined" when you do not specify any exclusions
- 0.1.0 Initial release

## Future Enhancements

- Move pattern outside of options
- Support another configuration in the same file (e.g. another file set with a particular string)
