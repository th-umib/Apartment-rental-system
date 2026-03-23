# Architecture Documentation

## Overview

The Apartment Rental Management System is organized using a layered architecture.  
This design separates concerns and makes the project easier to understand, test, and maintain.

The project is divided into the following layers:

- Models
- Services
- Data
- UI

---

## 1. Models Layer

The Models layer contains the main domain entities of the system.

Examples:
- User
- Apartment
- Booking
- Review

Responsibilities:
- Represent the core business objects
- Define the attributes of each entity
- Keep the structure of application data clear

Reason for this layer:
The Models layer separates domain representation from business logic and data persistence.

---

## 2. Services Layer

The Services layer contains the business logic of the application.

Examples:
- UserService
- ApartmentService
- BookingService
- AuthService

Responsibilities:
- Process system rules
- Coordinate operations between UI and Data
- Centralize business actions

Reason for this layer:
It keeps business logic out of controllers and makes the system cleaner and easier to extend.

---

## 3. Data Layer

The Data layer is responsible for data access and persistence.

Examples:
- IRepository
- FileRepository
- CSV data files

Responsibilities:
- Read data from CSV files
- Save data to CSV files
- Provide common operations such as GetAll, GetById, Add, and Save

Reason for this layer:
This layer isolates storage logic from the rest of the project.  
If the project changes from CSV files to a real database later, most of the code can remain unchanged.

---

## 4. UI Layer

The UI layer contains the controllers, routes, and frontend pages.

Examples:
- UserController
- ApartmentController
- BookingController
- AuthController
- Route files
- HTML, CSS, and JavaScript frontend pages

Responsibilities:
- Receive HTTP requests
- Call the appropriate services
- Return responses
- Display data to the user through a simple frontend

Reason for this layer:
It separates interaction and presentation from business and data logic.

---

## Repository Pattern

The project applies the Repository Pattern through:
- IRepository
- FileRepository

IRepository defines common operations:
- GetAll()
- GetById()
- Add()
- Save()

FileRepository implements these operations for CSV file storage.

Reason for this decision:
The Repository Pattern provides abstraction and keeps file-handling logic in one place.

---

## SOLID Principle Used

This project applies the Single Responsibility Principle (SRP).

Examples:
- Models represent only data
- Services contain only business logic
- Data layer handles only persistence
- UI layer handles only interaction and presentation

Reason:
Each class and each layer has one clear responsibility, which improves maintainability and readability.

---

## Final Notes

This architecture was chosen because it is simple, clear, and suitable for a semester project.  
It also supports future improvements such as database integration, authentication enhancement, and a richer frontend interface.
