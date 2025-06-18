# Component Library Documentation
## Hanif Habib & Cco. Website UI Components

### 📋 **Overview**

This document provides comprehensive documentation for all UI components used in the Hanif Habib & Cco. website. Each component includes usage guidelines, code examples, and implementation specifications to ensure consistency across the entire site.

---

## 🎯 **Component Categories**

1. **Navigation Components**: Header, navigation, breadcrumbs
2. **Layout Components**: Containers, grids, sections
3. **Content Components**: Cards, testimonials, hero sections
4. **Form Components**: Inputs, buttons, form layouts
5. **Interactive Components**: Modals, dropdowns, carousels
6. **Media Components**: Image galleries, video players
7. **Utility Components**: Loading states, alerts, badges

---

## 🧭 **Navigation Components**

### **Navbar Component**

#### **Description**
Primary site navigation with responsive design, dropdown menus, and scroll-based styling changes.

#### **Variants**
- **Default**: Transparent background on scroll top
- **Scrolled**: White background with shadow
- **Mobile**: Collapsed hamburger menu

#### **Props Interface**
```typescript
interface NavbarProps {
  variant?: 'default' | 'scrolled';
  fixed?: boolean;
  className?: string;
}
```

#### **Usage Example**
```jsx
import { Navbar } from '../components/layout/Navbar';

// Basic usage
<Navbar />

// With custom styling
<Navbar className="custom-nav" fixed={true} />
```

#### **Styling Guidelines**
```css
/* Navbar base styles */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  transition: all 0.3s ease;
}

.navbar-default {
  background-color: transparent;
  padding: 1.25rem 0;
}

.navbar-scrolled {
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0;
}
```

### **Breadcrumb Component**

#### **Description**
Navigation aid showing user's location within site hierarchy.

#### **Props Interface**
```typescript
interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}
```

#### **Usage Example**
```jsx
import { Breadcrumb } from '../components/navigation/Breadcrumb';

const breadcrumbItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Audit Services', current: true }
];

<Breadcrumb items={breadcrumbItems} />
```

---

## 📦 **Layout Components**

### **Container Component**

#### **Description**
Responsive container with consistent padding and max-width constraints.

#### **Variants**
- **Default**: Standard container with responsive padding
- **Full**: Full width container
- **Narrow**: Narrower max-width for text content

#### **Props Interface**
```typescript
interface ContainerProps {
  variant?: 'default' | 'full' | 'narrow';
  className?: string;
  children: React.ReactNode;
}
```

#### **Usage Example**
```jsx
import { Container } from '../components/layout/Container';

<Container variant="default">
  <h1>Page Content</h1>
</Container>
```

### **Grid Component**

#### **Description**
Responsive grid system with customizable columns and gaps.

#### **Props Interface**
```typescript
interface GridProps {
  columns?: number;
  gap?: 'sm' | 'md' | 'lg';
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
  className?: string;
  children: React.ReactNode;
}
```

#### **Usage Example**
```jsx
import { Grid } from '../components/layout/Grid';

<Grid 
  columns={3} 
  gap="lg" 
  responsive={{ sm: 1, md: 2, lg: 3 }}
>
  <div>Grid Item 1</div>
  <div>Grid Item 2</div>
  <div>Grid Item 3</div>
</Grid>
```

---

## 🎴 **Content Components**

### **Card Component**

#### **Description**
Flexible content container with multiple variants for different use cases.

#### **Variants**
- **Default**: Basic card with border
- **Elevated**: Card with shadow
- **Service**: Service-specific styling with hover effects
- **Testimonial**: Testimonial-specific layout

#### **Props Interface**
```typescript
interface CardProps {
  variant?: 'default' | 'elevated' | 'service' | 'testimonial';
  padding?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
}
```

#### **Usage Example**
```jsx
import { Card } from '../components/content/Card';

<Card variant="service" padding="lg">
  <h3>Service Title</h3>
  <p>Service description...</p>
</Card>
```

#### **Service Card Implementation**
```jsx
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  link: string;
  features: string[];
  image?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  link,
  features,
  image
}) => {
  return (
    <div className="service-card group">
      {image && (
        <div className="service-card__image">
          <img src={image} alt={title} />
        </div>
      )}
      
      <div className="service-card__content">
        <div className="service-card__icon">
          {icon}
        </div>
        
        <h3 className="service-card__title">{title}</h3>
        <p className="service-card__description">{description}</p>
        
        <ul className="service-card__features">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        
        <Link to={link} className="service-card__link">
          Learn More
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};
```

### **Hero Component**

#### **Description**
Primary page header with background image/video, title, and call-to-action.

#### **Variants**
- **Slider**: Multi-slide hero with navigation
- **Static**: Single hero with background
- **Video**: Hero with video background

#### **Props Interface**
```typescript
interface HeroSlide {
  title: string;
  description: string;
  image: string;
  cta: {
    text: string;
    link: string;
  };
  label?: string;
}

interface HeroProps {
  variant?: 'slider' | 'static' | 'video';
  slides?: HeroSlide[];
  title?: string;
  description?: string;
  backgroundImage?: string;
  videoUrl?: string;
  height?: 'sm' | 'md' | 'lg' | 'xl';
  overlay?: boolean;
}
```

#### **Usage Example**
```jsx
import { Hero } from '../components/content/Hero';

const heroSlides = [
  {
    title: "Premier Accounting Services",
    description: "Professional financial solutions",
    image: "/images/hero-1.jpg",
    cta: { text: "Get Started", link: "/contact" }
  }
];

<Hero variant="slider" slides={heroSlides} />
```

### **Testimonial Component**

#### **Description**
Client testimonial display with author information and rating.

#### **Props Interface**
```typescript
interface TestimonialProps {
  quote: string;
  author: {
    name: string;
    position: string;
    company: string;
    avatar?: string;
  };
  rating?: number;
  variant?: 'default' | 'featured' | 'compact';
}
```

#### **Usage Example**
```jsx
import { Testimonial } from '../components/content/Testimonial';

<Testimonial 
  quote="Exceptional service and professional expertise..."
  author={{
    name: "John Doe",
    position: "CEO",
    company: "Tech Solutions Ltd",
    avatar: "/images/client-avatar.jpg"
  }}
  rating={5}
  variant="featured"
/>
```

---

## 📝 **Form Components**

### **Button Component**

#### **Description**
Customizable button component with multiple variants and states.

#### **Variants**
- **Primary**: Main call-to-action button
- **Secondary**: Secondary actions
- **Outline**: Outlined button style
- **Ghost**: Minimal button style
- **Danger**: Destructive actions

#### **Props Interface**
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
}
```

#### **Usage Example**
```jsx
import { Button } from '../components/form/Button';
import { ArrowRight } from 'lucide-react';

<Button 
  variant="primary" 
  size="lg" 
  icon={<ArrowRight />}
  iconPosition="right"
>
  Get Started
</Button>
```

#### **Button Styles**
```css
/* Button base styles */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 500;
  border: 2px solid transparent;
  transition: all 0.15s ease-in-out;
  cursor: pointer;
  text-decoration: none;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Button variants */
.btn--primary {
  background-color: var(--primary-500);
  color: white;
  border-color: var(--primary-500);
}

.btn--primary:hover {
  background-color: var(--primary-600);
  border-color: var(--primary-600);
  transform: translateY(-1px);
}

.btn--secondary {
  background-color: transparent;
  color: var(--primary-500);
  border-color: var(--primary-500);
}

.btn--secondary:hover {
  background-color: var(--primary-500);
  color: white;
}

/* Button sizes */
.btn--sm {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
}

.btn--md {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
}

.btn--lg {
  padding: 1rem 2rem;
  font-size: 1.125rem;
}
```

### **Input Component**

#### **Description**
Form input field with validation states and various types.

#### **Props Interface**
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';
  label?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}
```

#### **Usage Example**
```jsx
import { Input } from '../components/form/Input';
import { Mail } from 'lucide-react';

<Input 
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  icon={<Mail />}
  iconPosition="left"
  required
/>
```

### **Form Component**

#### **Description**
Complete form wrapper with validation and submission handling.

#### **Props Interface**
```typescript
interface FormProps {
  onSubmit: (data: FormData) => void;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
  title?: string;
  description?: string;
}
```

#### **Usage Example**
```jsx
import { Form, Input, Button } from '../components/form';

<Form 
  title="Contact Us"
  onSubmit={handleSubmit}
  loading={isSubmitting}
>
  <Input name="name" label="Full Name" required />
  <Input name="email" label="Email" type="email" required />
  <Button type="submit" variant="primary">
    Send Message
  </Button>
</Form>
```

---

## 🎪 **Interactive Components**

### **Modal Component**

#### **Description**
Overlay modal for displaying content above the main page.

#### **Props Interface**
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}
```

#### **Usage Example**
```jsx
import { Modal } from '../components/interactive/Modal';

<Modal 
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Service Details"
  size="lg"
>
  <p>Modal content goes here...</p>
</Modal>
```

### **Dropdown Component**

#### **Description**
Dropdown menu component with keyboard navigation support.

#### **Props Interface**
```typescript
interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownProps {
  items: DropdownItem[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  searchable?: boolean;
}
```

#### **Usage Example**
```jsx
import { Dropdown } from '../components/interactive/Dropdown';

const serviceOptions = [
  { label: 'Audit Services', value: 'audit' },
  { label: 'Tax Services', value: 'tax' },
  { label: 'Advisory Services', value: 'advisory' }
];

<Dropdown 
  items={serviceOptions}
  placeholder="Select a service"
  onChange={handleServiceChange}
  searchable
/>
```

### **Carousel Component**

#### **Description**
Image and content carousel with navigation controls.

#### **Props Interface**
```typescript
interface CarouselProps {
  items: React.ReactNode[];
  autoPlay?: boolean;
  interval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  infinite?: boolean;
  responsive?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}
```

#### **Usage Example**
```jsx
import { Carousel } from '../components/interactive/Carousel';

const carouselItems = [
  <img src="/image1.jpg" alt="Image 1" />,
  <img src="/image2.jpg" alt="Image 2" />,
  <img src="/image3.jpg" alt="Image 3" />
];

<Carousel 
  items={carouselItems}
  autoPlay={true}
  interval={5000}
  showDots={true}
/>
```

---

## 🎬 **Media Components**

### **Image Component**

#### **Description**
Optimized image component with lazy loading and responsive sizing.

#### **Props Interface**
```typescript
interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  lazy?: boolean;
  placeholder?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  priority?: boolean;
}
```

#### **Usage Example**
```jsx
import { Image } from '../components/media/Image';

<Image 
  src="/images/team-photo.jpg"
  alt="Hanif Habib & Cco. Team"
  width={800}
  height={600}
  lazy={true}
  objectFit="cover"
/>
```

### **Video Component**

#### **Description**
Video player component with custom controls and accessibility features.

#### **Props Interface**
```typescript
interface VideoProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  width?: number;
  height?: number;
  className?: string;
}
```

#### **Usage Example**
```jsx
import { Video } from '../components/media/Video';

<Video 
  src="/videos/company-overview.mp4"
  poster="/images/video-poster.jpg"
  controls={true}
  width={800}
  height={450}
/>
```

---

## 🔧 **Utility Components**

### **Loading Component**

#### **Description**
Loading indicators for various states and contexts.

#### **Variants**
- **Spinner**: Rotating spinner
- **Skeleton**: Content skeleton loader
- **Dots**: Bouncing dots animation
- **Bar**: Progress bar loader

#### **Props Interface**
```typescript
interface LoadingProps {
  variant?: 'spinner' | 'skeleton' | 'dots' | 'bar';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
}
```

#### **Usage Example**
```jsx
import { Loading } from '../components/utility/Loading';

<Loading variant="spinner" size="md" text="Loading..." />
```

### **Alert Component**

#### **Description**
Alert messages for success, error, warning, and info states.

#### **Props Interface**
```typescript
interface AlertProps {
  variant: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  closable?: boolean;
  onClose?: () => void;
  icon?: React.ReactNode;
}
```

#### **Usage Example**
```jsx
import { Alert } from '../components/utility/Alert';

<Alert 
  variant="success"
  title="Success!"
  message="Your message has been sent successfully."
  closable={true}
  onClose={handleClose}
/>
```

### **Badge Component**

#### **Description**
Small status or count indicators.

#### **Props Interface**
```typescript
interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  dot?: boolean;
}
```

#### **Usage Example**
```jsx
import { Badge } from '../components/utility/Badge';

<Badge variant="primary" size="sm">New</Badge>
```

---

## 🎨 **Component Styling Guidelines**

### **CSS Architecture**
```css
/* Component structure */
.component-name {
  /* Base styles */
}

.component-name__element {
  /* Element styles */
}

.component-name--modifier {
  /* Modifier styles */
}

.component-name.is-state {
  /* State styles */
}
```

### **Animation Standards**
```css
/* Standard transitions */
.component {
  transition: all 0.15s ease-in-out;
}

/* Hover effects */
.component:hover {
  transform: translateY(-2px);
}

/* Focus states */
.component:focus {
  outline: 2px solid var(--primary-200);
  outline-offset: 2px;
}
```

### **Responsive Patterns**
```css
/* Mobile-first approach */
.component {
  /* Mobile styles */
}

@media (min-width: 768px) {
  .component {
    /* Tablet styles */
  }
}

@media (min-width: 1024px) {
  .component {
    /* Desktop styles */
  }
}
```

---

## ♿ **Accessibility Standards**

### **ARIA Implementation**
- Use semantic HTML elements
- Provide ARIA labels for interactive elements
- Implement proper focus management
- Support keyboard navigation

### **Color Contrast**
- Maintain 4.5:1 contrast ratio for normal text
- Maintain 3:1 contrast ratio for large text
- Provide alternative indicators beyond color

### **Screen Reader Support**
- Include descriptive alt text for images
- Use proper heading hierarchy
- Implement live regions for dynamic content
- Provide skip navigation links

---

## 🔄 **Component Lifecycle**

### **Development Process**
1. **Design**: Create component design in design system
2. **Implement**: Build component following guidelines
3. **Test**: Unit tests and accessibility testing
4. **Document**: Update component documentation
5. **Review**: Code review and approval
6. **Deploy**: Integration into main codebase

### **Maintenance Guidelines**
- Regular accessibility audits
- Performance monitoring
- Browser compatibility testing
- Documentation updates
- User feedback integration

---

## 📚 **Usage Examples**

### **Complete Page Example**
```jsx
import React from 'react';
import { 
  Layout, 
  Container, 
  Hero, 
  Grid, 
  Card, 
  Button 
} from '../components';

const ServicesPage = () => {
  return (
    <Layout>
      <Hero 
        title="Our Services"
        description="Professional accounting and advisory services"
        backgroundImage="/images/services-hero.jpg"
      />
      
      <Container>
        <Grid columns={3} gap="lg" responsive={{ sm: 1, md: 2, lg: 3 }}>
          {services.map(service => (
            <Card key={service.id} variant="service">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <Button variant="outline" href={service.link}>
                Learn More
              </Button>
            </Card>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};
```

This comprehensive component library ensures consistent, accessible, and maintainable UI components across the entire Hanif Habib & Cco. website. 