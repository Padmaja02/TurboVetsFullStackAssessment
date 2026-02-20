# TurboVets – Full Stack Assessment

## Overview

This is a full-stack task management application implementing:

- JWT Authentication
- Role-Based Access Control (RBAC)
- Multi-tenant organization scoping
- Secure CRUD operations
- Angular frontend with API integration

---

# Backend

## Tech Stack

- NestJS (Nx workspace)
- TypeORM
- PostgreSQL
- JWT Authentication
- Custom RBAC Guard

## Architecture

### Multi-Tenant Design

- Each **User** belongs to one **Organization**
- Each **Task** belongs to one **Organization**
- Cross-organization access is blocked
- Organization boundary enforced in service layer

### Authentication Flow

1. User logs in via:

POST /api/auth/login

2. Backend returns JWT containing:
- userId
- email
- role
- organizationId
3. Token is sent in:

Authorization: Bearer <token>


### Role Permissions

| Role   | Create | View | Edit | Delete |
|--------|--------|------|------|--------|
| OWNER  | ✅     | ✅   | ✅   | ✅     |
| ADMIN  | ✅     | ✅   | ✅   | ❌     |
| VIEWER | ❌     | ✅   | ❌   | ❌     |

### Audit Logging

Implemented for:

- Task Creation
- Task Update
- Task Deletion

Logged fields:
- userId
- role
- action
- taskId
- timestamp

---

# Frontend

## Tech Stack

- Angular (Standalone mode)
- HTTP Interceptor
- Reactive login state
- Role-based UI controls

## Features

- Login screen
- JWT storage in localStorage
- Automatic Authorization header via interceptor
- Create task
- Edit task
- Delete task (visible only for OWNER)
- Dynamic role display

---

# Setup Instructions

## Backend Setup

```bash
cd turbo-vets
npm install
npx nx serve api
```
Backend runs at:

http://localhost:3000

Ensure PostgreSQL is running and properly configured.

Frontend Setup
cd turbo-vets-ui
npm install
ng serve

Frontend runs at:

http://localhost:4200
Design Considerations

Backend-first permission enforcement

Organization-level access restriction

Clean separation of authentication vs authorization

Minimal but functional UI

Secure data access validation in service layer

Future Improvements

Store audit logs in database

Add pagination support

Implement UI notifications

Add global error handling

Enhance UI styling

Add automated tests

Project Structure
Backend
apps/api/
  ├── auth/
  ├── tasks/
  ├── organization/
  ├── user/
Frontend
src/app/
  ├── login/
  ├── tasks/
  ├── services/
  ├── interceptors/
Final Notes

This implementation focuses on:

Strong backend security

Clear RBAC logic

Multi-tenant correctness

Clean API integration

Minimal yet functional UI