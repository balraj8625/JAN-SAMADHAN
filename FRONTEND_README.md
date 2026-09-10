# JAN-SAMADHAN Frontend

The frontend client for **JAN-SAMADHAN** is a React 19 Single Page Application (SPA) built with Vite and TypeScript. It offers an intuitive, accessible, and multilingual interface designed for citizens to lodge grievances, track progress, review resolutions, and file appeals.

---

## 🏛️ Key Features

- **Multilingual Support**: Real-time interface translation across English, Hindi (हिन्दी), and Marathi (मराठी).
- **Speech-to-Text & AI Copilot**: Voice input modal for hands-free description entry, AI text analysis, grievance letter draft generation, and official response simplifier.
- **Real Backend Integration**: Directly connected to the Express + PostgreSQL backend with JWT authentication and local storage persistence.
- **Interactive SLA & Timeline Tracking**: Live countdown of SLA resolution targets and step-by-step resolution event history.
- **Attachment Upload**: Drag-and-drop file upload with format and size validation.

---

## 📂 Architecture & Directory Structure

```text
src/
├── api/                           # Backend API client and service endpoints
│   ├── client.ts                  # Base fetch wrapper, error handling & JWT injection
│   ├── auth.ts                    # Register, login, me, verify OTP endpoints
│   ├── grievances.ts              # Submit, list, get by ID, track by number, appeal, feedback
│   ├── departments.ts             # Department catalog queries
│   ├── ai.ts                      # AI draft generator, text analysis, response explainer
│   ├── attachments.ts             # File upload and download helpers
│   └── index.ts                   # Unified API export
├── components/                    # UI Components
│   ├── Header.tsx                 # Navigation bar, language selector, citizen login status
│   ├── Footer.tsx                 # Portal links, accessibility statement, emergency helplines
│   ├── LoginModal.tsx             # Citizen authentication modal (Password & OTP modes)
│   ├── VoiceModal.tsx             # Browser speech recognition modal
│   └── BackButton.tsx             # Contextual back navigation button
├── context/                       # React Context Providers & State
│   ├── AuthContext.tsx            # Global user authentication and session management
│   ├── GrievanceContext.tsx       # Grievance CRUD, cache, filter state, and API binding
│   ├── LanguageContext.tsx        # Active language selection and localization dictionaries
│   └── use*.ts                    # Custom hooks (useAuth, useGrievance, useLanguage)
├── data/                          # Department definitions and UI localization constants
├── pages/                         # Application Views
│   ├── HomePage.tsx               # Landing page with stats, action cards, and announcements
│   ├── LodgeGrievancePage.tsx     # Grievance filing form with category picker & AI drafting
│   ├── TrackGrievancePage.tsx     # Tracking by grievance number with SLA progress & appeals
│   ├── MyGrievancesPage.tsx       # Citizen grievance dashboard with filter & export
│   ├── AppealPage.tsx             # Grievance escalation and appeal form
│   ├── SuccessPage.tsx            # Post-submission acknowledgment with tracking ID
│   └── HelpPage.tsx               # FAQs, user manual, and contact info
├── types.ts                       # Shared TypeScript types and interfaces
├── App.tsx                        # Root routing setup (React Router v7)
└── main.tsx                       # React DOM entry point
```

---

## ⚙️ Environment Variables

The frontend connects to the backend API via `VITE_API_BASE_URL`.

Create a `.env` file in the root repository folder:
```env
# URL pointing to the running JAN-SAMADHAN backend API
VITE_API_BASE_URL=http://localhost:5000/api
```

If not provided, the API client defaults to `http://localhost:5000/api`.

---

## 🚀 Development & Build Commands

All commands are executed from the **root** repository directory:

```bash
# Install exact dependencies
npm ci

# Start Vite development server with Hot Module Replacement (HMR)
npm run dev

# Run ESLint across TypeScript source files
npm run lint

# Compile TypeScript and create production bundle in dist/
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 API Client Layer & Authentication

- The API client is located in [`src/api/client.ts`](file:///c:/Users/Asus/Downloads/jan%20samadhan/JAN-SAMADHAN/src/api/client.ts).
- Every outgoing request automatically attaches the Bearer token if `jan_samadhan_token` is present in `localStorage`.
- On application mount, `AuthContext` calls `/api/auth/me` to validate the token and restore the citizen's profile.
- If a `401 Unauthorized` response is received, the client safely clears invalid session tokens and updates UI state.

---

## 🚢 Deployment Considerations

- **Single Page Application (SPA) Routing**: In production web servers (Nginx, Caddy, Vercel, Netlify), ensure all non-asset requests are rewritten to `/index.html`.
- **CORS**: Ensure the backend's `FRONTEND_URL` environment variable matches your production frontend origin (e.g. `https://jansamadhan.gov.in`).
