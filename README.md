
  # ValuationManagementSystemFrontend

This repository contains the complete source code for the Valuation Management System, including both the React frontend and Spring Boot backend.
The system is used internally for case tracking, valuation assignments, and user role management.

The deployed version is available only within the organization’s internal network.

📁 Project Structure
```
ValuationManagementSystem/
│
├── README.md
│
├── backend/
│   ├── pom.xml
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── HELP.md
│   ├── .gitignore
│   └── src/
│       ├── main/
│       │   ├── java/
│       │   │   └── com/valuation/management/...
│       │   └── resources/
│       │       └── application.properties.example
│       └── test/
│
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── vite.config.ts
    ├── index.html
    ├── public/
    ├── src/
    └── .gitignore
```


💻 Frontend (React)
Tech Stack

React

Vite (or CRA based on your setup)

Axios

CSS / Tailwind (if used)

How to run
cd frontend
npm i
npm run dev

Build for production
npm run build

🛠️ Backend (Spring Boot)
Tech Stack

Spring Boot

MySQL

Spring Security (JWT Authentication)

JPA / Hibernate

How to run
cd backend
mvn clean install
mvn spring-boot:run

Environment Variables

Create a file named:

backend/src/main/resources/application.properties

Use this template:

spring.datasource.url=jdbc:mysql://localhost:3306/yourdb
spring.datasource.username=youruser
spring.datasource.password=yourpassword

jwt.secret=your-secret-key
jwt.expiration-ms=86400000


Your repository includes application.properties.example as a reference.
Do not commit your real credentials.

🔐 Authentication

The system uses:

JWT-based login

Role-based access (Admin, Bank Person, etc.)

Secure API communication between frontend and backend

🚀 Features

User login and JWT authentication

Dashboard with assigned and pending cases

Case creation and management

Bank person management

Role-based permissions

Status-wise case filtering

Internal deployment support

⚠️ Note

This repository includes only the source code.
The deployed production system is internal and cannot be accessed publicly.

📦 Deployment Notes

Frontend production build runs on Nginx.
Backend runs on Spring Boot (Java) connected to MySQL.

## 📸 Screenshots

### Login Page
![Login](./screenshots/login.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Case List
![Case List](./screenshots/case-list.png)

