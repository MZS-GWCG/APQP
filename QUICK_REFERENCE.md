# APQP Platform - Quick Reference

## Project Structure

```
APQP/
├── backend/              # Node.js + Express API
├── frontend/             # React Application
├── README.md            # Main documentation
├── GETTING_STARTED.md   # Setup guide
├── API_TESTING.md       # API testing examples
├── setup.ps1           # Automated setup script
└── start.ps1           # Start servers script
```

## Quick Commands

### Setup & Installation

```powershell
# Automated setup
.\setup.ps1

# Manual backend setup
cd backend
npm install
copy .env.example .env

# Manual frontend setup
cd frontend
npm install
```

### Running the Application

```powershell
# Start everything (automated)
.\start.ps1

# Start backend manually
cd backend
npm run dev                # Development with hot reload
npm start                  # Production mode

# Start frontend manually
cd frontend
npm start                  # Development server
npm run build              # Production build
```

### Database Operations

```powershell
# Create database
psql -U postgres
CREATE DATABASE apqp_db;
\q

# Seed database with sample data
cd backend
npm run seed
```

## Default Test Accounts

After running `npm run seed`:

| Email | Password | Role |
|-------|----------|------|
| admin@apqp.com | admin123 | admin |
| manager@apqp.com | manager123 | project_manager |
| user@apqp.com | user123 | user |

## Environment Variables

### Backend (backend/.env)

```env
NODE_ENV=development
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=apqp_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
REDIS_HOST=localhost
REDIS_PORT=6379
CORS_ORIGIN=http://localhost:3000
```

### Frontend (frontend/.env)

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## API Endpoints Quick Reference

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/verify` - Verify token (protected)
- `GET /api/auth/profile` - Get profile (protected)

### Clients
- `GET /api/clients` - List clients
- `POST /api/clients` - Create client (admin/manager)
- `GET /api/clients/:id` - Get client
- `PUT /api/clients/:id` - Update client (admin/manager)
- `DELETE /api/clients/:id` - Delete client (admin/manager)

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project (admin/manager)
- `GET /api/projects/:id` - Get project
- `PUT /api/projects/:id` - Update project (admin/manager)
- `DELETE /api/projects/:id` - Delete project (admin/manager)

### Parts
- `GET /api/parts?projectId=xxx` - List parts
- `POST /api/parts` - Create part (admin/manager)
- `GET /api/parts/:id` - Get part
- `PUT /api/parts/:id` - Update part (admin/manager)
- `DELETE /api/parts/:id` - Delete part (admin/manager)

### Epics (APQP Phases)
- `GET /api/epics?projectId=xxx&partId=xxx` - List epics
- `POST /api/epics` - Create epic (admin/manager)
- `GET /api/epics/:id` - Get epic
- `PUT /api/epics/:id` - Update epic (admin/manager)
- `DELETE /api/epics/:id` - Delete epic (admin/manager)

### Items (Deliverables)
- `GET /api/items?epicId=xxx` - List items
- `POST /api/items` - Create item
- `GET /api/items/:id` - Get item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item

## Database Schema

### Users
```
id, username, email, password, firstName, lastName, role, isActive
```

### Clients
```
id, name, email, ppapLevel, contactPerson, phone, address, isActive
```

### Projects
```
id, name, description, status, clientId, startDate, targetDate, completionDate
```

### Parts
```
id, projectId, name, partNumber, description, revision, status
```

### Epics (APQP Phases)
```
id, projectId, partId, name, description, phase, status, startDate, dueDate
```

### Items (Deliverables)
```
id, epicId, name, description, status, priority, assignedTo, dueDate, completedDate
```

## Status Values

### Project Status
- `planning`
- `in_progress`
- `on_hold`
- `completed`
- `cancelled`

### Part Status
- `draft`
- `active`
- `under_review`
- `approved`
- `obsolete`

### Epic Status
- `not_started`
- `in_progress`
- `completed`
- `blocked`

### Item Status
- `pending`
- `in_progress`
- `completed`
- `blocked`
- `cancelled`

### Item Priority
- `low`
- `medium`
- `high`
- `critical`

### APQP Phases
- `plan` - Plan and Define Program
- `design` - Product Design and Development
- `develop` - Process Design and Development
- `validate` - Product and Process Validation
- `launch` - Feedback, Assessment, and Corrective Action

## User Roles & Permissions

### Admin
✅ Full access to all features
✅ User management
✅ All CRUD operations

### Project Manager
✅ Create/edit projects
✅ Create/edit parts
✅ Create/edit epics
✅ View all data
❌ User management

### User
✅ View projects, parts, epics
✅ Create/edit items (deliverables)
✅ View assigned tasks
❌ Create projects/parts/epics

## Frontend Routes

| Route | Component | Protected | Description |
|-------|-----------|-----------|-------------|
| `/login` | Login | No | Login page |
| `/register` | Register | No | Registration page |
| `/dashboard` | Dashboard | Yes | Main dashboard |
| `/projects` | ProjectList | Yes | Projects list |
| `/projects/:id` | ProjectDetail | Yes | Project details |
| `/clients` | ClientList | Yes | Clients list |

## Redux Store Structure

```javascript
store = {
  auth: {
    user, token, isLoading, isError, message
  },
  projects: {
    projects, currentProject, isLoading, isError
  },
  clients: {
    clients, currentClient, isLoading, isError
  },
  parts: {
    parts, currentPart, isLoading, isError
  },
  epics: {
    epics, currentEpic, isLoading, isError
  },
  items: {
    items, currentItem, isLoading, isError
  }
}
```

## Common Tasks

### Add a New Field to a Model

1. Update the model in `backend/models/`
2. The database will auto-update in development
3. For production, create a migration

### Add a New API Endpoint

1. Create controller function in `backend/controllers/`
2. Add route in `backend/routes/`
3. Add middleware if needed
4. Test with Postman/curl

### Add a New Frontend Page

1. Create component in `frontend/src/components/`
2. Add route in `frontend/src/App.js`
3. Add navigation link if needed
4. Connect to Redux if needed

### Add Redux Action

1. Add async thunk in feature slice
2. Handle in extraReducers
3. Use in component with useDispatch

## Debugging Tips

### Backend Issues
```powershell
# Check logs in terminal
# View database
psql -U postgres -d apqp_db
\dt                    # List tables
SELECT * FROM users;   # Query data

# Test API directly
curl http://localhost:5000/health
```

### Frontend Issues
```javascript
// Open browser console (F12)
console.log(store.getState())

// Check Redux DevTools
// Check Network tab for API calls
```

### Database Issues
```sql
-- Check connections
SELECT * FROM pg_stat_activity;

-- Reset database
DROP DATABASE apqp_db;
CREATE DATABASE apqp_db;
-- Then run: npm run seed
```

## Useful NPM Scripts

### Backend
```powershell
npm start          # Start server
npm run dev        # Start with nodemon (hot reload)
npm test          # Run tests
npm run seed      # Seed database
```

### Frontend
```powershell
npm start         # Start dev server
npm run build     # Build for production
npm test          # Run tests
```

## Port Configuration

| Service | Default Port | Configurable |
|---------|--------------|--------------|
| Frontend | 3000 | Yes (package.json) |
| Backend | 5000 | Yes (.env PORT) |
| PostgreSQL | 5432 | Yes (.env DB_PORT) |
| Redis | 6379 | Yes (.env REDIS_PORT) |

## URLs

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/health

## File Locations

### Backend
- **Models:** `backend/models/`
- **Controllers:** `backend/controllers/`
- **Routes:** `backend/routes/`
- **Middleware:** `backend/middleware/`
- **Config:** `backend/config/`
- **Utils:** `backend/utils/`

### Frontend
- **Components:** `frontend/src/components/`
- **Redux:** `frontend/src/store/`
- **API:** `frontend/src/api/`
- **Styles:** Component folders + `index.css`

## Common Error Solutions

| Error | Solution |
|-------|----------|
| Port already in use | Stop other process or change port |
| Cannot connect to DB | Check PostgreSQL is running, verify .env |
| JWT token invalid | Clear localStorage, login again |
| CORS error | Check CORS_ORIGIN in backend .env |
| Module not found | Run `npm install` |
| Redis connection failed | Start Redis or comment out Redis code |

## Documentation Files

- **README.md** - Main project documentation
- **GETTING_STARTED.md** - Detailed setup guide
- **API_TESTING.md** - API endpoint examples
- **backend/README.md** - Backend documentation
- **frontend/README.md** - Frontend documentation

## Support & Resources

- Check documentation files
- Review console logs
- Test API with Postman
- Check database with psql
- Use browser DevTools (F12)

---

**Quick Tip:** Bookmark this file for easy reference! 📌
