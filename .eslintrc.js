module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es2021: true
	},
	extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:node/recommended'],
	parserOptions: {
		ecmaVersion: 'latest'
	},
	rules: {
		'node/no-unsupported-features/es-syntax': 'off',
		'no-unused-vars': 'off'
	}
};
