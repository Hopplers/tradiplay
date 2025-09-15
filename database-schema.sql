-- Create users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  username TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin', 'superadmin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create games table
CREATE TABLE public.games (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  rules TEXT NOT NULL,
  history TEXT NOT NULL,
  cultural_context TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_enabled BOOLEAN DEFAULT true,
  is_playable BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create leaderboard table
CREATE TABLE public.leaderboard (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
  game_id INTEGER REFERENCES public.games(id) ON DELETE CASCADE,
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
  INSERT INTO public.users (id, email, username, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)), 'user');
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
INSERT INTO public.games (name, description, rules, history, cultural_context, image_url) VALUES
(
  'Congkak',
  'A traditional Malay mancala game played with shells, marbles, or seeds on a wooden board with holes.',
  'Players take turns picking up all pieces from one hole on their side and distributing them one by one into subsequent holes. The goal is to capture the most pieces in your storehouse.',
  'Congkak has been played in the Malay archipelago for centuries, with variations found across Southeast Asia. It was traditionally played by women and children.',
  'The game teaches mathematical skills, strategic thinking, and patience. It was often played during social gatherings and helped strengthen community bonds.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDcFvtLVeK-kD20vjpXJCP6sy3DOLTMCNP0oo8vmKuHlJ8EiFGtZ_NkKNdiWDXW2whEr-utO14AdjMbdBub9SnjZS8sEO3vGEN4DniJ7xXCSMNyxV40Mg4i9M04Y5intRr3NtUHGjpLogCGNFcVdTsbxPQLXdK_IPncsnT_UTbjBb2LMtRbE4XdZ7DyJB0ojeTZKFvcQKIV0eyXjxfvRFVa4KZueeXNoJD5ZbAi8kahGDOjmIUGbPqBMDthYs7ZfPRWOBcRr4-dfT8Q'
),
(
  'Gasing',
  'Traditional spinning top game where players compete to see whose top spins the longest or can knock down opponent tops.',
  'Players wind string around their wooden tops and launch them with force. The goal is to achieve the longest spin time or knock opponents'' tops out of the playing area.',
  'Gasing has been played in Malaysia for over 200 years, with different regions developing their own styles and techniques.',
  'The game teaches precision, patience, and craftsmanship. Traditional tops are handcrafted, preserving woodworking skills passed down through generations.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD3Ub1r8OkzdvB6LV8qcoq-MQcH7pnuDF5EU9XbtCR9wKUCvye-hri03LCRwLNJbeSYHvYGKH2xn-X1NTYnqNc3iaSYABEyHZo75RS_GGBzm3JJpL5liD6Huy_vwsL8axM-_fk5QU6NXKZVwt3ba5VM7NX_k6oYsi2nEoOkZKQyF8XDsTpP7OWkBgnkSiKU5CA8_mJNRJaqjSrHYc6e0GpvD4irgNDS-wmYcP-G-xhmR3faxWKgcbbwYPrbvKkWCngq0UlrUnAIsn0F'
),
(
  'Wau',
  'A traditional kite game',
  'Players fly traditional Malaysian kites, competing for height, stability, and artistic design. The goal is to keep the kite airborne for the longest time while demonstrating control.',
  'Wau kites have been part of Malaysian culture for centuries, with different states having their own distinctive designs and flying techniques.',
  'Wau represents the artistic heritage of Malaysia, combining craftsmanship with outdoor activity. It teaches patience, wind reading skills, and artistic appreciation.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAPslYJigkkmE5D-ZJl-jdJNZem8_Upv5Z0jdDhO8cxRmd-P5pHbLDqjBmPZ0kVFjQBth9tNtiimHwwqkETC_Ec9a1uFlN4cALzeyjKk-0AbGr-VzJbqrv68ZQS4pJfeIIQsCCP1MNu6PQEEoIX28JZz4oMOm9DprpIgalYB8C0Ja3bAMRLQQ2dLlVSHIdLyfojw8mGAUsH3FyWCxqbRxUxXGdBCQuNwSgQvKk7d-_SCBkjBeC_lbS1c1gmWA0MeickITPO83MgQNLQ'
),
(
  'Batu Seremban',
  'A traditional game played with small stones or cloth bags',
  'Players throw and catch small stones in various sequences and patterns. The game involves different levels of difficulty with increasingly complex throwing and catching patterns.',
  'Batu Seremban has been played by Malay children for generations, often using small stones, seeds, or specially made cloth bags filled with rice or sand.',
  'The game develops hand-eye coordination, concentration, and dexterity. It was traditionally played by girls and helped develop fine motor skills.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBIIeXizaNjMadeKrrvgOag1smLpTiCUhXP0moXSMA34-t-JleFBtd39nfkE-cu4m-iu1ZIHoXNu6Ae_CRUU9tUu5Eibxeyi3X95yCIcP_aKlenWJT0v4ho5PZ-e71x4IHcM5TMpZCFwp9ysjEWCgPxjUH0Lua-85W-xySEwh_Ap8znQtQNZrfwhTy0UjmSJddCCIubOQ0vpvBX9wOW8LKwcXl8SSTL1zZl9NAX3Np1NG_6Iuiz5HwpYVQ0piRfc_-W8oSGeqWrZ-XO'
),
(
  'Sepak Takraw',
  'A sport that combines elements of volleyball and football, played with a rattan ball using feet, knees, chest, and head.',
  'Three players per team try to keep the ball airborne and send it over the net to the opposing team. Only feet, knees, chest, and head can be used to touch the ball.',
  'Originating in the 15th century in the Malay Peninsula, Sepak Takraw spread throughout Southeast Asia and became Malaysia''s national sport.',
  'The game promotes physical fitness, teamwork, and agility. It reflects the Malay values of cooperation and healthy competition.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB5TQJssGELYEAnwGR223u-u0NzQ0DlQvZtE9_EtrHHsVXtc6dhLIAzdPE0Mopv3_SyLeChky6_GXoKqcTEBLno4e1zGf9iTfBZbGJ8-jgphASZWUb0glXhhNznGxj1BoCIp3n3r3GGusyyatuHLkRyPxlLSTr0-Vi3PIMc388piKkuSgLobcwnlEpA-HhhoQKrueJBnqaGaZ7MqIvRlnkqkxNdAsa_PXrs8bgqP17iWTOPaQH3TgEbZLCPBj4XUCEZohhpPNaDi8nA'
),
(
  'Dam Haji',
  'A traditional Malay board game similar to checkers',
  'Players move their pieces diagonally across the board, capturing opponent pieces by jumping over them. The goal is to capture all opponent pieces or block their movement.',
  'Dam Haji is a variant of draughts that has been adapted to Malay culture, often played during leisure time and social gatherings.',
  'The game develops strategic thinking, planning ahead, and logical reasoning. It was often played by adults and helped pass down strategic thinking skills.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAlVFyWcXcKglY6C40FSQH7vSidkHKB7oNXWEEMVTSacCNbIfcPeUEps4aO9WyUNIZbyZqlXL_7uVNK8t7dgXhdvkfz0_BWS2jZCk3HVxKWZNWdNQEQYiGoGa5HbHngewBM1q5WEHfVGUXq7xP657NyTdRFrZkyvVg9X2z2-l6m9h4UbqW-eEYyEv0t_L7-O0Op3ZbWHfonZXzzG-0el3584jy2fbDrw5Wcstqri1Q2TME5IuQpXOjoteYjFEvFr2HaK4TwEpWQ61fW'
),
(
  'Kabbadi',
  'A contact team sport that combines elements of wrestling and tag',
  'A raider from one team enters the opponent''s half and tries to tag defenders while holding their breath and chanting "kabaddi". Tagged defenders are out, but if the raider is tackled, they are out.',
  'Kabaddi has ancient roots in the Indian subcontinent and was adopted in Malaysia through cultural exchange, becoming popular in rural communities.',
  'The game promotes physical fitness, breath control, and team strategy. It teaches courage, quick thinking, and the importance of both individual skill and team coordination.',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDNWkEWzDDTtpfEIbZCu_GPmBoBPm0oWkUqe9cZoJd1p2R8bJJ7Zc3A1qFUa2396kCZ12xprre-tVD9v47mvqtOIRJs3DH2M0CJz9PQYJT08WEqgVZoK3cf4qjx9BSwU5bI5o-srhBq5JgRvtcfkyPDUpchTfC4LE_qAkE8AYAhiRRz3FrhpNC-bsZh1LxlNpc_euw2Yc3cH99uJpwPM7XdsSMlXNXmdAxCvXaEa5Q8pAreCJkoP8juSqKDuZszXq-SOKuUS0YCue6H'
);

-- Create a superadmin user (you'll need to update this with actual user ID after registration)
-- INSERT INTO public.users (id, email, role) VALUES ('your-user-id-here', 'admin@tradiplay.com', 'superadmin');
