# APQP SaaS Platform - First Demo

A comprehensive multi-tenant SaaS platform for managing APQP (Advanced Product Quality Planning) in the automotive industry. This demo provides core functionality for project management, client handling, APQP phase tracking, and deliverable management with role-based access control.

## 🚀 Features

### Core Functionality
- **Multi-tenant Architecture** - Support for multiple clients and projects
- **Authentication & Authorization** - JWT-based auth with role-based access control
- **Project Management** - Create, view, and manage APQP projects
- **Client Management** - Track clients and their projects
- **Parts Management** - Manage parts within projects
- **APQP Phases (Epics)** - Track the 5 APQP phases (Plan, Design, Develop, Validate, Launch)
- **Items (Deliverables)** - Manage deliverables within each phase
- **Dashboard** - Visual overview of projects and metrics

### User Roles
- **Admin** - Full system access
- **Project Manager** - Can create/manage projects, parts, and phases
- **User** - View access and can manage assigned items

## 📁 Project Structure

```
APQP/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Database and Redis configuration
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Authentication & RBAC middleware
│   ├── models/             # Sequelize models
│   ├── routes/             # API routes
│   ├── utils/              # Utility functions
│   ├── server.js           # Entry point
│   └── package.json        # Dependencies
│
├── frontend/               # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── components/    # React components
│   │   ├── store/         # Redux store & slices
│   │   └── App.js         # Main component
│   └── package.json       # Dependencies
│
└── README.md              # This file
```

## 🛠️ Tech Stack

### Backend
- **Node.js** + **Express** - Server framework
- **PostgreSQL** - Relational database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Redis** - Caching
- **bcryptjs** - Password hashing

### Frontend
- **React** - UI library
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **PostgreSQL** (v13 or higher)
- **Redis** (v6 or higher)
- **npm** or **yarn**

## 🚀 Quick Start

### 1. Clone the Repository

```bash
cd "C:\Users\Mauricio\Desktop\GIT\APQP"
```

### 2. Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

# Edit .env with your configuration
# - Set your PostgreSQL credentials
# - Set a secure JWT secret
# - Configure Redis connection
```

**Create PostgreSQL Database:**
```sql
CREATE DATABASE apqp_db;
```

### 3. Setup Frontend

```bash
# Navigate to frontend directory (from APQP root)
cd ..\frontend

# Install dependencies
npm install

# .env file is already configured to connect to http://localhost:5000
```

### 4. Start the Application

**Terminal 1 - Start Redis (if not running as service):**
```bash
redis-server
```

**Terminal 2 - Start Backend:**
```bash
cd backend
npm run dev
```

**Terminal 3 - Start Frontend:**
```bash
cd frontend
npm start
```

The application will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 📝 Database Schema

### Core Entities

**Users**
- Authentication and role management
- Roles: admin, project_manager, user

**Clients**
- Client information
- PPAP levels
- Contact details

**Projects**
- Project details and status
- Linked to clients
- Status: planning, in_progress, on_hold, completed, cancelled

**Parts**
- Part information within projects
- Part numbers, revisions
- Status tracking

**Epics (APQP Phases)**
- Represents APQP phases
- Phases: plan, design, develop, validate, launch
- Contains deliverable items

**Items (Deliverables)**
- Task/deliverable within an epic
- Assignment to users
- Priority and status tracking

## 🔐 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/verify      - Verify token
GET    /api/auth/profile     - Get user profile
```

### Clients
```
GET    /api/clients          - List all clients
POST   /api/clients          - Create client (admin/manager)
GET    /api/clients/:id      - Get client details
PUT    /api/clients/:id      - Update client (admin/manager)
DELETE /api/clients/:id      - Delete client (admin/manager)
```

### Projects
```
GET    /api/projects         - List all projects
POST   /api/projects         - Create project (admin/manager)
GET    /api/projects/:id     - Get project details
PUT    /api/projects/:id     - Update project (admin/manager)
DELETE /api/projects/:id     - Delete project (admin/manager)
```

### Parts, Epics, Items
Similar CRUD endpoints for parts, epics (APQP phases), and items (deliverables).

See [backend/README.md](backend/README.md) for complete API documentation.

## 👤 Default User Setup

After starting the backend, you'll need to register users through the frontend or API. The first registered user can be set as admin through database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## 🎨 Frontend Routes

```
/login              - Login page
/register           - Registration page
/dashboard          - Dashboard (protected)
/projects           - Projects list (protected)
/projects/:id       - Project details (protected)
/clients            - Clients list (protected)
```

## 🔧 Configuration

### Backend Environment Variables

Edit `backend/.env`:

```env
NODE_ENV=development
PORT=5000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=apqp_db
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_secure_secret_key_here
JWT_EXPIRE=7d

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# CORS
CORS_ORIGIN=http://localhost:3000
```

### Frontend Environment Variables

The `frontend/.env` is already configured:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Production Build

### Backend
```bash
cd backend
npm start
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with a static server
```

## 🎯 Next Steps & Future Enhancements

This is a first demo with core functionality. Future enhancements could include:

- **Document Management** - Integration with S3 for PPAP documents
- **Advanced Analytics** - Charts and reporting dashboards
- **Email Notifications** - Alert users about deadlines and updates
- **Real-time Updates** - WebSocket integration for live updates
- **Gantt Charts** - Visual timeline for project phases
- **Audit Logs** - Track all changes and user actions
- **Export Functionality** - Export reports to PDF/Excel
- **Mobile App** - React Native mobile application

## 📚 Documentation

- [Backend Documentation](backend/README.md)
- [Frontend Documentation](frontend/README.md)

## ⏱️ Development Timeline

- Backend Setup: 1-2 weeks ✅
- Frontend Setup: 2-3 weeks ✅
- Integration: 1 week ✅
- Testing: 1 week ⏳

**Current Status:** MVP Complete - Ready for Testing

## 🐛 Known Issues

- Redis is optional for this demo; the app will work without it
- Database migrations are handled via Sequelize sync (should use migrations in production)
- File upload functionality not yet implemented

## 🤝 Contributing

This is a demo project. For production use, consider:
- Implementing proper database migrations
- Adding comprehensive test coverage
- Setting up CI/CD pipelines
- Implementing proper error logging
- Adding API rate limiting

## 📄 License

ISC

## 👥 Support

For issues and questions, please check the documentation or create an issue in the repository.

---

**Built with ❤️ for the automotive quality planning community**