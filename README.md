# Spotify Cover Generator

A web application that generates unique cover art for your Spotify playlists using AI. Create stunning, personalized playlist covers with just a few clicks!

## 🚀 Live Demo: https://playlist-cover-generator.vercel.app

## Features

- 🔐 Secure Spotify authentication
- 🎨 AI-powered playlist cover generation using Leonardo.AI with multiple style options
- 🔄 Real-time cover image preview with seamless animation
- 💳 Credit-based system for cover generation


## Tech Stack

- *Frontend:*
  - Next.js 13+ (App Router)
  - React
  - TypeScript
  - Ant Design
  - Emotion (styled-components)
  - NextAuth.js

- *Backend:*
  - Next.js API Routes
  - Prisma
  - PostgreSQL
  - Spotify Web API
  - Leonardo.AI API

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Spotify Developer Account
- PostgreSQL database

### Environment Variables

Create a .env file in the root directory with the following variables:

env
# Spotify API
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Database
DATABASE_URL=your_postgresql_connection_string

### Installation

1. Clone the repository:
   
   git clone https://github.com/yourusername/spotify-cover-app.git
   cd spotify-cover-app
   

2. Install dependencies:
   
   npm install
   # or
   yarn install
   

3. Set up the database:
   
   npx prisma migrate dev
   

4. Start the development server:
   
   npm run dev
   # or
   yarn dev
   

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Log in with your Spotify account
2. Select a playlist from your library
3. Generate a unique cover art using AI
4. Preview and set the generated cover as your playlist's artwork

## API Endpoints

- POST /api/users/credits - Get user credits
- GET /api/spotify/playlists - Fetch user's playlists
- PUT /api/spotify/playlists/[id]/cover - Update playlist cover
- GET /api/spotify/playlists/[id]/tracks - Get playlist tracks

## Contributing

1. Fork the repository
2. Create your feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Spotify for their amazing API
- Next.js team for the fantastic framework
- All contributors and users of this project

### Login flow
![截圖 2025-04-11 下午5 01 29](https://github.com/user-attachments/assets/1fdd7505-c237-4e1c-bfb0-ef8b319feb1b)
![截圖 2025-04-11 下午5 01 50](https://github.com/user-attachments/assets/fcd7d8c7-e7b6-4a47-8252-67154af189a3)

### Generation flow
![截圖 2025-04-11 下午4 56 23](https://github.com/user-attachments/assets/085124ea-37f3-4724-b6be-8ea833aab490)
![截圖 2025-04-11 下午4 57 43](https://github.com/user-attachments/assets/8e59e9ee-10a3-4418-a479-d3a2f5dcd10e)
![截圖 2025-04-11 下午4 58 07](https://github.com/user-attachments/assets/e56d368d-da24-4175-80ba-f92e80a4a217)
![截圖 2025-04-11 下午4 58 45](https://github.com/user-attachments/assets/ebc15b95-d9e0-4f1e-a1ce-8cd0abe1851e)
