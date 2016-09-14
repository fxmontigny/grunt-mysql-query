'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        mysql_query: {
            dev1: {
                host: "localhost",
                user: "root",
                pass: "root",
                database: "utg",
                query: "SELECT 1"
            },
            dev2: {
                host: "localhost",
                user: "root",
                pass: "root",
                database: "utg",
                queries: ["SELECT 1", "SELECT 2"]
            },
            prod1: {
                host: "localhost",
                user: "root",
                pass: "root",
                database: "utg",
                silent: true,
                queries: [{"file": "tests/test3.sql"}, "SELECT 4"]
            },
            prod2: {
                host: "localhost",
                user: "root",
                pass: "root",
                database: "utg",
                queries: [{"file": "tests/test5.sql"}, {"inline": "SELECT 6"}]
            }
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['mysql_query:dev1', 'mysql_query:dev2', 'mysql_query:prod1', 'mysql_query:prod2']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['test']);
};
