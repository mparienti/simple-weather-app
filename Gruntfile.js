module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.initConfig({
    concat: {
      options: { //options supplémentaires
        separator: ';', // permet d'ajouter un point-virgule entre chaque fichier concaténé.
      },
      js: {
        //src: ['assets/js/jquery-1.12.4.js',  'assets/js/jquery-ui.js',],
        src: ['assets/js/zepto.js', 'js/go.js', 'node_modules/chartist/dist/chartist.js', 'node_modules/moment/moment.js'],
        dest: 'web/js/built.js'
      },
      css:{
        src: ['assets/css/*.css',], // 'node_modules/chartist/dist/chartist.css'
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
          'assets/css/main.css': 'assets/css/bootstrap.scss',
          'assets/css/chart.css':  'assets/css/chartist.scss',
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
