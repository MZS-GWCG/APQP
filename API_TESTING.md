# API Testing Guide

This guide provides example API requests for testing the APQP Platform backend.

## Base URL

```
http://localhost:5000/api
```

## Authentication

### Register a New User

**POST** `/auth/register`

```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "User"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid",
      "username": "testuser",
      "email": "test@example.com",
      "firstName": "Test",
      "lastName": "User",
      "role": "user"
    },
    "token": "jwt-token-here"
  }
}
```

### Login

**POST** `/auth/login`

```json
{
  "email": "admin@apqp.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid",
      "username": "admin",
      "email": "admin@apqp.com",
      "role": "admin"
    },
    "token": "jwt-token-here"
  }
}
```

### Verify Token

**GET** `/auth/verify`

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "username": "admin",
      "email": "admin@apqp.com",
      "role": "admin"
    }
  }
}
```

---

## Clients

### Get All Clients

**GET** `/clients`

**Headers:**
```
Authorization: Bearer {token}
```

### Create Client

**POST** `/clients`

**Headers:**
```
Authorization: Bearer {token}
```

```json
{
  "name": "New Client Company",
  "email": "contact@newclient.com",
  "ppapLevel": 3,
  "contactPerson": "Jane Smith",
  "phone": "+1-555-0100",
  "address": "123 Main St, City, State 12345"
}
```

### Get Client by ID

**GET** `/clients/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

### Update Client

**PUT** `/clients/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

```json
{
  "name": "Updated Client Name",
  "ppapLevel": 4
}
```

### Delete Client

**DELETE** `/clients/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

---

## Projects

### Get All Projects

**GET** `/projects`

**Headers:**
```
Authorization: Bearer {token}
```

### Create Project

**POST** `/projects`

**Headers:**
```
Authorization: Bearer {token}
```

```json
{
  "name": "New Project",
  "description": "Project description here",
  "clientId": "client-uuid-here",
  "status": "planning",
  "startDate": "2024-01-15",
  "targetDate": "2024-12-31"
}
```

**Status options:**
- `planning`
- `in_progress`
- `on_hold`
- `completed`
- `cancelled`

### Get Project by ID

**GET** `/projects/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

### Update Project

**PUT** `/projects/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

```json
{
  "name": "Updated Project Name",
  "status": "in_progress",
  "targetDate": "2025-01-31"
}
```

### Delete Project

**DELETE** `/projects/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

---

## Parts

### Get All Parts

**GET** `/parts?projectId={projectId}`

**Headers:**
```
Authorization: Bearer {token}
```

### Create Part

**POST** `/parts`

**Headers:**
```
Authorization: Bearer {token}
```

```json
{
  "projectId": "project-uuid-here",
  "name": "Engine Component",
  "partNumber": "ENG-001",
  "description": "Main engine component",
  "revision": "Rev A",
  "status": "draft"
}
```

**Status options:**
- `draft`
- `active`
- `under_review`
- `approved`
- `obsolete`

### Get Part by ID

**GET** `/parts/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

### Update Part

**PUT** `/parts/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

```json
{
  "name": "Updated Part Name",
  "revision": "Rev B",
  "status": "active"
}
```

### Delete Part

**DELETE** `/parts/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

---

## Epics (APQP Phases)

### Get All Epics

**GET** `/epics?projectId={projectId}&partId={partId}`

**Headers:**
```
Authorization: Bearer {token}
```

### Create Epic

**POST** `/epics`

**Headers:**
```
Authorization: Bearer {token}
```

```json
{
  "projectId": "project-uuid-here",
  "partId": "part-uuid-here",
  "name": "Plan and Define",
  "description": "Initial planning phase",
  "phase": "plan",
  "status": "not_started",
  "startDate": "2024-01-15",
  "dueDate": "2024-03-15"
}
```

**Phase options:**
- `plan` - Plan and Define Program
- `design` - Product Design and Development
- `develop` - Process Design and Development
- `validate` - Product and Process Validation
- `launch` - Feedback, Assessment, and Corrective Action

**Status options:**
- `not_started`
- `in_progress`
- `completed`
- `blocked`

### Get Epic by ID

**GET** `/epics/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

### Update Epic

**PUT** `/epics/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

```json
{
  "status": "in_progress",
  "dueDate": "2024-04-15"
}
```

### Delete Epic

**DELETE** `/epics/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

---

## Items (Deliverables)

### Get All Items

**GET** `/items?epicId={epicId}`

**Headers:**
```
Authorization: Bearer {token}
```

### Create Item

**POST** `/items`

**Headers:**
```
Authorization: Bearer {token}
```

```json
{
  "epicId": "epic-uuid-here",
  "name": "Design FMEA",
  "description": "Complete Design Failure Mode and Effects Analysis",
  "status": "pending",
  "priority": "high",
  "assignedTo": "user-uuid-here",
  "dueDate": "2024-05-15"
}
```

**Status options:**
- `pending`
- `in_progress`
- `completed`
- `blocked`
- `cancelled`

**Priority options:**
- `low`
- `medium`
- `high`
- `critical`

### Get Item by ID

**GET** `/items/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

### Update Item

**PUT** `/items/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

```json
{
  "status": "in_progress",
  "priority": "critical",
  "assignedTo": "another-user-uuid"
}
```

### Delete Item

**DELETE** `/items/{id}`

**Headers:**
```
Authorization: Bearer {token}
```

---

## Testing with curl

### Login Example

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@apqp.com","password":"admin123"}'
```

### Get Projects Example

```bash
curl -X GET http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Create Project Example

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test Project",
    "description":"Test Description",
    "clientId":"CLIENT_UUID_HERE",
    "status":"planning",
    "startDate":"2024-01-15",
    "targetDate":"2024-12-31"
  }'
```

---

## Testing with PowerShell

### Login Example

```powershell
$body = @{
    email = "admin@apqp.com"
    password = "admin123"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"

$token = $response.data.token
Write-Host "Token: $token"
```

### Get Projects Example

```powershell
$headers = @{
    Authorization = "Bearer $token"
}

$projects = Invoke-RestMethod -Uri "http://localhost:5000/api/projects" `
    -Method GET `
    -Headers $headers

$projects.data.projects | Format-Table
```

---

## Postman Collection

You can import these requests into Postman:

1. Create a new Collection called "APQP Platform"
2. Add an environment with:
   - `base_url`: `http://localhost:5000/api`
   - `token`: (empty, will be filled after login)
3. Add requests as shown above
4. Use `{{base_url}}` and `{{token}}` variables

### Setting Token in Postman

After login, add this to the "Tests" tab of the login request:

```javascript
var jsonData = pm.response.json();
if (jsonData.success && jsonData.data.token) {
    pm.environment.set("token", jsonData.data.token);
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error message"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "No token provided"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Access denied. Insufficient permissions."
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal Server Error"
}
```

---

## Notes

- All protected endpoints require the `Authorization: Bearer {token}` header
- Admin and Project Manager roles have additional permissions
- UUIDs are used for all resource IDs
- Dates should be in ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss)
- All responses follow the standard format with `success`, `message`, and `data` fields
