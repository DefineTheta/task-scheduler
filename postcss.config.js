// postcss.config.js
const purgecss = require('@fullhuman/postcss-purgecss')({
  // Specify the paths to all of the template files in your project
  content: [
    './client/src/**/*.html',
    './client/src/**/*.vue',
    './client/src/**/*.jsx',
    // etc.
  ],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
});

// module.exports = {
//   plugins: [
//     require('postcss-import'),
//     require('tailwindcss'),
//     require('autoprefixer'),
//     require('cssnano'),
//     purgecss,
//   ],
// };

module.exports = {
  plugins: [require('postcss-import'), require('tailwindcss'), require('autoprefixer')],
};
