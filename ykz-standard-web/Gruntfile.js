module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			js: ['**/*.min.js',
				'WebContent/lib/<%= pkg.resLibName %>.js'
			],
			css: [
				'**/*.min.css',
				'WebContent/css/<%= pkg.resLibName %>.css'
			]
		},
		concat: {
			options: {
				separator: ';'
			},
			js: {
				src: [
					'WebContent/lib/jquery/jquery.js',
					'WebContent/lib/bootstrap/js/bootstrap.js'
				],
				dest: 'WebContent/lib/<%= pkg.resLibName %>.js'
			},
			css: {
				src: [
					'WebContent/lib/bootstrap/css/*.css'
				],
				dest: 'WebContent/css/<%= pkg.resLibName %>.css'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			js: {
				files: {
					'WebContent/js/index.min.js': ['WebContent/js/index.js'],
					'WebContent/lib/<%= pkg.resLibName %>.min.js': ['WebContent/lib/<%= pkg.resLibName %>.js']

				}
			}
		},
		qunit: {
			files: ['WebContent/**/*.html']
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
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'WebContent/css',
					src: ['*.css', '!*.min.css'],
					dest: 'WebContent/css',
					ext: '.min.css'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	grunt.registerTask('test', ['jshint', 'qunit']);

	grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'cssmin']);

};