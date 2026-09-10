# JAN-SAMADHAN Backend API

The backend for **JAN-SAMADHAN** is an Express.js and TypeScript REST API powered by Prisma ORM and PostgreSQL. It manages user authentication, role-based access control, departmental grievance lifecycles, SLA monitoring, AI-assisted content drafting, and file attachment handling.

---

## 🏛️ Architecture & System Modules

```text
backend/
├── prisma/
│   ├── schema.prisma          # Prisma schema with relational models, enums & indexes
│   ├── seed.ts                # Database seed script for official accounts & departments
│   └── migrations/            # Migration history
├── scripts/
│   └── test-e2e.ts            # Automated End-to-End integration test suite
├── src/
│   ├── config/
│   │   ├── env.ts             # Environment variable parsing and validation
│   │   └── database.ts        # Prisma client singleton instance
│   ├── controllers/
│   │   ├── authController.ts       # Register, login, me, verify OTP
│   │   ├── grievanceController.ts  # CRUD, tracking, feedback, appeals
│   │   ├── departmentController.ts # Department listing
│   │   ├── aiController.ts         # AI text analysis, draft generation, response explainer
│   │   └── attachmentController.ts # File upload & safe download
│   ├── middleware/
│   │   ├── auth.ts            # JWT authentication & role-based authorization (RBAC)
│   │   └── upload.ts          # Multer storage configuration with MIME whitelist
│   ├── routes/
│   │   ├── auth.ts            # /api/auth
│   │   ├── grievances.ts      # /api/grievances
│   │   ├── departments.ts     # /api/departments
│   │   ├── ai.ts              # /api/ai
│   │   └── attachments.ts     # /api/grievances/:id/attachments
│   ├── services/
│   │   ├── slaService.ts      # 21-day SLA calculations & escalation checks
│   │   └── aiService.ts       # AI draft generation & text analysis heuristics
│   ├── utils/
│   │   └── validators.ts      # Zod validation schemas for all incoming payloads
│   ├── app.ts                 # Express application setup, CORS, rate limiting, health check
│   └── server.ts              # Server startup and graceful termination hooks
├── uploads/                   # Local filesystem storage for uploaded files
└── package.json
```

---

## ⚙️ Environment Variables

Create `backend/.env` with the following parameters:

```env
PORT=5000
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/jan_samadhan?schema=public"
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_EXPIRY="7d"
FRONTEND_URL="http://localhost:5173"
DEMO_AUTH_ENABLED=true
MAX_FILE_SIZE_MB=5
UPLOAD_DIR="./uploads"
```

| Variable | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | number | `5000` | HTTP port for the Express server |
| `DATABASE_URL` | string | *required* | PostgreSQL connection string with schema |
| `JWT_SECRET` | string | *required* | Secret key for signing and verifying JWT tokens |
| `JWT_EXPIRY` | string | `7d` | Expiration time for JWT tokens |
| `FRONTEND_URL` | string | `http://localhost:5173` | Allowed CORS origin for web client |
| `DEMO_AUTH_ENABLED` | boolean | `false` | Enables simulated OTP auth (disabled automatically if `NODE_ENV=production`) |
| `MAX_FILE_SIZE_MB` | number | `5` | Maximum upload file size in megabytes |
| `UPLOAD_DIR` | string | `./uploads` | Directory for storing file attachments |

---

## 🚀 Available Backend Scripts

All commands are run from the `backend/` directory:

```bash
# Clean install of backend dependencies (and automatic Prisma client generation)
npm ci

# Start development server with live reload
npm run dev

# Compile TypeScript and generate Prisma client
npm run build

# Start production server
npm run start

# Generate Prisma client manually
npm run prisma:generate

# Apply database migrations in development
npm run prisma:migrate

# Apply database migrations in staging/production
npm run prisma:deploy

# Seed initial departments and official accounts
npm run prisma:seed

# Launch Prisma Studio GUI
npm run prisma:studio

# Validate Prisma schema
npm run prisma:validate
```

---

## 📡 API Endpoint Overview

### Health & Readiness
- `GET /health`: Probes database connectivity (`SELECT 1`) and reports service status.

### Authentication (`/api/auth`)
- `POST /api/auth/register`: Register new citizen account (Name, Mobile, Password, Language).
- `POST /api/auth/login`: Authenticate with Mobile & Password (or simulated OTP in dev).
- `POST /api/auth/verify-otp`: Verify mobile OTP and issue JWT.
- `GET /api/auth/me`: Retrieve current authenticated user profile.

### Departments (`/api/departments`)
- `GET /api/departments`: Returns all active government departments.

### Grievances (`/api/grievances`)
- `POST /api/grievances`: Submit new grievance (Citizen only).
- `GET /api/grievances`: List grievances for authenticated citizen or departmental official.
- `GET /api/grievances/track/:grievanceNumber`: Public tracking endpoint by grievance number.
- `GET /api/grievances/:id`: Get full grievance detail with timeline and SLA.
- `POST /api/grievances/:id/feedback`: Submit rating (1-5) and feedback on resolved cases.
- `POST /api/grievances/:id/appeal`: Submit formal escalation appeal.
- `GET /api/grievances/:id/escalation-check`: Query SLA status and escalation recommendation.
- `POST /api/grievances/:id/attachments`: Upload attachment (PDF, JPEG, PNG, WEBP).
- `GET /api/grievances/:id/attachments/:attachmentId/download`: Safely stream attachment file.

### AI Redressal Assistance (`/api/ai`)
- `POST /api/ai/analyze`: Analyzes text for urgency, keywords, and department suggestions.
- `POST /api/ai/generate-grievance`: Generates structured grievance text from keywords.
- `POST /api/ai/explain-response`: Simplifies bureaucratic resolution text into citizen-friendly summaries.

---

## 🔒 Security, Authorization & Storage

1. **Ownership Guards (IDOR Protection)**:
   All citizen endpoints enforce strict user filtering (`where: { id, userId: req.user.id }`). Citizens cannot access other citizens' grievances.
2. **Path Traversal Protection**:
   Attachment downloads verify that resolved filepaths strictly reside within the configured `UPLOAD_DIR`.
3. **Database Concurrency**:
   Appeals and status transitions run in atomic `prisma.$transaction` blocks to ensure data consistency.
4. **Storage Architecture**:
   Local filesystem storage is configured by default. For multi-container production environments, attachments should be stored on a persistent volume mount or backed by an S3-compatible storage service.
