# Vibe Coding Style Guide

## Design Principles

### 1. Minimalism
- Clean, uncluttered design with plenty of white space
- Focus on content and conversion
- Remove unnecessary visual elements

### 2. Professional
- Trustworthy appearance suitable for professional developers
- Consistent typography and spacing
- High-quality visual elements

### 3. Accessible
- WCAG 2.1 AA compliance
- High contrast ratios
- Keyboard navigation support
- Screen reader compatibility

## Color Palette

### Primary Colors
- Primary Blue: `#2563eb` (Primary-600)
- Primary Light: `#3b82f6` (Primary-500)
- Primary Dark: `#1d4ed8` (Primary-700)

### Neutral Colors
- Gray 50: `#f9fafb` (Background)
- Gray 100: `#f3f4f6` (Borders)
- Gray 600: `#4b5563` (Text)
- Gray 900: `#111827` (Headings)

### Semantic Colors
- Success: `#16a34a` (Success-600)
- Error: `#dc2626` (Error-600)
- Warning: `#d97706` (Warning-600)

## Typography

### Font Family
- Primary: Inter (Google Fonts)
- Weights: 300, 400, 500, 600, 700

### Type Scale
- H1: 4xl-6xl (48-72px)
- H2: 3xl-4xl (36-48px)
- H3: 2xl-3xl (24-36px)
- Body: xl-2xl (20-24px)
- Caption: sm (14px)

## Spacing

### Base Unit
- 4px (0.25rem)

### Scale
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px
- 3xl: 64px

## Components

### Buttons
- Primary: Blue background, white text
- Secondary: Gray background, white text
- Outline: White background, gray border

### Forms
- Inputs: Gray border, blue focus ring
- Error states: Red border and text
- Success states: Green border and text

### Cards
- White background
- Soft shadow
- Rounded corners (lg)
- Gray border

## Accessibility

### Color Contrast
- Text: Minimum 4.5:1 ratio
- Large text: Minimum 3:1 ratio
- UI elements: Minimum 3:1 ratio

### Focus States
- Visible focus indicators
- 2px blue outline
- 2px offset from element

### Keyboard Navigation
- Tab order follows visual layout
- Skip links for main content
- Escape key closes modals

## Responsive Design

### Breakpoints
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large: 1280px+

### Mobile First
- Start with mobile layout
- Add complexity for larger screens
- Touch-friendly targets (44px minimum)

## Animation

### Principles
- Subtle and purposeful
- Respect reduced motion preferences
- Performance optimized

### Durations
- Fast: 150ms
- Normal: 300ms
- Slow: 500ms

### Easing
- Ease-out for most interactions
- Ease-in-out for page transitions
- Linear for progress indicators

## CSS Classes

### Typography Classes
```css
.heading-1    /* H1 styles */
.heading-2    /* H2 styles */
.heading-3    /* H3 styles */
.body-large   /* Large body text */
.body-medium  /* Medium body text */
.body-small   /* Small body text */
.caption      /* Caption text */
```

### Button Classes
```css
.btn-primary  /* Primary button */
.btn-secondary /* Secondary button */
.btn-outline  /* Outline button */
```

### Form Classes
```css
.form-input      /* Standard input */
.form-input-error /* Error state input */
```

### Layout Classes
```css
.section-padding  /* Section padding */
.container-padding /* Container padding */
.responsive-container /* Responsive container */
.responsive-grid   /* Responsive grid */
```

### Utility Classes
```css
.gradient-primary /* Primary gradient */
.gradient-hero    /* Hero gradient */
.text-gradient    /* Text gradient */
.animate-fade-in  /* Fade in animation */
.animate-slide-up /* Slide up animation */
.animate-scale-in /* Scale in animation */
```

## Best Practices

### CSS Organization
1. Use TailwindCSS utility classes first
2. Create component classes for repeated patterns
3. Use CSS custom properties for design tokens
4. Follow BEM methodology for custom CSS

### Performance
1. Minimize CSS bundle size
2. Use CSS containment where appropriate
3. Optimize critical CSS path
4. Use efficient selectors

### Maintainability
1. Document design decisions
2. Use consistent naming conventions
3. Create reusable components
4. Test across different devices

## File Structure

```
src/
├── styles/
│   └── design-system.css    # Design system styles
├── utils/
│   └── styles.ts           # Style utilities
├── providers/
│   └── ThemeProvider.tsx   # Theme management
└── app/
    └── globals.css         # Global styles
```

## Future Enhancements

### Dark Mode
- Implement dark theme variants
- Use CSS custom properties for theming
- Provide theme toggle functionality

### Design Tokens
- Expand color palette
- Add more spacing scales
- Create component variants

### Animation Library
- Add more animation presets
- Create interaction patterns
- Implement micro-interactions

## Resources

### Tools
- [TailwindCSS](https://tailwindcss.com/)
- [Inter Font](https://rsms.me/inter/)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)

### References
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Material Design](https://material.io/design)
- [Apple Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/) 