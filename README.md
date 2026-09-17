# 🚀 CareerHub — Internship & Job Listing Portal

CareerHub is a full-stack web application that helps users discover internship and job opportunities through a simple, modern and responsive interface.

The application allows users to browse opportunities, search and filter listings, view complete opportunity details and access the configured application link.

An Admin Dashboard is provided to manage opportunity listings through Create, Read, Update and Delete (CRUD) operations.

---

## 🌐 Project Overview

CareerHub was developed as a full-stack internship project using modern web technologies.

The project demonstrates:

- Frontend development using React.js
- Backend API development using Node.js and Express.js
- Database integration using MongoDB
- REST API communication
- CRUD operations
- Search and filtering
- Responsive UI design
- Form validation
- API testing
- Git and GitHub workflow

---

## ✨ Features

### 👤 User Features

- View available internship and job opportunities
- Search opportunities by title or company
- Filter opportunities by domain
- View complete opportunity details
- View company, location and experience information
- Open the configured application link
- Responsive design for different screen sizes

### 🛠️ Admin Features

- Add new opportunities
- View existing opportunities
- Edit opportunity details
- Delete opportunities
- Form validation
- Loading and saving states
- Success/error messages

---

## 🖥️ UI Highlights

CareerHub includes a clean and modern interface with:

- Professional navigation bar
- Career-focused hero section
- Search and domain filter
- Modern opportunity cards
- Opportunity details layout
- Dedicated Apply Now section
- Admin dashboard
- Responsive mobile layout
- Hover and loading effects
- Professional footer

---

## 🧰 Technologies Used

### Frontend

- React.js
- Vite
- React Router
- HTML
- CSS
- JavaScript

### Backend

- Node.js
- Express.js
- REST APIs

### Database

- MongoDB
- MongoDB Native Driver (`MongoClient`)

### Development Tools

- Visual Studio Code
- Postman
- Git
- GitHub
- MongoDB

---

## 📁 Project Structure

```text
intership-job-portal/
│
├── backend/
│   ├── routes/
│   │   └── opportunityRoutes.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── src/
│   ├── assets/
│   │
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── OpportunityDetails.jsx
│   │   ├── AdminDashboard.jsx
│   │   └── ApplicationForm.jsx
│   │
│   ├── data/
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── Home.css
│   ├── OpportunityDetails.css
│   └── AdminDashboard.css
│
├── package.json
├── vite.config.js
└── README.md