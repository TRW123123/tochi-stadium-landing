/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                'erpa-red': '#E31E24',
                'erpa-navy': '#0A1930',
                'tochi-blue': '#0055FF',
                'dark-gray': '#212529',
                'medium-gray': '#6C757D',
                'light-gray': '#F8F9FA',
                'tochi-orange': '#FF6B00',
                'tochi-dark': '#050505'
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
                display: ['Poppins', 'sans-serif']
            }
        },
    },
    plugins: [],
}
