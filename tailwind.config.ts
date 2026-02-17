import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Vert Capital brand colors - Montfort-inspired sophisticated palette
        primary: {
          50: '#E6F2F2',
          100: '#CCE5E5',
          200: '#99CBCB',
          300: '#66B0B0',
          400: '#339696',
          500: '#0A4D4D',  // Main deep teal (Montfort signature)
          600: '#083E3E',
          700: '#062E2E',
          800: '#041F1F',
          900: '#020F0F',
        },
        cream: {
          50: '#FFFFFF',
          100: '#FAF9F6',
          200: '#F5F3ED',
          300: '#F0EDE4',
          400: '#EBE7DB',
          500: '#E5E0D4',
        },
        accent: {
          gold: '#C9A961',
          brass: '#D4AF37',
          goldLight: '#E8D5A0',
          goldDark: '#A68B3C',
        },
        // Keep secondary for text colors
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        // CoreConnect admin branding - DO NOT CHANGE
        coreconnect: {
          orange: '#FF7B42',
          red: '#D14D15',
          slate: '#1E293B',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Helvetica Neue', 'sans-serif'],
        // Keep legacy font refs for CJK
        'noto-sc': ['var(--font-noto-sc)', 'sans-serif'],
        'noto-jp': ['var(--font-noto-jp)', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 5.5vw, 4.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display': ['clamp(2rem, 4.5vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.01em', fontWeight: '400' }],
        'heading-xl': ['clamp(1.75rem, 4vw, 3.5rem)', { lineHeight: '1.15', fontWeight: '400' }],
        'heading-lg': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', fontWeight: '400' }],
        'heading-md': ['clamp(1.25rem, 2.5vw, 2rem)', { lineHeight: '1.3', fontWeight: '400' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '1400px',
        '9xl': '1600px',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-up': 'fadeUp 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in': 'slideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      transitionTimingFunction: {
        'montfort': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'elegant': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'elegant-lg': '0 8px 40px rgba(0, 0, 0, 0.12)',
        'card-hover': '0 12px 48px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
