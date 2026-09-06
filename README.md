<div align="center">

# 🩺 Docsyra — Doctor Appointment Booking Platform

**A full-stack MERN application for booking, managing, and administering doctor appointments online.**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express%205-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-black?logo=jsonwebtokens)](https://jwt.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Hosting-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)

</div>

---

## 📖 Overview

**Docsyra** is a three-application MERN system that lets patients discover doctors, book appointments in real time, and manage their bookings — while doctors and admins run the platform from a dedicated management panel.

The project is deliberately split into **three independently deployable apps sharing one REST API**, mirroring how real healthcare-tech platforms separate patient-facing products from internal tooling:

| App | Description |
|---|---|
| 🧑‍⚕️ **Patient Web App** | Browse doctors by speciality, view profiles, book/cancel appointments, manage a personal profile |
| 🛠️ **Admin & Doctor Panel** | A single role-aware React app — admins manage doctors and appointments platform-wide; doctors manage their own schedule and profile |
| ⚙️ **REST API Server** | Node.js/Express backend handling authentication, business logic, and database operations for both apps |

---

## ✨ Key Features

- 🔐 **Role-based authentication** — three independent JWT-secured flows for patients, doctors, and admins, each with its own protected routes
- 📅 **Real-time slot booking** — dynamic 7-day availability generation with conflict detection to prevent double-booking
- ✅ **Doctor approval workflow** — doctors can self-register, but only appear publicly once an admin verifies and approves them
- 🖼️ **Cloud image hosting** — profile and doctor photos uploaded via Multer and stored on Cloudinary (not local disk), production-ready by default
- 🧾 **Historically accurate appointment records** — each booking snapshots the doctor's and patient's data at the time of booking, so past records never silently change
- 🔎 **Speciality-based doctor search** — instant client-side filtering with zero extra API calls
- 📊 **Admin & Doctor dashboards** — appointment counts, patient counts, and earnings computed on demand
- 🔄 **Full appointment lifecycle** — book → complete/cancel, from both the patient's and the doctor's side
- 📱 **Responsive UI** — built with Tailwind CSS v4 across both frontend apps

---

## 🏗️ Architecture

```
                Patient                          Admin / Doctor
                   │                                    │
                   ▼                                    ▼
         React App (frontend/)              React App (admin/)
     Context API: token, doctors, user     Role-aware: Admin UI or Doctor UI
                   │                                    │
                   └───────────────┬────────────────────┘
                                   ▼
                        REST API (Axios + JSON)
                                   ▼
                  ┌─────────────────────────────┐
                  │   Express Backend (backend/)  │
                  │  /api/user  /api/doctor  /api/admin │
                  └───────────────┬───────────────┘
                                  ▼
                     JWT Auth Middleware (per role)
                                  ▼
                          Controllers (business logic)
                                  ▼
                          Mongoose Models
                                  ▼
                             MongoDB
```

The backend follows a **layered, MVC-inspired structure**:

```
routes/  → maps URLs to handlers, zero business logic
middleware/ → JWT verification & file upload handling (runs before controllers)
controllers/ → business logic, validation, database operations
models/  → Mongoose schemas defining the shape of stored data
```

---

## 🧰 Tech Stack

**Frontend (Patient App & Admin/Doctor Panel)**
- React 19 + Vite
- React Router v7
- Tailwind CSS v4
- Axios
- React Context API (global state management)
- React Toastify (notifications)

**Backend**
- Node.js + Express 5
- MongoDB + Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Multer for handling file uploads
- Cloudinary for image storage
- Validator for input validation

---

## 📁 Project Structure

```
├── backend/                   # Express REST API
│   ├── config/                # MongoDB & Cloudinary connection setup
│   ├── models/                 # Mongoose schemas (User, Doctor, Appointment)
│   ├── controllers/            # Business logic per role
│   ├── routes/                 # API endpoint definitions
│   ├── middlewares/            # JWT auth guards + file upload handling
│   └── server.js                # App entry point
│
├── frontend/                  # Patient-facing React app
│   └── src/
│       ├── context/            # Global state (auth, doctors list, profile)
│       ├── pages/               # Route-level page components
│       └── components/         # Reusable UI components
│
└── admin/                     # Admin & Doctor management panel
    └── src/
        ├── context/            # Separate Admin & Doctor state contexts
        ├── pages/               # Admin/ and Doctor/ page components
        └── components/         # Shared Navbar/Sidebar
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` with the following variables:

```env
PORT=4000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

Start the server:

```bash
npm run server    # development, with nodemon
# or
npm start         # production
```

### 3. Frontend Setup (Patient App)

```bash
cd frontend
npm install
```

Create a `.env` file inside `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

```bash
npm run dev
```

### 4. Admin Panel Setup

```bash
cd admin
npm install
```

Create a `.env` file inside `admin/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

```bash
npm run dev
```

> The patient app and admin panel run on separate Vite dev servers (typically `localhost:5173` and `localhost:5174`), both talking to the same backend on `localhost:4000`.

---

## 🔑 API Overview

| Base Route | Description |
|---|---|
| `/api/user` | Patient registration, login, profile, booking & cancelling appointments |
| `/api/doctor` | Doctor registration, login, appointment management, profile, dashboard |
| `/api/admin` | Admin login, doctor management, approval workflow, appointment oversight, dashboard |

All protected routes require a valid JWT, verified by role-specific Express middleware before reaching any controller logic.

---

## 🗺️ Core Workflows

**Booking an Appointment**
```
Patient selects a doctor & time slot → Frontend sends authenticated POST request
→ Backend verifies slot availability → Appointment saved with a data snapshot
→ Doctor's slot calendar updated → Confirmation returned to the patient
```

**Doctor Onboarding**
```
Doctor self-registers → Account created as "unapproved"
→ Hidden from patient-facing doctor list → Admin reviews & approves
→ Doctor becomes publicly bookable
```

---

## 🔒 Security Highlights

- Passwords hashed with Bcrypt — never stored in plaintext
- JWT-based authentication scoped per role (patient / doctor / admin)
- Ownership checks on sensitive actions (e.g. a patient can only cancel their own appointment)
- Sensitive fields (passwords) excluded from all API responses
- Environment variables used for all secrets and credentials — never hardcoded

---

## 🛣️ Roadmap / Future Improvements

- [ ] Integrate a real payment gateway (Stripe) for online payments
- [ ] Add JWT expiry & refresh-token flow
- [ ] Add email notifications for booking confirmations/reminders
- [ ] Rate limiting on authentication endpoints
- [ ] Automated test coverage (unit + integration)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

Built as a full-stack learning project to demonstrate REST API design, role-based authentication, and real-world MERN architecture.

</div>
