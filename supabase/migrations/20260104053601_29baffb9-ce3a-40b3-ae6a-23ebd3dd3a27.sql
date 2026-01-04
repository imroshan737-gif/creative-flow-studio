-- Insert Studies hobbies
INSERT INTO hobbies (name, category, emoji, icon, is_trending) VALUES
  ('Mathematics', 'Studies', '🔢', 'Calculator', false),
  ('Physics', 'Studies', '⚛️', 'Atom', false),
  ('Chemistry', 'Studies', '🧪', 'FlaskConical', false),
  ('Biology', 'Studies', '🧬', 'Dna', false),
  ('Computer Science', 'Studies', '💻', 'Laptop', false),
  ('History', 'Studies', '📜', 'BookOpen', false),
  ('Literature', 'Studies', '📚', 'Book', false),
  ('Languages', 'Studies', '🌍', 'Globe', false),
  ('Economics', 'Studies', '📈', 'TrendingUp', false),
  ('General Studies', 'Studies', '📖', 'GraduationCap', true)
ON CONFLICT (name) DO NOTHING;

-- Insert sample challenges for Studies category
INSERT INTO challenges (title, description, category, type, difficulty, duration_minutes, points, is_active) VALUES
  ('Math Puzzle Sprint', 'Solve 5 challenging math puzzles in 10 minutes', 'studies', 'daily', 'beginner', 10, 15, true),
  ('Vocabulary Builder', 'Learn and practice 10 new vocabulary words', 'studies', 'daily', 'beginner', 10, 10, true),
  ('Speed Reading Challenge', 'Read a short passage and answer comprehension questions', 'studies', 'daily', 'moderate', 15, 20, true),
  ('Science Concept Review', 'Review and explain a scientific concept in your own words', 'studies', 'daily', 'moderate', 15, 20, true),
  ('Memory Palace', 'Memorize a list of 20 items using memory techniques', 'studies', 'daily', 'expert', 20, 30, true),
  ('Weekly Research Project', 'Research and write a mini-report on a topic of interest', 'studies', 'weekly', 'moderate', 60, 100, true),
  ('Study Skills Mastery', 'Practice and improve one study technique each day for a week', 'studies', 'weekly', 'beginner', 120, 150, true);