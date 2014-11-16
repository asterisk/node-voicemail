/**
 *  Grunt tasks to support running linter and unit tests.
 *
 *  @module Gruntfile
 *
 *  @copyright 2014, Digium, Inc.
 *  @license Apache License, Version 2.0
 *  @author Samuel Fortier-Galarneau <sgalarneau@digium.com>
 */

'use strict';

module.exports = function(grunt) {

  // threshold for failing coverage
  var coverageThreshold = 80;

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        jshintrc: true
      },
      all: [
        'Gruntfile.js',
        'app.js',
        'lib/*.js',
        'test/*.js'
      ]
    },
    mochaTest: {
      test: {
        options: {
          mocha: require('mocha'),
          reporter: 'spec',
          timeout: 2000
        },
        src: ['test/*.js']
      }
    },

    'mocha_istanbul': {
      coverage: {
        src: 'test',
        options: {
          check: {
            lines: coverageThreshold,
            statements: coverageThreshold,
            branches: coverageThreshold,
            functions: coverageThreshold
          }
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');

  // Default task.
  grunt.registerTask('default', ['jshint', 'mochaTest']);
  grunt.registerTask('coverage', ['mocha_istanbul:coverage']);
};
