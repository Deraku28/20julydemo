import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ErrorHandlerInitializer } from '@/components/ErrorHandlerInitializer';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Vibe Coding Course - Master Rapid MVP Development',
  description: 'Transform your ideas into market-ready products in just 30 days. Join hundreds of developers who\'ve learned to build, validate, and launch MVPs with confidence.',
  keywords: ['coding course', 'MVP development', 'web development', 'entrepreneurship', 'product development'],
  authors: [{ name: 'Vibe Coding' }],
  openGraph: {
    title: 'Vibe Coding Course - Master Rapid MVP Development',
    description: 'Transform your ideas into market-ready products in just 30 days.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vibe Coding Course - Master Rapid MVP Development',
    description: 'Transform your ideas into market-ready products in just 30 days.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ErrorBoundary>
          {children}
          <PerformanceMonitor />
          <ErrorHandlerInitializer />
        </ErrorBoundary>
      </body>
    </html>
  );
}
