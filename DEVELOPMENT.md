# 4B Foods - Local Development Setup

## Single Command Startup (Recommended)

Run both frontend and backend with one command from the project root:

```bash
npm run dev:all
```

This starts:

- **Backend API**: http://localhost:5000 (Express + MongoDB)
- **Frontend**: http://localhost:8443 (Vite React)

The frontend automatically connects to the backend API at `http://localhost:5000/api` (via VITE_API_URL env var).

### Output

When running `npm run dev:all`, you'll see output from both services:

```
[0]
[0] > 4b-foods-backend@1.0.0 dev
[0] > ts-node-dev --respawn --transpile-only src/server.ts
[0] ✅ MongoDB connected: [your-cluster-url]
[0] 🚀 4B Foods API running on http://localhost:5000
[1]
[1] > figma-make-app@1.0.0 dev:frontend
[1] > vite --host 0.0.0.0
[1] VITE v8.2.1 dev server running at:
[1] ➜ Local:   http://localhost:8443/
```

---

## Alternative: Run Services Separately

If you prefer running services in separate terminals:

### Terminal 1 - Backend

```bash
npm run dev:backend
```

Starts backend API on http://localhost:5000

### Terminal 2 - Frontend

```bash
npm run dev:frontend
```

Starts frontend on http://localhost:8443

Or use the original commands:

```bash
npm run dev          # Frontend only (from root)
cd backend && npm run dev  # Backend only
```

---

## Available Scripts

### Root Level (`/`)

- `npm run dev` - Start frontend only (Vite on 8443)
- `npm run dev:backend` - Start backend only (Express on 5000)
- `npm run dev:frontend` - Start frontend only (Vite on 8443)
- `npm run dev:all` - **Start both together** ⭐
- `npm run build` - Build frontend for production (creates dist/)
- `npm run preview` - Preview production build locally

### Backend Level (`/backend`)

- `npm run dev` - Start backend in dev mode with hot-reload
- `npm run build` - Build backend (TypeScript → dist/)
- `npm run start` - Run compiled backend
- `npm run seed` - Seed database with sample data

---

## Environment Variables

### Local Development (.env in root)

```env
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env in backend/)

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
CLIENT_URL=http://localhost:8443/
NODE_ENV=development
JWT_SECRET=your-secret-key
ADMIN_EMAIL=admin@4bfoods.com
ADMIN_PASSWORD=password
```

---

## API Endpoints

All available at `http://localhost:5000/api`:

- `GET /api/health` - Health check
- `POST /api/auth/login` - Admin login
- `GET /api/categories` - List categories
- `GET /api/products` - List products
- `GET /api/addons` - List addons
- `POST /api/orders` - Create order
- `GET /api/orders` - List orders

---

## Troubleshooting

### Backend won't start

- Check MongoDB MONGODB_URI in backend/.env
- Ensure port 5000 is not in use: `lsof -i :5000`

### Frontend won't connect to backend

- Verify backend is running on port 5000
- Check VITE_API_URL in root .env is set to `http://localhost:5000/api`
- Open browser DevTools Console for network errors

### Port conflicts

- Change frontend port: `npm run dev -- --port 3000`
- Change backend port: Edit `backend/.env` PORT variable

### Dependency issues

- Clear node_modules and reinstall:
  ```bash
  rm -rf node_modules backend/node_modules
  npm install
  npm install --prefix backend
  ```

---

## Quick Start Checklist

- [ ] Clone repository
- [ ] Install root dependencies: `npm install`
- [ ] Install backend dependencies: `npm install --prefix backend`
- [ ] Create backend/.env with MongoDB URI and other secrets
- [ ] Run: `npm run dev:all`
- [ ] Open http://localhost:8443 in browser
- [ ] Test API at http://localhost:5000/api/health
