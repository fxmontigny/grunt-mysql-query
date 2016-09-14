# Grunt (MYSQL) Database cleaning

[![npm version](https://badge.fury.io/js/grunt-mysql-query.svg)](https://www.npmjs.com/package/grunt-mysql-query)

**IMPORTANT NOTE**: the authors of this Plugin assume **no responsibility** for any actions which result from the usage of this script. You use it entirely *at your own risk*. It is *strongly* recommended that you test the script in a non-critical environment prior to rolling out for production use. *Always* manually backup your local and remote databases before using the script for the first time. No support can be provided for critical situations.

## Getting Started
This plugin requires Grunt `>=0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mysql-query --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mysql-query');
```

## Documentation

### Overview
In your project's Gruntfile, add a section named `mysql_query` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  mysql_query: {
    dev1: {
        host: "",
        user: "",
        pass: "",
        database: "",
        query: "SELECT 1"
    },
    dev2: {
        host: "",
        user: "",
        pass: "",
        database: "",
        queries: ["SELECT 1", "SELECT 2"]
    },
    prod1: {
        host: "",
        user: "",
        pass: "",
        database: "",
        silent: true, <- do not show logs
        queries: [{"file": "file.sql"}, "SELECT 2"]
    },
    prod2: {
        host: "",
        user: "",
        pass: "",
        database: "",
        queries: [{"file": "file.sql"}, {"inline": "SELECT 2"}]
    },
    // etc
  }
});

grunt.loadNpmTasks('grunt-mysql-query');

grunt.registerTask('default', ['mysql_query:dev1']);
```