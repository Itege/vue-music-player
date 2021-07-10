/** @type {import('@types/eslint').CLIEngine.Options} */
module.exports = {
	root: true,
	env: {
		browser: true,
	},
	parser: 'vue-eslint-parser',
	plugins: ["@typescript-eslint"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		'plugin:vue/vue3-recommended', // this is a default sub-set of rules for your .vue files
		'@vue/typescript/recommended', // default typescript related rules
	],
	rules: {
		"no-debugger": process.env.NODE_ENV === "development" ? "warn" : "error", // Allow debugger statements while developing
 
		// Rules about delimiters, such as braces, commas, semicolons, etc.
		"curly": "error", // Always use curly braces
		"brace-style": "off", // Has TS version
		"@typescript-eslint/brace-style": "error", // Require braces on same line
		"object-curly-spacing": "off", // Has TS version
		"@typescript-eslint/object-curly-spacing": ["error"], // Disallow spaces inside of braces
		"semi": "off", // Has TS version
		"@typescript-eslint/semi": "error", // Require braces on same line
		"comma-spacing": "off", // Has TS version
		"@typescript-eslint/comma-spacing": "error", // Require space after commas, and not before
		"comma-dangle": "off", // Has TS version
		"@typescript-eslint/comma-dangle": ["error", {
			"functions": "only-multiline", // function(a, b,) {} -- Comma after b is disallowed, okay if multiline
			"generics": "only-multiline", // type Generic<A, B,> -- Comma after B is disallowed, okay if multiline
			"tuples": "only-multiline", // type Foo = [Bar, Baz,] -- Comma after 'Baz' is disallowed, okay if multiline
 
			"arrays": "always-multiline", // [1, 2, 3,] -- Comma after 3 is disallowed, required if multiline
			"objects": "always-multiline", // {a: 1, b: 2,} -- Comma after 2 disallowed, required if multiline
			"imports": "always-multiline", // import {a, b,} from './file' -- Comma after b disallowed, required if multiline
			"exports": "always-multiline", // export {a, b,} -- Comma after b disallowed, required if multiline
			"enums": "always-multiline", // enum {A, B,} -- Comma after B is disallowed, required if multiline
		}],
		"dot-notation": "off", // Has TS version
		"@typescript-eslint/dot-notation": ["error"], // Don't use obj["prop"] when prop is a string constant.
		"@typescript-eslint/member-delimiter-style": "off", // I haven't decided what I like
 
 
 
		// Rules about indentation and whitespace
		"indent": ["error", "tab", { // Tabs for indentation
			"SwitchCase": 1, // Indent cases inside switches
		}],
		"vue/script-indent": ["error", "tab", { // Tabs for indentation
			"switchCase": 1, // The 's' is lowercase on the vue version for some reason
		}],
		"vue/html-indent": ["error", "tab"], // Tabs for indentation
		"no-mixed-spaces-and-tabs": ["error", "smart-tabs"], // Tabs for indentation, spaces for alignment
 
		"vue/no-irregular-whitespace": ["error"], // Disallow non-standard whitespace characters
		"vue/padding-line-between-blocks": ["error"], // Require a blank line between sections of a single-file component
 
		"padding-line-between-statements": ["error",
			{"blankLine": "always", "prev": "import", "next": "*"}, // Require a blank line after imports
			{"blankLine": "any", "prev": "import", "next": "import"}, // But don't force one between imports
		],
 
		"vue/singleline-html-element-content-newline": ["off"], // Why would I want my components to be 4000 lines long?
		"vue/multiline-html-element-content-newline": ["off"], // Allow content to be on the same line as the opening tag
		"vue/max-attributes-per-line": ["error", {
			"singleline": 5, // Up to five attributes before it *has* to be broken onto multiple lines, but typically this should cap around three.
			"multiline": 1, // Only one per line if it's broken down
		}],
 
		"func-call-spacing": ["off"], // Has TS version
		"@typescript-eslint/func-call-spacing": ["error"], // Ensure no space between function name and argument list
		"vue/func-call-spacing": ["error"], // Ensure no space between function name and argument list
 
		"keyword-spacing": "off", // Has TS version
		"@typescript-eslint/keyword-spacing": ["error"], // Ensure spacing similar to our Java style
 
 
 
		// Rules about code cleanliness
		"no-unused-vars": "off", // Has TS version
		"@typescript-eslint/no-unused-vars": ["error"], // Disallow unused variables
 
		"@typescript-eslint/no-explicit-any": "error", // Require variables to be typed
 
		"no-duplicate-imports": ["off"], // Has TS version
		"@typescript-eslint/no-duplicate-imports": ["error"], // Keep the imports section clean.
 
		"@typescript-eslint/no-throw-literal": ["error"], // Throwing a literal doesn't provide a stack trace
 
		"vue/no-multiple-objects-in-class": ["error"], // Only one object can be passed to :class
		"vue/no-reserved-component-names": ["error"], // Don't name components things like "div"
		"vue/no-unused-properties": ["error"], // Make sure we don't declare properties we aren't using
		"vue/no-unused-refs": ["error"], // Make sure we don't declare refs we aren't using
		"vue/require-name-property": ["error"], // Require component names, it makes debugging easier
		"vue/v-on-function-call": ["error"], // Pass a method reference to @event handlers; don't call the method
		"vue/next-tick-style": ["error", "callback"], // Pass a callback to nextTick instead of using it as a promise. These work the same way, but consistency is important for readability.
		"vue/component-name-in-template-casing": ["error", "kebab-case"], // 
		"vue/no-useless-v-bind": ["error"], // Why compute literals?
		"vue/html-self-closing": ["error", { // Write all tags as self-closing if there's no content
			"html": {
				"void": "always", // Just make it work like XML
			},
		}],
		"vue/html-quotes": ["error", "double", {"avoidEscape": true}], // Require double-quotes unless the value contains them
		"vue/no-template-target-blank": ["error"], // Ensure noopener & noreferrer on links that open in new tabs
		"vue/mustache-interpolation-spacing": ["error", "never"], // No spaces inside templates
		"vue/no-useless-mustaches": ["error"], // Don't template literal values
		"vue/no-static-inline-styles": ["error"], // If we need an inline style, create a class for it (especially since we're using tailwind)
 
		//"vue/html-button-has-type": ["error"], // Use typed buttons
		//"vue/match-component-file-name": ["error", { // Name components after their file to make them easier to find
		//	"extensions": ["vue"]
		//}],
 
 
		// Rules about code correctness
		"eqeqeq": ["error"], // Use triple-equals comparisons, for type-safety.
		"vue/eqeqeq": ["error"], // Use triple-equals comparisons, for type-safety.
 
		"vue/no-potential-component-option-typo": ["error", { // Check that we don't mistype any component options
			"presets": ["vue", "vue-router"],
		}],
		"vue/no-unregistered-components": ["error"], // Require all components to be registered
		"vue/valid-next-tick": ["error"], // Make sure nextTick calls are actually doing something
 
		"vue/no-duplicate-attr-inheritance": ["error"], // Ensure that we disable inheritAttrs on the root element if we use v-bind="$attrs" on a child
 
	},
	overrides: [
		{
			"files": ["*.vue"],
			"rules": {
				"indent": "off", // vue/script-indent does the same thing, but only for .vue files.
			},
		},
	],
	parserOptions: {
		project: ["./tsconfig.json", "./tests/tsconfig.json"],
		parser: '@typescript-eslint/parser', // the typescript-parser for eslint, instead of tslint
		sourceType: 'module', // allow the use of imports statements
		ecmaVersion: 2018, // allow the parsing of modern ecmascript
	},
};