/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep space background system
        'bg-deep': '#020203',
        'bg-base': '#050506',
        'bg-elevated': '#0a0a0c',
        
        // Surface colors with transparency
        surface: 'rgba(255,255,255,0.05)',
        'surface-hover': 'rgba(255,255,255,0.08)',
        
        // Foreground/text colors
        foreground: '#EDEDEF',
        'foreground-muted': '#8A8F98',
        'foreground-subtle': 'rgba(255,255,255,0.60)',
        
        // Accent - Indigo
        accent: '#5E6AD2',
        'accent-bright': '#6872D9',
        'accent-glow': 'rgba(94,106,210,0.3)',
        
        // Border colors
        'border-default': 'rgba(255,255,255,0.06)',
        'border-hover': 'rgba(255,255,255,0.10)',
        'border-accent': 'rgba(94,106,210,0.30)',
        
        // Legacy aliases for compatibility
        background: '#050506',
        muted: '#0F0F12',
        'muted-foreground': '#8A8F98',
        border: 'rgba(255,255,255,0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'Geist Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite',
        'float-delayed': 'float 10s ease-in-out infinite 2s',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1deg)' },
        },
        shimmer: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.2' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
