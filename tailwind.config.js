module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            transparent: 'transparent',
            primary: '#D52F56',
            secondary: '#8d1f39',
            white: '#fff',
            background: {
                0: '#000000',
                1: '#0F1115',
                2: '#19181F',
                3: '#222128',
            },
            text: {
                0: '#fff',
                1: '#59565D',
                2: '',
            },
        },
        screens: {
            '2xl': { max: '1535px' },
            // => @media (max-width: 1535px) { ... }

            xl: { max: '1279px' },
            // => @media (max-width: 1279px) { ... }

            lg: { max: '1023px' },
            // => @media (max-width: 1023px) { ... }

            md: { max: '767px' },
            // => @media (max-width: 767px) { ... }

            sm: { max: '639px' },
            // => @media (max-width: 639px) { ... }
            xs: { max: '380px' },
        },
        extend: {
            keyframes: {
                fadeIn: {
                    '0%': {
                        opacity: '0',
                    },
                    '100%': {
                        opacity: '1',
                    },
                },
                slideIn: {
                    '0%': {
                        transform: 'translateX(-100%)',
                    },
                    '100%': {
                        transform: 'translateX(0)',
                    },
                },
            },
            animation: {
                fadeIn: 'fadeIn 0.2s ease-in-out',
                slideIn: 'slideIn 0.5s ease',
            },
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        // ...
    ],
};
