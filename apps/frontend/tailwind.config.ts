// !-- Do not use TS and import/export keywords since this config file will not
// resolved as a TS file or a module file
const windmill = require('@windmill/react-ui/config');

module.exports = windmill({
  mode: 'jit',
  purge: ['**/src/**/*.{[tj]s?(x),html}'],
  darkMode: 'media',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
});
