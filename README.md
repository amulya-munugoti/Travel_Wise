# TravelWise – Trip Planner

> Discover places, plan day-by-day trips, and keep itineraries together.

[![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19.0+-61DAFB.svg?logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4+-38B2AC.svg?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![SQLite/PostgreSQL](https://img.shields.io/badge/SQLAlchemy-ORM-red.svg?logo=postgresql&logoColor=white)](https://www.sqlalchemy.org/)

---

## What TravelWise does

TravelWise keeps trip planning centered on four steps:
1. **Discover destinations** in the curated places catalogue and filter by city, interest, or search.
2. **Build a trip** by choosing its destination, duration, travelers, budget, pace, interests, and optional places.
3. **Review the itinerary** with activities organized by day. Trip details also include the available budget and packing-list tools.
4. **Return to saved trips** to reopen or remove itineraries. A public welcome page explains the product; sign-in is required to explore destinations, use the planner, and access saved trip data.

---

## Features

- **Destination discovery** with city, interest, and text filters; place selections carry into trip creation.
- **Guided trip creation** for destination, duration, group size, budget, travel pace, and interests.
- **Day-by-day itineraries** with relevant trip details, including budget and packing checklist views.
- **Saved trips** for reopening and managing planned itineraries.
- **Responsive navigation** with a focused public welcome page and account-protected discovery, planning, and trip storage.
- **Dual-Database Support**: Out-of-the-box zero-dependency SQLite fallback for immediate local testing, plus production PostgreSQL support.

---

## 🏗️ Architecture & Technology Stack

```
   ┌─────────────────────────────────────────────────────────┐
   │             React 19 + Vite Frontend (Port 5173)         │
   │  Tailwind CSS • Lucide Icons • React Router • Axios      │
   └────────────────────────────┬────────────────────────────┘
                                │ JSON REST API (JWT Bearer)
   ┌────────────────────────────▼────────────────────────────┐
   │             FastAPI Python Backend (Port 8000)          │
   │  Pydantic v2 • Haversine Recommendation • Route Engine  │
   └────────────────────────────┬────────────────────────────┘
                                │ SQLAlchemy ORM
   ┌────────────────────────────▼────────────────────────────┐
   │         Database (PostgreSQL / SQLite Fallback)         │
   │  Users • Places • Trips • Itineraries • Checklists      │
   └─────────────────────────────────────────────────────────┘
```

- **Frontend**: React 19, Vite, Tailwind CSS, Lucide-React, Axios, React Router.
- **Backend**: FastAPI, Python 3.10+, SQLAlchemy, Pydantic, Passlib (Bcrypt), Python-Jose (JWT).
- **Database**: PostgreSQL (production) with automatic SQLite local fallback.
- **Production Target**: Ubuntu EC2, Nginx reverse proxy, Systemd process supervision, SSL/TLS.

---

## 📁 Repository Structure

```
Travel_Wise/
├── backend/
│   ├── app/
│   │   ├── api/             # REST endpoints (auth, places, trips, itinerary, budget, checklist)
│   │   ├── core/            # Config, security (JWT & Bcrypt), seed data
│   │   ├── database/        # SQLAlchemy session & init_db table/seed creator
│   │   ├── models/          # User, Place, Trip, ItineraryDay, ChecklistItem models
│   │   ├── schemas/         # Pydantic request/response schemas
│   │   ├── services/        # recommendation, itinerary_engine, budget_service, checklist_service
│   │   └── main.py          # FastAPI application entrypoint & CORS
│   ├── tests/               # Pytest automated test suite
│   ├── requirements.txt     # Python backend dependencies
│   └── Dockerfile           # Backend container image
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Navbar, Footer, PlaceCard, LoadingSpinner, ProtectedRoute
│   │   ├── context/         # AuthContext (JWT token storage & auto-session)
│   │   ├── pages/           # Home, Login, Register, CreateTrip, Places, Itinerary, SavedTrips, Profile
│   │   ├── services/        # Centralized Axios API client
│   │   ├── utils/           # Currency (₹ INR), duration, and distance formatters
│   │   ├── App.jsx          # Route configuration
│   │   └── index.css        # Tailwind directives & aesthetic styling
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── deploy/
│   ├── nginx.conf           # Production Nginx reverse proxy configuration
│   └── travelwise.service   # Systemd service unit for EC2
├── start-all.bat            # 1-Click launcher for both servers (Windows)
├── start-backend.bat        # 1-Click backend launcher (Windows)
├── start-frontend.bat       # 1-Click frontend launcher (Windows)
├── package.json             # Root unified runner (npm run dev)
├── docker-compose.yml       # Containerized deployment
└── README.md
```

---

## Runtime architecture

TravelWise has no JavaScript backend. React/Vite provides the browser
experience; FastAPI owns authentication, database access, the curated place
catalogue, itinerary generation, and trip data. Additional location and image
endpoints remain available in the backend but are not part of the primary
trip-planning interface.

## ⚡ Quick Start (Local Development)

### Option 1: One-Click Launch (Windows)
Double-click `start-all.bat` in the root folder, or run:
```cmd
start-all.bat
```
This opens both the FastAPI backend on port `8000` and the React frontend on port `5173`.

---

### Option 2: Unified NPM Command (Root)
From the project root:
```bash
# 1. Install root & frontend dependencies
npm run install:all

# 2. Run both backend & frontend concurrently
npm run dev
```

---

### Option 3: Manual Terminal Setup

#### 1. Backend (FastAPI Python)
```bash
cd backend

# Create & activate virtual environment (Windows)
python -m venv venv
venv\Scripts\activate

# (On macOS/Linux: source venv/bin/activate)

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
python -m uvicorn app.main:app --reload --port 8000
```
- API Health Check: `http://localhost:8000/api/health`
- Interactive Swagger Docs: `http://localhost:8000/docs`

#### 2. Frontend (React + Vite)
```bash
cd frontend

# Install packages
npm install

# Start Vite dev server
npm run dev
```
- Frontend Web App: `http://localhost:5173`

---

## 🧪 Running Automated Tests

To run the full backend test suite:
```bash
# From the root directory:
npm run test:backend

# Or directly in backend:
cd backend
venv\Scripts\pytest tests -v
```

Tests cover:
- Health check endpoints
- User registration, password hashing & JWT token verification
- Place retrieval and interest-based recommendations
- End-to-end trip creation, day clustering, budget estimation, and checklist generation

---

## 🔑 Demo Account for Testing

For immediate testing, you can register a new account or click the **"Fill Demo Credentials"** button on the Login page:
- **Email**: `traveler@travelwise.com`
- **Password**: `TravelWise@123`

---

## 🌐 Production AWS EC2 Deployment Guide

1. **Provision EC2 Instance**:
   - Ubuntu 22.04 LTS / 24.04 LTS (t3.small or t3.medium recommended).
   - Inbound Security Group rules: Port `22` (SSH), Port `80` (HTTP), Port `443` (HTTPS).

2. **Clone & Setup**:
   ```bash
   git clone https://github.com/your-username/Travel_Wise.git /var/www/travelwise
   cd /var/www/travelwise
   ```

3. **Backend Systemd Configuration**:
   ```bash
   cd /var/www/travelwise/backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt

   # Copy and activate systemd service
   sudo cp /var/www/travelwise/deploy/travelwise.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable travelwise
   sudo systemctl start travelwise
   ```

4. **Frontend Build**:
   ```bash
   cd /var/www/travelwise/frontend
   npm install
   npm run build
   ```

5. **Nginx Reverse Proxy**:
   ```bash
   sudo cp /var/www/travelwise/deploy/nginx.conf /etc/nginx/sites-available/travelwise
   sudo ln -s /etc/nginx/sites-available/travelwise /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

6. **SSL Certificate (Let's Encrypt / Certbot)**:
   ```bash
   sudo apt install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```
   AWS Project
