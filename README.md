
```markdown
# 📚 Library Book Issue & Return Service

> A RESTful backend application built using Java Spring Boot and MySQL to manage library operations.

### Key Operations:
- Book Management
- Member Registration
- Book Issue & Return
- Availability Tracking
- Business Rule Validation

---

## 🎯 Objective
The objective of this project is to automate the book issuing process of a college library using REST APIs. The system allows librarians to manage books and members while enforcing library rules such as:
- A book can only be issued to one member at a time.
- A member can issue a maximum of **3** books.

---

## ✨ Features

### Book Management
- Add a new book
- View all books
- View available books
- Search books by title
- Search books by author

### Member Management
- Register a member
- View member details
- View books issued to a member

### Issue & Return Management
- Issue books to members
- Return issued books
- Automatically update availability status
- Store issue and return dates

---

## 💻 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Java 17** | Programming Language |
| **Spring Boot** | Backend Framework |
| **Spring Data JPA** | ORM |
| **Hibernate** | Database Mapping |
| **MySQL** | Database |
| **Maven** | Dependency Management |
| **Postman** | API Testing |

---

## 📂 Project Structure

```bash
library-management-system/
│
├── src/main/java/com/library/
│   ├── controller/
│   │   ├── BookController.java
│   │   ├── MemberController.java
│   │   └── IssueController.java
│   │
│   ├── service/
│   │   ├── BookService.java
│   │   ├── MemberService.java
│   │   └── IssueService.java
│   │
│   ├── repository/
│   │   ├── BookRepository.java
│   │   ├── MemberRepository.java
│   │   └── IssueRepository.java
│   │
│   ├── entity/
│   │   ├── Book.java
│   │   ├── Member.java
│   │   └── IssueRecord.java
│   │
│   ├── exception/
│   │   ├── ResourceNotFoundException.java
│   │   └── GlobalExceptionHandler.java
│   │
│   └── LibraryManagementApplication.java

```

---

## 🗄️ Database Design

### Book Entity

| Field | Type |
| --- | --- |
| `bookId` | Long |
| `title` | String |
| `author` | String |
| `available` | Boolean |

### Member Entity

| Field | Type |
| --- | --- |
| `memberId` | Long |
| `name` | String |
| `email` | String |

### IssueRecord Entity

| Field | Type |
| --- | --- |
| `issueId` | Long |
| `issueDate` | LocalDate |
| `returnDate` | LocalDate |
| `book` | Book |
| `member` | Member |

---

## 🔌 REST API Endpoints

### 📖 Book APIs

**Add Book**

```http
POST /books

```

*Request Body:*

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin"
}

```

**Get All Books**

```http
GET /books

```

**Get Available Books**

```http
GET /books/available

```

**Search Books**
*By Title:*

```http
GET /books/search/title?title=Clean

```

*By Author:*

```http
GET /books/search/author?author=Martin

```

### 👥 Member APIs

**Register Member**

```http
POST /members

```

*Request Body:*

```json
{
  "name": "Sneha",
  "email": "sneha@gmail.com"
}

```

**Get Member Details**

```http
GET /members/{memberId}

```

**Get Books Issued to Member**

```http
GET /members/{memberId}/books

```

### 🔄 Issue APIs

**Issue a Book**

```http
POST /issues/issue

```

*Request Body:*

```json
{
  "bookId": 1,
  "memberId": 2
}

```

*Business Validations:*

* Book must exist
* Member must exist
* Book must be available
* Member should have fewer than 3 active book issues

**Return a Book**

```http
PUT /issues/return/{issueId}

```

*Functionality:*

* Updates return date
* Marks book as available

---

## ⚖️ Business Rules

* One book can only be issued to one member at a time.
* A member can issue a maximum of 3 books.
* A book must be available before issuing.
* Returning a book updates its availability.

---

## Exception Handling

Centralized exception handling is implemented using:

```java
@RestControllerAdvice

```

**Handled Exceptions:**

* Book not found
* Member not found
* Book unavailable
* Maximum issue limit exceeded
* Invalid request data

---

## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/Ashishvatsav/Libtrack.git

```

### 2. Open the Project

Open the project using your preferred IDE (IntelliJ IDEA, VS Code, or Eclipse).

### 3. Configure MySQL Database

Create a database in MySQL:

```sql
CREATE DATABASE librarydb;

```

Add the following in your `application.properties` file:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/librarydb
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect

```

### 4. Run the Application

Using Maven:

```bash
mvn spring-boot:run

```

The application will run at: `http://localhost:8080`

---

## API Testing

You can test the APIs using **Postman**, **Swagger UI**, or **Thunder Client**.

### Sample Postman Requests

**Add Book:**

```json
{
  "title": "Spring Boot in Action",
  "author": "Craig Walls"
}

```

**Register Member:**

```json
{
  "name": "John Doe",
  "email": "john@gmail.com"
}

```

**Issue Book:**

```json
{
  "bookId": 1,
  "memberId": 1
}

```

---

## Future Enhancements

* [ ] JWT Authentication
* [ ] Role-Based Access Control
* [ ] Fine Calculation System
* [ ] Due Date Notifications
* [ ] Swagger API Documentation
* [ ] Docker Deployment
* [ ] Unit Testing using JUnit & Mockito

---

## Hackathon Deliverables

*  Working REST APIs
*  Business Rule Validations
*  Exception Handling
*  Database Integration
*  Postman API Testing
*  Clean Layered Architecture

## 📜 License

This project is intended for educational and hackathon purposes.

```

```
