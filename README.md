# JAN-SAMADHAN (जन-समाधान)

**Multilingual, AI-Assisted Citizen Grievance Redressal Portal**

JAN-SAMADHAN is a full-stack digital governance platform engineered to simplify, streamline, and accelerate the redressal of public grievances across government departments. The portal bridges citizens and departmental officials through multilingual support (English, Hindi, Marathi), automated AI grievance drafting and categorization, real-time SLA tracking with escalation workflows, secure file attachments, and audit timelines.

---

## 🏛️ Problem Statement & Solution

Traditional public grievance mechanisms often suffer from complex bureaucratic interfaces, lack of native language support, poor visibility into grievance resolution status, and delayed SLA monitoring.

**JAN-SAMADHAN solves this by providing:**
- **Simplified Citizen Access**: Mobile-number-based authentication, multilingual forms, and speech/voice inputs.
- **AI-Powered Assistance**: Automatic grievance categorization, urgency detection, structured draft generation, and plain-language explanation of official responses.
- **Transparent Lifecycle Tracking**: Unique grievance tracking numbers, interactive status timelines, and explicit SLA countdowns with escalation warnings.
- **Citizen Feedback & Appeals**: Formal appeal submission for unresolved or unsatisfactory grievances, and rating/feedback loops for completed cases.
- **Department & Official Management**: Role-based access control, departmental grievance queues, and resolution logging.

---

## 🏗️ Architecture & Technology Stack

```mermaid
graph TD
    A[Citizen / Official Browser SPA] -->|HTTP / REST API + JWT| B[Express.js API Server]
    B -->|Prisma ORM| C[(PostgreSQL Database)]
    B -->|Local Storage / Persistent Volume| D[File Storage System]
    B -->|Simulated / External LLM Services| E[AI Analysis Engine]
```

### Frontend Stack
- **Framework**: React 19 + TypeScript (SPA)
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS v4, Lucide Icons, Framer Motion
- **Routing**: React Router v7
- **State Management**: React Context API (`AuthContext`, `GrievanceContext`, `LanguageContext`)
- **API Client**: Fetch-based modular API service layer with JWT interceptors

### Backend Stack
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **ORM & Database**: Prisma ORM with PostgreSQL (100% type-safe schema)
- **Security & Validation**: Zod, JSON Web Tokens (JWT), Bcrypt, CORS, Express Rate Limit, Multer
- **Testing**: Automated End-to-End integration suite (`tsx scripts/test-e2e.ts`)
- **CI/CD**: GitHub Actions (Linting, TypeScript compilation, Prisma schema validation, Vite build)

---

## 🌟 Key Features

1. **Authentication & Session Management**:
   - Mobile + Password registration & login.
   - Demo/Simulated OTP login mode for testing environments.
   - Secure JWT storage with automatic session hydration on page refresh.
2. **Grievance Filing & Tracking**:
   - Multilingual input forms with voice recognition support.
   - Standardized department models aligned across frontend and database.
   - Unique alphanumeric tracking number generation (e.g., `GRV-2026-XXXXXX`).
   - Secure file attachment upload (PDF, JPEG, PNG, WEBP with mime-type validation).
3. **AI Copilot & Redressal Tools**:
   - **Text Analysis**: Urgency level detection, keyword extraction, and department recommendation.
   - **Draft Generator**: Converts bullet points or keywords into formal grievance letters.
   - **Response Explainer**: Simplifies bureaucratic responses into clear, citizen-friendly language.
4. **SLA Monitoring & Escalation**:
   - Standard 21-day resolution SLA target.
   - Visual countdown timer and overdue alerts.
   - Escalation recommendations and formal citizen appeal workflow.
5. **Role-Based Access Control (RBAC)**:
   - Citizen role: View owned grievances, submit feedback, file appeals.
   - Official role: Department-specific grievance queues, status transitions, resolution recording.

---

## 📂 Project Structure

```text
JAN-SAMADHAN/
├── .github/
│   └── workflows/
│       └── ci.yml                 # GitHub Actions CI workflow (Frontend & Backend)
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # Prisma schema with relational models & indexes
│   │   ├── seed.ts                # Database seed script for departments & demo users
│   │   └── migrations/            # Migration history
│   ├── scripts/
│   │   └── test-e2e.ts            # Automated E2E integration test suite
│   ├── src/
│   │   ├── config/                # Environment configuration and database client
│   │   ├── controllers/           # Request handlers for auth, grievances, depts, AI
│   │   ├── middleware/            # Auth, RBAC, file upload, error handling
│   │   ├── routes/                # Express API route declarations
│   │   ├── services/              # Business logic (SLA, grievances, AI)
│   │   ├── utils/                 # Zod validation schemas and helpers
│   │   ├── app.ts                 # Express application setup and middleware
│   │   └── server.ts              # Server bootstrap and graceful shutdown
│   ├── uploads/                   # Upload directory for file attachments (local storage)
│   ├── package.json
│   └── README.md                  # Detailed backend documentation
├── src/
│   ├── api/                       # API service layer (client, auth, grievances, AI)
│   ├── components/                # Reusable UI components (Modals, Headers, Footers)
│   ├── context/                   # React Contexts (AuthContext, GrievanceContext, LanguageContext)
│   ├── data/                      # Localized mock departments and UI constants
│   ├── pages/                     # Application pages (Lodge, Track, Appeal, MyGrievances, etc.)
│   ├── types.ts                   # TypeScript interfaces and department types
│   ├── App.tsx                    # Main React application component
│   └── main.tsx                   # Frontend entry point
├── package.json                   # Frontend npm configuration
├── README.md                      # Root documentation
└── FRONTEND_README.md             # Detailed frontend documentation
```

---

## ⚙️ Prerequisites

- **Node.js**: `v20.x` or higher
- **npm**: `v10.x` or higher
- **PostgreSQL**: `v14.x` or higher (or compatible managed PostgreSQL service)

---

## 🚀 Getting Started

### 1. Repository Setup

Clone the repository and inspect branches:
```bash
git clone https://github.com/balraj8625/JAN-SAMADHAN.git
cd JAN-SAMADHAN
```

### 2. Backend Setup & Configuration

Navigate to the `backend` directory:
```bash
cd backend
npm ci
```

Create a `.env` file in `backend/`:
```bash
cp .env.example .env
```

Configure `backend/.env` with your database and environment settings:
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

Initialize the database (Prisma migrations and seed data):
```bash
npm run prisma:deploy
npm run prisma:seed
```

Start the backend development server:
```bash
npm run dev
```
*Backend API will run at `http://localhost:5000` (Health probe at `http://localhost:5000/health`).*

### 3. Frontend Setup & Configuration

In a separate terminal, return to the repository root:
```bash
npm ci
```

Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Configure `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```
*Frontend application will run at `http://localhost:5173`.*

---

## 📜 Available NPM Scripts

### Frontend Commands (Root)
| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite local development server with HMR |
| `npm run build` | Compiles TypeScript and builds optimized production bundle to `dist/` |
| `npm run lint` | Runs ESLint across all `.ts` and `.tsx` source files |
| `npm run preview` | Locally serves the production build from `dist/` |

### Backend Commands (`backend/`)
| Command | Description |
| :--- | :--- |
| `npm run dev` | Runs Express server with `tsx watch` hot-reloading |
| `npm run build` | Generates Prisma client and compiles TypeScript to `dist/` |
| `npm run start` | Executes compiled production server `dist/server.js` |
| `npm run prisma:generate` | Generates TypeScript client definitions from `schema.prisma` |
| `npm run prisma:migrate` | Runs database migrations in development mode |
| `npm run prisma:deploy` | Applies pending database migrations in staging/production |
| `npm run prisma:seed` | Seeds database with official accounts and department records |
| `npm run prisma:studio` | Launches Prisma Studio GUI for database inspection |
| `npm run prisma:validate` | Validates syntax and integrity of `schema.prisma` |

---

## 🧪 Automated Testing

An automated end-to-end integration test is provided in `backend/scripts/test-e2e.ts`. It spins up an ephemeral test instance against the active database and verifies:
1. Citizen Registration and JWT generation
2. Citizen Login and Credential Validation
3. Authenticated Session Hydration (`/api/auth/me`)
4. Department Catalog Listing
5. Grievance Submission with unique tracking number and metadata
6. Timeline Event Creation and Attachment Association
7. Official Status Progression (`UNDER_REVIEW` → `RESOLVED`)
8. Citizen Feedback Submission Guardrails
9. Citizen Appeal Workflow (`ESCALATED`)

To run the suite:
```bash
cd backend
npx tsx scripts/test-e2e.ts
```

---

## 🔒 Security & Governance Considerations

- **Authentication & Token Handling**: In the current Single Page Application (SPA), authenticated sessions use JWTs stored in browser `localStorage` and sent via Bearer headers. For future enterprise hardening, teams can consider transitioning to secure `HttpOnly` cookies.
- **Strict User Scoping & IDOR Prevention**: Citizens can only query and mutate grievances matching their authenticated user ID.
- **Production Guardrails**: In `production` mode, `DEMO_AUTH_ENABLED` is hard-disabled, and database error stacks are sanitized to prevent internal schema leakage.
- **Rate Limiting**: Express rate limiting protects API routes from brute force attacks (100 requests per 15 minutes per IP).
- **File Upload Protection**: Uploaded files are restricted by size (default 5MB) and whitelisted MIME types. File retrieval endpoints enforce strict directory containment to avoid path traversal.
- **Storage in Production**: Local filesystem storage (`./uploads`) is suitable for local development and single-server deployments. For multi-instance/containerized cloud deployments (Kubernetes, AWS ECS), an S3-compatible object storage adapter or mounted persistent volume is recommended.

---

## 🚧 Current Status & Roadmap

> [!NOTE]
> JAN-SAMADHAN has completed **Phase 1 (Model Alignment)**, **Phase 2 (Frontend-Backend Integration)**, and **Phase 3 (Security, Database & CI Hardening)**.

### Future Improvements
- [ ] Direct SMS Gateway integration (Twilio / NIC SMS) for real OTP delivery in production.
- [ ] Integration with state/national single sign-on (MeriPehchaan / DigiLocker).
- [ ] Cloud object storage driver (AWS S3 / GCP Cloud Storage / Azure Blob) for attachment persistence across distributed containers.
- [ ] Webhook notifications for departmental ticketing system synchronization.
