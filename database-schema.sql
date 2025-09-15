-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'superadmin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create games table
CREATE TABLE public.games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  rules TEXT NOT NULL,
  history TEXT NOT NULL,
  cultural_context TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  is_playable BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leaderboard table
CREATE TABLE public.leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  game_id UUID REFERENCES public.games(id) ON DELETE CASCADE,
  wins INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, game_id)
);

-- Create feedback table
CREATE TABLE public.feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('feedback', 'report')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leaderboard ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Superadmins can view all users" ON public.users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );

CREATE POLICY "Superadmins can update user roles" ON public.users
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role = 'superadmin'
    )
  );

-- Create policies for games table
CREATE POLICY "Anyone can view enabled games" ON public.games
  FOR SELECT USING (is_enabled = true);

CREATE POLICY "Admins can view all games" ON public.games
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

CREATE POLICY "Admins can insert games" ON public.games
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

CREATE POLICY "Admins can update games" ON public.games
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- Create policies for leaderboard table
CREATE POLICY "Users can view leaderboard" ON public.leaderboard
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own scores" ON public.leaderboard
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own scores" ON public.leaderboard
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for feedback table
CREATE POLICY "Users can insert their own feedback" ON public.feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all feedback" ON public.feedback
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users 
      WHERE id = auth.uid() AND role IN ('admin', 'superadmin')
    )
  );

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (NEW.id, NEW.email, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_games_updated_at BEFORE UPDATE ON public.games
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_leaderboard_updated_at BEFORE UPDATE ON public.leaderboard
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample games
INSERT INTO public.games (name, description, rules, history, cultural_context) VALUES
(
  'Congkak',
  'A traditional Malay mancala game played with shells, marbles, or seeds on a wooden board with holes.',
  'Players take turns picking up all pieces from one hole on their side and distributing them one by one into subsequent holes. The goal is to capture the most pieces in your storehouse.',
  'Congkak has been played in the Malay archipelago for centuries, with variations found across Southeast Asia. It was traditionally played by women and children.',
  'The game teaches mathematical skills, strategic thinking, and patience. It was often played during social gatherings and helped strengthen community bonds.'
),
(
  'Sepak Takraw',
  'A sport that combines elements of volleyball and football, played with a rattan ball using feet, knees, chest, and head.',
  'Three players per team try to keep the ball airborne and send it over the net to the opposing team. Only feet, knees, chest, and head can be used to touch the ball.',
  'Originating in the 15th century in the Malay Peninsula, Sepak Takraw spread throughout Southeast Asia and became Malaysia''s national sport.',
  'The game promotes physical fitness, teamwork, and agility. It reflects the Malay values of cooperation and healthy competition.'
),
(
  'Gasing',
  'Traditional spinning top game where players compete to see whose top spins the longest or can knock down opponent tops.',
  'Players wind string around their wooden tops and launch them with force. The goal is to achieve the longest spin time or knock opponents'' tops out of the playing area.',
  'Gasing has been played in Malaysia for over 200 years, with different regions developing their own styles and techniques.',
  'The game teaches precision, patience, and craftsmanship. Traditional tops are handcrafted, preserving woodworking skills passed down through generations.'
);

-- Create a superadmin user (you'll need to update this with actual user ID after registration)
-- INSERT INTO public.users (id, email, role) VALUES ('your-user-id-here', 'admin@tradiplay.com', 'superadmin');
