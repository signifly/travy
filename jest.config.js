module.exports = {
	roots: ["./src"],
	moduleFileExtensions: ["js","jsx", "json", "vue"],
	transform: {
		".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
		"^.+\\.jsx?$": "babel-jest",
		"^.+\\.vue$": "vue-jest"
	},
	moduleNameMapper: {
		 "^.+.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$": "jest-transform-stub",
		"^@/(.*)$": "<rootDir>/src/$1"
	}
}
