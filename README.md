# Apartment Rental Management System

A layered web application for managing apartments, users, bookings, and reviews in one organized rental platform.

---

## Overview

**Apartment Rental Management System** is a semester project developed to organize and simplify the core processes of an apartment rental platform.

The system is designed around a clear layered architecture and focuses on the management of:

- apartment listings
- users and roles
- bookings and reservation flow
- reviews and feedback
- CSV-based data storage
- project documentation and maintainable code structure

---

## Main Idea

The purpose of this system is to make apartment rental operations easier, more structured, and easier to maintain in code.

A user should be able to:

- browse available apartments
- view apartment details
- create booking requests
- manage rental-related information
- leave reviews for apartments

At the same time, the system is organized so that administrators or managers can maintain apartment data, monitor bookings, and extend the platform more easily in the future.

This makes the project useful both as a practical rental-management application and as an academic example of layered architecture, repository pattern, and documentation.

---

## Features

### Core Functional Areas

- User management
- Apartment management
- Booking management
- Review handling
- CSV file persistence
- Layered project organization

### Current Project Capabilities

- Organized structure with separate layers for Models, Services, Data, and UI
- Repository Pattern using `IRepository` and `FileRepository`
- CSV-based file storage for simple persistence
- Express.js backend setup
- Project documentation for architecture and UML

### Planned Extensions

- Full authentication and authorization
- Better validation and error handling
- Apartment filtering and search
- Booking approval workflow
- Role-based dashboard support
- Improved frontend integration

---

## Tech Stack

| Layer / Area    | Technology            | Purpose                              |
| --------------- | --------------------- | ------------------------------------ |
| Language        | JavaScript            | Core programming language            |
| Runtime         | Node.js               | Server-side runtime                  |
| Framework       | Express.js            | Routing and backend request handling |
| Storage         | CSV files             | Simple persistence for project data  |
| Frontend        | HTML, CSS, JavaScript | Basic user interface                 |
| Architecture    | Layered Architecture  | Separation of concerns               |
| Design Pattern  | Repository Pattern    | Abstracted data access               |
| Version Control | Git + GitHub          | Source control and delivery          |

---

## Project Structure

```bash
Apartment-rental-system/
├── Models/                 # Domain entities of the system
├── Services/               # Business logic layer
├── Data/                   # Repository layer and CSV persistence
│   ├── IRepository.js
│   ├── FileRepository.js
│   └── *.csv
├── UI/                     # Presentation layer
│   ├── controllers/        # Request handlers
│   ├── routes/             # Express routes
│   └── frontend/           # Frontend pages/assets if used
├── docs/                   # Architecture and UML documentation
├── middleware/             # Shared middleware
├── public/                 # Static public assets
├── app.js                  # Main application entry point
├── package.json
├── .gitignore
└── README.md
```

---

## Architecture

The project follows a **layered architecture** in order to separate responsibilities and improve maintainability.

### Models

The `Models` layer contains the core domain entities of the application such as:

- User
- Apartment
- Booking
- Review

These classes represent the main business objects of the system.

### Services

The `Services` layer contains the business logic of the application.

This layer is responsible for:

- coordinating application behavior
- working with repositories
- separating logic from route handling

### Data

The `Data` layer is responsible for persistence.

It includes:

- `IRepository`
- `FileRepository`
- CSV storage files

This layer abstracts file operations from the rest of the system and keeps storage logic isolated.

### UI

The `UI` layer contains:

- controllers
- routes
- frontend-related files

This layer handles incoming requests and sends responses back to the client.

### Middleware

The `middleware` folder contains reusable backend logic that can be applied during request processing.

---

## Repository Pattern

This project implements the **Repository Pattern** as requested in the assignment.

### Implemented Components

- `IRepository`
- `FileRepository`

### Repository Methods

- `getAll()`
- `getById()`
- `add()`
- `save()`

### Why it is used

The repository pattern makes the code cleaner by separating data access logic from business logic.

Instead of reading and writing CSV files directly inside controllers or services, the project keeps file handling inside repository classes. This improves readability, reuse, and future scalability.

---

## UML and Documentation

The project documentation is stored in the `docs/` folder.

### Included Documentation

- `docs/architecture.md` – explains the architecture, layers, responsibilities, and design decisions
- `docs/class-diagram.md` – contains the UML class diagram and class relationships

These files support the academic requirements of the project and describe how the system is organized internally.

---

## SOLID Principle Applied

The project applies the **Single Responsibility Principle (SRP)**.

Examples:

- Models define entities
- Services contain business logic
- Repositories handle persistence
- Controllers handle requests and responses

By assigning one clear responsibility to each layer and component, the code becomes easier to understand and easier to maintain.

---

## Current Status

**This project is currently in the development phase, with the architectural foundation already organized.**

### Completed

- layered structure created
- Models, Services, Data, and UI separated
- repository pattern prepared and implemented
- CSV-based storage included
- documentation folder prepared
- UML and architecture documentation included
- README updated to match the project structure

### In Progress

- extending CRUD behavior
- improving validation and error handling
- refining booking flow
- improving frontend integration
- expanding system functionality

---

## How to Run the Project

## 1. Clone the repository

```bash
git clone https://github.com/th-umib/Apartment-rental-system.git
cd Apartment-rental-system
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start the application

```bash
npm start
```

If your `package.json` does not yet include a start script, you can run:

```bash
node app.js
```

The server should run on:

```bash
http://localhost:3000
```

---

## Future Improvements

- full authentication and authorization
- complete CRUD operations for all entities
- stronger validation and input checks
- search and filtering for apartments
- booking conflict prevention
- admin-focused management features
- improved frontend UI/UX
- possible migration from CSV storage to a database in the future

---

## Author

**Tringa Hyseni**  
Software Engineering Student  
University of Mitrovica “Isa Boletini”
