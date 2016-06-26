module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		/*
		 * start of grunt-contrib-clean
		 */
		clean: {
			dist: [
				'<%= pkg.distPath %>/**',
				'WebContent/css/*.css'
			]
		},
		/*
		 * end of grunt-contrib-clean
		 */


		/*
		 * start of grunt-contrib-concat
		 */
		concat: {
			options: {
				separator: ';'
			},
			js: {
				src: [
					'WebContent/lib/jquery/jquery.js',
					'WebContent/lib/bootstrap/js/bootstrap.js'
				],
				dest: '<%= pkg.distPath %>/lib/js/<%= pkg.resLibName %>.js'
			},
			css: {
				src: [
					'WebContent/lib/bootstrap/css/*.css'
				],
				dest: '<%= pkg.distPath %>/lib/css/<%= pkg.resLibName %>.css'
			}
		},
		/*
		 * end of grunt-contrib-concat
		 */


		/*
		 * start of grunt-contrib-uglify
		 */
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			js: {
				files: {
					'<%= pkg.distPath %>/js/index.min.js': ['WebContent/js/index.js'],
					'<%= pkg.distPath %>/lib/js/<%= pkg.resLibName %>.min.js': ['<%= pkg.distPath %>/lib/js/<%= pkg.resLibName %>.js']

				}
			}
		},
		/*
		 * end of grunt-contrib-uglify
		 */


		/*
		 * start of grunt-contrib-qunit
		 */
		qunit: {
			files: ['WebContent/**/*.html']
		},
		/*
		 * end of grunt-contrib-qunit
		 */

		/*
		 * start of grunt-contrib-jshint
		 */
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
		/*
		 * end of grunt-contrib-jshint
		 */



		/*
		 * start of grunt-contrib-cssmin
		 */
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'WebContent/css',
					src: ['*.css', '!*.min.css'],
					dest: '<%= pkg.distPath %>/css',
					ext: '.min.css'
				}, {
					expand: true,
					cwd: '<%= pkg.distPath %>/lib/css',
					src: ['*.css', '!*.min.css'],
					dest: '<%= pkg.distPath %>/lib/css',
					ext: '.min.css'
				}]
			}
		},
		/*
		 * end of grunt-contrib-cssmin
		 */


		/*
		 * start of grunt-contrib-copy
		 */
		copy: {
			fonts: {
				files: [{
					expand: true,
					filter: 'isFile',
					flatten: true,
					src: [
						'WebContent/lib/bootstrap/fonts/**'
					],
					dest: '<%= pkg.distPath %>/lib/fonts'
				}],
			},
			html: {
				files: [{
					expand: true,
					filter: 'isFile',
					flatten: true,
					src: [
						'WebContent/*.html'
					],
					dest: '<%= pkg.distPath %>'
				}],
			}
		},
		/*
		 * end of grunt-contrib-copy
		 */

		/*
		 * start of grunt-contrib-less
		 */
		less: {
			compile: {
				files: [{
					'WebContent/css/index.css': 'WebContent/css/index.less'
				}]
			}
		},
		/*
		 * end of grunt-contrib-less
		 */

		/*
		 * start of grunt-contrib-watch
		 */
		watch: {
			files: [
				'<%= jshint.files %>',
				'WebContent/css/*.less',
				'WebContent/*.html'
			],
			tasks: ['clean', 'less', 'jshint', 'copy', 'replace', 'concat', 'uglify', 'cssmin', 'imagemin']
		},
		/*
		 * end of grunt-contrib-watch
		 */

		/*
		 * start of grunt-contrib-imagemin
		 */
		imagemin: { // Task 
			dynamic: { // Another target 
				files: [{
					expand: true, // Enable dynamic expansion 
					cwd: 'WebContent/img', // Src matches are relative to this path 
					src: ['**/*.{png,jpg,gif}'], // Actual patterns to match 
					dest: '<%= pkg.distPath %>/img' // Destination path prefix 
				}]
			}
		},
		/*
		 * end of grunt-contrib-imagemin
		 */

		/*
		 * start of grunt-text-replace
		 */
		replace: {
			another_example: {
				src: ['<%= pkg.distPath %>/*.html'],
				overwrite: true,
				replacements: [
					{
						from: /\{WJZS_RES_VERSION\}/g,
						to: "<%= grunt.template.today('yyyymmddHHMMss') %>"
					},
					{
						from: /<link(.*)href="(lib\/bootstrap\/css\/bootstrap).css\?(.*)>/g,
						to: '<link rel="stylesheet" href="lib/css/<%= pkg.resLibName %>.min.css?$3>'
					},
					{
						from: /<link(.*)href="lib\/(.*)\/css\/(.*)\.css(.*)>/g,
						to: ''
					},
					{
						from: /<link(.*)href="css\/(.*)\.css\?(.*)>/g,
						to: '<link rel="stylesheet" href="css/$2.min.css?$3>'
					},
					{
						from: /<script(.*)src="lib\/jquery\/jquery.js(.*)><\/script>/g,
						to: '<script type="text/javascript" src="lib/js/<%= pkg.resLibName %>.min.js$2></script>'
					},
					{
						from: /<script(.*)src="lib\/(.*)\/js\/(.*).js(.*)><\/script>/g,
						to: ''
					},
					{
						from: /<script(.*)src="js\/(.*)\.js(.*)><\/script>/g,
						to: '<script type="text/javascript" src="js/$2.min.js$3></script>'
					},

				]
			}
		}
		/*
		 * end of grunt-text-replace
		 */

	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-text-replace');

	grunt.registerTask('test', ['jshint', 'qunit']);

	grunt.registerTask('default', ['clean', 'less', 'jshint', 'copy', 'replace', 'concat', 'uglify', 'cssmin', 'imagemin']);

};