
  # ValuationManagementSystemFrontend

  Valuation Management System

This repository contains the complete source code for the Valuation Management System, including both the React frontend and Spring Boot backend.
The system is used internally for case tracking, valuation assignments, and user role management.

The deployed version is available only inside the office network.

📁 Project Structure
project-root/
│
├── frontend/              # React application
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── README (removed, using main README)
│
└── backend/               # Spring Boot application
    ├── src/
    ├── pom.xml
    └── application.properties.example

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

Figma Design

The UI design reference is available here:
https://www.figma.com/design/Opmi7sqnWx2AFUBWmAS3bh/ValuationManagementSystemFrontend

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
All external access is restricted—only office network users can open the deployed application.