# 🏥 مسعف (Mos3ef) — Comprehensive Healthcare Platform

[![.NET 8](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet&logoColor=white)](https://dotnet.microsoft.com/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![SQL Server](https://img.shields.io/badge/SQL_Server-2022-CC292B?logo=microsoft-sql-server&logoColor=white)](https://www.microsoft.com/sql-server)

> **مسعف** هو منصة طبية رقمية متكاملة تربط المرضى بالمستشفيات والمراكز الصحية الشريكة، وتوفر خدمات البحث المتقدم، المقارنة الفورية بين الخدمات الطبية، حجز ومتابعة الخدمات، وتقييم تجارب الرعاية الصحية.

📘 **[Read the Full Academic & Engineering Report (تقرير المشروع الكامل)](./Documentation/PROJECT_REPORT.md)** | 📸 **[View Full Screenshot Tour (معرض الصور)](./Documentation/Screenshots/README.md)** | 📑 **[Download Word Document (تقرير بصيغة Word)](./Mos3ef_Healthcare_Platform_Field_Training_Project_Report.docx)**

---

## 🌟 Key Features (المميزات الرئيسية)

### 👥 For Patients (للمرضى)
* **🔍 البحث والاستكشاف الذكي (Smart Discovery):** بحث وتصفية الخدمات الطبية حسب 18 تخصصاً طبياً مع دعم الموقع الجغرافي وخريطة تفاعلية.
* **⚖️ مقارنة الخدمات جنبًا إلى جنب (Side-by-Side Comparison):** مقارنة الأسعار، التقييمات، ساعات العمل، وتوفر الخدمات بين مستشفيين مختلفين.
* **🏥 دليل المستشفيات (Hospitals Directory):** استعراض المستشفيات الشريكة مع إمكانية التبديل بين وضع الزائر (Guest) ووضع المريض المسجل (مستشفياتي التي تعاملت معها).
* **⭐ نظام التقييمات والمراجعات (Live Reviews):** تقييم الخدمات الطبية وكتابة المراجعات مع إمكانية تعديلها أو حذفها.
* **❤️ حفظ الخدمات المفضلة (Saved Services):** حفظ ومتابعة الخدمات الطبية للرجوع إليها سريعاً.

### 🏥 For Hospitals (للمستشفيات)
* **📊 لوحة تحكم ذكية (Hospital Dashboard):** إحصائيات فورية حول إجمالي الخدمات، المراجعات، ومتوسط التقييمات.
* **🛠️ إدارة الخدمات الطبية (Service CRUD):** إضافة، تعديل، وتحديث حالة وتوافر الخدمات وأسعارها وساعات العمل.
* **📝 مركز مراجعات المستشفى (Reviews Hub):** متابعة جميع آراء وتقييمات المرضى حول خدمات المستشفى.
* **⚙️ الملف التعريفي:** تحديث بيانات التواصل، العنوان، الموقع الجغرافي، وساعات العمل.

---

## 🏗️ Architecture & Tech Stack

```
Mos3ef/
├── backend/                  # .NET 8 Web API (3-Tier Clean Architecture)
│   ├── Mos3ef/               # API Layer (Controllers, Middlewares, Program.cs)
│   ├── Mos3ef.BLL/           # Business Logic Layer (Managers, DTOs, AutoMapper)
│   └── Mos3ef.DAL/           # Data Access Layer (EF Core, Models, Migrations, Seed)
└── frontend/                 # React 19 + Vite (Modern Arabic RTL Interface)
    ├── src/
    │   ├── components/       # UI Components & Interactive Drawers
    │   ├── Context/          # State Management (Auth, Hospital, Search, Compare)
    │   ├── Pages/            # Dedicated Routes (Home, Services, Hospitals, About, Auth, Dashboard)
    │   └── utils/            # Image Engines & Helpers
```

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Tailwind CSS v4, Lucide React, Axios, React Router 7 |
| **Backend API** | ASP.NET Core 8 Web API, C# |
| **Authentication** | ASP.NET Core Identity, JWT Bearer Tokens, Custom Revocation Middleware |
| **Database & ORM** | Microsoft SQL Server, Entity Framework Core 8 |
| **Object Mapping** | AutoMapper |
| **Documentation** | Swagger / OpenAPI UI |

---

## 🚀 Quick Start & Setup Guide

### 1. Prerequisites
* [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* [Node.js (v18+)](https://nodejs.org/) & npm
* [Microsoft SQL Server](https://www.microsoft.com/sql-server) (Local or Express)

### 2. Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Configure your connection string in Mos3ef/appsettings.json if needed
# Default: "Server=.;Database=Mos3efDB;Trusted_Connection=True;TrustServerCertificate=True;"

# Apply Database Migrations (Creates schema & seeds initial data)
dotnet ef database update --project Mos3ef.DAL --startup-project Mos3ef

# Run the backend API server
dotnet run --project Mos3ef --launch-profile http
```
* Backend will be available at `http://localhost:5000`
* Swagger API Documentation at `http://localhost:5000/swagger`

### 3. Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
* Frontend will be accessible at `http://localhost:5173`

---

## 🔑 Demo & Test Credentials

The database is pre-seeded with sample data:

| Account Type | Email | Password | Details |
|---|---|---|---|
| **Admin** | `admin@mos3ef.com` | `Admin@123` | Full system management |
| **Hospital** | `kasralainy@mos3ef.com` | `Hospital@123` | قصر العيني الفرنساوي |
| **Hospital** | `salam@mos3ef.com` | `Hospital@123` | مستشفى السلام الدولي |
| **Hospital** | `daralfouad@mos3ef.com` | `Hospital@123` | مستشفى دار الفؤاد |
| **Patient** | `karim.patient@mos3ef.com` | `Patient@123` | كريم أحمد (محفوظات ومراجعات مسجلة) |
| **Patient** | `ahmed.patient@mos3ef.com` | `Patient@123` | أحمد مصطفى |

---

## 👨‍💻 Development Team

Developed with passion by:

**كريم زيادة (Karim Zeyada)**  
*Full Stack Developer*  
GitHub: [@Karim-Zeyada](https://github.com/Karim-Zeyada)

---

## 📄 License
This project is developed for educational and portfolio presentation purposes. All rights reserved.
