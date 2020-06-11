// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        sm: '320px',
        // => @media (min-width: 640px) { ... }
      },
      spacing: {
        icon: '0.875rem',
        25: '0.625rem',
        14: '3.5rem',
        28: '7rem',
        30: '7.5rem',
        48: '12rem',
        50: '12.5rem',
        54: '13.5rem',
        65: '16.25rem',
        74: '18.5rem',
        81: '20.25rem',
        86: '21.5rem',
        92: '23rem',
        94: '23.5rem',
        100: '25rem',
        108: '27rem',
        116: '29rem',
        144: '36rem',
        162: '40.5rem',
        '1/2': '50vh',
      },
      minWidth: {
        '2xs': '19rem',
        120: '30rem',
      },
      maxWidth: {
        160: '40rem',
      },
      minHeight: {
        16: '4rem',
        28: '7rem',
        120: '30rem',
      },
      fontSize: {
        '4xxl': '2.5rem',
      },
      inset: {
        16: '4rem',
      },
      borderRadius: {
        normal: '5px',
        4: '16px',
      },
      borderColor: {
        'black-secondary': 'rgba(0, 0, 0, 0.60)',
        'grey-dark': '#CCCCCC',
        selected: '#232943',
      },
      backgroundColor: {
        'nav-blue': '#232943',
        'side-grey': '#E6E6E6',
        'highlight-grey': '#D8D8D8',
      },
      textColor: {
        'black-primary': 'rgba(0, 0, 0, 0.87)',
        'black-secondary': 'rgba(0, 0, 0, 0.60)',
      },
      boxShadow: {
        '4dp':
          '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);',
        '8dp':
          '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const selectUtilities = {
        '.unselectable': {
          '-webkit-user-select': 'none',
          '-khtml-user-select': 'none',
          '-moz-user-select': 'none',
          '-ms-user-select': 'none',
          'user-select': 'none',
        },
      };

      addUtilities(selectUtilities);
    },
  ],
};
