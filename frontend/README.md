# APQP SaaS Platform - Frontend

React-based frontend for the APQP (Advanced Product Quality Planning) SaaS platform.

## Tech Stack

- **React** - UI library
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client

## Project Structure

```
frontend/
├── public/          # Static files
├── src/
│   ├── api/         # API configuration
│   ├── components/  # React components
│   │   ├── Auth/    # Authentication components
│   │   ├── Clients/ # Client management
│   │   ├── Dashboard/ # Dashboard
│   │   ├── Layout/  # Layout components
│   │   └── Projects/ # Project management
│   ├── store/       # Redux store
│   │   └── features/ # Redux slices
│   ├── App.js       # Main app component
│   ├── index.js     # App entry point
│   └── index.css    # Global styles
└── package.json     # Dependencies
```

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create a `.env` file (already created):
```
REACT_APP_API_URL=http://localhost:5000/api
```

3. Make sure the backend is running on port 5000

### Running the Application

#### Development mode:
```bash
npm start
```

The app will open at http://localhost:3000

#### Build for production:
```bash
npm run build
```

## Features

### Authentication
- User registration and login
- JWT token-based authentication
- Protected routes
- Role-based access control (RBAC)

### Dashboard
- Project statistics overview
- Recent projects list
- Quick access to key metrics

### Projects Management
- View all projects
- Create new projects (admin/manager only)
- View project details with parts and epics
- Delete projects (admin/manager only)

### Clients Management
- View all clients
- Create new clients (admin/manager only)
- Track projects per client
- Delete clients (admin/manager only)

### Parts Management (within projects)
- View parts associated with projects
- Track part status and revisions

### APQP Phases (Epics)
- Track APQP phases: Plan, Design, Develop, Validate, Launch
- Monitor phase progress and status

### Items (Deliverables)
- View deliverables within each epic
- Track item status and assignments

## User Roles

- **Admin** - Full access to all features
- **Project Manager** - Can create/edit projects, parts, and epics
- **User** - Can view resources and manage assigned items

## Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (not reversible)

## State Management

Redux Toolkit is used for global state management with the following slices:

- **auth** - User authentication state
- **projects** - Projects data and operations
- **clients** - Clients data and operations
- **parts** - Parts data and operations
- **epics** - Epics (APQP phases) data and operations
- **items** - Items (deliverables) data and operations

## API Integration

All API calls are handled through Axios with:
- Automatic token injection
- Error handling and token expiration
- Request/response interceptors

## Styling

The app uses custom CSS with:
- Responsive design
- Component-specific stylesheets
- Global utility classes
- Status badges and indicators

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

ISC
