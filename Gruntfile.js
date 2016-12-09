module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.initConfig({
    concat: {
      js: {
        options: {
          separator: ';',
        },
        src: [
          'node_modules/zepto/dist/zepto.js',
          'js/go.js',
          'node_modules/chartist/dist/chartist.js',
          'js/chartist-plugin-vertical-moment-lines.js',
          'node_modules/moment/moment.js',
          'node_modules/suncalc/suncalc.js'
             ],
        dest: 'web/js/built.js'
      },
      css:{
        src: ['assets/css/*.css',],
        dest: 'web/css/built.css',
      },
    },
    uglify: {
      options: {},
      js: {
        src: ['web/js/built.js'],
        dest: 'web/js/built.min.js'
      }
    },
    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: { 'web/css/built.min.css': ['web/css/built.css'] }
      }
    },
    sass: {
      dist: {
        files: {
          'assets/css/main.css': 'stylesheets/bootstrap.scss',
          'assets/css/chart.css':  'stylesheets/chartist.scss',
          'assets/css/chartist-plugin-vertical-moment-lines.css': 'stylesheets/chartist-plugin-vertical-moment-lines.scss',
        },
        option: {
          precision: 8,
          compass: true,
          style: 'compressed',
          sourcemap: 'no',
        },
      }
    }
  });
  grunt.registerTask('default', ['sass', 'join', 'uglify', 'cssmin']);
  grunt.registerTask('join', ['concat:js', 'concat:css']);
  grunt.registerTask('concat_css', ['concat:css']);
  grunt.registerTask('concat_js', ['concat:js']);
}
