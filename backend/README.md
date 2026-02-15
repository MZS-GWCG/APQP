# APQP SaaS Platform - Backend

Backend API for the APQP (Advanced Product Quality Planning) SaaS platform.

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **PostgreSQL** - Relational database
- **Sequelize** - ORM
- **JWT** - Authentication
- **Redis** - Caching
- **bcryptjs** - Password hashing

## Project Structure

```
backend/
├── config/          # Configuration files
│   ├── database.js  # Database configuration
│   └── redis.js     # Redis configuration
├── controllers/     # Request handlers
├── middleware/      # Express middleware
├── models/          # Database models
├── routes/          # API routes
├── utils/           # Utility functions
├── server.js        # Application entry point
└── package.json     # Dependencies
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- PostgreSQL (v13 or higher)
- Redis (v6 or higher)

### Installation

1. Install dependencies:
```bash
cd backend
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your database credentials and JWT secret:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=apqp_db
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_secure_jwt_secret
```

4. Create the PostgreSQL database:
```sql
CREATE DATABASE apqp_db;
```

5. Start Redis server (if not running):
```bash
redis-server
```

### Running the Application

#### Development mode with auto-reload:
```bash
npm run dev
```

#### Production mode:
```bash
npm start
```

The server will start on http://localhost:5000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token (protected)
- `GET /api/auth/profile` - Get user profile (protected)

### Clients

- `GET /api/clients` - Get all clients (protected)
- `GET /api/clients/:id` - Get client by ID (protected)
- `POST /api/clients` - Create client (admin/manager only)
- `PUT /api/clients/:id` - Update client (admin/manager only)
- `DELETE /api/clients/:id` - Delete client (admin/manager only)

### Projects

- `GET /api/projects` - Get all projects (protected)
- `GET /api/projects/:id` - Get project by ID (protected)
- `POST /api/projects` - Create project (admin/manager only)
- `PUT /api/projects/:id` - Update project (admin/manager only)
- `DELETE /api/projects/:id` - Delete project (admin/manager only)

### Parts

- `GET /api/parts?projectId=xxx` - Get all parts (protected)
- `GET /api/parts/:id` - Get part by ID (protected)
- `POST /api/parts` - Create part (admin/manager only)
- `PUT /api/parts/:id` - Update part (admin/manager only)
- `DELETE /api/parts/:id` - Delete part (admin/manager only)

### Epics (APQP Phases)

- `GET /api/epics?projectId=xxx&partId=xxx` - Get all epics (protected)
- `GET /api/epics/:id` - Get epic by ID (protected)
- `POST /api/epics` - Create epic (admin/manager only)
- `PUT /api/epics/:id` - Update epic (admin/manager only)
- `DELETE /api/epics/:id` - Delete epic (admin/manager only)

### Items (Deliverables)

- `GET /api/items?epicId=xxx` - Get all items (protected)
- `GET /api/items/:id` - Get item by ID (protected)
- `POST /api/items` - Create item (protected)
- `PUT /api/items/:id` - Update item (protected)
- `DELETE /api/items/:id` - Delete item (protected)

## Authentication & Authorization

### JWT Token

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

### User Roles

- **admin** - Full access to all resources
- **project_manager** - Can create/edit projects, parts, and epics
- **user** - Can view resources and manage assigned items

## Database Schema

### Users
- id (UUID, PK)
- username, email, password
- firstName, lastName
- role (admin | project_manager | user)
- isActive

### Clients
- id (UUID, PK)
- name, email
- ppapLevel, contactPerson, phone, address

### Projects
- id (UUID, PK)
- name, description, status
- clientId (FK → Clients)
- startDate, targetDate, completionDate

### Parts
- id (UUID, PK)
- projectId (FK → Projects)
- name, partNumber, description, revision, status

### Epics (APQP Phases)
- id (UUID, PK)
- projectId (FK → Projects)
- partId (FK → Parts)
- name, description, phase, status
- startDate, dueDate

### Items (Deliverables)
- id (UUID, PK)
- epicId (FK → Epics)
- name, description, status, priority
- assignedTo (FK → Users)
- dueDate, completedDate

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 5000 |
| DB_HOST | PostgreSQL host | localhost |
| DB_PORT | PostgreSQL port | 5432 |
| DB_NAME | Database name | apqp_db |
| DB_USER | Database user | postgres |
| DB_PASSWORD | Database password | - |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRE | JWT expiration time | 7d |
| REDIS_HOST | Redis host | localhost |
| REDIS_PORT | Redis port | 6379 |
| CORS_ORIGIN | CORS allowed origin | http://localhost:3000 |

## Testing

Run tests:
```bash
npm test
```

## License

ISC
