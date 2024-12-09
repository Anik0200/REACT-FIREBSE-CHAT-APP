/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '200px',
                lg: '200px',
                xl: '300px',
                '2xl': '400px',
            },
        },

        extend: {
            colors: {
                'primary': '#B0D8DA',
            }
        },
        fontFamily: {
            'poppins': ['Poppins', 'sans-serif'],
        },
    },
    plugins: [],
}
