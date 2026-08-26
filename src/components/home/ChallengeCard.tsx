import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight } from 'lucide-react';
import { Challenge } from '@/hooks/useChallenges';

interface ChallengeCardProps {
  challenge: Challenge;
  index: number;
  onStart: (challenge: Challenge) => void;
}

export default function ChallengeCard({ challenge, index, onStart }: ChallengeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      layout
      className="group"
    >
      <button
        type="button"
        onClick={() => onStart(challenge)}
        className="glass w-full h-full text-left rounded-xl p-5 md:p-6 flex flex-col transition-smooth hover:border-primary/30 hover:-translate-y-0.5"
      >
        {/* Meta row */}
        <div className="flex items-center justify-between gap-3">
          <span className="eyebrow text-primary">{challenge.category}</span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground tabular-nums">
            <Clock className="w-3.5 h-3.5" strokeWidth={2} />
            {challenge.duration} min
          </span>
        </div>

        <div className="hairline my-4" />

        {/* Content */}
        <h3 className="font-display text-lg md:text-xl font-semibold leading-snug text-foreground group-hover:text-primary transition-colors">
          {challenge.title}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-grow">
          {challenge.description}
        </p>

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="capitalize">{challenge.difficulty}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span className="text-foreground/80 font-medium tabular-nums">{challenge.points} pts</span>
          </div>
          <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
            Start
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </button>
    </motion.div>
  );
}
