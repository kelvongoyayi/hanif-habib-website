# Hanif Habib & Cco. - Professional Website

A modern, responsive website for Hanif Habib & Cco., a professional accounting and advisory firm based in Tanzania. This project showcases the firm's services, expertise, and professional credentials in a clean, user-friendly interface.

## Project Overview

This website is built using modern web technologies to ensure optimal performance, accessibility, and maintainability:

- **React**: For component-based UI development
- **Vite**: For fast development and optimized builds
- **Tailwind CSS**: For utility-first styling
- **Lucide React**: For consistent, professional iconography

### Brand Colors

- Primary: #0404A5 (Deep Blue)
- Accent Orange: #FF9F2C
- Accent Red: #D30000

### Typography

- Headings: Raleway (sans-serif)
- Body: Poppins (sans-serif)

## Features

- Responsive design that works seamlessly on desktop, tablet, and mobile devices
- Modern UI with subtle animations and transitions
- Optimized for performance and SEO
- Comprehensive information architecture covering all aspects of the firm's services
- Professional visual design aligned with the firm's brand identity

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd [repository-name]
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Build for production
```bash
npm run build
# or
yarn build
```

## Project Structure

```
│
├── public/              # Public assets
│   └── favicon.svg      # Favicon
│
├── src/                 # Source files
│   ├── components/      # React components
│   │   ├── common/      # Common components used across multiple pages
│   │   ├── home/        # Components specific to the home page
│   │   └── layout/      # Layout components (Header, Footer, etc.)
│   │
│   ├── pages/           # Page components
│   │   ├── Home.tsx     # Home page
│   │   └── About.tsx    # About page
│   │
│   ├── styles/          # Global styles and Tailwind configuration
│   │   └── styles.css   # Main CSS file with Tailwind imports
│   │
│   ├── App.tsx          # Main App component
│   ├── index.css        # CSS entry point
│   ├── main.tsx         # Application entry point
│   └── vite-env.d.ts    # Vite environment typings
│
├── docs/                # Documentation
│
├── .eslintrc.cjs        # ESLint configuration
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── postcss.config.js    # PostCSS configuration for Tailwind
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── README.md            # Project README
```

## Available Pages

1. **Home** - Main landing page with hero section, services overview, about snippet, and call to action
2. **About** - Detailed information about the firm, including history, values, and credentials

## Documentation

For more detailed information, see the following documents in the `docs/` folder:

- [Implementation Details](./docs/IMPLEMENTATION.md) - Technical details and architecture
- [Customization Guide](./docs/CUSTOMIZATION.md) - How to customize the site for specific needs
- [Deployment Guide](./docs/DEPLOYMENT.md) - Instructions for deploying the site to production

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Contact

For inquiries related to this project, please contact [contact information].