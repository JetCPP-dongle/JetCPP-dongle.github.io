

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        secondary: '#06B6D4',
        tertiary: '#10B981',
        accent: '#F59E0B',
        danger: '#EF4444',
        glass: 'rgba(255, 255, 255, 0.25)',
        glassDark: 'rgba(255, 255, 255, 0.1)',
        textPrimary: '#1F2937',
        textSecondary: '#6B7280',
        textLight: '#F9FAFB'
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-inset': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.5)',
      }
    }
  },
  plugins: [],
}

