import { motion } from 'framer-motion';
import { Crown, Medal, Flame, TrendingUp, TrendingDown } from 'lucide-react';

export interface LeaderboardUser {
  id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  total_points: number;
  current_streak: number;
  top_hobby: string | null;
  top_hobby_emoji: string | null;
}

interface LeaderboardUserCardProps {
  user: LeaderboardUser;
  rank: number;
  isCurrentUser: boolean;
  isUpdating: boolean;
  index: number;
  rankChange?: number; // positive = moved up, negative = moved down, 0 = no change
  onClick?: () => void;
}

export default function LeaderboardUserCard({
  user,
  rank,
  isCurrentUser,
  isUpdating,
  index,
  rankChange = 0,
  onClick,
}: LeaderboardUserCardProps) {
  const isPodium = rank <= 3;

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-primary" strokeWidth={1.75} />;
    if (rank === 2 || rank === 3)
      return <Medal className="w-5 h-5 text-foreground/70" strokeWidth={1.75} />;
    return (
      <span className="text-base font-mono tabular-nums text-muted-foreground">
        {String(rank).padStart(2, '0')}
      </span>
    );
  };

  const RankChangeIndicator = () => {
    if (rankChange === 0) return null;
    const isUp = rankChange > 0;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className={`absolute right-3 top-3 flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-semibold border ${
          isUp
            ? 'border-primary/30 bg-primary/10 text-primary'
            : 'border-destructive/30 bg-destructive/10 text-destructive'
        }`}
      >
        {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
        <span>{isUp ? `+${rankChange}` : rankChange}</span>
      </motion.div>
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{
        delay: index * 0.02,
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1],
        layout: { type: 'spring', stiffness: 300, damping: 32 },
      }}
      onClick={onClick}
      className={`
        relative p-4 rounded-xl border transition-smooth cursor-pointer
        ${isPodium ? 'border-primary/20 bg-card/70' : 'border-border/60 bg-card/40'}
        ${isCurrentUser ? 'border-primary/50 bg-primary/[0.06]' : ''}
        hover:border-primary/30 hover:bg-card/70
      `}
    >
      <RankChangeIndicator />

      <div className="flex items-center gap-4">
        {/* Rank */}
        <div className="w-9 flex items-center justify-center flex-shrink-0">{getRankIcon(rank)}</div>

        {/* Avatar */}
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-semibold overflow-hidden flex-shrink-0 border ${
            isPodium
              ? 'border-primary/30 bg-primary/10 text-primary'
              : 'border-border/70 bg-muted text-muted-foreground'
          }`}
        >
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt={user.full_name || 'User'}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            user.full_name?.charAt(0) || user.username?.charAt(0) || '?'
          )}
        </div>

        {/* User info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-display font-semibold text-base text-foreground truncate tracking-tight">
              {user.full_name || 'Anonymous'}
              {isCurrentUser && <span className="text-primary ml-1.5 text-sm">You</span>}
            </h3>
            {user.username && (
              <span className="text-xs text-muted-foreground truncate">@{user.username}</span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            {user.top_hobby && (
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground flex items-center gap-1.5 border border-border/60">
                {user.top_hobby_emoji && <span>{user.top_hobby_emoji}</span>}
                {user.top_hobby}
              </span>
            )}
            {user.current_streak > 0 && (
              <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-primary" strokeWidth={1.75} />
                {user.current_streak} day streak
              </span>
            )}
          </div>
        </div>

        {/* Points */}
        <div className="text-right flex-shrink-0">
          <p
            className={`font-mono tabular-nums text-lg font-semibold ${
              isPodium ? 'text-primary' : 'text-foreground'
            }`}
          >
            {user.total_points.toLocaleString()}
          </p>
          <p className="text-[11px] text-muted-foreground">points</p>
        </div>
      </div>

      {/* Update pulse */}
      {isUpdating && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.35, 0] }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-primary/10 rounded-xl pointer-events-none"
        />
      )}
    </motion.div>
  );
}
