# Apartment Rental Management System – User Stories

This document defines the **main user stories** for the **Apartment Rental Management System**.

User stories describe the **system functionality from the perspective of different user roles**.

## System Roles

The system includes three primary roles:

- **Tenant** – searches and books apartments
- **Owner** – publishes and manages apartments
- **Administrator** – manages users and oversees system operations

---

# Must Have Features

These features represent the **core functionality of the system** and are required for the platform to operate.

---

## 1. User Registration

### User Story
As a **user**, I want to **register in the system** so that I can **create a personal account and access the platform**.

### Acceptance Criteria

**Scenario 1: Successful Registration**

- **Given** the user is on the registration page  
- **When** the user enters valid information and clicks **Register**  
- **Then** the system creates a new account and redirects the user to the dashboard  

**Scenario 2: Invalid Information**

- **Given** the user enters invalid information  
- **When** the user clicks **Register**  
- **Then** the system displays an error message  

---

## 2. User Login

### User Story
As a **user**, I want to **log into the system** so that I can **manage my activities**.

### Acceptance Criteria

**Scenario 1: Successful Login**

- **Given** the user has an existing account  
- **When** the user enters correct **email** and **password**  
- **Then** the system allows access to the account  

**Scenario 2: Incorrect Credentials**

- **Given** the user enters incorrect credentials  
- **When** the user clicks **Login**  
- **Then** the system displays an authentication error  

---

## 3. Add Apartment

### User Story
As an **owner**, I want to **add a new apartment listing** so that I can **publish it for rent**.

### Acceptance Criteria

**Scenario 1: Successful Listing**

- **Given** the owner is logged in  
- **When** the owner fills in all required apartment details and clicks **Publish**  
- **Then** the system saves the apartment and makes it visible in listings  

**Scenario 2: Incomplete Form**

- **Given** the form is incomplete  
- **When** the owner clicks **Publish**  
- **Then** the system displays a warning message  

---

## 4. Search Apartments

### User Story
As a **tenant**, I want to **search apartments by city and price** so that I can **find the most suitable option**.

### Acceptance Criteria

**Scenario 1: Matching Results**

- **Given** the user is on the search page  
- **When** filters such as **city** and **price** are applied  
- **Then** the system displays matching apartments  

**Scenario 2: No Results**

- **Given** there are no results  
- **When** the search is performed  
- **Then** the system displays a **"No results found"** message  

---

## 5. Book Apartment

### User Story
As a **tenant**, I want to **reserve an apartment** so that I can **secure it for specific dates**.

### Acceptance Criteria

**Scenario 1: Apartment Available**

- **Given** the apartment is available  
- **When** the tenant selects dates and clicks **Book**  
- **Then** a reservation is created with status **Pending**

**Scenario 2: Apartment Not Available**

- **Given** the apartment is not available  
- **When** the tenant attempts to book  
- **Then** the system displays a notification message  

---

# Should Have Features

These features **improve the system** but are not strictly required for the first version.

---

## 6. Approve or Reject Reservations

### User Story
As an **owner**, I want to **approve or reject reservation requests** so that I can **control apartment availability**.

### Acceptance Criteria

**Scenario 1: Approve Reservation**

- **Given** a reservation exists with status **Pending**  
- **When** the owner clicks **Approve**  
- **Then** the reservation status changes to **Approved**

**Scenario 2: Reject Reservation**

- **Given** a reservation exists with status **Pending**  
- **When** the owner clicks **Reject**  
- **Then** the reservation status changes to **Rejected**

---

## 7. Admin User Management

### User Story
As an **administrator**, I want to **manage users** so that I can **maintain the security and integrity of the system**.

### Acceptance Criteria

- **Given** the administrator is logged in  
- **When** the admin selects a user and clicks **Delete**  
- **Then** the user is removed from the system  

---

# Could Have Features

These features **improve the user experience** but are optional.

---

## 8. Apartment Rating

### User Story
As a **tenant**, I want to **rate an apartment after my stay** so that **other users can make better decisions**.

### Acceptance Criteria

- **Given** the reservation has been completed  
- **When** the user submits a **rating and comment**  
- **Then** the rating is saved and displayed on the apartment page  

---

# Prioritization (MoSCoW Method)

## Must Have
- User Registration  
- User Login  
- Add Apartment  
- Search Apartments  
- Book Apartment  

## Should Have
- Approve or Reject Reservations  
- Admin User Management  

## Could Have
- Apartment Rating  


---

# Summary

These user stories define the **core functionality** of the **Apartment Rental Management System** and ensure that:

- All **system roles** are covered  
- The **system workflow** is clearly defined  
- Features can be **tested through acceptance criteria**  