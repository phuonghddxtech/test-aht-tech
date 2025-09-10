# Link vercel: https://test-aht-tech-weld.vercel.app/

# Vue 3 Product Details Application

🛋️ A product details application built with Vue 3, TypeScript, and Vite. This demo project showcases a product details page for Arc Single Tier Wall Hung Vanity with complete features as required.

## ✨ Product Details Features

### 🖼️ Image Carousel
- Display product images with navigation arrows
- Thumbnail images for quick switching
- Keyboard navigation (Arrow keys)
- Responsive design for mobile

### 📋 Product Information
- Product name and description from mock data
- Responsive and clean layout

### ⚙️ Configuration Options
- List of configuration options (Size, Colour, Drawer Front, Slabtop, Handles)
- Modal popup for option selection with radio buttons
- Auto-select first option when page loads
- Display additional price for each option

### 💰 Price Calculator
- Automatic price calculation based on selected options
- Display price in currency format (cents → dollars)
- Real-time updates when changing options or quantity

### 🛒 Add to Cart
- Quantity input with increase/decrease buttons
- Min value = 1, input validation
- Add to Cart button with loading state
- Toast notification when successfully added

### 🔧 Technical Features
- **Vue 3** with Composition API
- **TypeScript** full support
- **Vite** build tool
- **Pinia** state management
- **Vue Router** navigation
- **ESLint & Prettier** code quality
- **Responsive Design** mobile-first
- **Toast Notifications** system

## 🛠️ Technologies Used

- [Vue 3](https://vuejs.org/) - Progressive JavaScript Framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Pinia](https://pinia.vuejs.org/) - Vue Store
- [Vue Router](https://router.vuejs.org/) - Official Router
- [ESLint](https://eslint.org/) - Code Linting
- [Prettier](https://prettier.io/) - Code Formatting

## 🚀 Getting Started

### System Requirements

- Node.js >= 16
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/your-username/vue3-typescript-starter.git
cd vue3-typescript-starter

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Available Scripts

```bash
# Development
npm run dev              # Run dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Code Quality
npm run lint            # Run ESLint
npm run format          # Format code with Prettier
npm run type-check      # Check TypeScript types
```

## 📁 Project Structure

```
src/
├── assets/             # Static assets (CSS, images, etc.)
├── components/         # Reusable Vue components
│   ├── Button.vue
│   ├── Input.vue
│   ├── Modal.vue
│   ├── Toast.vue
│   ├── Form.vue
│   ├── Loading.vue
│   ├── NavBar.vue
│   └── index.ts
├── composables/        # Vue composables
│   ├── useForm.ts
│   ├── useToast.ts
│   └── index.ts
├── router/             # Vue Router configuration
│   └── index.ts
├── stores/             # Pinia stores
│   ├── counter.ts
│   └── toast.ts
├── types/              # TypeScript type definitions
│   ├── common.ts
│   ├── home.ts
│   ├── about.ts
│   └── index.ts
├── utils/              # Utility functions
│   ├── validation.ts
│   ├── formatters.ts
│   ├── helpers.ts
│   └── index.ts
├── views/              # Page components
│   ├── HomeView.vue
│   └── AboutView.vue
├── App.vue             # Root component
└── main.ts             # Application entry point
```

## 🎨 UI Components

This template includes basic UI components:

- **Button** - With different variants, sizes and states
- **Input** - Form input with validation and clear button
- **Modal** - Modal dialog with overlay and escape handling
- **Toast** - Notification system with auto-dismiss
- **Form** - Form wrapper with validation logic
- **Loading** - Loading spinner with overlay options
- **NavBar** - Responsive navigation bar

## 🔧 Utilities

### Validation
- Email, phone number, password validation
- Form field validation with custom rules
- File upload validation

### Formatters
- Currency, number, date formatting (Vietnamese locale)
- File size, percentage formatting
- Text utilities (truncate, capitalize, etc.)

### Helpers
- ID generation, debounce, throttle
- Deep clone, object comparison
- Browser detection, clipboard operations

## 📋 Form Validation

The template has a powerful form validation system:

```typescript
import { useForm } from '@/composables'

const { fields, errors, isValid, handleSubmit } = useForm([
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    value: '',
    rules: [
      { required: true },
      { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }
    ]
  }
])
```

## 🔔 Toast Notifications

Easy-to-use notification system:

```typescript
import { useToast } from '@/composables'

const toast = useToast()

toast.success('Success!')
toast.error('An error occurred')
toast.warning('Warning')
toast.info('Information')
```

## 🏪 State Management

Pinia stores with full TypeScript support:

```typescript
// stores/counter.ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  
  function increment() {
    count.value++
  }
  
  return { count, doubleCount, increment }
})
```

## 🎯 Best Practices

- **Type Safety**: Use TypeScript for all code
- **Component Composition**: Break down components and reuse them
- **Responsive Design**: Mobile-first CSS approach
- **Performance**: Lazy loading routes and components
- **Code Quality**: ESLint and Prettier configuration
- **Accessibility**: ARIA labels and keyboard navigation

## 📱 Responsive Design

Template is designed to be responsive with:
- Mobile-first CSS approach
- Flexible grid system
- Touch-friendly interactions
- Optimized performance for mobile

## 🔍 Development

### Debugging
- Vue DevTools support
- TypeScript error checking
- ESLint real-time linting

### Testing
This template is ready for adding testing with:
- Vitest for unit testing
- Cypress for e2e testing

---
