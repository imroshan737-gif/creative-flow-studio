import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Music, Palette, PenTool, Zap, Play, Trophy, Users, Target, 
  Clock, Flame, ChevronDown, Brain, BookOpen, Camera, Code, Dumbbell,
  ArrowRight, Star, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import GlassCard from '@/components/GlassCard';

const features = [
  {
    icon: Brain,
    title: 'Studies & Learning',
    description: 'Master math, science, languages with focused micro-challenges',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Music,
    title: 'Musical Mastery',
    description: '10-minute focused practice sessions with AI feedback',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Palette,
    title: 'Artistic Expression',
    description: 'Daily creative prompts to unlock your inner artist',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Code,
    title: 'Coding Excellence',
    description: 'Build real projects through bite-sized challenges',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: PenTool,
    title: 'Writing Brilliance',
    description: 'Micro-challenges to sharpen your storytelling',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Dumbbell,
    title: 'Fitness Goals',
    description: 'Short workouts and wellness challenges',
    gradient: 'from-red-500 to-pink-500',
  },
];

const howItWorks = [
  {
    step: 1,
    title: 'Choose Your Hobbies',
    description: 'Select from 50+ activities including Studies, Music, Art, Coding, and more',
    icon: Target,
  },
  {
    step: 2,
    title: 'Get Personalized Challenges',
    description: 'Receive daily challenges tailored exactly to your selected interests',
    icon: Sparkles,
  },
  {
    step: 3,
    title: 'Complete in 10-15 Minutes',
    description: 'Short, focused sessions that fit into any schedule',
    icon: Clock,
  },
  {
    step: 4,
    title: 'Track Your Progress',
    description: 'Build streaks, earn achievements, and watch yourself improve',
    icon: Trophy,
  },
];

const FloatingElement = ({ children, delay = 0, duration = 6 }: { children: React.ReactNode; delay?: number; duration?: number }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration,
      repeat: Infinity,
      repeatType: "reverse",
      delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

export default function Landing() {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const [activeFeature, setActiveFeature] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen overflow-x-hidden">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 p-4"
      >
        <div className="container mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-display font-bold gradient-text">MicroMuse</span>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="hidden md:flex"
              onClick={() => navigate('/auth')}
            >
              Sign In
            </Button>
            <Button 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white"
              onClick={() => navigate('/auth')}
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-20 left-[10%]"
          >
            <FloatingElement delay={0}>
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-r from-primary/30 to-accent/30 backdrop-blur-xl border border-white/10" />
            </FloatingElement>
          </motion.div>
          
          <motion.div 
            style={{ y: y2 }}
            className="absolute top-40 right-[15%]"
          >
            <FloatingElement delay={1} duration={8}>
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-secondary/20 to-primary/20 backdrop-blur-xl border border-white/10" />
            </FloatingElement>
          </motion.div>
          
          <motion.div 
            style={{ y: y1 }}
            className="absolute bottom-40 left-[20%]"
          >
            <FloatingElement delay={2} duration={7}>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-accent/30 to-secondary/30 backdrop-blur-xl border border-white/10 rotate-45" />
            </FloatingElement>
          </motion.div>
          
          <motion.div 
            style={{ y: y2 }}
            className="absolute bottom-20 right-[10%]"
          >
            <FloatingElement delay={0.5} duration={5}>
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-xl border border-white/10" />
            </FloatingElement>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity }}
          className="text-center max-w-5xl mx-auto space-y-8 relative z-10"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 glass px-6 py-3 rounded-full"
          >
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium">Trusted by learners worldwide</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight"
          >
            <span className="gradient-text">Master Any Skill</span>
            <br />
            <span className="text-foreground">In Just 10 Minutes</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
          >
            From <span className="text-primary font-semibold">Studies</span> to <span className="text-secondary font-semibold">Music</span>, <span className="text-accent font-semibold">Coding</span> to <span className="text-primary font-semibold">Art</span> — 
            personalized daily challenges that match YOUR interests. No generic content, just what you love.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white text-lg px-10 py-7 rounded-2xl shadow-2xl shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/50"
              onClick={() => navigate('/auth')}
            >
              <Sparkles className="w-6 h-6 mr-2" />
              Start Your Journey — It's Free
            </Button>
          </motion.div>
          
          {/* Feature Pills */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-3 pt-8"
          >
            {['Studies', 'Music', 'Art', 'Coding', 'Writing', 'Fitness', 'Dance', 'Photography'].map((hobby, i) => (
              <motion.div
                key={hobby}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" }}
              >
                <Badge hobby={hobby} />
              </motion.div>
            ))}
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="pt-16"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-sm">Discover More</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 relative">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Challenges That <span className="gradient-text">Match Your Passions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You choose the hobbies. We create personalized challenges. No more irrelevant content.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <GlassCard className="h-full relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-display font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="container mx-auto max-w-6xl relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              How <span className="gradient-text">MicroMuse</span> Works
            </h2>
            <p className="text-xl text-muted-foreground">
              Four simple steps to transform your skills
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent -translate-x-4" />
                )}
                
                <div className="text-center">
                  <motion.div 
                    className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6 relative"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-sm font-bold">
                      {item.step}
                    </div>
                  </motion.div>
                  <h3 className="text-xl font-display font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-32 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Only Challenges You'll <span className="gradient-text">Actually Love</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We don't show music challenges to coders or study tasks to dancers. 
                Your personalized feed contains only what you've chosen to master.
              </p>
              
              <div className="space-y-4">
                {[
                  'Challenges based ONLY on your selected hobbies',
                  'AI-powered personalization that learns your style',
                  'Progress tracking with streaks and achievements',
                  'Built-in AI assistant to help you learn faster',
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <GlassCard className="relative">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <Brain className="w-8 h-8 text-primary" />
                    <div>
                      <p className="font-semibold">Math Puzzle Sprint</p>
                      <p className="text-sm text-muted-foreground">10 min • Beginner • 15 pts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/10 border border-secondary/20">
                    <Code className="w-8 h-8 text-secondary" />
                    <div>
                      <p className="font-semibold">Build a Mini Calculator</p>
                      <p className="text-sm text-muted-foreground">15 min • Moderate • 25 pts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-accent/10 border border-accent/20">
                    <BookOpen className="w-8 h-8 text-accent" />
                    <div>
                      <p className="font-semibold">Speed Reading Challenge</p>
                      <p className="text-sm text-muted-foreground">10 min • Beginner • 10 pts</p>
                    </div>
                  </div>
                  <div className="text-center pt-4 text-muted-foreground text-sm">
                    ✨ These challenges shown because you selected Studies & Coding
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10" />
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container mx-auto max-w-4xl text-center relative"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Ready to <span className="gradient-text">Transform</span> Your Skills?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of learners who are mastering new skills in just 10 minutes a day. 
            Your personalized journey starts now.
          </p>
          
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-white text-xl px-12 py-8 rounded-2xl shadow-2xl shadow-primary/30 transition-all hover:scale-105"
            onClick={() => navigate('/auth')}
          >
            <Sparkles className="w-6 h-6 mr-2" />
            Start Free Today
          </Button>
          
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Free forever plan • Cancel anytime
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-display font-bold">MicroMuse</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 MicroMuse. Empowering learners worldwide.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Badge({ hobby }: { hobby: string }) {
  const colors: Record<string, string> = {
    Studies: 'from-blue-500 to-cyan-500',
    Music: 'from-purple-500 to-pink-500',
    Art: 'from-orange-500 to-red-500',
    Coding: 'from-green-500 to-emerald-500',
    Writing: 'from-yellow-500 to-orange-500',
    Fitness: 'from-red-500 to-pink-500',
    Dance: 'from-pink-500 to-purple-500',
    Photography: 'from-indigo-500 to-blue-500',
  };
  
  return (
    <span className={`px-4 py-2 rounded-full bg-gradient-to-r ${colors[hobby] || 'from-primary to-accent'} text-white text-sm font-medium shadow-lg`}>
      {hobby}
    </span>
  );
}
