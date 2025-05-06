
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// TSRS custom colors
				tsrs: {
					background: '#0B0E14',
					card: '#131A24',
					accent: '#00CFC9',
					'accent-hover': '#00F0EA',
					warning: '#FFC700',
					danger: '#EA384C',
					'danger-hover': '#F4475A',
					text: '#E2E8F0',
					'text-secondary': '#94A3B8',
					border: '#1E293B',
					glow: '#00CFC950'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						boxShadow: '0 0 4px 2px rgba(0, 207, 201, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 8px 4px rgba(0, 207, 201, 0.6)'
					}
				},
				'pulse-danger': {
					'0%, 100%': {
						boxShadow: '0 0 4px 2px rgba(234, 56, 76, 0.4)'
					},
					'50%': {
						boxShadow: '0 0 8px 4px rgba(234, 56, 76, 0.6)'
					}
				},
				'data-ping': {
					'0%': {
						transform: 'scale(1)',
						opacity: '1'
					},
					'75%, 100%': {
						transform: 'scale(1.2)',
						opacity: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateY(10px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s infinite ease-in-out',
				'pulse-danger': 'pulse-danger 1.5s infinite ease-in-out',
				'data-ping': 'data-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
				'fade-in': 'fade-in 0.3s ease-in-out',
				'slide-in': 'slide-in 0.4s ease-out'
			},
			fontFamily: {
				'cyber': ['Rajdhani', 'Orbitron', 'sans-serif'],
				'mono': ['JetBrains Mono', 'monospace']
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
