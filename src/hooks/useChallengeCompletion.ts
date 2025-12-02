import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from './use-toast';

export function useChallengeCompletion() {
  const { user } = useAuth();

  const completeChallenge = async (challengeId: string, points: number) => {
    if (!user) return;

    try {
      // Insert challenge completion record
      const { error: challengeError } = await supabase
        .from('user_challenges')
        .insert({
          user_id: user.id,
          challenge_id: challengeId,
          is_completed: true,
          completed_at: new Date().toISOString(),
          score: points,
        });

      if (challengeError) throw challengeError;

      // Update user profile stats
      const { data: profile } = await supabase
        .from('profiles')
        .select('total_points, current_streak, longest_streak')
        .eq('id', user.id)
        .single();

      if (profile) {
        const newStreak = (profile.current_streak || 0) + 1;
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            total_points: (profile.total_points || 0) + points,
            current_streak: newStreak,
            longest_streak: Math.max(profile.longest_streak || 0, newStreak),
          })
          .eq('id', user.id);

        if (profileError) throw profileError;
      }

      // Record daily activity
      const today = new Date().toISOString().split('T')[0];
      const { data: activity } = await supabase
        .from('user_activity')
        .select('*')
        .eq('user_id', user.id)
        .eq('activity_date', today)
        .single();

      if (activity) {
        await supabase
          .from('user_activity')
          .update({
            sessions_count: (activity.sessions_count || 0) + 1,
            points_earned: (activity.points_earned || 0) + points,
          })
          .eq('id', activity.id);
      } else {
        await supabase
          .from('user_activity')
          .insert({
            user_id: user.id,
            activity_date: today,
            sessions_count: 1,
            points_earned: points,
          });
      }

      toast({
        title: 'Challenge Completed! 🎉',
        description: `You earned ${points} points!`,
      });

      return true;
    } catch (error) {
      console.error('Error completing challenge:', error);
      toast({
        title: 'Error',
        description: 'Failed to save challenge completion',
        variant: 'destructive',
      });
      return false;
    }
  };

  const getCompletedChallenges = async () => {
    if (!user) return [];

    try {
      const { data, error } = await supabase
        .from('user_challenges')
        .select('challenge_id')
        .eq('user_id', user.id)
        .eq('is_completed', true);

      if (error) throw error;
      return data.map(d => d.challenge_id);
    } catch (error) {
      console.error('Error fetching completed challenges:', error);
      return [];
    }
  };

  return { completeChallenge, getCompletedChallenges };
}
