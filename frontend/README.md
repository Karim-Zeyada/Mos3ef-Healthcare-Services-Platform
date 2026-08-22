# 🎨 Mos3ef Frontend (React 19 + Vite + TailwindCSS v4)

Modern, fast, and responsive Arabic RTL frontend application for the **Mos3ef** healthcare platform.

---

## ⚡ Tech Stack & Libraries

- **Framework**: React 19 + Vite 7
- **Styling**: Tailwind CSS v4 + Tw-Animate-CSS
- **Icons**: Lucide React
- **Routing**: React Router 7
- **HTTP Client**: Axios with JWT Interceptors
- **State Management**: React Context API (`AuthContext`, `HospitalContext`, `SearchContext`, `CompareContext`)

---

## 📂 Project Structure

```
frontend/src/
├── assets/             # Logos, brand graphics, and developer profile pictures
├── components/         # Reusable UI components:
│   ├── CompareDrawer.jsx       # Side-by-side service comparison modal & floating bar
│   ├── HeaderOfService.jsx     # Card header with dynamic imagery & rating
│   ├── HeartButton.jsx         # Live favorite save/unsave toggle
│   ├── HospitalCard.jsx        # Service item card with compare & call actions
│   ├── HospitalReviews.jsx     # Hospital reviews management center
│   ├── MainSectionAtDashBoard  # Live dashboard stats & service CRUD table
│   ├── MyReviews.jsx           # Patient reviews editor & rating manager
│   ├── NavBar.jsx              # Tab navigation with active pill highlighting
│   ├── ProtectedRoute.jsx      # Role-based route guard (Patient/Hospital)
│   ├── SavedServices.jsx       # Paginated saved services grid
│   └── SearchSection.jsx       # 18-category search & map discovery
├── Context/            # Context state providers
├── hooks/              # Custom hooks (`useAuth`, `useCompare`, `useHospital`)
├── layouts/            # `MainLayout` & `DashboardLayout`
├── Pages/              # Page routes:
│   ├── Auth/           # Login, SignUp, SignUpHospital
│   ├── Home/           # Home (Landing), ServicesPage, About (Team)
│   ├── Hospital/       # HospitalsList (Directory), DashBoard
│   └── Patient/        # PatientProfile
└── utils/              # `imageHelper.js` curated medical photography engine
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Accessible at: `http://localhost:5173`

### 3. Production Build
```bash
npm run build
```
Generates optimized static bundle in `dist/`.
