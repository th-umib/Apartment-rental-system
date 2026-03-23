# Class Diagram

This class diagram presents the main architectural components of the Apartment Rental Management System.

It reflects the layered structure of the project:
- Models for domain entities
- Data layer for file-based persistence
- Services for business logic
- UI for controllers, routes, and frontend interaction

## UML Class Diagram

```mermaid
classDiagram
    direction TB

    class User {
        -id: number
        -fullName: string
        -email: string
        -password: string
        -role: string
        +constructor(id, fullName, email, password, role)
    }

    class Apartment {
        -id: number
        -title: string
        -city: string
        -address: string
        -pricePerNight: number
        -isAvailable: boolean
        +constructor(id, title, city, address, pricePerNight, isAvailable)
    }

    class Booking {
        -id: number
        -userId: number
        -apartmentId: number
        -startDate: string
        -endDate: string
        -status: string
        +constructor(id, userId, apartmentId, startDate, endDate, status)
    }

    class Review {
        -id: number
        -userId: number
        -apartmentId: number
        -rating: number
        -comment: string
        +constructor(id, userId, apartmentId, rating, comment)
    }

    class IRepository {
        <<interface>>
        +getAll()
        +getById(id)
        +add(item)
        +save()
    }

    class FileRepository {
        -filePath: string
        -items: Array
        +load()
        +getAll()
        +getById(id)
        +add(item)
        +save()
    }

    class UserService {
        -userRepository: FileRepository
        +getAllUsers()
        +getUserById(id)
        +addUser(user)
    }

    class ApartmentService {
        -apartmentRepository: FileRepository
        +getAllApartments()
        +getApartmentById(id)
        +addApartment(apartment)
    }

    class BookingService {
        -bookingRepository: FileRepository
        +getAllBookings()
        +getBookingById(id)
        +addBooking(booking)
    }

    class AuthService {
        -userRepository: FileRepository
        +login(email, password)
    }

    class UserController {
        +getAllUsers(req, res)
        +getUserById(req, res)
    }

    class ApartmentController {
        +getAllApartments(req, res)
        +getApartmentById(req, res)
    }

    class BookingController {
        +getAllBookings(req, res)
        +getBookingById(req, res)
    }

    class AuthController {
        +login(req, res)
    }

    class FrontendPages {
        +index.html
        +apartments.html
        +bookings.html
        +login.html
    }

    class FrontendScripts {
        +apartments.js
        +bookings.js
        +login.js
    }

    IRepository <|.. FileRepository

    UserService --> FileRepository : uses
    ApartmentService --> FileRepository : uses
    BookingService --> FileRepository : uses
    AuthService --> FileRepository : uses

    UserController --> UserService : uses
    ApartmentController --> ApartmentService : uses
    BookingController --> BookingService : uses
    AuthController --> AuthService : uses

    FrontendPages --> FrontendScripts : uses
    FrontendScripts --> UserController : requests data
    FrontendScripts --> ApartmentController : requests data
    FrontendScripts --> BookingController : requests data
    FrontendScripts --> AuthController : sends login request

    User --> Booking : creates
    Apartment --> Booking : reserved in
    User --> Review : writes
    Apartment --> Review : receives
```
---

## Relationships Summary

- One user can create many bookings.
- One apartment can appear in many bookings.
- One user can write many reviews.
- One apartment can receive many reviews.
- Services use FileRepository for data access.
- Controllers call Services.
- Frontend communicates with backend endpoints through controllers and routes.

---

# Notes
- The diagram represents the main system structure using a layered approach (Models, Repository, Services, Controllers, Frontend).
- IRepository is used as an interface to enable flexible data access and easy replacement of storage implementation.
- FileRepository provides a simple file-based persistence mechanism used by all services.
- Services contain the core business logic and act as a bridge between controllers and data access.
- Controllers handle requests and delegate operations to the appropriate services.
- The frontend communicates with backend controllers through API calls.
- Relationships between User, Apartment, Booking, and Review reflect real-world rental system interactions.

---