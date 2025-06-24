# Playlist Cover Generator

A modern web application that generates stunning, AI-powered cover art for your Spotify playlists. Transform your music collection with personalized visual experiences!

### 🚀 Live Demo: https://playlist-cover-generator.vercel.app

## ✨ Features

- 🔐 **Secure Spotify Authentication** - Safe OAuth integration with NextAuth.js
- 🎨 **AI-Powered Cover Generation** - Leonardo.AI integration with 6 distinct style options
- 🎯 **Smart Track Selection** - Choose specific tracks to influence AI generation
- 📚 **Generation History** - View and reuse previously generated covers
- 🔄 **Real-time Preview** - Instant side-by-side comparison with seamless animations
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🎭 **Multiple Art Styles** - Dynamic, Cinematic, Bokeh, Vibrant, Illustration, and Minimalist
- 🖼️ **Instant Cover Updates** - Direct integration with Spotify's playlist cover API
- 🔒 **Privacy-First** - Only update playlists you own


## 🛠️ Tech Stack

### Frontend
- **Next.js 15.2.4** (App Router)
- **React 19** with TypeScript
- **Ant Design 5.24.6** - Modern UI components
- **Emotion 11.14.0** - Styled components with theme integration
- **NextAuth.js 4.24.11** - Authentication

### Backend
- **Next.js API Routes** - Serverless functions
- **Prisma 6.6.0** - Database ORM with PostgreSQL
- **Spotify Web API** - Playlist and track data
- **Leonardo.AI API** - AI image generation
- **PostgreSQL** - Primary database with Supabase support

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** 
- **npm** or **yarn**
- **Spotify Developer Account** ([Create one here](https://developer.spotify.com/))
- **PostgreSQL Database** (local or cloud - Supabase recommended)
- **Leonardo.AI API Key** (optional for development - mock data available)

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Spotify API Configuration
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

# NextAuth Configuration  
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=your_postgresql_connection_string
DIRECT_URL=your_direct_database_url  # For Supabase/connection pooling

# Leonardo AI (Optional - uses mock data in development)
LEONARDO_API_KEY=your_leonardo_api_key
```

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/playlist-cover-generator.git
   cd playlist-cover-generator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database:**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

## 📖 Usage Guide

1. **Authenticate** - Sign in with your Spotify account
2. **Select Playlist** - Choose any playlist from your library
3. **Pick Tracks** - Select specific tracks to influence the AI (optional but recommended)
4. **Choose Style** - Pick from 6 available art styles
5. **Generate** - Create your AI-powered cover art
6. **Preview & Apply** - Compare with original and set as your new playlist cover
7. **Manage History** - View and reuse previously generated covers

## 🔌 API Endpoints

### Spotify Integration
- `GET /api/spotify/playlists` - Fetch user's playlists with ownership info
- `GET /api/spotify/playlists/[id]` - Get specific playlist details
- `GET /api/spotify/playlists/[id]/tracks` - Retrieve playlist tracks
- `PUT /api/spotify/playlists/[id]/cover` - Update playlist cover image

### AI Generation
- `POST /api/generate-image` - Initiate Leonardo.AI cover generation
- `GET /api/generation-result` - Poll for generation completion status

### Data Management
- `GET /api/playlists/[id]/images` - Fetch generation history for playlist
- `POST /api/playlists/[id]/images` - Save generated image to database

## 🗄️ Database Schema

The application uses Prisma with PostgreSQL for data persistence:

- **User** - Stores user information and credit balance
- **Playlist** - Links Spotify playlists to users
- **GeneratedImage** - Tracks all generated covers with style metadata


## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
