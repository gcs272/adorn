'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        simplemocha: {
            options: {
                timeout: 2000,
                ui: 'bdd',
                reporter: 'spec'
            },
            all: {
                src: ['test/**/*.js']
            }
        },
        jshint2: {
            options: {
                jshintrc: '.jshintrc',
                force: false,
                cache: true,
                reporter: 'default'
            },
            all: ['Gruntfile.js', 'test/**/*.js', 'lib/**/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-jshint2');

    grunt.registerTask('default', ['simplemocha']);
    grunt.registerTask('test', ['simplemocha']);
    grunt.registerTask('lint', ['jshint2']);
};
