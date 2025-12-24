# DevSprout 🌱

An AI-powered interactive learning platform for JavaScript programming. DevSprout uses an intelligent mentor system that adapts to each learner's pace and understanding.

## Features

- **Adaptive AI Mentor**: Guides learners through concepts using discovery-based questioning
- **Two-Phase Learning System**: 
  - 📚 **Learning Phase**: Interactive concept teaching with adaptive questioning
  - 💻 **Assignment Phase**: Hands-on coding tasks with code review
- **Structured Curriculum**: Comprehensive JavaScript curriculum from basics to advanced topics
- **Progress Tracking**: Tracks completed subtopics and assignments
- **Google Sheets Integration**: Uses Google Sheets as a lightweight database for user authentication

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Node.js + Express
- **AI**: Groq API (LLaMA model)
- **Database**: Google Sheets API + Local JSON (lowdb)

## Project Structure

```
DevSprout/
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── data/      # Curriculum data
│   │   └── pages/
│   └── netlify.toml   # Netlify config
├── backend/           # Express backend
│   ├── routes/        # API routes
│   ├── services/      # Database services
│   └── render.yaml    # Render config
└── package.json
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm
- Groq API key
- Google Cloud service account with Sheets API enabled

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/devsprout.git
   cd devsprout
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `backend/.env`:
   ```env
   PORT=5000
   GROQ_API_KEY=your_groq_api_key
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
   GOOGLE_SHEET_ID=your_google_sheet_id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   This starts both frontend (port 5173) and backend (port 5000) concurrently.

## Deployment

### Frontend (Netlify)

1. Connect your GitHub repository to Netlify
2. Set build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
3. Add environment variable:
   - `VITE_API_URL`: Your backend URL (e.g., `https://devsprout-api.onrender.com`)

### Backend (Render)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set:
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
4. Add environment variables (same as `.env` file)

## Curriculum Topics

1. Introduction to JavaScript
2. Variables & Data Types
3. Operators
4. Control Flow
5. Functions
6. Arrays
7. Objects
8. DOM Manipulation
9. Events
10. Asynchronous JavaScript
11. Error Handling
12. ES6+ Features
13. Final Project

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.


