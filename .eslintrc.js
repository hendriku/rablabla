module.exports = {
    "extends": "airbnb",
	  "parser": "babel-eslint",
  	"rules": {
  		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  		"no-console": ["error", { "allow": ["log", "warn", "error"] }],
      "linebreak-style": ["error", "unix"],
  		"react/forbid-prop-types": 0,
  		"react/jsx-no-bind": 0,
  		"react/jsx-indent": 0,
      "react/prop-types": 0,
  		"react/arrow-body-style": 0,
  		"react/sort-comp": 0,
  		"class-methods-use-this": 0,
  		"no-return-assign": 0,
  		"arrow-body-style": 0,
  		"jsx-a11y/no-static-element-interactions": 0
  	}
};
