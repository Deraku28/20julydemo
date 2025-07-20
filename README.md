# Vibe Coding Course - Landing Page

A minimalist landing page for Vibe Coding Course built with Next.js 14+, TypeScript, TailwindCSS, and Supabase for lead generation.

## 🚀 Tech Stack

- **Framework**: Next.js 15.4.2 with App Router
- **Language**: TypeScript 5.x
- **Styling**: TailwindCSS 4.x (standalone mode)
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page component
│   └── globals.css         # Global styles with TailwindCSS
├── components/
│   ├── ui/                 # Reusable UI components
│   └── forms/              # Form components
├── lib/
│   └── supabase.ts         # Supabase client configuration
├── types/
│   └── index.ts            # TypeScript type definitions
└── utils/
    └── validation.ts       # Form validation utilities
```

## 🛠️ Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Copy the environment template and add your Supabase credentials:
```bash
cp env.example .env.local
```

Update `.env.local` with your Supabase project details:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run Development Server
```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or next available port).

## 🎨 Design System

### Colors
- **Primary**: `#3b82f6` (Blue)
- **Primary Dark**: `#2563eb` (Darker Blue)
- **Secondary**: `#64748b` (Gray)
- **Accent**: `#f59e0b` (Orange)
- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)

### Typography
- **Font Family**: Inter (with system fallbacks)
- **Font Weights**: 400, 500, 600, 700
- **Line Height**: 1.6

### Spacing
- **XS**: 0.25rem (4px)
- **SM**: 0.5rem (8px)
- **MD**: 1rem (16px)
- **LG**: 1.5rem (24px)
- **XL**: 2rem (32px)
- **2XL**: 3rem (48px)

## 🔧 Configuration Files

### TypeScript (`tsconfig.json`)
- Strict mode enabled
- Path aliases configured (`@/*` → `src/*`)
- Next.js specific configurations

### TailwindCSS (`src/app/globals.css`)
- Custom color palette
- Typography system
- Spacing and sizing tokens
- Dark mode support

### Supabase (`src/lib/supabase.ts`)
- Client configuration
- Type-safe database interfaces
- Environment variable validation

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🗄️ Database Schema

The project is configured for a `leads` table with the following structure:

```sql
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 🚀 Deployment

This project is ready for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📋 Next Steps

1. **Task 2**: Set up Supabase database schema and RLS policies
2. **Task 3**: Implement lead capture form functionality
3. **Task 4**: Add analytics and tracking
4. **Task 5**: Optimize for performance and SEO

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
