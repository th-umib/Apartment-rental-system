# Apartment Rental System - Implementation Documentation

## Overview
This week, the project was extended from a basic architecture skeleton into a working CRUD-based apartment management system.

The implementation follows a layered architecture:
- **Model**
- **Repository**
- **Service**
- **Controller**
- **Routes**
- **Frontend UI**

The main model selected for this implementation is **Apartment**.

---

## 1. Model
The `Apartment` model includes the following attributes:
- `id`
- `title`
- `city`
- `address`
- `price`
- `isAvailable`

This satisfies the requirement of having at least 4 attributes in the main model.

---

## 2. Repository
A reusable `FileRepository` was implemented to work with CSV files.

### Implemented methods:
- `getAll()`
- `getById(id)`
- `add(item)`
- `save(items)`
- `update(id, updatedItem)`
- `delete(id)`

A specific `ApartmentRepository` extends `FileRepository` and connects directly to `apartments.csv`.

The CSV file contains initial apartment records and is updated when create, update, or delete operations are executed.

---

## 3. Service Layer
The `ApartmentService` was implemented with dependency injection by receiving the repository through the constructor.

### Implemented methods:
- `listo(filters)`
- `gjejById(id)`
- `shto(data)`
- `update(id, data)`
- `delete(id)`

### Business logic included:
- apartment title must not be empty
- apartment price must be greater than 0
- filtering by city
- filtering by availability

---

## 4. Controller and Routes
The backend was connected through:
- `apartmentController.js`
- `apartmentRoutes.js`

### Supported endpoints:
- `GET /apartments`
- `GET /apartments/:id`
- `POST /apartments`
- `PUT /apartments/:id`
- `DELETE /apartments/:id`

These endpoints were tested successfully with Thunder Client and browser-based requests.

---

## 5. Frontend UI
A working frontend page was implemented in `apartments.html`.

### Features available in the UI:
- list all apartments
- add new apartment
- edit existing apartment
- delete apartment

The page communicates directly with backend endpoints using `fetch()`.

Frontend files:
- `UI/frontend/apartments.html`
- `UI/frontend/css/style.css`
- `UI/frontend/js/apartments.js`

---

## 6. Functionality Achieved
The application now supports full CRUD operations end-to-end:

- **Create** apartment from UI form
- **Read** apartments in the list
- **Update** apartment by clicking Edit and submitting changes
- **Delete** apartment with Delete button

All changes are persisted into the CSV file.

---

## 7. Testing Evidence
The following tests were completed:
- backend `GET /apartments` returned apartment data successfully
- `POST` request created a new apartment
- `PUT` request updated apartment data
- `DELETE` removed apartment records
- frontend displayed apartments correctly
- frontend form successfully added and updated records
- delete button removed records from both UI and CSV file

---

## 8. Conclusion
The project now fulfills the weekly task requirements by transforming the original architecture skeleton into a functional apartment CRUD system with:
- CSV persistence
- service layer logic
- working routes/controllers
- connected frontend UI
- update and delete support
- documentation of implementation