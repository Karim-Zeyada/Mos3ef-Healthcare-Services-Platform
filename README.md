# 🏥 Mos3ef (مسعف) — Comprehensive Healthcare Services Platform

[![.NET 8](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![C#](https://img.shields.io/badge/C%23-12.0-239120?logo=c-sharp&logoColor=white)](https://dotnet.microsoft.com/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-2022-CC292B?logo=microsoft-sql-server&logoColor=white)](https://www.microsoft.com/sql-server)
[![Entity Framework Core](https://img.shields.io/badge/EF_Core-8.0-512BD4?logo=dotnet&logoColor=white)](https://learn.microsoft.com/ef/core/)
[![JWT Auth](https://img.shields.io/badge/Auth-JWT_Bearer-black?logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Swagger](https://img.shields.io/badge/API_Docs-Swagger_OpenAPI-85EA2D?logo=swagger&logoColor=black)](http://localhost:5000/swagger)

> **Mos3ef (مسعف)** is an integrated, full-stack healthcare services platform designed to bridge the gap between patients and healthcare providers (hospitals, clinics, and medical centers) across Egypt. It enables real-time medical service discovery across 18 specialties, interactive geolocation mapping, transparent side-by-side cost and feature comparisons, patient reviews and ratings, and a dedicated hospital administrative dashboard.

📸 **[Explore the Visual Screenshot Tour](./Documentation/Screenshots/README.md)** | 📑 **[Download University Field Training Project Report (DOCX)](./NMU_Field_Training_Project_Report_Mos3ef.docx)** | ⚙️ **[Backend Documentation](./backend/README.md)** | 🎨 **[Frontend Documentation](./frontend/README.md)**

---

## 📑 Table of Contents

- [🌟 Key Platform Features](#-key-platform-features)
  - [👥 For Patients & General Public](#-for-patients--general-public)
  - [🏥 For Hospitals & Healthcare Providers](#-for-hospitals--healthcare-providers)
  - [🛡️ Security & Architectural Highlights](#️-security--architectural-highlights)
- [🩺 18 Supported Medical Specialties](#-18-supported-medical-specialties)
- [🏗️ System Architecture & Codebase Structure](#️-system-architecture--codebase-structure)
- [💻 Technology Stack](#-technology-stack)
- [📸 Visual Showcase & Screenshots](#-visual-showcase--screenshots)
- [🚀 Quick Start & Local Setup](#-quick-start--local-setup)
  - [1. Prerequisites](#1-prerequisites)
  - [2. Database & Backend API Setup](#2-database--backend-api-setup)
  - [3. Frontend Client Setup](#3-frontend-client-setup)
- [🔑 Demo & Seeded Test Accounts](#-demo--seeded-test-accounts)
- [📡 RESTful API Endpoints Catalog](#-restful-api-endpoints-catalog)
- [👨‍💻 Author & Developer](#-author--developer)
- [📄 License](#-license)

---

## 🌟 Key Platform Features

### 👥 For Patients & General Public
* **🔍 Multi-Criteria Smart Discovery:** Search medical services by keyword, category/department (18 specialties), or hospital name with instant filtering.
* **📍 Interactive Geolocation & Maps:** Integrated Leaflet & OpenStreetMap interactive maps for locating nearby hospitals and visualizing medical centers by GPS coordinates.
* **⚖️ Side-by-Side Service Comparison:** Dynamic floating drawer comparing two healthcare services simultaneously (prices, ratings, working hours, 24/7 emergency availability, contact numbers, and hospital addresses).
* **🏥 Hospital Directory & History:** Browse accredited partner hospitals with a dual-mode toggle between **Guest Mode** (all registered hospitals) and **Patient Mode** (hospitals previously interacted with or reviewed).
* **⭐ Live Verified Reviews & Ratings:** Submit 1–5 star ratings and written reviews for medical services with full CRUD control (create, view, edit, delete).
* **❤️ Saved Favorites (Emergency Quick-Access):** Bookmark essential medical services to a personal favorites list for rapid retrieval during critical situations.
* **👤 Patient Profile Management:** Update personal details, contact information, geographic location, and avatar image.

### 🏥 For Hospitals & Healthcare Providers
* **📊 Real-Time Analytics Dashboard:** Instant KPI metrics displaying **Total Active Services**, **Total Patient Reviews**, and the facility's **Average Overall Rating**.
* **🛠️ Medical Service Management (Full CRUD):** Create, update, toggle availability status (Available / Unavailable / 24/7), set transparent pricing, and configure operating schedules.
* **💬 Reviews Management Hub:** Monitor patient feedback, analyze satisfaction levels, and inspect incoming reviews for all hospital departments.
* **🏢 Provider Profile & Facility Info:** Manage hospital profile data, official address, region, emergency hotlines, website link, coordinates, and hospital exterior/interior imagery.

### 🛡️ Security & Architectural Highlights
* **🔐 Role-Based Access Control (RBAC):** Strict authorization separation across `Admin`, `Hospital`, and `Patient` roles using ASP.NET Core Identity.
* **🚫 Token Revocation Middleware:** Custom server-side JWT blacklist mechanism ensuring immediate token invalidation upon user logout.
* **⚡ In-Memory High-Performance Caching:** `IMemoryCache` integration for fast service listings and hospital directory responses.
* **🛡️ Centralized Exception Handling:** Global custom middleware intercepting unhandled errors and returning structured, consistent JSON error responses.

---

## 🩺 18 Supported Medical Specialties

The platform classifies healthcare services across 18 distinct medical departments:

| # | Specialty / Department (EN) | التخصص الطبي (AR) | Category Code | Typical Services Offered |
|---|---|---|---|---|
| 1 | **Emergency Room (ER)** | غرفة الطوارئ | `EmergencyRoom (1)` | 24/7 CPR, Trauma resuscitation, Critical triage |
| 2 | **Intensive Care Unit (ICU)** | العناية المركزة | `ICU (2)` | Mechanical ventilation, Cardiac ICU (CCU), Critical beds |
| 3 | **Neonatal ICU (NICU)** | حضانة أطفال مبتسرين | `NICU (17)` | Incubators, Phototherapy, Preterm infant care |
| 4 | **Blood Bank** | بنك الدم | `BloodBank (18)` | Blood donation, Plasma separation, Cross-matching |
| 5 | **Operation Theater (OR)** | غرفة العمليات | `OperationTheater (3)` | Sterile capsule ORs, Major & minor surgeries |
| 6 | **General Ward** | الجناح العام | `GeneralWard (4)` | Inpatient recovery rooms, Nursing monitoring |
| 7 | **Private VIP Room** | غرفة خاصة | `PrivateRoom (5)` | Private en-suite inpatient rooms, Dedicated nursing |
| 8 | **Maternity Ward** | قسم الولادة | `MaternityWard (6)` | Natural delivery, C-section, Postnatal maternity care |
| 9 | **Pediatric Ward** | قسم الأطفال | `PediatricWard (7)` | Child outpatient clinics, Pediatric hospitalization |
| 10 | **Radiology & Imaging** | الأشعة | `Radiology (8)` | 1.5T MRI, 128-Slice Multi-detector CT, X-Ray, Ultrasound |
| 11 | **Laboratory & Pathology** | المعمل | `Laboratory (9)` | Comprehensive blood panels, Hormones, Histopathology |
| 12 | **Pharmacy** | الصيدلية | `Pharmacy (10)` | 24/7 central pharmacy, Medication dispensing |
| 13 | **Outpatient Clinics** | العيادات الخارجية | `OutpatientClinic (11)` | Internal medicine, Orthopedics, Surgery, Dermatology |
| 14 | **Ambulance Service** | خدمة الإسعاف | `AmbulanceService (12)` | Mobile ICU ambulances, Air ambulance transport |
| 15 | **Rehabilitation & Physical Therapy** | التأهيل | `Rehabilitation (13)` | Post-operative rehab, Laser therapy, Sports medicine |
| 16 | **Dental Clinic** | عيادة الأسنان | `DentalClinic (14)` | Endodontics, Dental implants, Maxillofacial surgery |
| 17 | **Cardiology Unit** | وحدة القلب | `CardiologyUnit (15)` | Cardiac catheterization, Angioplasty, Stent placement |
| 18 | **Dialysis Unit** | وحدة الغسيل الكلوي | `DialysisUnit (16)` | Hemodialysis, High-flux filtration, Nephrology care |

---

## 🏗️ System Architecture & Codebase Structure

The project is structured according to Clean Architecture and Separation of Concerns principles:

```
Mos3ef/
├── backend/                             # .NET 8 Web API Solution
│   ├── Mos3ef/                          # Presentation & API Layer
│   │   ├── Controllers/                 # REST API Controllers (Account, Hospital, Patient, Review, Services)
│   │   ├── Middleware/                  # TokenRevocationMiddleware & GlobalExceptionMiddleware
│   │   ├── Program.cs                   # DI Container, JWT configuration, CORS & Swagger setup
│   │   └── appsettings.json             # DB Connection Strings & JWT settings
│   ├── Mos3ef.BLL/                      # Business Logic Layer (BLL)
│   │   ├── Caching/                     # IMemoryCache service implementation
│   │   ├── Dtos/                        # Request & Response Data Transfer Objects
│   │   ├── Manager/                     # Business domain managers (Auth, Hospital, Patient, Review, Service)
│   │   ├── Mapping/                     # AutoMapper profile configurations
│   │   └── Services/                    # FileStorageService for uploaded assets
│   └── Mos3ef.DAL/                      # Data Access Layer (DAL)
│       ├── Database/                    # ApplicationDbContext & Entity Configurations
│       ├── DataSeed/                    # AppDbInitializer for auto-seeding hospitals, services, and users
│       ├── Enum/                        # Domain enumerations (CategoryType, UserType)
│       ├── Migrations/                  # EF Core database migrations
│       ├── Models/                      # Core entities (Hospital, Patient, Service, Review, SavedService)
│       └── Repository/                  # Generic & specific repository pattern implementations
│
└── frontend/                            # React 19 Client SPA
    ├── public/                          # Static assets and favicons
    └── src/
        ├── assets/                      # Brand graphics, logos, developer profile pictures
        ├── components/                  # 30+ reusable and atomic UI components
        │   ├── CompareDrawer.jsx        # Floating side-by-side service comparison modal
        │   ├── MainSectionAtDashBoard   # Hospital live KPI stats & Service CRUD management table
        │   ├── HospitalCard.jsx         # Service card with quick-call, details & comparison trigger
        │   ├── HospitalReviews.jsx      # Provider feedback and reviews management center
        │   ├── MyReviews.jsx            # Patient review editor and ratings manager
        │   ├── SavedServices.jsx        # Paginated saved favorite medical services grid
        │   ├── SearchSection.jsx        # 18-category pill filter and search bar
        │   ├── Map.jsx                  # Leaflet & OpenStreetMap interactive facility locator
        │   └── ProtectedRoute.jsx       # Client-side RBAC route guard
        ├── Context/                     # React Context State Providers (Auth, Hospital, Search, Compare)
        ├── hooks/                       # Custom hooks (useAuth, useCompare, useHospital)
        ├── layouts/                     # MainLayout (with Navbar/Footer) & DashboardLayout
        ├── Pages/                       # Route pages (Home, Services, HospitalsList, About, Auth, Dashboard, Profile)
        └── utils/                       # imageHelper.js dynamic medical photo engine & Axios instance
```

---

## 💻 Technology Stack

| Layer | Technology | Purpose / Role |
|---|---|---|
| **Frontend Framework** | **React 19** (`19.0.0-rc.1`) | Modern component-based user interface |
| **Build Tool & Bundler** | **Vite 7** (`7.1.7`) | Lightning-fast HMR and optimized production bundling |
| **Styling & Design System** | **Tailwind CSS v4** + `tw-animate-css` | Utility-first responsive styling with custom Arabic RTL typography |
| **Routing** | **React Router 7** (`7.9.6`) | Client-side nested routing and protected route guards |
| **Icons & Visuals** | **Lucide React** (`0.552.0`) | Modern UI icons |
| **Interactive Maps** | **Leaflet** + **React-Leaflet** | OpenStreetMap GPS hospital & clinic discovery |
| **HTTP Client** | **Axios** (`1.13.2`) | Asynchronous API communication with JWT interceptors |
| **Backend API** | **ASP.NET Core 8 Web API** | High-performance, cross-platform RESTful API |
| **Programming Language** | **C# 12 / .NET 8.0** | Type-safe, modern backend business logic |
| **ORM & Data Access** | **Entity Framework Core 8** | Code-First database migrations, LINQ queries, and relational mapping |
| **Database** | **Microsoft SQL Server 2022** | Relational data persistence with foreign key constraints |
| **Authentication & Identity** | **ASP.NET Core Identity + JWT** | Role-based authentication, token issuance, and password hashing |
| **Object Mapping** | **AutoMapper** | High-speed DTO-to-Entity transformations |
| **Caching** | **Microsoft.Extensions.Caching.Memory** | High-throughput in-memory caching for read-heavy operations |
| **API Documentation** | **Swagger / OpenAPI 3** (`Swashbuckle 6.4`) | Interactive API testing sandbox and schema documentation |

---

## 📸 Visual Showcase & Screenshots

For the full high-resolution visual catalog, see **[Documentation/Screenshots/README.md](./Documentation/Screenshots/README.md)**.

| View | Screenshot | Key Highlights |
|---|---|---|
| **Landing Hero** | [`01_Home_Page_Hero.png`](./Documentation/Screenshots/01_Home_Page_Hero.png) | High-impact hero banner, search bar, and primary navigation |
| **18 Category Explorer** | [`03_Services_18_Categories_Top.png`](./Documentation/Screenshots/03_Services_18_Categories_Top.png) | Dynamic category pills for instant medical department filtering |
| **Medical Services Grid** | [`04_Services_Cards_Grid.png`](./Documentation/Screenshots/04_Services_Cards_Grid.png) | Service cards with pricing, ratings, compare buttons, and contact links |
| **Service Details & Reviews** | [`05_Service_Details_and_Reviews.png`](./Documentation/Screenshots/05_Service_Details_and_Reviews.png) | In-depth service view, hospital details, and patient reviews carousel |
| **Hospital Directory** | [`06_Hospitals_Directory_Guest_Mode.png`](./Documentation/Screenshots/06_Hospitals_Directory_Guest_Mode.png) | Accredited hospital partner directory with search and phone hotlines |
| **About Us & Developer** | [`07_About_Us_Developer_Karim.png`](./Documentation/Screenshots/07_About_Us_Developer_Karim.png) | Platform mission statement and developer profile (Karim Zeyada) |
| **Patient Saved Services** | [`12_Patient_Saved_Services_Grid.png`](./Documentation/Screenshots/12_Patient_Saved_Services_Grid.png) | Patient's bookmarked healthcare services for fast access |
| **Patient Reviews Manager** | [`13_Patient_My_Reviews_Manager.png`](./Documentation/Screenshots/13_Patient_My_Reviews_Manager.png) | Interactive manager to view, edit ratings, or delete submitted reviews |
| **Hospital Dashboard KPIs** | [`15_Hospital_Dashboard_Stats.png`](./Documentation/Screenshots/15_Hospital_Dashboard_Stats.png) | Real-time counters for Total Services, Total Reviews, and Average Rating |
| **Hospital Services CRUD** | [`16_Hospital_Dashboard_Services_CRUD.png`](./Documentation/Screenshots/16_Hospital_Dashboard_Services_CRUD.png) | Full management table to Add, Edit, or Remove medical services |
| **Hospital Reviews Hub** | [`17_Hospital_Dashboard_Reviews_Hub.png`](./Documentation/Screenshots/17_Hospital_Dashboard_Reviews_Hub.png) | Centralized patient feedback stream for hospital administration |
| **Swagger API Sandbox** | [`18_Swagger_API_Header_and_Auth.png`](./Documentation/Screenshots/18_Swagger_API_Header_and_Auth.png) | Interactive REST API documentation with JWT Bearer authorization |

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
Ensure you have the following installed on your development machine:
* [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* [Node.js (v18 or higher)](https://nodejs.org/) & `npm`
* [Microsoft SQL Server](https://www.microsoft.com/sql-server) (SQL Server Express or Developer Edition)
* [Git](https://git-scm.com/)

---

### 2. Database & Backend API Setup

1. **Navigate to the backend solution directory:**
   ```bash
   cd backend
   ```

2. **Verify Database Connection:**
   Open `Mos3ef/appsettings.json` and ensure the connection string matches your SQL Server instance:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=.;Database=Mos3efDB;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
   }
   ```

3. **Apply EF Core Migrations (Creates database and seeds sample data):**
   ```bash
   dotnet ef database update --project Mos3ef.DAL --startup-project Mos3ef
   ```
   > 💡 *On first startup, `AppDbInitializer` will automatically seed 8 accredited Egyptian hospitals, 25+ medical services, 3 patient accounts, reviews, and saved favorites.*

4. **Launch the Backend API:**
   ```bash
   dotnet run --project Mos3ef --launch-profile http
   ```
   * **API Base URL:** `http://localhost:5000`
   * **Interactive Swagger UI:** `http://localhost:5000/swagger`

---

### 3. Frontend Client Setup

1. **Open a new terminal and navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install Node Dependencies:**
   ```bash
   npm install
   ```

3. **Start the Vite Development Server:**
   ```bash
   npm run dev
   ```
   * **Client Web App:** `http://localhost:5173`

---

## 🔑 Demo & Seeded Test Accounts

The platform includes pre-configured demo credentials for testing all user roles immediately:

| Role | Email | Password | Details & Pre-Seeded Context |
|---|---|---|---|
| **Admin** | `admin@mos3ef.com` | `Admin@123` | Full system administrator access |
| **Hospital** | `kasralainy@mos3ef.com` | `Hospital@123` | **Kasr Al Ainy French Hospital** (4 active services, multiple reviews) |
| **Hospital** | `salam@mos3ef.com` | `Hospital@123` | **As-Salam International Hospital** (Cardiology, ICU, Maternity, NICU) |
| **Hospital** | `daralfouad@mos3ef.com` | `Hospital@123` | **Dar Al Fouad Hospital** (Emergency, Dialysis, Mobile Ambulance) |
| **Hospital** | `sgh@mos3ef.com` | `Hospital@123` | **Saudi German Hospital Cairo** (Pediatrics, Laboratory, Pharmacy) |
| **Hospital** | `cleopatra@mos3ef.com` | `Hospital@123` | **Cleopatra Hospital Heliopolis** (ER, Outpatient Clinics, VIP Rooms) |
| **Hospital** | `airforce@mos3ef.com` | `Hospital@123` | **Air Force Specialized Hospital** (CT Scan, CCU, Air Ambulance) |
| **Hospital** | `andalusia@mos3ef.com` | `Hospital@123` | **Andalusia Hospital Maadi** (General Ward, Dental, Rehabilitation) |
| **Hospital** | `cch57357@mos3ef.com` | `Hospital@123` | **Children's Cancer Hospital 57357** (Pediatric Oncology, Research Lab) |
| **Patient** | `karim.patient@mos3ef.com` | `Patient@123` | **Karim Zeyada** (Includes 3 saved favorite services & multiple live reviews) |
| **Patient** | `ahmed.patient@mos3ef.com` | `Patient@123` | **Ahmed Mostafa** (Active patient with ratings history) |
| **Patient** | `sara.patient@mos3ef.com` | `Patient@123` | **Sara Ali** (Active patient with ratings history) |

---

## 📡 RESTful API Endpoints Catalog

### 🔐 Authentication & Identity (`/api/Account`)
* `POST /api/Account/register/patient` — Register a new patient account.
* `POST /api/Account/register/hospital` — Register a new healthcare provider / hospital account.
* `POST /api/Account/login` — Authenticate credentials and receive a signed JWT token + user metadata.
* `POST /api/Account/logout` — Revoke the current JWT token via server-side blacklist.

### 🏥 Hospital Management (`/api/Hospital`)
* `GET /api/Hospital/GetAll` — Retrieve all accredited partner hospitals (Public).
* `GET /api/Hospital/Get/{id}` — Get specific hospital details and all its active medical services.
* `GET /api/Hospital/Get-Profile` — Retrieve authenticated hospital's profile details.
* `PUT /api/Hospital/Update-profile` — Update hospital contact info, address, coordinates, and photo.
* `POST /api/Hospital/AddService` — Add a new medical service (Hospital authorization required).
* `PUT /api/Hospital/UpdateService/{id}` — Update an existing service (price, availability, hours).
* `DELETE /api/Hospital/DeleteService/{id}` — Remove a medical service from the hospital's catalog.
* `GET /api/Hospital/GetServicesReviews/{id}` — Retrieve all patient reviews submitted for the hospital's services.
* `GET /api/Hospital/GetDashboardStats/{id}` — Get real-time KPI metrics (Total Services, Reviews, Average Rating).

### 🩺 Services & Comparison (`/api/Services`)
* `GET /api/Services` — Search and filter services by keyword, category enum (1–18), or GPS coordinates.
* `GET /api/Services/{id}` — Retrieve detailed service record, hospital info, and full reviews stream.
* `POST /api/Services/compare` — Compare two medical services side-by-side.
* `GET /api/Services/{id}/reviews` — Retrieve all patient reviews for a specific service.

### 👤 Patient Portal (`/api/Patients`)
* `GET /api/Patients/my-profile` — Get authenticated patient's profile.
* `PUT /api/Patients/my-profile` — Update patient name, address, location, and avatar image.
* `GET /api/Patients/my-saved-services` — Retrieve paginated list of patient's bookmarked services.
* `POST /api/Patients/my-saved-services/{serviceId}` — Save/bookmark a service to favorites.
* `DELETE /api/Patients/my-saved-services/{serviceId}` — Remove a service from favorites.

### ⭐ Reviews & Ratings (`/api/Review`)
* `POST /api/Review` — Submit a new review and rating (1–5 stars) for a medical service.
* `PUT /api/Review/{id}` — Update an existing patient review and rating.
* `DELETE /api/Review/{id}` — Delete a patient review.

---

## 👨‍💻 Author & Developer

**Karim Zeyada (كريم زيادة)**  
*Full Stack Web Developer*  
- **GitHub:** [@Karim-Zeyada](https://github.com/Karim-Zeyada)  
- **Repository:** [Mos3ef-Healthcare-Services-Platform](https://github.com/Karim-Zeyada/Mos3ef-Healthcare-Services-Platform)

---

## 📄 License & Academic Reference

This project was engineered as part of the **New Mansoura University (NMU) Field Training Program**. All rights reserved © Karim Zeyada. Developed for educational, research, and portfolio demonstration purposes.
