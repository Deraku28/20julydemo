import React from 'react';
import { classNames } from '@/utils/styles';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
  className?: string;
}

export function Testimonial({
  quote,
  author,
  role,
  company,
  avatar,
  className = ''
}: TestimonialProps) {
  return (
    <div className={classNames('card p-6 bg-white dark:bg-gray-700', className)}>
      <div className="flex items-start space-x-4">
        {avatar && (
          <img
            src={avatar}
            alt={author}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <blockquote className="body-medium italic mb-4 text-gray-700 dark:text-gray-200">
            "{quote}"
          </blockquote>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{author}</p>
              <p className="caption text-gray-600 dark:text-gray-300">
                {role}
                {company && ` at ${company}`}
              </p>
            </div>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 