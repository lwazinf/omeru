# Omeru Digital with CrewAI Integration

This project integrates a CrewAI-powered virtual assistant into the Omeru Digital website. The AI assistant uses a crew of specialized AI agents to provide helpful information about Omeru Digital's services.

## Setup Instructions

### 1. Start the CrewAI Server

The CrewAI server is located in the `/server` directory one level up from the main project. To start it:

```bash
# Navigate to the server directory
cd ../server

# Make the start script executable if it's not already
chmod +x start_server.sh

# Start the server
./start_server.sh
```

### 2. Configure Environment Variables

Make sure you have a `.env.local` file in the root of the Next.js project with the following content:

```
NEXT_PUBLIC_CREWAI_API_URL=http://localhost:8000
```

### 3. Start the Next.js Development Server

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

## How It Works

1. The Hero component connects to the CrewAI server through the API defined in `app/lib/crewai-api.ts`.
2. When a user sends a message, it's forwarded to the CrewAI server, where a crew of AI agents processes it.
3. The server returns a response which is displayed in the chat interface.

## Available Services

The conversation interface includes quick access buttons for the following services:

- Web Development
- Mobile Development 
- Graphic Design
- Business Automation
- Digital Marketing

## Troubleshooting

- If you encounter connection issues, make sure the CrewAI server is running on port 8000.
- Check the browser console and server logs for any error messages.
- Ensure you have set up the required API keys in the server's `.env` file. 