module.exports = {// Configuration for Copy Task. Moves files to build directory.
	build: {
		files: [{
			expand: true,
			cwd: '',
			src: [],
			dest: 'build'
		}]
	},
	dist: {
		files: [{
			expand: true,
			cwd: 'build',
			src: ['plm-token-service.js'],
			dest: 'dist'
		}]
	}
};
