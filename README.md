# Apartment Rental Management System

**Author:** Tringa Hyseni
**Technologies:** JavaScript, Express.js, PostgreSQL, bcrypt, JWT

## Project Overview

Apartment Rental Management System is a software project designed to manage apartment listings, reservations, and rental services.

The system is inspired by simplified versions of platforms such as Airbnb. It allows apartment owners to publish their properties, tenants to search and reserve apartments, and administrators to manage users and monitor system activity.

The goal of the project is to provide a centralized platform that simplifies the process of managing rental apartments, reservations, and availability.

## Main Goals of the System

The main objective of this application is to manage the core operations of an apartment rental platform, including:

- User registration and authentication
- Apartment listing and management
- Searching apartments by filters
- Apartment booking and reservation tracking
- Preventing double bookings
- Managing users and platform activity

The system helps organize rental services and improves efficiency for both apartment owners and tenants.

## Planned Features

### Authentication and Security

- Secure user registration
- Login functionality
- Password hashing using **bcrypt**
- Authentication using **JWT tokens**
- Role-based authorization (Admin, Owner, Tenant)

### Apartment Management

- Add new apartments
- Edit apartment details
- Delete apartments
- Save apartment information including price, city, and description

### Apartment Search

Tenants will be able to search apartments using filters such as:

- City
- Price range
- Availability

If no results are found, the system will display a **"No results found"** message.

### Booking Management

- Create apartment reservations
- Choose rental dates
- Prevent double booking for the same apartment
- Booking status tracking:
  - Pending
  - Approved
  - Rejected
  - Completed

### Admin Management

Administrators will be able to:

- Manage users
- Remove inappropriate accounts
- Monitor system activity

## Project Structure

```text
apartment-rental-system
│
├── src
│   └── app.js
│
├── docs
│   └── user-stories.md
│
├── README.md
└── .gitignore
```

This structure keeps the project organized and separates the application logic from documentation.

## Technologies Used

- JavaScript
- Node.js
- Express.js
- PostgreSQL
- bcrypt
- jsonwebtoken (JWT)
- Git
- GitHub

## How to Use the Project

This repository currently contains the initial project structure, documentation, and planned system modules.

The project will be developed further with authentication, apartment management, booking logic, and administrative features.

## Project Status

This project is currently in the **initial development phase**.

At this stage the repository includes:

- Initial project structure
- Project documentation
- User stories definition
- Planned system modules and features

Future updates will include the implementation of authentication, apartment management, and booking modules.

## Author

Tringa Hyseni
Software Engineering Student  
University of Mitrovica “Isa Boletini”  
