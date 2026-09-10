# JAN-SAMADHAN

**Multilingual, AI-Assisted Citizen Grievance Redressal Portal**

---

## What is JAN-SAMADHAN?

**JAN-SAMADHAN (जन-समाधान)** is a full-stack digital governance platform that helps citizens submit public grievances to government departments and track their resolution in real time.

### The Problem It Solves
Traditional public grievance systems are often difficult to navigate, available in only one language, lack transparent status tracking, and provide no clear visibility into resolution timeframes.

### Who Uses It?
- **Citizens**: To lodge grievances in their preferred language (using text or voice), upload supporting documents, track progress with visual timelines, provide feedback, or file formal appeals.
- **Department Officials & Administrators**: To view incoming department tickets, record investigation updates, resolve issues, and monitor Service Level Agreement (SLA) deadlines.

---

## Main Features

- **Citizen Registration & Login**: Simple authentication using mobile number and password with persistent sessions.
- **Multilingual Support**: Full interface translation across **English**, **Hindi (हिन्दी)**, and **Marathi (मराठी)**.
- **Voice & AI Redressal Assistance**: Hands-free voice speech-to-text input, automatic department suggestion, AI grievance draft generation, and plain-language explanation of official responses.
- **Department Selection**: Standardized catalog of public departments (Water Supply, Electricity, Municipal Services, Public Works, Healthcare, etc.).
- **Evidence Attachments**: Secure file uploads supporting `.jpg`, `.jpeg`, `.png`, `.pdf`, `.doc`, and `.docx` formats (up to 5 MB).
- **Tracking & Timelines**: Automatic generation of unique tracking numbers (e.g. `GRV2026136015`) with step-by-step progress history.
- **SLA & Escalation Monitoring**: 21-day target resolution SLA with automatic overdue alerts and escalation recommendations.
- **Feedback & Appeals**: Citizen satisfaction rating upon resolution and formal appeal workflow for unresolved issues.

---

## Technology Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, React Router v7, React Context API, Lucide Icons, Framer Motion.
- **Backend**: Node.js, Express, TypeScript, Prisma ORM, PostgreSQL, JWT (`jsonwebtoken`), Zod, Bcrypt, Multer.
- **Testing & CI**: Automated End-to-End integration test suite, GitHub Actions CI.

---

## Project Structure

```text
JAN-SAMADHAN/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow (lint, build, validation)
├── backend/                   # Express.js REST API
│   ├── prisma/                # Prisma schema, migrations, and seed data
│   ├── scripts/               # Automated E2E test suite (test-e2e.ts)
│   ├── src/                   # Backend TypeScript source code
│   │   ├── config/            # Environment variables & database client
│   │   ├── middleware/        # Authentication, authorization, file upload filters
│   │   ├── routes/            # Express API endpoint definitions
│   │   ├── services/          # Business logic, SLA calculations, AI handlers
│   │   ├── utils/             # Zod validation schemas
│   │   ├── app.ts             # Express application & global middleware
│   │   └── server.ts          # HTTP server bootstrap & graceful shutdown
│   ├── uploads/               # Storage directory for uploaded attachments
│   ├── package.json           # Backend dependencies and scripts
│   └── README.md              # Backend-specific documentation
├── src/                       # React Frontend SPA
│   ├── api/                   # Backend API client & service endpoints
│   ├── components/            # Reusable UI components (Modals, Headers, Footers)
│   ├── context/               # Global state providers (Auth, Grievances, Language)
│   ├── data/                  # Localized department catalog & constants
│   ├── pages/                 # Views (Home, Lodge, Track, MyGrievances, Appeal, etc.)
│   ├── types.ts               # Shared TypeScript types
│   ├── App.tsx                # App routing configuration
│   └── main.tsx               # Frontend root mount point
├── FRONTEND_README.md         # Frontend-specific documentation
├── README.md                  # Project overview (this file)
└── package.json               # Frontend dependencies and scripts
```

---

## How the System Works

```text
Citizen Browser (React SPA)
       │
       ▼ (HTTP REST API with Bearer JWT)
Express Backend Server
       │
       ├─► Zod Validation & Authentication Middleware
       ├─► Services (SLA logic & business rules)
       ├─► File System (Stores uploads in ./uploads)
       │
       ▼ (Type-safe queries via Prisma ORM)
PostgreSQL Database (Stores users, departments, grievances, timelines)
```

1. **Lodging a Grievance**: The citizen submits a complaint (or uses voice speech-to-text). AI analyzes the text to suggest the right department.
2. **Database Persistence**: The backend validates the payload using Zod and saves the record in PostgreSQL via Prisma ORM.
3. **Handling Attachments**: Attached documents (`.jpg`, `.jpeg`, `.png`, `.pdf`, `.doc`, `.docx`) are validated by format and size, and stored in `./uploads`.
4. **Tracking & Resolution**: The citizen tracks progress with their unique reference number and reviews the timeline as officials update the status.

---

## Database

- **Database Engine**: PostgreSQL is used for all application data.
- **ORM**: Prisma ORM provides type-safe models, relationships, and queries.
- **Core Entities**: `User`, `Department`, `Grievance`, `Attachment`, `TimelineEvent`, `Feedback`, `Appeal`.
- **Database Management**:
  - `npm run prisma:deploy` applies existing database migrations.
  - `npm run prisma:seed` populates default departments and sample official accounts.

---

## Authentication

- **JWT Tokens**: Authentication uses JSON Web Tokens signed with `JWT_SECRET`.
- **Password Security**: Passwords are securely hashed using `bcrypt` (12 salt rounds).
- **Session Storage**: The JWT is stored in browser `localStorage` for the current Single Page Application and passed in the `Authorization: Bearer <token>` header.
- **Security Note**: `localStorage` is used for the client SPA; future production hardening can optionally adopt secure `HttpOnly` cookies.
- **Development Demo Mode**: Demo/OTP login is restricted to development and testing environments (`DEMO_AUTH_ENABLED=true` and `NODE_ENV !== 'production'`) and is disabled in production.

---

## Running the Project Locally

### 1. Backend Setup

Open a terminal and navigate to `backend/`:

```bash
cd backend

# Install dependencies
npm ci

# Configure environment variables
cp .env.example .env

# Apply database migrations
npm run prisma:deploy

# Seed initial departments
npm run prisma:seed

# Start development server
npm run dev
```
*Backend runs at `http://localhost:5000` (Health check at `http://localhost:5000/health`).*

### 2. Frontend Setup

Open a **separate terminal** in the project root:

```bash
# Install dependencies
npm ci

# Configure environment variables
cp .env.example .env

# Start development server
npm run dev
```
*Frontend runs at `http://localhost:5173`.*

---

## Environment Variables

### Backend (`backend/.env`)
```env
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jan_samadhan?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRY="7d"
FRONTEND_URL="http://localhost:5173"
DEMO_AUTH_ENABLED=true
MAX_FILE_SIZE_MB=5
UPLOAD_DIR="./uploads"
```

### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Testing & Quality Checks

### Frontend
```bash
# Run ESLint
npm run lint

# Run production build
npm run build
```

### Backend
```bash
cd backend

# Validate Prisma schema
npm run prisma:validate

# Build TypeScript backend
npm run build

# Run automated E2E & security integration tests
npx tsx scripts/test-e2e.ts
```

---

## Security Protections

- **IDOR Protection**: Citizens can only view, download attachments for, and mutate grievances that belong to their account.
- **Input Validation**: All incoming requests are validated against strict Zod schemas before reaching business logic.
- **Path Traversal Protection**: File download endpoints verify that filepaths remain strictly contained within `UPLOAD_DIR`.
- **File Upload Whitelist**: Only permitted formats (`.jpg`, `.jpeg`, `.png`, `.pdf`, `.doc`, `.docx`) up to 5 MB are accepted.
- **Rate Limiting**: Express rate limiting protects API routes from brute-force traffic.
- **Error Sanitization**: Database error details and stacks are sanitized in production responses.

---

## Deployment Notes

### Implemented & Ready:
- Full Frontend ↔ Backend REST API integration.
- PostgreSQL models, migrations, and seed scripts.
- Secure JWT authentication, IDOR guards, and file validation.
- Live database health probe (`GET /health`).
- GitHub Actions CI workflow (lint, build, validation).

### Requirements for Live Production Deployment:
- **Production PostgreSQL**: A dedicated managed PostgreSQL database instance.
- **Production Secrets**: Secure, randomly generated `JWT_SECRET`.
- **Live SMS Gateway**: Integration with a commercial/government SMS gateway for live OTP delivery.
- **Cloud Object Storage**: Transition from local `./uploads` to an S3-compatible cloud storage service for distributed/containerized hosting.
- **SPA Routing**: Web servers (Nginx, Netlify, Vercel) must rewrite all non-asset routes to `/index.html`.

---

## Current Status

- ✅ Full Frontend ↔ Backend REST API integration implemented and tested.
- ✅ PostgreSQL database schema and migrations verified.
- ✅ Automated E2E integration and security test suite passing 100%.
- ✅ GitHub Actions CI pipeline active and green.

---

## Future Improvements

- Integration with official Government SMS Gateways for live OTP delivery.
- Cloud object storage integration (AWS S3 / Cloudflare R2 / Azure Blob) for file attachments.
- Single Sign-On (SSO) integration (e.g., MeriPehchaan / DigiLocker).
- Push and email notifications for grievance status updates.
