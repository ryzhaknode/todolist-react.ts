import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}', // залежно від проєкту
    ],
    theme: {
        extend: {
            colors: {
                background: '#f9fafb',
                foreground: '#111827',
                primary: '#6366f1',
            },
        },
    },
    plugins: [],
}

export default config
