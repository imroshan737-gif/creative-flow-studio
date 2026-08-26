import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export default function GlassCard({ children, className, hover = false, onClick }: GlassCardProps) {
  const Component = onClick ? motion.button : motion.div;

  return (
    <Component
      className={cn(
        'glass rounded-xl p-6',
        hover && 'hover-lift cursor-pointer hover:border-primary/30',
        className
      )}
      onClick={onClick}
      whileTap={hover ? { scale: 0.99 } : undefined}
    >
      {children}
    </Component>
  );
}
