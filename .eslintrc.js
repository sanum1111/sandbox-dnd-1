module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
    ],
    "overrides": [
        {
            "env": {
                "node": true,
            },
            "files": [
                ".eslintrc.{js,cjs}",
            ],
            "parserOptions": {
                "sourceType": "script",
            },
        },
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
    },
    "plugins": [
        "react",
    ],
    "rules": {
        "semi": "error",
		"object-curly-spacing": ["error", "always"],
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
		"comma-dangle": ["error", "always-multiline"],
		"no-multi-spaces": "error",
		"no-trailing-spaces": "error",
		"no-whitespace-before-property": "error",
		"newline-per-chained-call": [2],
		"lines-between-class-members": ["error", "always"],
		"quotes": ["error", "double"],
		"no-multi-str": "error",
		"no-prototype-builtins": 0,

		"padding-line-between-statements": [
			"error",

			{
				"blankLine": "always",
				"prev": ["multiline-block-like", "multiline-const", "multiline-expression", "multiline-let"],
				"next": "*",
			},

			{
				"blankLine": "always",
				"prev": "*",
				"next": ["multiline-block-like", "multiline-const", "multiline-expression", "multiline-let"],
			},
		],

		"space-before-function-paren": ["error", {
			"anonymous": "always",
			"named": "never",
			"asyncArrow": "ignore",
		}],

		"comma-style": ["error", "last"],

		"max-len": [
			"error",

			{
				"code": 120,
				"ignoreStrings": true,
			},
		],

		"react/no-unescaped-entities": 0,
		"multiline-comment-style": 0,
		"operator-linebreak": ["error", "before"],
		"rest-spread-spacing": ["error", "never"],
		"array-bracket-spacing": ["error", "never"],
		"space-in-parens": ["error", "never"],
		"keyword-spacing": 2,
		"curly": 2,
		"no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
		"space-infix-ops": ["error", { "int32Hint": false }],
		"max-depth": ["error", 3],
		"brace-style": [2, "1tbs", { "allowSingleLine": false }],
		"arrow-spacing": "error",
		"no-template-curly-in-string": "error",
		"block-scoped-var": "error",
		"eqeqeq": "error",
		"no-implicit-globals": "error",
		"no-script-url": "error",
		"no-self-compare": "error",
		"no-sequences": "error",
		"yoda": "error",
		"computed-property-spacing": ["error", "never"],
		"func-call-spacing": ["error", "never"],
		"jsx-quotes": ["error", "prefer-double"],
		"max-statements-per-line": ["error", { "max": 1 }],
		"no-multi-assign": "error",
		"padded-blocks": ["error", "never"],
		"no-duplicate-imports": "error",
		"no-var": "error",
		"prefer-const": "error",
		"prefer-rest-params": "error",
		"prefer-spread": "error",
		"prefer-template": "error",
		"react/display-name": 0,

		"lines-around-comment": [
			"error",

			{
				"beforeLineComment": true,
				"allowBlockStart": true,
			},
		],

		"no-else-return": [
			"error",

			{
				"allowElseIf": false,
			},
		],

		"key-spacing": [
			"error",

			{
				"beforeColon": false,
				"afterColon": true,
			},
		],

		"comma-spacing": [
			"error",

			{
				"before": false,
				"after": true,
			},
		],

		"react/jsx-boolean-value": 2,
		"react/jsx-space-before-closing": [2, "always"],
		"react/jsx-pascal-case": 2,
		"react/jsx-no-useless-fragment": 2,
		"react/jsx-no-duplicate-props": 2,
		"react/jsx-no-constructed-context-values": 2,
		"react/jsx-newline": 0,
		"react/jsx-max-props-per-line": [2, {
			"maximum": 2,
			"when": "always",
		}],

		"react/jsx-wrap-multilines": ["error", {
			"return": "parens-new-line",
			"assignment": "parens-new-line",
			"arrow": "parens-new-line",
			"condition": "parens-new-line",
			"declaration": "parens-new-line",
			"logical": "parens-new-line",
			"prop": "parens-new-line",
		}],

		"react/jsx-one-expression-per-line": [0, {
			"allow": "single-child",
		}],

		"react/jsx-props-no-multi-spaces": 2,

		"react/jsx-props-no-spreading": 0,
		"jsx-curly-spacing": 0,

		"react/jsx-indent": [2, "tab", {
			"indentLogicalExpressions": true,
			"checkAttributes": true,
		}],

		"react/jsx-indent-props": [2, "tab"],
		"react/jsx-fragments": [2, "element"],

		"react/jsx-curly-newline": ["error", {
			"multiline": "consistent",
			"singleline": "consistent",
		}],

		"react/jsx-curly-brace-presence": ["error", {
			"props": "never",
		}],

		"react/jsx-closing-tag-location": 2,
		"react/jsx-closing-bracket-location": [2, "tag-aligned"],

		"react/function-component-definition": ["error", {
			"namedComponents": "arrow-function",
			"unnamedComponents": "arrow-function",
		}],
    },
};
