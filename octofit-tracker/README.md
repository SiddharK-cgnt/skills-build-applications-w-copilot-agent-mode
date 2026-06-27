# OctoFit Tracker - Multi-Tier Application

A modern fitness tracking application built with React 19 (frontend), Express (backend), and MongoDB.

## Project Structure

```
octofit-tracker/
├── frontend/          # React 19 + Vite application
├── backend/           # Node.js + Express + TypeScript + Mongoose
└── docker-compose.yml # MongoDB service configuration
```

## Ports Configuration

| Service | Port | URL |
|---------|------|-----|
| Frontend (Vite) | 5173 | http://localhost:5173 |
| Backend (Express) | 8000 | http://localhost:8000 |
| MongoDB | 27017 | mongodb://localhost:27017 |

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- MongoDB (running on port 27017)

## Setup Instructions

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

The backend will start on port 8000 and connect to MongoDB at `mongodb://localhost:27017/octofit-tracker`

### MongoDB Setup

You can start MongoDB using Docker:

```bash
docker run -d -p 27017:27017 --name octofit-mongodb mongo:latest
```

Or if you have a `docker-compose.yml` in the root directory, run:

```bash
docker-compose up -d
```

## Environment Variables

### Backend (.env file)

```
NODE_ENV=development
PORT=8000
MONGODB_URI=mongodb://localhost:27017/octofit-tracker
```

## API Endpoints

### Health Check

```
GET /api/health
```

Returns the backend status and timestamp.

## Development

### Frontend Development Server

```bash
cd frontend
npm run dev
```

### Backend Development Server

```bash
cd backend
npm run dev
```

This uses `tsx watch` to automatically reload on file changes.

### Production Build

**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
```bash
cd backend
npm run build
npm start
```

## Technologies

- **Frontend:** React 19, Vite, Oxlint
- **Backend:** Node.js, Express.js, TypeScript, Mongoose
- **Database:** MongoDB
- **Additional:** CORS, dotenv

## License

ISC
