module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: [
		"plugin:jest/recommended",
		"plugin:vue/essential",
		"eslint:recommended"
	],
	rules: {
		"no-console": "off",
		"indent": ["error", "tab"],
		"no-irregular-whitespace": "off",
		"object-curly-spacing": ["error", "never"],
		"array-bracket-spacing": ["error", "never"],
		"vue/no-parsing-error": [2, {"x-invalid-end-tag": false}],
		"no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
	},
	parserOptions: {
		parser: "babel-eslint"
	}
}
