# Design System Documentation
## Hanif Habib & Cco. Website Design System

### 📋 **Overview**

This document defines the complete design system for the Hanif Habib & Cco. website, including colors, typography, spacing, components, and interaction patterns. This system ensures consistency, scalability, and maintainability across all pages and features.

---

## 🎨 **Color System**

### **Primary Colors**

```css
/* Primary Blue */
:root {
  --primary-50: #E6E6F8;
  --primary-100: #CCCCF1;
  --primary-200: #9999E3;
  --primary-300: #6666D5;
  --primary-400: #3333C7;
  --primary-500: #0404A5;    /* Main brand color */
  --primary-600: #03038F;
  --primary-700: #03036E;
  --primary-800: #020252;
  --primary-900: #01013D;
}
```

### **Accent Colors**

```css
/* Orange Accent */
:root {
  --accent-orange-50: #FFF4E6;
  --accent-orange-100: #FFE9CC;
  --accent-orange-200: #FFD399;
  --accent-orange-300: #FFBD66;
  --accent-orange-400: #FFA733;
  --accent-orange-500: #FF9F2C;  /* Main orange */
  --accent-orange-600: #E68A19;
  --accent-orange-700: #CC7A0F;
  --accent-orange-800: #B36B0A;
  --accent-orange-900: #995C08;
}

/* Red Accent */
:root {
  --accent-red-50: #FFE6E6;
  --accent-red-100: #FFCCCC;
  --accent-red-200: #FF9999;
  --accent-red-300: #FF6666;
  --accent-red-400: #FF3333;
  --accent-red-500: #D30000;     /* Main red */
  --accent-red-600: #B30000;
  --accent-red-700: #930000;
  --accent-red-800: #730000;
  --accent-red-900: #530000;
}
```

### **Neutral Colors**

```css
/* Gray Scale */
:root {
  --neutral-0: #FFFFFF;
  --neutral-50: #F8FAFC;
  --neutral-100: #F1F5F9;
  --neutral-200: #E2E8F0;
  --neutral-300: #CBD5E1;
  --neutral-400: #94A3B8;
  --neutral-500: #64748B;
  --neutral-600: #475569;
  --neutral-700: #334155;
  --neutral-800: #1E293B;
  --neutral-900: #0F172A;
}
```

### **Semantic Colors**

```css
/* Status Colors */
:root {
  --success-50: #ECFDF5;
  --success-500: #16A34A;
  --success-600: #15803D;
  
  --warning-50: #FFFBEB;
  --warning-500: #D97706;
  --warning-600: #C2410C;
  
  --error-50: #FEF2F2;
  --error-500: #DC2626;
  --error-600: #B91C1C;
  
  --info-50: #EFF6FF;
  --info-500: #2563EB;
  --info-600: #1D4ED8;
}
```

### **Color Usage Guidelines**

#### **Primary Usage**
- **Primary Blue**: Main brand color, navigation, buttons, links
- **Orange Accent**: Call-to-action elements, highlights, active states
- **Red Accent**: Important alerts, error states, critical actions

#### **Background Applications**
```css
/* Light backgrounds for content sections */
.bg-light { background-color: var(--neutral-50); }
.bg-white { background-color: var(--neutral-0); }

/* Colored backgrounds for emphasis */
.bg-primary-light { background-color: var(--primary-50); }
.bg-orange-light { background-color: var(--accent-orange-50); }
```

---

## 📝 **Typography System**

### **Font Families**

```css
:root {
  /* Primary font for body text */
  --font-sans: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  /* Heading font */
  --font-heading: 'Raleway', Georgia, 'Times New Roman', serif;
  
  /* Monospace for code */
  --font-mono: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
}
```

### **Type Scale**

```css
/* Heading Sizes */
:root {
  --text-display: 3.75rem;    /* 60px - Hero headlines */
  --text-h1: 3rem;           /* 48px - Page titles */
  --text-h2: 2.25rem;        /* 36px - Section headers */
  --text-h3: 1.875rem;       /* 30px - Subsection headers */
  --text-h4: 1.5rem;         /* 24px - Card titles */
  --text-h5: 1.25rem;        /* 20px - Small headers */
  --text-h6: 1.125rem;       /* 18px - Smallest headers */
}

/* Body Text Sizes */
:root {
  --text-xl: 1.25rem;        /* 20px - Large body text */
  --text-lg: 1.125rem;       /* 18px - Emphasized body text */
  --text-base: 1rem;         /* 16px - Default body text */
  --text-sm: 0.875rem;       /* 14px - Small text */
  --text-xs: 0.75rem;        /* 12px - Captions, labels */
}
```

### **Line Heights**

```css
:root {
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

### **Font Weights**

```css
:root {
  --font-light: 300;
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  --font-extrabold: 800;
}
```

### **Typography Components**

#### **Heading Styles**
```css
.heading-display {
  font-family: var(--font-heading);
  font-size: var(--text-display);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
}

.heading-1 {
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  letter-spacing: -0.025em;
}

.heading-2 {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--font-semibold);
  line-height: var(--leading-snug);
}
```

#### **Body Text Styles**
```css
.body-large {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: var(--font-normal);
  line-height: var(--leading-relaxed);
}

.body-base {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}

.body-small {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  font-weight: var(--font-normal);
  line-height: var(--leading-normal);
}
```

---

## 📐 **Spacing System**

### **Space Scale**

```css
:root {
  --space-px: 1px;
  --space-0: 0;
  --space-1: 0.25rem;    /* 4px */
  --space-2: 0.5rem;     /* 8px */
  --space-3: 0.75rem;    /* 12px */
  --space-4: 1rem;       /* 16px */
  --space-5: 1.25rem;    /* 20px */
  --space-6: 1.5rem;     /* 24px */
  --space-8: 2rem;       /* 32px */
  --space-10: 2.5rem;    /* 40px */
  --space-12: 3rem;      /* 48px */
  --space-16: 4rem;      /* 64px */
  --space-20: 5rem;      /* 80px */
  --space-24: 6rem;      /* 96px */
  --space-32: 8rem;      /* 128px */
  --space-40: 10rem;     /* 160px */
  --space-48: 12rem;     /* 192px */
  --space-56: 14rem;     /* 224px */
  --space-64: 16rem;     /* 256px */
}
```

### **Spacing Usage Guidelines**

#### **Layout Spacing**
- **Component internal spacing**: `--space-4` to `--space-8`
- **Section spacing**: `--space-16` to `--space-24`
- **Page margins**: `--space-8` to `--space-12`

#### **Text Spacing**
- **Paragraph spacing**: `--space-4`
- **Heading margin bottom**: `--space-6`
- **List item spacing**: `--space-2`

---

## 🎯 **Component Library**

### **Button Components**

#### **Primary Button**
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  background-color: var(--primary-500);
  color: var(--neutral-0);
  font-family: var(--font-heading);
  font-weight: var(--font-medium);
  font-size: var(--text-base);
  border: 2px solid var(--primary-500);
  border-radius: 0;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
}

.btn-primary:hover {
  background-color: var(--primary-600);
  border-color: var(--primary-600);
  transform: translateY(-1px);
}

.btn-primary:focus {
  outline: 2px solid var(--primary-200);
  outline-offset: 2px;
}
```

#### **Secondary Button**
```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-3) var(--space-6);
  background-color: transparent;
  color: var(--primary-500);
  font-family: var(--font-heading);
  font-weight: var(--font-medium);
  font-size: var(--text-base);
  border: 2px solid var(--primary-500);
  border-radius: 0;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
}

.btn-secondary:hover {
  background-color: var(--primary-500);
  color: var(--neutral-0);
  transform: translateY(-1px);
}
```

#### **Button Sizes**
```css
/* Small */
.btn-sm {
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
}

/* Medium (default) */
.btn-md {
  padding: var(--space-3) var(--space-6);
  font-size: var(--text-base);
}

/* Large */
.btn-lg {
  padding: var(--space-4) var(--space-8);
  font-size: var(--text-lg);
}
```

### **Card Components**

#### **Basic Card**
```css
.card {
  background-color: var(--neutral-0);
  border: 1px solid var(--neutral-200);
  border-radius: var(--space-2);
  padding: var(--space-6);
  transition: all 0.15s ease-in-out;
}

.card:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}
```

#### **Service Card**
```css
.service-card {
  background-color: var(--neutral-0);
  border: 1px solid var(--neutral-200);
  border-radius: var(--space-2);
  padding: var(--space-8);
  text-align: center;
  transition: all 0.25s ease-in-out;
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-500), var(--accent-orange-500));
  transform: scaleX(0);
  transition: transform 0.25s ease-in-out;
}

.service-card:hover::before {
  transform: scaleX(1);
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}
```

### **Form Components**

#### **Input Fields**
```css
.form-input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 2px solid var(--neutral-200);
  border-radius: var(--space-1);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  transition: all 0.15s ease-in-out;
}

.form-input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-100);
}

.form-input::placeholder {
  color: var(--neutral-400);
}
```

#### **Form Labels**
```css
.form-label {
  display: block;
  font-family: var(--font-heading);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--neutral-700);
  margin-bottom: var(--space-2);
}
```

---

## 🎬 **Animation System**

### **Easing Functions**

```css
:root {
  /* Standard easing curves */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Custom brand easing */
  --ease-brand: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

### **Duration Scale**

```css
:root {
  /* Animation durations */
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;
}
```

### **Animation Classes**

#### **Fade Animations**
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn var(--duration-300) var(--ease-out);
}

.animate-fade-in-up {
  animation: fadeInUp var(--duration-500) var(--ease-out);
}
```

#### **Scale Animations**
```css
@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-scale-in {
  animation: scaleIn var(--duration-200) var(--ease-out);
}
```

#### **Slide Animations**
```css
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-slide-in-left {
  animation: slideInLeft var(--duration-500) var(--ease-out);
}

.animate-slide-in-right {
  animation: slideInRight var(--duration-500) var(--ease-out);
}
```

---

## 📱 **Responsive Design System**

### **Breakpoints**

```css
:root {
  --screen-sm: 640px;
  --screen-md: 768px;
  --screen-lg: 1024px;
  --screen-xl: 1280px;
  --screen-2xl: 1536px;
}
```

### **Container Sizes**

```css
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding-left: var(--space-8);
    padding-right: var(--space-8);
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}
```

### **Grid System**

```css
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }

@media (min-width: 768px) {
  .md\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .md\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

@media (min-width: 1024px) {
  .lg\:grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lg\:grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)); }
}
```

---

## ♿ **Accessibility Guidelines**

### **Focus States**

```css
/* Focus ring for interactive elements */
.focus-ring:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Focus for buttons */
.btn:focus {
  outline: 2px solid var(--primary-200);
  outline-offset: 2px;
}

/* Focus for form inputs */
.form-input:focus {
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px var(--primary-100);
}
```

### **Color Contrast Requirements**

- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text**: Minimum 3:1 contrast ratio
- **Interactive elements**: Minimum 3:1 contrast ratio

### **Motion Preferences**

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🔧 **Implementation Guidelines**

### **CSS Custom Properties Usage**

```css
/* Use CSS custom properties for all design tokens */
.example-component {
  color: var(--neutral-700);
  background-color: var(--neutral-0);
  padding: var(--space-4) var(--space-6);
  border-radius: var(--space-2);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
}
```

### **Component Naming Convention**

- **Block**: `.card`, `.button`, `.navbar`
- **Element**: `.card__header`, `.button__icon`, `.navbar__link`
- **Modifier**: `.card--elevated`, `.button--large`, `.navbar--fixed`

### **Utility Classes**

```css
/* Margin utilities */
.m-0 { margin: 0; }
.m-4 { margin: var(--space-4); }
.mb-4 { margin-bottom: var(--space-4); }

/* Padding utilities */
.p-0 { padding: 0; }
.p-4 { padding: var(--space-4); }
.px-4 { padding-left: var(--space-4); padding-right: var(--space-4); }

/* Text utilities */
.text-center { text-align: center; }
.text-primary { color: var(--primary-500); }
.text-lg { font-size: var(--text-lg); }

/* Display utilities */
.hidden { display: none; }
.block { display: block; }
.flex { display: flex; }
.grid { display: grid; }
```

---

## 📚 **Design System Usage**

### **Implementation Checklist**

- [ ] Use design tokens (CSS custom properties) for all styling
- [ ] Follow naming conventions for components and utilities
- [ ] Ensure all interactive elements have proper focus states
- [ ] Test color contrast ratios for accessibility compliance
- [ ] Implement responsive design patterns consistently
- [ ] Use animation system for micro-interactions
- [ ] Follow component composition patterns

### **Quality Assurance**

1. **Visual Consistency**: All components follow design system guidelines
2. **Accessibility**: Meets WCAG 2.1 AA standards
3. **Performance**: Animations are smooth and performant
4. **Responsiveness**: Works across all device sizes
5. **Browser Support**: Compatible with modern browsers

---

## 🔄 **Maintenance & Evolution**

### **Version Control**
- Document all changes to design tokens
- Maintain backwards compatibility when possible
- Communicate breaking changes clearly

### **Regular Reviews**
- Monthly design system audit
- Quarterly component library updates  
- Annual accessibility compliance review

### **Feedback Integration**
- User testing insights
- Developer experience improvements
- Performance optimization recommendations 