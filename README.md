# TradiPlay - Malay Traditional Games PWA

A Progressive Web App (PWA) built with Next.js for preserving and promoting Malay traditional games. Designed for museum touchscreen devices and online public access with offline capabilities.

## 🎮 Features

### User Roles & Capabilities

**Unregistered Users:**
- Browse and search traditional games collection
- View game information (rules, history, cultural context)
- Play games (without leaderboard tracking)
- Interact with AI chatbot for game information and navigation help
- Option to register for additional features

**Registered Users:**
- All unregistered user features
- Play games with leaderboard tracking
- View personal and global leaderboards
- Manage personal profile
- Submit feedback and report issues

**Admin Users:**
- All registered user features
- Add new games to the collection
- Edit existing game details
- Enable/disable games (playability and visibility)

**Superadmin Users:**
- All admin features
- Add new admin users
- Remove or disable existing admin accounts
- Full user management capabilities

### Core Features

- **PWA Support**: Offline functionality with service worker caching
- **Responsive Design**: Works on touchscreens, tablets, and desktop
- **AI Chatbot**: Database-connected assistant for game information and help
- **Leaderboard System**: Track wins per game for registered users
- **Game Management**: Admin interface for content management
- **User Management**: Role-based access control
- **Feedback System**: User feedback and issue reporting

## 🛠 Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **PWA**: next-pwa
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- Supabase account

### 1. Clone and Install
```bash
git clone <repository-url>
cd tradiplay
npm install
```

### 2. Environment Setup
Create `.env` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Database Setup
1. Create a new Supabase project
2. Run the SQL commands from `database-schema.sql` in your Supabase SQL Editor
3. Update your environment variables with the actual Supabase credentials

### 4. Run Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### 5. Create Superadmin Account
1. Register a new account through the app
2. In Supabase, update your user role:
```sql
UPDATE public.users SET role = 'superadmin' WHERE email = 'your-email@example.com';
```

## 📱 PWA Features

- **Offline Support**: Core functionality works without internet
- **Install Prompt**: Users can install the app on their devices
- **Service Worker**: Automatic caching of static assets and API responses
- **Manifest**: Proper PWA manifest for app-like experience

## 🎯 Game Collection

The app comes with sample traditional Malay games:

1. **Congkak** - Traditional mancala game with shells/marbles
2. **Sepak Takraw** - Volleyball-football hybrid sport
3. **Gasing** - Traditional spinning top competition

Admins can add more games through the admin dashboard.

## 🤖 AI Chatbot

The integrated chatbot provides:
- Game rules and instructions
- Historical background and cultural context
- Navigation assistance
- Frequently asked questions
- Database-connected responses

## 📊 Database Schema

- **users**: User profiles and role management
- **games**: Game content and metadata
- **leaderboard**: Win tracking per user per game
- **feedback**: User feedback and issue reports

## 🔐 Security Features

- Row Level Security (RLS) policies
- Role-based access control
- Secure authentication with Supabase
- Protected admin routes
- Input validation and sanitization

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
npm run build
npm start
```

## 📁 Project Structure

```
tradiplay/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   ├── chatbot/           # AI chatbot interface
│   ├── games/             # Game listing and details
│   ├── leaderboard/       # Leaderboard views
│   └── profile/           # User profile management
├── components/            # Reusable React components
├── contexts/              # React contexts (Auth)
├── lib/                   # Utility functions and Supabase client
├── public/                # Static assets and PWA files
├── database-schema.sql    # Database setup script
└── SETUP.md              # Detailed setup instructions
```

## 🎨 Customization

### Adding New Games
Use the admin dashboard at `/admin` to add games with:
- Name and description
- Detailed rules
- Historical background
- Cultural significance
- Enable/disable status

### Modifying Game Logic
Edit game play components in `/app/games/[id]/play/page.tsx`

### Customizing Chatbot
Update response logic in `/app/chatbot/page.tsx`

### Styling Changes
Modify Tailwind classes in components or add global styles to `/app/globals.css`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For setup help, see `SETUP.md` for detailed instructions.

For issues or questions, please create an issue in the repository.

---

Built with ❤️ for preserving Malaysian cultural heritage through technology.
