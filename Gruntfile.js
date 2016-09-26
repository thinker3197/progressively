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
        },
        cssmin: {
            target: {
                files: {
                    'dist/progressively.min.css': ['src/progressively.css']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('default', ['uglify', 'jshint', 'cssmin']);
};
