module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or "media" or "class"
  theme: {
    extend: {},
	screens: {
		"sm": "640px",
		"md": "768px",
		"lg": "1024px",
		"xl": "1280px",
		"2xl": "1536px",
		"3xl": "1700px"
	}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
