# JAN-SAMADHAN Frontend

The frontend for **JAN-SAMADHAN** is a Single Page Application (SPA) built using React, TypeScript, and Vite. It provides a clean, responsive, and multilingual interface for citizens to lodge complaints, upload supporting evidence, track real-time progress, and submit feedback.

---

## Technologies Used

- **React 19**: Modern UI component library.
- **TypeScript**: Type safety across all components, API models, and contexts.
- **Vite 7**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first styling and responsive layouts.
- **React Router v7**: Client-side page routing.
- **React Context API**: State management for user authentication, grievance data, and active language.
- **Lucide Icons & Framer Motion**: UI iconography and smooth interactive animations.

---

## Folder Structure

```text
src/
├── api/                       # API client & backend service modules
│   ├── client.ts              # Fetch wrapper, error formatting, and Bearer JWT injection
│   ├── auth.ts                # Register, login, me, and OTP API calls
│   ├── grievances.ts          # Grievance CRUD, tracking, appeals, and feedback API calls
│   ├── departments.ts         # Department list fetching
│   ├── ai.ts                  # AI draft generator and analysis calls
│   ├── attachments.ts         # File upload and download helpers
│   └── index.ts               # Unified API export
├── components/                # Reusable UI components
│   ├── Header.tsx             # Top navigation, language switcher, citizen login status
│   ├── Footer.tsx             # Portal links, helpline numbers, accessibility info
│   ├── LoginModal.tsx         # Citizen login and registration popup
│   ├── VoiceModal.tsx         # Speech-to-text recording interface
│   └── BackButton.tsx         # Context-aware back navigation button
├── context/                   # Global React State Providers
│   ├── AuthContext.tsx        # User authentication, profile, and session state
│   ├── GrievanceContext.tsx   # Grievance list, draft form, filters, and API actions
│   ├── LanguageContext.tsx    # Multi-language dictionary and active language state
│   └── use*.ts                # Helper hooks (useAuth, useGrievance, useLanguage)
├── data/                      # Localized department lists and UI constants
├── pages/                     # Main Application Views
│   ├── HomePage.tsx           # Landing page with stats, service cards, announcements
│   ├── LodgeGrievancePage.tsx # Step-by-step grievance submission form
│   ├── TrackGrievancePage.tsx # Reference number lookup with visual timeline
│   ├── MyGrievancesPage.tsx   # Citizen's personal grievance history dashboard
│   ├── AppealPage.tsx         # Formal grievance escalation form
│   ├── SuccessPage.tsx        # Submission confirmation receipt with tracking number
│   └── HelpPage.tsx           # Frequently Asked Questions and user guide
├── types.ts                   # TypeScript interfaces for frontend data
├── App.tsx                    # Top-level routing setup
└── main.tsx                   # React root mount point
```

---

## Supported File Attachments

When lodging a grievance, citizens can attach evidence supporting these formats:
- Images: `.jpg`, `.jpeg`, `.png`
- Documents: `.pdf`, `.doc`, `.docx`
- Size limit: Up to 5 MB per file

---

## How the Frontend Communicates with the Backend

1. **API Client (`src/api/client.ts`)**:
   - Outgoing requests use `fetch` targeting the backend base URL configured in `VITE_API_BASE_URL`.
   - If a valid JWT token exists in `localStorage` (`jan_samadhan_token`), it is automatically attached as an `Authorization: Bearer <token>` header.
   - If the backend returns `401 Unauthorized`, the client clears the stored token and resets the session.
2. **Context Providers (`src/context/`)**:
   - `AuthContext`: Manages sign-in, sign-up, and session restoration on page load (`/api/auth/me`).
   - `GrievanceContext`: Fetches user grievances, coordinates AI assistance, and submits new grievance payloads.

---

## Authentication in the Frontend

- The frontend currently stores the JWT in browser `localStorage`.
- When the user signs in, the token is saved, and user details are populated.
- When the user signs out, the token is deleted from `localStorage`.
- *Production Note*: For high-security enterprise environments, teams can optionally migrate from `localStorage` to `HttpOnly` cookies.

---

## Environment Variables

Create a `.env` file in the root folder:

```env
# URL of your JAN-SAMADHAN Express backend API
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## Local Development & Build Commands

Run all commands from the **root** folder:

```bash
# Install dependencies
npm ci

# Start local development server (with hot reload)
npm run dev

# Run ESLint code quality checks
npm run lint

# Compile TypeScript and build production bundle into dist/
npm run build

# Preview the built production files locally
npm run preview
```

---

## Troubleshooting

- **CORS Errors**: Ensure the backend `.env` file has `FRONTEND_URL` set to the exact URL of your frontend (default: `http://localhost:5173`).
- **Cannot connect to API**: Make sure the backend server is running and accessible at the URL in `VITE_API_BASE_URL`.
- **SPA 404 on page refresh (Production)**: When hosting on Nginx, Apache, Netlify, or Vercel, configure rewrite rules so all non-asset requests load `/index.html`.
