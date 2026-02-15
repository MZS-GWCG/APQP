# Getting Started with APQP Platform

This guide will walk you through setting up and running the APQP Platform for the first time.

## Prerequisites Check

Before you start, make sure you have:

- [ ] Node.js v16 or higher installed
- [ ] PostgreSQL v13 or higher installed
- [ ] Redis v6 or higher installed (optional but recommended)
- [ ] A code editor (VS Code recommended)
- [ ] A terminal/command prompt

## Step-by-Step Setup

### Option 1: Automated Setup (Recommended)

1. **Open PowerShell in the APQP directory**
   ```powershell
   cd "C:\Users\Mauricio\Desktop\GIT\APQP"
   ```

2. **Run the setup script**
   ```powershell
   .\setup.ps1
   ```

3. **Configure the backend**
   - Open `backend\.env` in a text editor
   - Update these values:
     ```
     DB_PASSWORD=your_postgres_password
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     ```

4. **Create the database**
   ```powershell
   # Open PostgreSQL command line
   psql -U postgres
   
   # Create database
   CREATE DATABASE apqp_db;
   
   # Exit psql
   \q
   ```

5. **Seed the database with sample data (optional)**
   ```powershell
   cd backend
   npm run seed
   cd ..
   ```

6. **Start the application**
   ```powershell
   .\start.ps1
   ```

The frontend will automatically open at http://localhost:3000

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```powershell
   cd backend
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Create .env file**
   ```powershell
   copy .env.example .env
   ```

4. **Edit .env file with your settings**
   ```
   NODE_ENV=development
   PORT=5000
   
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=apqp_db
   DB_USER=postgres
   DB_PASSWORD=your_password_here
   
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRE=7d
   
   REDIS_HOST=localhost
   REDIS_PORT=6379
   REDIS_PASSWORD=
   
   CORS_ORIGIN=http://localhost:3000
   ```

5. **Create PostgreSQL database**
   ```sql
   CREATE DATABASE apqp_db;
   ```

6. **Seed database (optional)**
   ```powershell
   npm run seed
   ```
   
   This creates test users:
   - Admin: admin@apqp.com / admin123
   - Manager: manager@apqp.com / manager123
   - User: user@apqp.com / user123

7. **Start backend server**
   ```powershell
   npm run dev
   ```

#### Frontend Setup

1. **Open a new terminal and navigate to frontend**
   ```powershell
   cd frontend
   ```

2. **Install dependencies**
   ```powershell
   npm install
   ```

3. **Start frontend server**
   ```powershell
   npm start
   ```

## First Login

1. **Open your browser to http://localhost:3000**

2. **If you ran the seed script:**
   - Use one of the test accounts:
     - Admin: `admin@apqp.com` / `admin123`
     - Manager: `manager@apqp.com` / `manager123`
     - User: `user@apqp.com` / `user123`

3. **If you didn't run the seed script:**
   - Click "Register" to create a new account
   - After registration, you can manually set the role to admin:
     ```sql
     UPDATE users SET role = 'admin' 
     WHERE email = 'your-email@example.com';
     ```

## Explore the Platform

### Dashboard
- View project statistics
- See recent projects
- Quick navigation to all features

### Projects
- Create new projects (admin/manager only)
- View project details
- Track project status and progress

### Clients
- Manage client information
- Track PPAP levels
- View projects per client

### Project Details
- View associated parts
- Track APQP phases (epics)
- Monitor deliverables (items)

## Common Issues and Solutions

### Issue: "Cannot connect to database"
**Solution:** 
- Make sure PostgreSQL is running
- Check database credentials in `backend\.env`
- Verify the database exists: `CREATE DATABASE apqp_db;`

### Issue: "JWT token invalid"
**Solution:**
- Clear browser localStorage
- Make sure JWT_SECRET is set in `.env`
- Log out and log in again

### Issue: "Port 3000 already in use"
**Solution:**
- Stop other applications using port 3000
- Or change the port in `frontend\package.json`

### Issue: "Redis connection failed"
**Solution:**
- Redis is optional for this demo
- Start Redis: `redis-server`
- Or comment out Redis code in backend

### Issue: Frontend shows "Network Error"
**Solution:**
- Make sure backend is running on port 5000
- Check CORS settings in `backend\.env`
- Verify `frontend\.env` has correct API URL

## Development Tips

### Hot Reload
Both frontend and backend support hot reload:
- Backend: Changes reload automatically with nodemon
- Frontend: Changes reload automatically with React

### Database Reset
To reset the database and start fresh:
```powershell
cd backend
npm run seed
```
⚠️ **Warning:** This will delete all existing data!

### Stopping the Servers
- Press `Ctrl+C` in each terminal window
- Or close the terminal windows

### Viewing Logs
- Backend logs appear in the backend terminal
- Frontend logs appear in the browser console (F12)

## Next Steps

1. **Explore the API**
   - Visit http://localhost:5000/health to check backend status
   - Use Postman or similar tool to test API endpoints
   - See [backend/README.md](backend/README.md) for full API documentation

2. **Customize the Application**
   - Modify models in `backend/models/`
   - Add new components in `frontend/src/components/`
   - Update styles in component CSS files

3. **Add More Features**
   - Document management
   - Email notifications
   - Advanced analytics
   - Export functionality

## Resources

- [Backend Documentation](backend/README.md)
- [Frontend Documentation](frontend/README.md)
- [Main README](README.md)

## Getting Help

If you encounter issues:
1. Check this guide for common solutions
2. Review the error messages carefully
3. Check the console logs (backend terminal and browser)
4. Verify all prerequisites are installed correctly
5. Make sure all environment variables are set

## Success Checklist

- [ ] Backend server running on port 5000
- [ ] Frontend running on port 3000
- [ ] PostgreSQL database created and connected
- [ ] Can login to the application
- [ ] Can view dashboard
- [ ] Can create a project (if admin/manager)
- [ ] Can view project details

**Congratulations! You're ready to use the APQP Platform! 🎉**
