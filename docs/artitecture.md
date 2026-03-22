

## 1. Architectural Style

The system follows a **Layered Architecture**:

- Presentation Layer (Controllers & Routes)
- Application Layer (Services)
- Domain Layer (Models & Interfaces)
- Infrastructure Layer (Database & Repositories)

This separation improves maintainability, scalability, and testability.

---

## 2. Design Patterns Used

### Repository Pattern

We implemented the Repository Pattern to abstract database access.

Benefits:
- Decouples business logic from database
- Easier to test (mock repositories)
- Cleaner and more maintainable code

---

## 3. Layer Responsibilities

### Presentation Layer
Handles HTTP requests and responses.

### Application Layer
Contains business logic and rules.

### Domain Layer
Defines core entities and interfaces.

### Infrastructure Layer
Handles database communication and external services.

---

## 4. Database

The system uses **PostgreSQL** for data storage.

---

## 5. Key Design Decisions

- Used layered architecture for scalability
- Used repository pattern for clean data access
- Separated concerns for better maintainability
- REST API structure for communication

---

## 6. Future Improvements

- Add caching (Redis)
- Add unit and integration testing
- Implement microservices architecture