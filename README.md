# Apartment Rental Management System

A layered web application for managing apartments, users, bookings, and reviews in one organized rental platform.

---

## Overview

**Apartment Rental Management System** is a software project developed to simplify the management of apartment rentals, reservations, and user activity.

The system is inspired by the basic workflow of rental platforms such as Airbnb, where property owners can publish apartments, users can browse available listings, and bookings can be managed in a structured way.

This project is designed to help manage:
- apartment listings
- users and roles
- reservations and booking status
- reviews and feedback
- apartment availability
- future admin control and reporting

The main goal of the platform is to provide one centralized system where rental operations can be handled more efficiently and more clearly.

---

## Main Idea

The purpose of this system is to make apartment rental management easier, faster, and better organized.

A user should be able to:
- browse available apartments
- view apartment details
- register and log in
- make a booking request
- manage their reservations
- leave reviews after using an apartment

At the same time, apartment owners and administrators should be able to manage listings, track reservations, and monitor platform activity.

This makes the system practical for real rental workflows, where users need a simple booking experience and the business side needs clear control over apartments and reservations.

---

## Features

### For Users
- Browse available apartments
- View apartment details and descriptions
- Register and log in to the platform
- Make apartment booking requests
- Track booking status
- Leave reviews and ratings

### For Apartment Owners / Management
- Add and manage apartment listings
- Update apartment information
- Control apartment availability
- Review booking requests
- Manage reservations more efficiently

### Planned System Features
- Authentication with role-based access
- Apartment availability tracking
- Booking approval and status management
- Review and rating system
- User management for admin
- Reporting and future analytics support

---

## Tech Stack

| Layer | Technology | Purpose |
|------|------------|---------|
| Language | JavaScript | Core programming language used in the project |
| Runtime | Node.js | Server-side runtime environment |
| Framework | Express.js | Routing and backend request handling |
| Storage / Persistence | CSV files / file-based storage | Simple data persistence for the current project structure |
| Frontend | HTML, CSS | Basic user interface pages |
| Architecture | Layered architecture | Separation of concerns between models, services, data, and UI |
| Version Control | Git + GitHub | Source control and project collaboration |

---

## Project Structure

```bash
Apartment-rental-system/
├── Models/                # Domain entities of the system
├── UI/                    # Controllers, routes, and frontend-related structure
├── confing/               # Configuration files
├── data/                  # Repository layer and storage handling
├── docs/                  # Project documentation
├── middleware/            # Express middleware
├── public/                # Static frontend assets
├── services/              # Business logic layer
├── .gitignore
├── app.js                 # Main application entry
├── package.json
└── README.md
```

---

## Project Architecture

The project is organized using a layered architecture:

- **Models** – represent the core entities such as users, apartments, bookings, and reviews
- **Services** – contain the business logic and application rules
- **Data** – manage repositories and data persistence
- **UI** – handle routes, controllers, and interaction with the client side
- **Middleware** – manage request processing, validation, and shared backend behavior

This structure improves readability, maintainability, and separation of concerns across the project.

---

## Core Modules

### User Management
The system supports user registration and login functionality and is planned to support role-based access for different types of users such as administrator, apartment owner, and tenant.

### Apartment Management
Apartment data can be organized and managed through dedicated models and services. Each apartment can include information such as title, location, price, description, and availability.

### Booking Management
The booking module is intended to manage reservations, rental dates, and booking status. A major goal of this part of the system is to avoid overlapping or double bookings for the same apartment.

### Reviews
Users can leave reviews for apartments after using the service, allowing the platform to include feedback and improve trust between tenants and apartment owners.

---

## Current Status

**This project is currently in the development phase.**

### Completed
- project structure created
- layered architecture organized
- basic backend setup prepared
- documentation folder included
- models, services, data, UI, and middleware folders structured

### In Progress
- application logic implementation
- apartment management features
- booking flow development
- user authentication
- review handling
- frontend integration and improvements

---

## How to Run the Project

## 1. Clone the repository
```bash
git clone https://github.com/th-umib/Apartment-rental-system.git
```

```bash
cd Apartment-rental-system
```

## 2. Install dependencies
```bash
npm install
```

## 3. Start the project
```bash
node app.js
```

If additional scripts are added later, they can also be used through `npm run ...` commands.

---

## Project Goals

The main goals of this system are:
- to simplify apartment listing management
- to support a structured reservation process
- to reduce booking conflicts
- to organize users, apartments, and reviews in one place
- to provide a maintainable and scalable academic software project

---

## Future Improvements

- Full authentication and authorization
- Better apartment filtering and search
- Booking validation with date conflict prevention
- Admin dashboard and user control
- Improved frontend UI/UX
- Database integration for larger scale persistence
- Reporting and analytics features

---

## Author

**Tringa Hyseni**  
Software Engineering Student  
University of Mitrovica “Isa Boletini”