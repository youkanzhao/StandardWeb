module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			js: ["**/*.min.js"]
		}
		concat: {
			options: {
				separator: ';'
			},
			lib: {
				src: [
					'WebContent/lib/jquery/jquery.js',
					'WebContent/lib/bootstrap/js/bootstrap.js'
				],
				dest: 'WebContent/lib/<%= pkg.jsLibName %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'WebContent/lib/<%= pkg.jsLibName %>.js': ['WebContent/lib/<%= pkg.jsLibName %>.min.js'],
					'WebContent/js/index.js': ['WebContent/js/index.min.js']

				}
			}
		},
		qunit: {
			files: ['**/*.html']
		},
		jshint: {
			files: ['Gruntfile.js', 'WebContent/js/**/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true,
					document: true
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'qunit']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.registerTask('test', ['jshint', 'qunit']);

	grunt.registerTask('default', ['jshint', 'clean', 'qunit', 'concat', 'uglify']);

};