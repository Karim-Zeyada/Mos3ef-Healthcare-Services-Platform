# ⚙️ Mos3ef Backend (.NET 8 Web API)

Robust, high-performance RESTful Web API for the **Mos3ef** healthcare platform built with ASP.NET Core 8, Entity Framework Core, and SQL Server.

---

## 🏗️ Architecture Layers

The solution follows a clean 3-tier architecture:

* **`Mos3ef.Api`**: The HTTP Web API host.
  * Controllers for handling incoming requests.
  * `Program.cs` for DI service container, JWT authentication, and CORS configuration.
  * Custom Middlewares: `GlobalExceptionMiddleware` & `TokenRevocationMiddleware`.
  * `appsettings.json` for database connection string and JWT settings.
* **`Mos3ef.BLL` (Business Logic Layer)**:
  * Managers implementing business operations and validations.
  * DTOs (Data Transfer Objects) for structured payloads.
  * AutoMapper profiles for object-to-object mappings.
  * Memory caching for search and service lookups.
* **`Mos3ef.DAL` (Data Access Layer)**:
  * Database entities: `Hospital`, `Patient`, `Service`, `Review`, `SavedService`, `RevokedToken`.
  * `ApplicationDbContext` with EF Core fluent API relationships.
  * Generic and specific repository implementations.
  * `AppDbInitializer` for automatic database migrations and rich data seeding.

---

## 🛠️ Setup & Running

### 1. Database Configuration
Update `DefaultConnection` in `Mos3ef/appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Server=.;Database=Mos3efDB;Trusted_Connection=True;TrustServerCertificate=True;MultipleActiveResultSets=true"
}
```

### 2. Run Database Migrations & Seeding
```bash
dotnet ef database update --project Mos3ef.DAL --startup-project Mos3ef
```

### 3. Run the API
```bash
dotnet run --project Mos3ef --launch-profile http
```
* **API Root**: `http://localhost:5000`
* **Swagger UI**: `http://localhost:5000/swagger`

---

## 🔑 Demo Credentials

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@mos3ef.com` | `Admin@123` |
| **Hospital** | `kasralainy@mos3ef.com` | `Hospital@123` |
| **Patient** | `karim.patient@mos3ef.com` | `Patient@123` |

---

## 📡 API Endpoints Overview

### Authentication (`/api/Account`)
* `POST /api/Account/register/patient`: Register a new patient account.
* `POST /api/Account/register/hospital`: Register a new hospital account.
* `POST /api/Account/login`: Authenticate and receive JWT bearer token.
* `POST /api/Account/logout`: Revoke active JWT token.

### Hospitals (`/api/Hospital`)
* `GET /api/Hospital/GetAll`: **Public** directory of all partner hospitals.
* `GET /api/Hospital/Get/{id}`: Get hospital details and available services.
* `GET /api/Hospital/Get-Profile`: Get logged-in hospital's profile.
* `PUT /api/Hospital/Update-profile`: Update hospital profile details & image.
* `POST /api/Hospital/AddService`: (Hospital) Add a new medical service.
* `PUT /api/Hospital/UpdateService/{id}`: (Hospital) Update service details.
* `DELETE /api/Hospital/DeleteService/{id}`: (Hospital) Delete a service.
* `GET /api/Hospital/GetServicesReviews/{id}`: Get reviews for hospital services.
* `GET /api/Hospital/GetDashboardStats/{id}`: Total services, reviews, and average rating.

### Services & Comparison (`/api/Services`)
* `GET /api/Services`: Search and retrieve all services with optional keyword, category, and GPS coordinates.
* `GET /api/Services/{id}`: Get detailed service record with reviews and hospital info.
* `POST /api/Services/compare`: Compare two services side-by-side.
* `GET /api/Services/{id}/reviews`: Get all patient reviews for a service.

### Patients (`/api/Patients`)
* `GET /api/Patients/my-profile`: Get authenticated patient's profile.
* `PUT /api/Patients/my-profile`: Update patient profile information and photo.
* `GET /api/Patients/my-saved-services`: Paged list of patient's saved services.
* `POST /api/Patients/my-saved-services/{serviceId}`: Save a service to favorites.
* `DELETE /api/Patients/my-saved-services/{serviceId}`: Remove service from favorites.

### Reviews (`/api/Review`)
* `POST /api/Review`: (Patient) Submit rating (1-5) and feedback for a service.
* `PUT /api/Review/{id}`: (Patient) Update previous review.
* `DELETE /api/Review/{id}`: (Patient) Delete review.
