import Image from 'next/image';

// Image optimization configuration
export const imageConfig = {
  quality: 85,
  formats: ['webp', 'avif'],
  sizes: {
    thumbnail: '(max-width: 640px) 100vw, 150px',
    small: '(max-width: 768px) 100vw, 300px',
    medium: '(max-width: 1024px) 100vw, 600px',
    large: '(max-width: 1280px) 100vw, 900px',
    full: '100vw',
  },
};

// Optimized image component
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  ...props
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
} & React.ComponentProps<typeof Image>) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      quality={imageConfig.quality}
      {...props}
    />
  );
}

// Lazy image component
export function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  ...props
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
} & React.ComponentProps<typeof Image>) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={className}
      quality={imageConfig.quality}
      {...props}
    />
  );
} 