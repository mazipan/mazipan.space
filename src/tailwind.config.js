module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: ["_site/**/*.html", "/**/*.njk"],
    options: {
      whitelist: [],
    },
  },
  theme: {
    extend: {
      colors: {
      },
    },
  },
  variants: {},
  plugins: [],
};
