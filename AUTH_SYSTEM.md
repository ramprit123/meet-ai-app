# Authentication System

A complete responsive authentication system built with Next.js, shadcn/ui, and Zod validation.

## Features

### Layout Design

- **40/60 Split Layout**: Left side (40%) features AI branding, right side (60%) contains forms
- **Responsive Design**: Mobile-first approach with collapsible sidebar on smaller screens
- **AI Branding**: "Meet AI" theme with Bot icon and gradient backgrounds
- **Modern UI**: Clean, professional design with shadcn/ui components

### Forms Included

#### 1. Sign Up (`/sign-up`)

- Full name input with User icon
- Email validation
- Password with visibility toggle
- Confirm password with matching validation
- Role selection (User/Admin)
- Proper Zod validation with error messages

#### 2. Sign In (`/sign-in`)

- Email and password inputs
- Password visibility toggle
- Remember me checkbox
- Forgot password link
- Social authentication UI (Google, Twitter)
- Form validation

#### 3. Forgot Password (`/forgot`)

- Email input for password reset
- Loading states during submission
- Success state with email confirmation
- Back to sign-in navigation
- Proper error handling

### Technical Implementation

#### Validation

```typescript
// Zod schemas with proper validation rules
export const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
    role: z.enum(["user", "admin"]).default("user"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
```

#### Form Handling

- React Hook Form with Zod resolver
- Proper TypeScript types
- Error message display
- Loading states
- Form submission handling

#### Responsive Design

- Mobile header for small screens
- Flexible layout that adapts to screen size
- Touch-friendly form elements
- Proper spacing and typography

## File Structure

```
src/
├── app/(auth)/
│   ├── layout.tsx          # Auth layout with 40/60 split
│   ├── sign-in/page.tsx    # Sign in form
│   ├── sign-up/page.tsx    # Sign up form
│   ├── forgot/page.tsx     # Forgot password form
│   └── demo/page.tsx       # Demo page showcasing all forms
├── lib/validations/
│   └── auth.ts             # Zod validation schemas
└── components/auth/
    └── auth-navigation.tsx # Navigation component (optional)
```

## Usage

### Navigation

- Visit `/sign-in` for the login form
- Visit `/sign-up` for the registration form
- Visit `/forgot` for password reset
- Visit `/demo` to see all forms showcased

### Integration

The forms are ready for backend integration. Update the `onSubmit` functions in each form component to connect with your authentication API.

### Customization

- Modify colors in the gradient backgrounds
- Update the "Meet AI" branding to your app name
- Adjust validation rules in `auth.ts`
- Customize form fields as needed

## Dependencies Used

- Next.js 15
- React Hook Form
- Zod validation
- shadcn/ui components
- Lucide React icons
- Tailwind CSS

All dependencies are already included in your project's package.json.
