module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            build: {
                src: 'src/progressively.js',
                dest: 'dist/progressively.min.js'
            }
        },
        jshint: {
            all: [
                'index.js',
                'Gruntfile.js'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['uglify', 'jshint']);
};
