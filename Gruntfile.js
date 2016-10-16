module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.initConfig({
    concat: {
      options: { //options supplémentaires
        separator: ';', // permet d'ajouter un point-virgule entre chaque fichier concaténé.
      },
      js: {
        //src: ['assets/js/jquery-1.12.4.js',  'assets/js/jquery-ui.js',],
        src: ['assets/js/zepto.js', 'js/go.js'],
        dest: 'web/js/built.js'
      },
      css:{
        src: ['assets/css/*.css'],
        dest: 'web/css/built.css',
      },
    },
    sass: {
      dist: { 
        files: {
          'assets/css/main.css': 'node_modules/bootstrap-sass/assets/stylesheets/bootstrap.scss',
        },
        option: {
          precision: 8,
          compass: true,
          style: 'compressed',
          sourcemap: 'no',
        },
      }
    }
  })
  grunt.registerTask('default', ['sass', 'join']);
  grunt.registerTask('join', ['concat:js', 'concat:css']);
  grunt.registerTask('concat_css', ['concat:css']);
  grunt.registerTask('concat_js', ['concat:js']);
}
