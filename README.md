# JAN-SAMADHAN

**Multilingual, AI-Assisted Citizen Grievance Redressal Portal**

---

## What is JAN-SAMADHAN?

**JAN-SAMADHAN (जन-समाधान)** is a full-stack digital governance platform designed to make it simple for citizens to report public grievances and track their resolution by government departments.

### The Problem It Solves
Traditional grievance submission systems are often confusing, available in only one language, lack transparent status updates, and have no clear tracking against official resolution timeframes.

### Who Uses It?
- **Citizens**: To easily lodge complaints (via text or speech), attach evidence, track real-time progress, provide feedback, or file formal appeals.
- **Department Officials & Administrators**: To view incoming grievances assigned to their department, update investigation status, provide official resolution remarks, and monitor resolution timelines.

---

## Main Features

- **Citizen Registration & Login**: Simple authentication using mobile number and password, with session restoration.
- **Multilingual Interface**: Complete language support for **English**, **Hindi (हिन्दी)**, and **Marathi (मराठी)**.
- **Voice & AI Assistance**: Hands-free voice speech-to-text input, automated text categorization, AI-assisted grievance drafting, and simplification of bureaucratic responses.
- **Department Selection**: Standardized catalog of public departments (Water Supply, Electricity, Municipal, Public Works, etc.).
- **Evidence Attachments**: Secure file upload supporting images and documents (PDF, PNG, JPG) with file-type and size validation.
- **Tracking & Timelines**: Instant generation of unique reference numbers (e.g. `GRV2026136015`) with step-by-step visual timeline progression.
- **SLA & Escalation Monitoring**: Standard 21-day Service Level Agreement (SLA) countdown with escalation warnings for overdue grievances.
- **Feedback & Appeals**: Rating and feedback loop for resolved complaints, plus a formal appeal workflow for unsatisfactory resolutions.

---

## Technology Stack

### Frontend
- **React 19** & **TypeScript** (Single Page Application)
- **Vite** (Build tool & development server)
- **Tailwind CSS** (Styling & layout)
- **React Router v7** (Client-side routing)
- **React Context API** (`AuthContext`, `GrievanceContext`, `LanguageContext`)
- **Lucide React** (Icons) & **Framer Motion** (Transitions)

### Backend
- **Node.js** & **Express** (REST API in TypeScript)
- **Prisma ORM** & **PostgreSQL** (Database access and schema modeling)
- **JWT (jsonwebtoken)** (Stateless API authentication)
- **Zod** (Request input validation)
- **Bcrypt** (Password hashing)
- **Multer** (File upload processing)

### Testing & CI
- **Automated E2E Integration Suite** (Positive workflows + Negative security tests)
- **GitHub Actions** (Continuous Integration for linting, typechecking, Prisma schema validation, and builds)

---

## Project Structure

```text
JAN-SAMADHAN/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI workflow
├── backend/                   # Express.js REST API
│   ├── prisma/                # Prisma schema, migrations, and seed script
│   ├── scripts/               # Automated E2E test scripts (test-e2e.ts)
│   ├── src/                   # Backend TypeScript source code
│   │   ├── config/            # Environment variables & database client
│   │   ├── middleware/        # Authentication, authorization & file upload filters
│   │   ├── routes/            # Express API endpoint definitions
│   │   ├── services/          # Business logic, SLA math, and AI handlers
│   │   ├── utils/             # Zod input validation schemas
│   │   ├── app.ts             # Express application & global middleware
│   │   └── server.ts          # HTTP server bootstrap & graceful shutdown
│   ├── uploads/               # Local directory for stored attachment files
│   ├── package.json           # Backend dependencies and scripts
│   └── README.md              # Backend-specific documentation
├── src/                       # React Frontend SPA
│   ├── api/                   # Backend API client and service endpoints
│   ├── components/            # Reusable UI components (Modals, Headers, Footers)
│   ├── context/               # Global React state (Auth, Grievances, Language)
│   ├── data/                  # Localized department lists and UI constants
│   ├── pages/                 # View pages (Home, Lodge, Track, MyGrievances, Appeal, etc.)
│   ├── types.ts               # Shared TypeScript types
│   ├── App.tsx                # App routing structure
│   └── main.tsx               # Frontend entry point
├── FRONTEND_README.md         # Frontend-specific documentation
├── README.md                  # Project overview (this file)
└── package.json               # Frontend dependencies and scripts
```

### Key Backend Folders Explained:
- `backend/src/routes`: Declares URL paths for authentication, grievances, departments, AI, and attachments.
- `backend/src/services`: Contains the core logic for managing database records, calculating SLAs, and handling business rules.
- `backend/src/middleware`: Intercepts requests to verify JWT tokens, enforce role authorization, and validate file uploads.
- `backend/src/utils`: Contains Zod schemas to guarantee all incoming data is valid and clean.
- `backend/prisma`: Contains the database schema definition, database migration files, and initial seed data.

---

## How the System Works

```text
Citizen Browser (React SPA)
       │
       ▼ (HTTP REST API with Bearer JWT)
Express Backend Server
       │
       ├─► Zod Validation & Auth Middleware
       ├─► Services (SLA logic & business rules)
       ├─► File System (Stores uploads in ./uploads)
       │
       ▼ (Type-safe database queries via Prisma ORM)
PostgreSQL Database (Stores users, departments, grievances, timelines)
```

1. **Grievance Lodging**: The citizen enters grievance details (or speaks into the voice tool). AI analyzes the text to recommend a department.
2. **Persistence**: The backend validates the inputs with Zod and stores the record in PostgreSQL using Prisma.
3. **Attachments**: Files are checked for permitted types (images/PDF) and safely stored in the upload directory.
4. **Tracking**: The citizen receives a tracking reference and can view real-time timeline updates.

---

## Database

- **Database**: PostgreSQL is used to store all core application data.
- **ORM**: Prisma ORM provides type-safe schema modeling and database queries.
- **Core Entities**:
  - `User`: Citizens, Department Officials, and Administrators.
  - `Department`: Government departments (Water Supply, Electricity, etc.).
  - `Grievance`: Complaint record with description, category, location, and status.
  - `Attachment`: Metadata for files uploaded with a grievance.
  - `TimelineEvent`: History of status updates and official notes.
  - `Feedback`: Rating and review provided by the citizen upon resolution.
  - `Appeal`: Escalation record submitted if a resolution is unsatisfactory.
- **Migrations & Seed**:
  - `npm run prisma:deploy` applies existing database migrations.
  - `npm run prisma:seed` populates default departments and sample official accounts.

---

## Authentication

- **JWT Tokens**: Authentication uses JSON Web Tokens signed with a secret key (`JWT_SECRET`).
- **Password Hashing**: User passwords are encrypted using `bcrypt`.
- **SPA Session Storage**: The JWT is stored in the browser's `localStorage` for the current Single Page Application and sent in the `Authorization: Bearer <token>` header.
- **Security Note**: `localStorage` is used for the frontend SPA client; future production hardening can optionally use secure `HttpOnly` cookies.
- **Demo Mode**: Demo/OTP authentication is strictly restricted to development/test environments (`DEMO_AUTH_ENABLED=true` and `NODE_ENV !== 'production'`) and is hard-disabled in production.

---

## Running the Project

### 1. Backend Setup

Open a terminal and navigate to the backend folder:

```bash
cd backend

# 1. Install dependencies
npm ci

# 2. Setup environment variables
cp .env.example .env

# 3. Apply database migrations
npm run prisma:deploy

# 4. Seed the database with departments
npm run prisma:seed

# 5. Start the backend development server
npm run dev
```
*The backend server will run at `http://localhost:5000`.*

### 2. Frontend Setup

Open a **separate terminal** in the root project folder:

```bash
# 1. Install dependencies
npm ci

# 2. Setup environment variables
cp .env.example .env

# 3. Start the frontend development server
npm run dev
```
*The frontend application will run at `http://localhost:5173`.*

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

All commands match current `package.json` scripts:

### Frontend
```bash
# Run ESLint check
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

- **IDOR Protection**: Citizens can only view, download attachments for, or modify grievances that belong to their user account.
- **Input Validation**: All incoming API requests are validated with strict Zod schemas before processing.
- **Path Traversal Defense**: File downloads verify that filepaths remain strictly confined inside the configured upload folder.
- **File Upload Restrictions**: File uploads are restricted by size (default 5 MB) and limited to whitelisted formats (`.jpg`, `.jpeg`, `.png`, `.pdf`, `.doc`, `.docx`).
- **Rate Limiting**: Protected API routes use rate limiting to guard against abuse.
- **Production Error Sanitization**: Internal database error stacks are hidden from API responses in production mode.

---

## Deployment Notes

### What Is Implemented & Ready:
- Full frontend/backend API communication.
- Database models, migrations, and seeding scripts.
- Secure authentication and role-based permissions.
- Health probe endpoint at `/health` (`SELECT 1` readiness check).
- Automated CI pipeline in GitHub Actions.

### Requirements for Live Production Deployment:
- **Production PostgreSQL**: A managed PostgreSQL database instance.
- **Strong Secrets**: A secure, randomly generated `JWT_SECRET`.
- **Live SMS Gateway**: Integration with a real SMS provider (e.g., Twilio or Government SMS Gateway) to deliver live OTP messages.
- **Object Storage**: For multi-server or containerized deployments, use S3-compatible cloud storage instead of local `./uploads`.
- **SPA Routing**: Web servers (Nginx, Netlify, Vercel) must rewrite all non-asset requests to `/index.html`.

---

## Current Status

- ✅ Full Frontend ↔ Backend REST API integration complete.
- ✅ PostgreSQL database schema and migrations verified.
- ✅ Automated E2E integration and security test suite passing 100%.
- ✅ GitHub Actions CI workflow active and green.

---

## Future Improvements

- Integration with official Government SMS Gateways for live OTP delivery.
- Cloud object storage (AWS S3 / Cloudflare R2 / Azure Blob) for file attachments.
- Single Sign-On (SSO) integration (e.g., MeriPehchaan / DigiLocker).
- Push/Email notification system for status updates.
