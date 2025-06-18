# Performance Optimization Guide
## Hanif Habib & Cco. Website Performance Strategy

### 📋 **Overview**

This document outlines comprehensive performance optimization strategies for the Hanif Habib & Cco. website, focusing on loading speeds, user experience, and technical performance metrics. The goal is to achieve world-class performance while maintaining rich visual content and functionality.

---

## 🎯 **Performance Targets**

### **Core Web Vitals**
- **Largest Contentful Paint (LCP)**: < 2.5 seconds
- **First Input Delay (FID)**: < 100 milliseconds  
- **Cumulative Layout Shift (CLS)**: < 0.1
- **First Contentful Paint (FCP)**: < 1.5 seconds

### **Lighthouse Scores**
- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 90
- **SEO**: > 95

### **User-Centric Metrics**
- **Time to Interactive (TTI)**: < 3.5 seconds
- **Speed Index**: < 3.0 seconds
- **Total Blocking Time (TBT)**: < 200 milliseconds

---

## 🖼️ **Image Optimization Strategy**

### **Modern Image Formats**

#### **WebP Implementation**
```html
<!-- Use WebP with JPEG fallback -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

#### **AVIF for Next-Gen Support**
```html
<!-- Progressive enhancement with AVIF -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### **Responsive Images**

#### **srcset Implementation**
```html
<img 
  src="image-800w.jpg"
  srcset="
    image-400w.jpg 400w,
    image-800w.jpg 800w,
    image-1200w.jpg 1200w,
    image-1600w.jpg 1600w
  "
  sizes="
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  "
  alt="Description"
  loading="lazy"
>
```

#### **Image Size Specifications**
```javascript
// Hero images
const heroImageSizes = {
  mobile: { width: 640, height: 360 },
  tablet: { width: 1024, height: 576 },
  desktop: { width: 1920, height: 1080 },
  retina: { width: 3840, height: 2160 }
};

// Service card images
const cardImageSizes = {
  thumbnail: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 }
};
```

### **Lazy Loading Implementation**

#### **Native Lazy Loading**
```html
<img src="image.jpg" alt="Description" loading="lazy">
```

#### **Intersection Observer Fallback**
```javascript
// Progressive enhancement for older browsers
const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.classList.remove('lazy');
      imageObserver.unobserve(img);
    }
  });
});

document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});
```

### **Image Compression Settings**
```javascript
// Optimal compression settings
const compressionSettings = {
  jpeg: {
    quality: 80,
    progressive: true,
    mozjpeg: true
  },
  webp: {
    quality: 75,
    method: 6,
    nearLossless: false
  },
  avif: {
    quality: 50,
    speed: 6
  }
};
```

---

## ⚡ **Code Optimization**

### **Bundle Splitting Strategy**

#### **Route-Based Splitting**
```javascript
// Lazy load pages
const HomePage = lazy(() => import('../pages/HomePage'));
const AboutPage = lazy(() => import('../pages/AboutPage'));
const ServicesPage = lazy(() => import('../pages/ServicesPage'));

// Implement Suspense boundaries
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/services" element={<ServicesPage />} />
  </Routes>
</Suspense>
```

#### **Component-Based Splitting**
```javascript
// Split heavy components
const Calculator = lazy(() => import('../components/Calculator'));
const VideoPlayer = lazy(() => import('../components/VideoPlayer'));

// Conditional loading
{shouldShowCalculator && (
  <Suspense fallback={<SkeletonLoader />}>
    <Calculator />
  </Suspense>
)}
```

### **Tree Shaking Optimization**

#### **Import Strategy**
```javascript
// Good: Import only what you need
import { debounce } from 'lodash/debounce';

// Bad: Import entire library
import _ from 'lodash';
```

#### **Webpack Configuration**
```javascript
// webpack.config.js
module.exports = {
  optimization: {
    usedExports: true,
    sideEffects: false,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```

### **Critical CSS Strategy**

#### **Above-the-Fold CSS**
```html
<!-- Inline critical CSS -->
<style>
  /* Critical styles for above-the-fold content */
  .navbar { /* navbar styles */ }
  .hero { /* hero styles */ }
  .container { /* container styles */ }
</style>

<!-- Async load non-critical CSS -->
<link rel="preload" href="/styles/non-critical.css" as="style" onload="this.rel='stylesheet'">
```

#### **CSS Purging**
```javascript
// PurgeCSS configuration
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  css: ['./src/**/*.css'],
  whitelist: ['body', 'html'],
  whitelistPatterns: [/^animate-/, /^transition-/]
};
```

---

## 🔤 **Font Optimization**

### **Font Loading Strategy**

#### **Font Display Optimization**
```css
@font-face {
  font-family: 'Poppins';
  src: url('/fonts/poppins-regular.woff2') format('woff2');
  font-display: swap;
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Raleway';
  src: url('/fonts/raleway-bold.woff2') format('woff2');
  font-display: swap;
  font-weight: 700;
  font-style: normal;
}
```

#### **Preload Critical Fonts**
```html
<link rel="preload" href="/fonts/poppins-regular.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/raleway-bold.woff2" as="font" type="font/woff2" crossorigin>
```

### **Font Subsetting**
```javascript
// Generate font subsets for different languages
const fontSubsets = {
  latin: 'U+0020-007F',
  latinExt: 'U+0100-017F',
  numbers: 'U+0030-0039'
};
```

---

## 🚀 **Loading Performance**

### **Resource Prioritization**

#### **Resource Hints**
```html
<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//www.google-analytics.com">

<!-- Preconnect for critical third-party resources -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Preload critical resources -->
<link rel="preload" href="/images/hero-bg.webp" as="image">
<link rel="preload" href="/css/critical.css" as="style">
```

#### **Script Loading Optimization**
```html
<!-- Defer non-critical scripts -->
<script src="/js/analytics.js" defer></script>

<!-- Async load independent scripts -->
<script src="/js/social-widgets.js" async></script>

<!-- Critical scripts inline -->
<script>
  // Critical inline JavaScript
</script>
```

### **Progressive Loading**

#### **Skeleton Screens**
```jsx
const SkeletonCard = () => (
  <div className="animate-pulse">
    <div className="bg-gray-300 h-48 rounded mb-4"></div>
    <div className="bg-gray-300 h-4 rounded mb-2"></div>
    <div className="bg-gray-300 h-4 rounded w-3/4"></div>
  </div>
);

const ServiceCard = () => {
  const [loading, setLoading] = useState(true);
  
  return loading ? <SkeletonCard /> : <ActualCard />;
};
```

#### **Progressive Image Loading**
```jsx
const ProgressiveImage = ({ src, placeholder, alt }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className="relative">
      <img 
        src={placeholder} 
        alt={alt}
        className={`absolute inset-0 transition-opacity duration-300 ${
          imageLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <img 
        src={src} 
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
```

---

## 📊 **Caching Strategy**

### **Browser Caching**

#### **HTTP Headers**
```javascript
// Express.js caching headers
app.use((req, res, next) => {
  if (req.url.match(/\.(css|js|png|jpg|jpeg|gif|webp|svg|woff|woff2)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1 year
  } else {
    res.setHeader('Cache-Control', 'public, max-age=3600'); // 1 hour
  }
  next();
});
```

#### **Service Worker Implementation**
```javascript
// service-worker.js
const CACHE_NAME = 'hanif-habib-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/images/logo.svg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});
```

### **CDN Implementation**
```javascript
// CloudFront configuration
const cdnConfig = {
  origins: [
    {
      domainName: 'hanifhabib.com',
      customOriginConfig: {
        httpPort: 443,
        originProtocolPolicy: 'https-only'
      }
    }
  ],
  defaultCacheBehavior: {
    targetOriginId: 'hanifhabib-origin',
    viewerProtocolPolicy: 'redirect-to-https',
    cachePolicyId: 'managed-caching-optimized'
  }
};
```

---

## 🔧 **Runtime Performance**

### **React Optimization**

#### **Component Memoization**
```jsx
// Memoize expensive components
const ExpensiveComponent = memo(({ data }) => {
  const processedData = useMemo(() => {
    return expensiveProcessing(data);
  }, [data]);
  
  return <div>{processedData}</div>;
});

// Callback memoization
const ParentComponent = () => {
  const handleClick = useCallback((id) => {
    // Handle click logic
  }, []);
  
  return (
    <div>
      {items.map(item => (
        <ChildComponent 
          key={item.id} 
          onClick={handleClick}
        />
      ))}
    </div>
  );
};
```

#### **Virtual Scrolling**
```jsx
import { FixedSizeList as List } from 'react-window';

const VirtualizedList = ({ items }) => (
  <List
    height={400}
    itemCount={items.length}
    itemSize={100}
    itemData={items}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <ListItem item={data[index]} />
      </div>
    )}
  </List>
);
```

### **Debouncing and Throttling**
```javascript
// Debounce search input
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

// Throttle scroll events
const useThrottle = (callback, delay) => {
  const [throttledCallback, setThrottledCallback] = useState(null);
  
  useEffect(() => {
    if (!throttledCallback) {
      setThrottledCallback(() => 
        throttle(callback, delay)
      );
    }
  }, [callback, delay, throttledCallback]);
  
  return throttledCallback;
};
```

---

## 📱 **Mobile Performance**

### **Mobile-Specific Optimizations**

#### **Touch Event Optimization**
```javascript
// Passive event listeners
element.addEventListener('touchstart', handleTouchStart, { passive: true });
element.addEventListener('touchmove', handleTouchMove, { passive: true });

// Optimize touch interactions
const handleTouch = (e) => {
  // Use requestAnimationFrame for smooth animations
  requestAnimationFrame(() => {
    // Touch handling logic
  });
};
```

#### **Reduced Motion Support**
```css
/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### **Progressive Web App Features**

#### **App Manifest**
```json
{
  "name": "Hanif Habib & Cco.",
  "short_name": "HanifHabib",
  "description": "Professional Accounting & Advisory Services",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0404A5",
  "theme_color": "#0404A5",
  "icons": [
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 📈 **Performance Monitoring**

### **Real User Monitoring (RUM)**

#### **Web Vitals Tracking**
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    value: Math.round(metric.value),
    event_label: metric.id,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

#### **Performance Observer**
```javascript
// Monitor long tasks
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    // Log long tasks that block the main thread
    if (entry.duration > 50) {
      console.warn('Long task detected:', entry);
    }
  }
});

observer.observe({ entryTypes: ['longtask'] });
```

### **Automated Performance Testing**

#### **Lighthouse CI Configuration**
```javascript
// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/services'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

---

## 🎯 **Performance Budget**

### **Resource Budgets**
```javascript
const performanceBudget = {
  // JavaScript bundle sizes
  javascript: {
    main: '150KB',
    vendor: '200KB',
    total: '350KB'
  },
  
  // CSS bundle sizes
  css: {
    critical: '15KB',
    total: '50KB'
  },
  
  // Image budgets
  images: {
    hero: '200KB',
    cards: '50KB',
    icons: '5KB'
  },
  
  // Total page weight
  totalPageWeight: '1MB',
  
  // Network requests
  httpRequests: 50
};
```

### **Performance Metrics SLA**
```javascript
const performanceSLA = {
  // Core Web Vitals thresholds
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  
  // Additional metrics
  FCP: { good: 1500, poor: 3000 },
  TTI: { good: 3500, poor: 7300 },
  SI: { good: 3000, poor: 5800 }
};
```

---

## 🔄 **Optimization Checklist**

### **Pre-Launch Checklist**
- [ ] Image optimization and WebP conversion complete
- [ ] Critical CSS extracted and inlined
- [ ] JavaScript bundles split and optimized
- [ ] Fonts preloaded and subset
- [ ] Service worker implemented
- [ ] CDN configuration active
- [ ] Performance monitoring setup
- [ ] Mobile performance tested
- [ ] Accessibility standards met
- [ ] Core Web Vitals within targets

### **Ongoing Monitoring**
- [ ] Monthly performance audits
- [ ] Quarterly optimization reviews
- [ ] Real user monitoring active
- [ ] Performance budget compliance
- [ ] Third-party script audits
- [ ] Image asset optimization
- [ ] Code bundle analysis
- [ ] Server response time monitoring

---

## 🛠️ **Tools and Resources**

### **Performance Testing Tools**
- **Lighthouse**: Automated audits and scoring
- **WebPageTest**: Detailed performance analysis
- **GTmetrix**: Performance monitoring and optimization
- **Chrome DevTools**: Real-time performance debugging

### **Optimization Tools**
- **ImageOptim**: Image compression and optimization
- **PurgeCSS**: Remove unused CSS
- **Webpack Bundle Analyzer**: Visualize bundle sizes
- **web-vitals**: Core Web Vitals measurement

### **Monitoring Services**
- **Google Analytics**: Real user monitoring
- **New Relic**: Application performance monitoring
- **Pingdom**: Uptime and performance monitoring
- **SpeedCurve**: Continuous performance budgeting

This comprehensive performance optimization guide ensures the Hanif Habib & Cco. website delivers exceptional speed and user experience while maintaining rich visual content and functionality. 