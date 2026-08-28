# JAN-SAMADHAN Backend API

Backend REST API for the JAN-SAMADHAN citizen grievance portal. This is a hackathon prototype using mock/simulated government workflow data.

## 📋 Requirements

- **Node.js** v18+ 
- **PostgreSQL** v14+
- **npm** or **yarn**

## 🚀 Installation

### 1. Clone and Navigate

```bash
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and update the values:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/jan_samadhan?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-in-production"
JWT_EXPIRY="7d"
PORT=3001
NODE_ENV="development"
FRONTEND_URL="http://localhost:5173"
MAX_FILE_SIZE_MB=5
UPLOAD_DIR="./uploads"
```

### 4. PostgreSQL Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE jan_samadhan;
```

Or use an existing PostgreSQL instance and update the `DATABASE_URL` in `.env`.

### 5. Prisma Setup

Generate Prisma Client:

```bash
npm run prisma:generate
```

Run database migrations:

```bash
npm run prisma:migrate
```

Seed the database with demo data:

```bash
npm run prisma:seed
```

## 🏃 Development

Start the development server with hot reload:

```bash
npm run dev
```

The API will be available at `http://localhost:3001`

## 📦 Build & Production

Build TypeScript to JavaScript:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/verify-otp` | Verify OTP (mocked) | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Departments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/departments` | List all departments | No |
| GET | `/api/departments/:id` | Get department by ID | No |

### Grievances

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/grievances` | Create new grievance | Yes |
| GET | `/api/grievances` | List user's grievances | Yes |
| GET | `/api/grievances/:id` | Get grievance details | Yes |
| GET | `/api/grievances/:id/timeline` | Get timeline events | Yes |
| POST | `/api/grievances/:id/feedback` | Submit feedback | Yes |
| POST | `/api/grievances/:id/appeal` | Submit appeal | Yes |
| GET | `/api/grievances/:id/appeal` | Get appeal status | Yes |
| GET | `/api/grievances/:id/escalation-check` | Check escalation recommendation | Yes |

### Attachments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/grievances/:id/attachments` | Upload attachment | Yes |
| GET | `/api/grievances/:id/attachments` | Get attachments | Yes |

### AI (Placeholder Endpoints)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/ai/analyze` | Analyze grievance text | No |
| POST | `/api/ai/generate-grievance` | Generate grievance draft | No |
| POST | `/api/ai/explain-response` | Explain government response | No |

## 🧪 Example Requests

### Register User

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "mobile": "9876543210",
    "email": "john@example.com",
    "preferredLanguage": "en"
  }'
```

### Login

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "mobile": "9876543210",
    "password": "demo123"
  }'
```

### Get Departments

```bash
curl http://localhost:3001/api/departments
```

### Create Grievance

```bash
curl -X POST http://localhost:3001/api/grievances \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Street light not working",
    "description": "The street light in front of my house has not been working for 10 days.",
    "departmentId": "municipal_dept",
    "category": "Infrastructure",
    "state": "Maharashtra",
    "district": "Mumbai"
  }'
```

### Get User Grievances

```bash
curl http://localhost:3001/api/grievances \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Analyze Text (AI)

```bash
curl -X POST http://localhost:3001/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "text": "My scholarship has not been credited for three months"
  }'
```

## 🗄️ Database Schema

The application uses the following main entities:

- **User**: Citizen accounts
- **Department**: Government departments (Education, EPFO, Railways, etc.)
- **Grievance**: Citizen grievances with SLA tracking
- **GrievanceEvent**: Timeline events for grievances
- **Attachment**: File attachments for grievances
- **Feedback**: Citizen feedback on resolved grievances
- **Appeal**: Appeals for unresolved grievances

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Request validation with Zod
- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Ownership checks on grievances
- No plain-text passwords stored

## 📊 SLA Tracking

- 21-day resolution timeline
- Automatic `dueAt` calculation
- `isOverdue` flag when past deadline
- Escalation recommendations for overdue cases

## 🌐 Multi-language Support

All departments and grievance events support:
- English (en)
- Hindi (hi)
- Marathi (mr)

## ⚠️ Important Notes

This is a **hackathon prototype**:

- ❌ Does NOT connect to real CPGRAMS or government systems
- ❌ OTP verification is mocked (accepts any 4-6 digit OTP)
- ❌ AI endpoints return deterministic mock results
- ❌ Demo users are seeded with password `demo123`
- ✅ Ready for frontend integration
- ✅ Demonstrates complete citizen grievance workflow

## 🛠️ Scripts Reference

```bash
npm run dev           # Start development server
npm run build         # Build TypeScript
npm run start         # Start production server
npm run prisma:generate   # Generate Prisma client
npm run prisma:migrate    # Run database migrations
npm run prisma:seed       # Seed demo data
npm run prisma:studio     # Open Prisma Studio GUI
```

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/          # Database & environment config
│   ├── controllers/     # Request handlers (thin layer)
│   ├── middleware/      # Auth & validation middleware
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic
│   │   ├── aiService.ts
│   │   ├── authService.ts
│   │   ├── departmentService.ts
│   │   ├── grievanceService.ts
│   │   └── slaService.ts
│   ├── utils/           # Utilities & validators
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed script
├── uploads/             # File uploads directory
├── .env.example         # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

## 🔗 Frontend Integration

To connect the existing React/Vite frontend:

1. Update frontend API base URL to `http://localhost:3001/api`
2. Store JWT token from login response
3. Include `Authorization: Bearer <token>` header in authenticated requests
4. Handle API responses with `{ success: boolean, data: any, message?: string }` format

---

**JAN-SAMADHAN** - जन समाधान - People's Solution
