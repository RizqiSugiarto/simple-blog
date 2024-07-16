/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                purpleCustom: '#7164AF'
            }
        }
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: [
            {
                light: {
                    primary: '#7164AF',
                    '.btn-xs': {
                        height: '2rem',
                        'min-height': '2rem'
                    }
                }
            }
        ]
    }
};
