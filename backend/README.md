# JAN-SAMADHAN Backend API

The backend for **JAN-SAMADHAN** is an Express REST API written in TypeScript and backed by PostgreSQL using Prisma ORM. It handles citizen authentication, grievance lifecycle management, SLA tracking, file attachments, and AI assistance.

---

## Backend Technologies

- **Node.js**: JavaScript/TypeScript runtime.
- **Express.js**: REST API framework.
- **TypeScript**: Complete type safety across services, controllers, and database models.
- **Prisma ORM**: Modern database modeling, migrations, and type-safe query client.
- **PostgreSQL**: Relational database for persistent application data.
- **JWT (jsonwebtoken)**: Secure token generation and signature verification.
- **Zod**: Robust request body validation.
- **Bcrypt**: Password hashing (12 salt rounds).
- **Multer**: Multi-part file upload processing with MIME-type filtering.

---

## Folder Structure

```text
backend/
├── prisma/
│   ├── schema.prisma          # Database schema (models, relations, enums, indexes)
│   ├── seed.ts                # Database seed script for departments and demo accounts
│   └── migrations/            # Migration history files
├── scripts/
│   └── test-e2e.ts            # Automated End-to-End integration and security test suite
├── src/
│   ├── config/
│   │   ├── env.ts             # Environment variable parsing and validation
│   │   └── database.ts        # Prisma client singleton instance
│   ├── middleware/
│   │   ├── auth.ts            # JWT verification & role-based authorization
│   │   ├── upload.ts          # Multer storage configuration & MIME-type whitelist
│   │   └── validation.ts      # Generic Zod middleware handler
│   ├── routes/
│   │   ├── auth.ts            # Authentication endpoints (/api/auth)
│   │   ├── grievances.ts      # Grievance CRUD, tracking & feedback (/api/grievances)
│   │   ├── departments.ts     # Department catalog endpoint (/api/departments)
│   │   ├── ai.ts              # AI text analysis & draft endpoints (/api/ai)
│   │   └── attachments.ts     # Attachment upload & download endpoints
│   ├── services/
│   │   ├── authService.ts     # User registration, login, and token issuance
│   │   ├── grievanceService.ts # Grievance creation, retrieval, appeals, and audit logs
│   │   ├── slaService.ts      # 21-day SLA calculation and escalation logic
│   │   └── aiService.ts       # Text classification and grievance draft generation
│   ├── utils/
│   │   └── validators.ts      # Zod validation schemas
│   ├── app.ts                 # Express app initialization, CORS, rate limits, error handler
│   └── server.ts              # Server startup and graceful termination hooks
├── uploads/                   # Local storage directory for uploaded attachments
└── package.json               # Backend dependencies and scripts
```

---

## API Endpoints Overview

### Health & Readiness
- `GET /health` - Probes database connectivity (`SELECT 1`) and reports server status.

### Authentication (`/api/auth`)
- `POST /api/auth/register` - Register a new citizen account.
- `POST /api/auth/login` - Log in with mobile number and password.
- `POST /api/auth/verify-otp` - Verify OTP in development mode.
- `GET /api/auth/me` - Fetch profile for authenticated user (Bearer token required).

### Departments (`/api/departments`)
- `GET /api/departments` - List all active government departments.

### Grievances (`/api/grievances`)
- `POST /api/grievances` - Submit a new grievance (Citizen only).
- `GET /api/grievances` - List grievances belonging to the logged-in citizen.
- `GET /api/grievances/:id` - Get full details for a grievance by ID (IDOR protected).
- `GET /api/grievances/number/:grievanceNumber` - Query grievance by reference number.
- `POST /api/grievances/:id/feedback` - Submit rating (1-5) and feedback on resolved cases.
- `POST /api/grievances/:id/appeal` - Submit a formal appeal for an unsatisfactory resolution.
- `GET /api/grievances/:id/escalation-check` - Query SLA remaining days and escalation status.

### Attachments (`/api/grievances/:id/attachments`)
- `POST /api/grievances/:id/attachments` - Upload file attachment (`.jpg`, `.jpeg`, `.png`, `.pdf`, `.doc`, `.docx` up to 5 MB).
- `GET /api/grievances/:id/attachments` - List all attachments for a grievance.
- `GET /api/grievances/:id/attachments/:attachmentId/download` - Download attachment file (Protected against path traversal).

### AI Redressal Assistance (`/api/ai`)
- `POST /api/ai/analyze` - Analyze text to suggest department, category, and urgency.
- `POST /api/ai/generate-grievance` - Generate a formal grievance draft from keywords.
- `POST /api/ai/explain-response` - Translate official responses into citizen-friendly summaries.

---

## Database Models & Migrations

- **Database Engine**: PostgreSQL
- **Schema File**: [`schema.prisma`](./prisma/schema.prisma)
- **Key Models**: `User`, `Department`, `Grievance`, `Attachment`, `TimelineEvent`, `Feedback`, `Appeal`.

### Database Commands:
```bash
# Apply migrations to database
npm run prisma:deploy

# Seed initial departments and official accounts
npm run prisma:seed

# Validate Prisma schema syntax
npm run prisma:validate

# Generate Prisma Client manually
npm run prisma:generate

# Launch Prisma Studio web GUI
npm run prisma:studio
```

---

## Environment Variables

Create `backend/.env` with your settings:

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

---

## Running the Backend

From the `backend/` directory:

```bash
# 1. Install dependencies
npm ci

# 2. Run in development mode (with tsx watch live reload)
npm run dev

# 3. Build for production (Generates Prisma client + compiles TypeScript)
npm run build

# 4. Start production server
npm run start
```

---

## Automated Testing

Run the full end-to-end integration and security test suite:

```bash
npx tsx scripts/test-e2e.ts
```

This script verifies user registration, login, grievance creation, attachments, SLA logic, IDOR authorization protections, invalid file rejections, and state guardrails.

---

## Security & Storage Notes

- **IDOR Protection**: All citizen queries enforce `where: { id, userId: req.user.id }`. Citizens cannot access other citizens' records.
- **Path Traversal Protection**: Attachment downloads ensure that the resolved path stays inside `UPLOAD_DIR`.
- **Supported File Types**: Allowed formats are strictly limited to `.jpg`, `.jpeg`, `.png`, `.pdf`, `.doc`, and `.docx` (maximum 5 MB).
- **File Storage**: Uploads are saved to `./uploads` by default. For containerized cloud environments (Kubernetes, AWS ECS), connect an S3-compatible cloud storage driver or persistent volume mount.
