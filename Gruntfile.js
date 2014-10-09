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
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Default task.
  grunt.registerTask('default', ['jshint', 'mochaTest']);
};
