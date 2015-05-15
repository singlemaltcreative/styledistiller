'use strict';

module.exports = function(grunt) {
	
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt);

	grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
		
		watch: {
		    scripts: {
		        files: ['js/src/*.js'],
		        tasks: ['import'],
		    },
		    css: {
			    files: [
			    	'scss/style.scss',
			    	'scss/**/*.scss',
		    	],
			    tasks: ['sass'],
			},
			markup: {
				files: [
					'app/*.html'
					'*.md'
				],
			}
		},
		
		import: {
			options: {
			},
			scripts: {
			  src: [
				'src/bower_components/jquery/dist/jquery.min.js',
				'src/bower_components/modernizr/modernizr.js',
				'js/src/common.js',
				],
				dest: 'app/library/js/scripts-combined.js',
			}
		},

		uglify: {
		    my_target: {
		      files: {
		        'app/library/js/production-min.js': ['app/library/js/scripts-combined.js']
		      }
		    }
		},
		
		sass: {
	    options: {
          sourceMap: true
      },
	    compile: {
				files: {
					'app/library/css/style.css': 'scss/style.scss'
				}
			},
		},
		
		browserSync: {
			dev: {
		    bsFiles: {
	        src : [
	        	'app/library/css/style.css',
	        	'app/library/js/scripts-combined.js',
	        	'app/*.html'
        	]
		    }, 
		    options: {
          proxy: vHost,
          open: false,
          watchTask: true,
          debugInfo: true,
        }
			}
		}

  });
	
	grunt.registerTask('default', ['browserSync', 'watch']);

	grunt.registerTask('compile', ['sass', 'import', 'uglify']);

};