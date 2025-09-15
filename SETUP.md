# TradiPlay Setup Instructions

## Prerequisites
- Node.js 18+ installed
- Supabase account

## 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Update `.env` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. In your Supabase dashboard, go to SQL Editor and run the contents of `database-schema.sql`

5. After creating your first admin account through the app, update the users table to make yourself a superadmin:
   ```sql
   UPDATE public.users SET role = 'superadmin' WHERE email = 'your-email@example.com';
   ```

## 2. Install Dependencies

```bash
npm install
```

## 3. Run Development Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000)

## 4. PWA Setup

For production deployment:

1. Add your domain to Supabase Auth settings
2. Configure your web server to serve the PWA manifest
3. Ensure HTTPS is enabled for PWA functionality

## Features Overview

### User Roles
- **Unregistered**: Browse games, play without tracking, use chatbot
- **Registered**: All above + leaderboard tracking, profile management, feedback
- **Admin**: All above + manage games (add/edit/enable/disable)
- **Superadmin**: All above + manage admin users

### Key Pages
- `/` - Homepage with feature overview
- `/games` - Browse all available games
- `/games/[id]` - Game details (rules, history, culture)
- `/games/[id]/play` - Play game interface
- `/leaderboard` - View win statistics (registered users only)
- `/profile` - User profile and feedback submission
- `/admin` - Admin dashboard for game and user management
- `/chatbot` - AI assistant for game information and help
- `/auth` - Login/registration page

### Database Tables
- `users` - User profiles and roles
- `games` - Game information and content
- `leaderboard` - User win tracking per game
- `feedback` - User feedback and issue reports

## Customization

### Adding New Games
Admins can add games through the admin dashboard at `/admin`

### Modifying Game Play Logic
Edit the game play components in `/app/games/[id]/play/page.tsx`

### Chatbot Responses
Customize chatbot logic in `/app/chatbot/page.tsx` in the `generateBotResponse` function

### Styling
The app uses Tailwind CSS. Modify styles in component files or add global styles to `/app/globals.css`

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
Ensure your deployment platform supports:
- Node.js 18+
- Environment variables
- Static file serving for PWA assets
