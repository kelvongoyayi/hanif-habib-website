# Customization Guide

This document provides comprehensive instructions for customizing the Hanif Habib & Cco. website to fit specific needs and requirements.

## Table of Contents

- [Theme Customization](#theme-customization)
  - [Colors](#colors)
  - [Typography](#typography)
  - [Spacing and Layout](#spacing-and-layout)
- [Content Customization](#content-customization)
  - [Text Content](#text-content)
  - [Images](#images)
  - [Services and Team Members](#services-and-team-members)
- [Component Customization](#component-customization)
  - [Adding New Pages](#adding-new-pages)
  - [Adding New Components](#adding-new-components)
  - [Modifying Existing Components](#modifying-existing-components)
- [Advanced Customization](#advanced-customization)
  - [Adding Animations](#adding-animations)
  - [Adding Third-Party Integrations](#adding-third-party-integrations)
  - [Performance Optimization](#performance-optimization)

## Theme Customization

### Colors

The color palette is defined in the Tailwind configuration file (`tailwind.config.js`).

#### Primary and Accent Colors

To change the primary color scheme:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        primary: '#0404A5',       // Deep Blue - Main brand color
        'primary-dark': '#03036e', // Darker shade for hover states
        accent: {
          orange: '#FF9F2C',      // Orange accent
          red: '#D30000'          // Red accent
        }
      }
    }
  }
}
```

#### Creating a Cohesive Color Scheme

For best results, create a complete color palette with primary, secondary, and accent colors along with their various shades. You can use a tool like [Tailwind CSS Color Generator](https://uicolors.app/create) to generate a cohesive palette.

### Typography

#### Font Family

To change the fonts:

1. Update the Google Fonts import in `index.html`:

```html
<!-- index.html -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@400;500;600;700&display=swap" rel="stylesheet">
```

2. Modify the font family definitions in `tailwind.config.js`:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      fontFamily: {
        heading: ['Raleway', 'sans-serif'],
        sans: ['Poppins', 'sans-serif'],
      }
    }
  }
}
```

3. Update the CSS custom properties in `src/styles/styles.css`:

```css
/* src/styles/styles.css */
.font-sans {
  font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}

.font-heading {
  font-family: 'Raleway', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
}
```

#### Font Sizes and Weights

Customize font sizes and weights in the Tailwind configuration:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      fontSize: {
        'display-1': ['3.815rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'display-2': ['3.052rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'h1': ['2.441rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        // Additional custom sizes
      },
      fontWeight: {
        'light': '300',
        'regular': '400',
        'medium': '500',
        'semibold': '600',
        'bold': '700',
      }
    }
  }
}
```

### Spacing and Layout

#### Container Width

To adjust the overall container width:

```css
/* src/styles/styles.css */
@layer components {
  .container {
    @apply max-w-7xl mx-auto px-4 lg:px-8;
  }
}
```

#### Custom Spacing

Define custom spacing values in Tailwind:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      spacing: {
        'section': '6rem',      // Standard section padding
        'section-sm': '4rem',   // Smaller section padding
        'section-lg': '8rem',   // Larger section padding
        'gap-standard': '2rem', // Standard gap between elements
      }
    }
  }
}
```

## Content Customization

### Text Content

#### Component Text

Text content is stored within the components. To update text:

1. Locate the component containing the text you want to change in the `src/components` directory.
2. Update the text within the component:

```tsx
// src/components/home/Hero.tsx
// Change this:
<h1 className="text-4xl font-bold">Premier Accounting & Advisory Services</h1>

// To this:
<h1 className="text-4xl font-bold">Expert Financial & Business Advisory</h1>
```

#### Creating Content Files

For larger content sections, create separate data files in `src/data` directory:

```tsx
// src/data/services.ts
export const services = [
  {
    id: 1,
    title: "Audit Services",
    description: "Comprehensive internal and external audit with CIA-backed processes.",
    icon: "shield", // Lucide icon name
    link: "/services/audit",
    features: ["Internal Audit", "External Audit", "Compliance Review"]
  },
  // Additional services
];
```

Then import this data into your components:

```tsx
// src/components/home/ServiceHighlights.tsx
import { services } from '../../data/services';

const ServiceHighlights = () => {
  return (
    <section>
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </section>
  );
};
```

### Images

#### Replacing Images

To replace images:

1. Add your new images to the `public` directory or `src/assets/images`.
2. Update the image paths in the relevant components:

```tsx
// From this:
<img src="/src/assets/images/original-image.jpg" alt="Description" />

// To this:
<img src="/src/assets/images/new-image.jpg" alt="Updated description" />
```

#### Image Optimization Guidelines

When adding new images:

- Use optimized, web-friendly formats (WebP when possible, otherwise JPEG or PNG)
- Provide different sizes for responsive design using the `srcset` attribute
- Keep file sizes as small as possible without sacrificing quality
- Include meaningful alt text for accessibility
- Consider lazy loading with the `loading="lazy"` attribute

```tsx
<img 
  src="/src/assets/images/optimized-image.webp" 
  srcset="/src/assets/images/optimized-image-small.webp 400w,
          /src/assets/images/optimized-image-medium.webp 800w,
          /src/assets/images/optimized-image.webp 1200w"
  sizes="(max-width: 600px) 400px,
         (max-width: 1200px) 800px,
         1200px"
  alt="Meaningful description of the image" 
  loading="lazy"
  width="800"
  height="600"
/>
```

### Services and Team Members

Services and team members are typically stored in data arrays:

#### Example: Updating Services

```tsx
// src/data/services.ts
export const services = [
  {
    id: 1,
    title: "Audit Services",
    description: "Comprehensive internal and external audit with CIA-backed processes.",
    icon: "shield", // Lucide icon name
    link: "/services/audit",
    features: ["Internal Audit", "External Audit", "Compliance Review"]
  },
  // Modify existing services or add new ones here
];
```

#### Example: Updating Team Members

```tsx
// src/data/team.ts
export const teamMembers = [
  {
    id: 1,
    name: "Hanif Habib",
    position: "Founder & Managing Partner",
    image: "/src/assets/images/team/hanif-habib.jpg",
    bio: "With over 20 years of experience in public accounting...",
    socialLinks: {
      linkedin: "https://linkedin.com/in/hanifhabib",
      twitter: "https://twitter.com/hanifhabib"
    }
  },
  // Modify existing team members or add new ones here
];
```

## Component Customization

### Adding New Pages

To add a new page:

1. Create a new page component in `src/pages`:

```tsx
// src/pages/Services.tsx
import React from 'react';
import Layout from '../components/layout/Layout';
import SectionTitle from '../components/layout/SectionTitle';

const Services = () => {
  return (
    <Layout>
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle
            title="Our Services"
            subtitle="Comprehensive financial and advisory solutions for your business"
            centered
          />
          
          {/* Service listings go here */}
          
        </div>
      </div>
    </Layout>
  );
};

export default Services;
```

2. Add the route in the router configuration:

```tsx
// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
    </Routes>
  );
}
```

### Adding New Components

To add a new component:

1. Create the component file in the appropriate directory under `src/components`:

```tsx
// src/components/services/ServiceCard.tsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  iconName: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  iconName,
  link
}) => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-all duration-300 p-6">
      <div className="flex items-center mb-4">
        {renderIcon(iconName)}
        <h3 className="text-xl font-bold ml-3">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link 
        to={link}
        className="flex items-center text-primary hover:text-primary-dark font-medium"
      >
        Learn more
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
};

// Helper function to render the appropriate icon
const renderIcon = (iconName: string) => {
  // Implementation depends on your icon library
};

export default ServiceCard;
```

2. Import and use the component where needed:

```tsx
import ServiceCard from '../components/services/ServiceCard';

// Usage
<ServiceCard 
  title="Financial Audit" 
  description="Comprehensive financial audit services" 
  iconName="shield"
  link="/services/financial-audit"
/>
```

### Modifying Existing Components

To modify an existing component:

1. Locate the component in the `src/components` directory
2. Make your changes while maintaining the component's interface
3. Test the component to ensure it works as expected

Example of modifying a component:

```tsx
// Original Button component
const Button = ({ children, variant = 'primary' }) => {
  return (
    <button className={`px-4 py-2 rounded ${variant === 'primary' ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'}`}>
      {children}
    </button>
  );
};

// Modified Button component with additional variants
const Button = ({ children, variant = 'primary', size = 'medium' }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary': return 'bg-primary text-white hover:bg-primary-dark';
      case 'secondary': return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
      case 'outline': return 'bg-transparent border border-primary text-primary hover:bg-primary hover:text-white';
      default: return 'bg-primary text-white hover:bg-primary-dark';
    }
  };
  
  const getSizeClasses = () => {
    switch (size) {
      case 'small': return 'px-3 py-1 text-sm';
      case 'medium': return 'px-4 py-2';
      case 'large': return 'px-6 py-3 text-lg';
      default: return 'px-4 py-2';
    }
  };
  
  return (
    <button className={`rounded transition-colors duration-300 ${getVariantClasses()} ${getSizeClasses()}`}>
      {children}
    </button>
  );
};
```

## Advanced Customization

### Adding Animations

To add custom animations:

1. Define keyframes in `src/styles/styles.css`:

```css
/* src/styles/styles.css */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
```

2. Add animation classes to the `tailwind.config.js` file:

```js
// tailwind.config.js
export default {
  theme: {
    extend: {
      animation: {
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.6s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      }
    }
  }
}
```

3. Apply animations to components:

```tsx
<div className="animate-fade-in-up">
  <h2 className="text-3xl font-bold">Animated Heading</h2>
</div>

<div className="animate-slide-in-right" style={{ animationDelay: '0.3s' }}>
  <p>This content slides in with a delay</p>
</div>
```

### Adding Third-Party Integrations

For adding integrations like contact forms, analytics, etc:

1. Install the necessary packages:

```bash
npm install [package-name]
```

2. Create a dedicated integration file in `src/utils` or `src/services`:

```tsx
// src/services/analyticsService.ts
export const initializeAnalytics = () => {
  // Implementation
};

export const trackPageView = (path: string) => {
  // Implementation
};

export const trackEvent = (category: string, action: string, label?: string) => {
  // Implementation
};
```

3. Import and use the integration in your components:

```tsx
// src/components/layout/Layout.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { initializeAnalytics, trackPageView } from '../../services/analyticsService';

const Layout = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    initializeAnalytics();
  }, []);
  
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <header>{/* Header content */}</header>
      <main className="flex-grow">{children}</main>
      <footer>{/* Footer content */}</footer>
    </div>
  );
};
```

### Performance Optimization

If you need to further optimize performance:

#### Code Splitting

Use React's lazy loading for components that aren't needed immediately:

```tsx
import React, { lazy, Suspense } from 'react';

// Instead of: import HeavyComponent from './HeavyComponent';
const HeavyComponent = lazy(() => import('./HeavyComponent'));

const MyComponent = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
};
```

#### Image Optimization

Use modern image formats and responsive loading:

```tsx
<picture>
  <source srcset="/images/hero.webp" type="image/webp" />
  <source srcset="/images/hero.jpg" type="image/jpeg" />
  <img 
    src="/images/hero.jpg" 
    alt="Hero image"
    width="1200"
    height="600"
    loading="eager" 
    fetchpriority="high"
  />
</picture>
```

#### State Management

For complex data flows, consider implementing a state management solution:

```tsx
// src/context/AppContext.tsx
import React, { createContext, useContext, useReducer } from 'react';

// Define the state shape
type State = {
  theme: 'light' | 'dark';
  user: any | null;
  // Other state properties
};

// Define actions
type Action = 
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_USER'; payload: any }
  | { type: 'LOGOUT' };

// Initial state
const initialState: State = {
  theme: 'light',
  user: null
};

// Create context
const AppContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

// Reducer
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useApp = () => useContext(AppContext);
```

Then wrap your app with the provider:

```tsx
// src/App.tsx
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        {/* Routes */}
      </Router>
    </AppProvider>
  );
}
```

And use it in components:

```tsx
// src/components/ThemeToggle.tsx
import { useApp } from '../context/AppContext';

const ThemeToggle = () => {
  const { state, dispatch } = useApp();
  
  const toggleTheme = () => {
    dispatch({ 
      type: 'SET_THEME', 
      payload: state.theme === 'light' ? 'dark' : 'light' 
    });
  };
  
  return (
    <button onClick={toggleTheme}>
      Toggle to {state.theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
};
```