'use strict';

var shell = require('shelljs');

module.exports = function (grunt) {

    grunt.registerMultiTask('mysql_query', 'MySql Query', function () {
        // Options
        var task_options = this.data;

        db_execute_query(task_options);
    });


    function db_execute_query(config) {
        var defaultType = "inline", silentMode = false, tpl_mysql = grunt.template.process(tpls.mysql, {
            data: {
                host: config.host,
                user: config.user,
                pass: config.pass,
                database: config.database
            }
        });

        //configure
        if (config.hasOwnProperty('silent') && config.silent == true)
            silentMode = true;

        if (config.hasOwnProperty('default_query_type') && config.default_query_type == "file")
            defaultType = "file";

        //find and execute
        if (config.hasOwnProperty('query')) {
            var query = config.query, type = "", value = "";
            if (typeof query == "string") {
                type = defaultType;
                value = query;
            } else if (typeof query == "object" && query.hasOwnProperty('file')) {
                type = "file";
                value = query.file;
            } else if (typeof query == "object" && query.hasOwnProperty('inline')) {
                type = "inline";
                value = query.inline;
            }

            grunt.log.ok(type)
            grunt.log.ok(value)

            if (type == "inline")
                query_inline(tpl_mysql, value, silentMode);
            else if (type == "file")
                query_file(tpl_mysql, value, silentMode);
        }

        if (config.hasOwnProperty('queries')) {
            var queries = config.queries;
            for (var i = 0; i < queries.length; i++) {
                var query = queries[i], type = "", value = "";
                if (typeof query == "string") {
                    type = defaultType;
                    value = query;
                } else if (typeof query == "object" && query.hasOwnProperty('file')) {
                    type = "file";
                    value = query.file;
                } else if (typeof query == "object" && query.hasOwnProperty('inline')) {
                    type = "inline";
                    value = query.inline;
                }

                if (type == "inline")
                    query_inline(tpl_mysql, value, silentMode);
                else if (type == "file")
                    query_file(tpl_mysql, value, silentMode);
            }
        }
    }

    function query_file(tpl_mysql, file, silentMode) {
        var cmd = tpl_mysql + " < \"" + file + "\"";
        if (silentMode == false)
            grunt.log.ok(cmd);
        shell.exec(cmd, {
            silent: silentMode
        });
    }

    function query_inline(tpl_mysql, inline, silentMode) {
        var cmd = tpl_mysql + " -e \"" + inline + "\"";
        if (silentMode == false)
            grunt.log.ok(cmd);
        shell.exec(cmd, {
            silent: silentMode
        });
    }

    var tpls = {
        mysql: "mysql --host=\"<%= host %>\" --user=\"<%= user %>\" --password=\"<%= pass %>\" \"<%= database %>\""
    };
};


