# Todo List API

A simple CRUD API for managing a to-do list built with Spring Boot and PostgreSQL.

## Features

- ✅ Create, Read, Update, Delete (CRUD) operations for todos
- ✅ Filter todos by completion status (completed/pending)
- ✅ Search todos by title
- ✅ Automatic timestamps for creation and last update
- ✅ Input validation with error handling
- ✅ CORS enabled for cross-origin requests
- ✅ RESTful API design

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- PostgreSQL 12+ (running and accessible)
- pgAdmin 4 (optional, for database management)

## Quick Start

### 1. Database Setup

Create the PostgreSQL database using pgAdmin 4 or command line:

**Using pgAdmin 4:**
- Open pgAdmin 4 → Right-click Databases → Create → Database
- Name: `todo_db`
- Owner: `postgres`

**Using Command Line:**
```sql
CREATE DATABASE todo_db;
```

### 2. Database Configuration

Update credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/todo_db
spring.datasource.username=postgres
spring.datasource.password=your_password
```

### 3. Build the Project

```bash
mvn clean package
```

### 4. Run the Application

```bash
mvn spring-boot:run
```

The application starts at **http://localhost:8080**

### 5. (Optional) Seed Sample Data

Install Python dependencies:
```bash
pip install -r requirements.txt
```

Run the seeding script:
```bash
python seed_data.py
```

---

## API Endpoints Documentation

### 1. Get All Todos

**Request:**
```http
GET /api/todos
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation",
    "completed": false,
    "createdAt": "2026-03-01T10:30:00",
    "updatedAt": "2026-03-01T10:30:00"
  },
  {
    "id": 2,
    "title": "Review pull requests",
    "description": "Review team PRs",
    "completed": true,
    "createdAt": "2026-03-01T10:25:00",
    "updatedAt": "2026-03-01T10:28:00"
  }
]
```

---

### 2. Get Todo by ID

**Request:**
```http
GET /api/todos/1
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation",
  "completed": false,
  "createdAt": "2026-03-01T10:30:00",
  "updatedAt": "2026-03-01T10:30:00"
}
```

**Error Response:** `404 Not Found`
```json
{
  "error": "Todo not found with id: 999"
}
```

---

### 3. Create a New Todo

**Request:**
```http
POST /api/todos
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, butter",
  "completed": false
}
```

**Response:** `201 Created`
```json
{
  "id": 11,
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, butter",
  "completed": false,
  "createdAt": "2026-03-01T11:00:00",
  "updatedAt": "2026-03-01T11:00:00"
}
```

**Validation Error:** `400 Bad Request`
```json
{
  "error": "Title is required"
}
```

---

### 4. Update a Todo

**Request:**
```http
PUT /api/todos/1
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive docs and examples",
  "completed": true
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "title": "Complete project documentation",
  "description": "Write comprehensive docs and examples",
  "completed": true,
  "createdAt": "2026-03-01T10:30:00",
  "updatedAt": "2026-03-01T11:05:00"
}
```

---

### 5. Delete a Todo

**Request:**
```http
DELETE /api/todos/1
```

**Response:** `204 No Content` (empty body)

---

### 6. Get Completed Todos

**Request:**
```http
GET /api/todos/filter/completed
```

**Response:** `200 OK`
```json
[
  {
    "id": 2,
    "title": "Review pull requests",
    "description": "Review team PRs",
    "completed": true,
    "createdAt": "2026-03-01T10:25:00",
    "updatedAt": "2026-03-01T10:28:00"
  }
]
```

---

### 7. Get Pending Todos

**Request:**
```http
GET /api/todos/filter/pending
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation",
    "completed": false,
    "createdAt": "2026-03-01T10:30:00",
    "updatedAt": "2026-03-01T10:30:00"
  },
  {
    "id": 5,
    "title": "Write unit tests",
    "description": "Add tests for services",
    "completed": false,
    "createdAt": "2026-03-01T11:00:00",
    "updatedAt": "2026-03-01T11:00:00"
  }
]
```

---

### 8. Search Todos by Title

**Request:**
```http
GET /api/todos/search?title=documentation
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive documentation",
    "completed": false,
    "createdAt": "2026-03-01T10:30:00",
    "updatedAt": "2026-03-01T10:30:00"
  },
  {
    "id": 7,
    "title": "API documentation",
    "description": "Create Swagger documentation",
    "completed": false,
    "createdAt": "2026-03-01T10:45:00",
    "updatedAt": "2026-03-01T10:45:00"
  }
]
```

---

## API Testing with cURL

```bash
# Get all todos
curl http://localhost:8080/api/todos

# Get single todo
curl http://localhost:8080/api/todos/1

# Create new todo
curl -X POST http://localhost:8080/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Description here","completed":false}'

# Update todo
curl -X PUT http://localhost:8080/api/todos/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated Task","description":"Updated desc","completed":true}'

# Delete todo
curl -X DELETE http://localhost:8080/api/todos/1

# Get completed todos
curl http://localhost:8080/api/todos/filter/completed

# Get pending todos
curl http://localhost:8080/api/todos/filter/pending

# Search todos
curl "http://localhost:8080/api/todos/search?title=documentation"
```

---

## API Testing with Postman

### Setup Postman Environment

1. **Download Postman** from [postman.com](https://www.postman.com/downloads/)
2. **Create a new Collection**
   - Click "Collections" → "+" → Name it "Todo API"
3. **Create Environment Variables** (optional but recommended)
   - Click "Environments" → "+"
   - Name: `Todo API Local`
   - Add variable:
     - Key: `base_url`
     - Value: `http://localhost:8080`

### Method 1: Get All Todos

1. **Create new request** in your collection
2. **Method:** `GET`
3. **URL:** `{{base_url}}/api/todos` (or `http://localhost:8080/api/todos`)
4. **Click Send**

**Expected Response:** Array of all todos with status `200 OK`

---

### Method 2: Get Single Todo by ID

1. **Create new request**
2. **Method:** `GET`
3. **URL:** `{{base_url}}/api/todos/1`
4. **Click Send**

**Expected Response:** Single todo object with status `200 OK`

**To test with different IDs:**
- Use path variables: URL = `{{base_url}}/api/todos/:id`
- In "Params" tab set `id` = `2` (or any valid ID)

---

### Method 3: Create a New Todo

1. **Create new request**
2. **Method:** `POST`
3. **URL:** `{{base_url}}/api/todos`
4. **Headers tab:** Add header
   - Key: `Content-Type`
   - Value: `application/json`
5. **Body tab:** Select `raw` → `JSON`
6. **Paste the following:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive docs with examples",
  "completed": false
}
```
7. **Click Send**

**Expected Response:** Created todo with `201 Created` status and auto-generated ID

**Try different titles:**
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, butter",
  "completed": false
}
```

```json
{
  "title": "Write unit tests",
  "description": "Add tests for service and controller layers",
  "completed": false
}
```

---

### Method 4: Update a Todo

1. **Create new request**
2. **Method:** `PUT`
3. **URL:** `{{base_url}}/api/todos/1`
4. **Headers tab:**
   - Key: `Content-Type`
   - Value: `application/json`
5. **Body tab:** Select `raw` → `JSON`
6. **Paste:**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive docs, examples, and API guide",
  "completed": true
}
```
7. **Click Send**

**Expected Response:** Updated todo with `200 OK` status

**Note:** The `updatedAt` timestamp will be refreshed automatically

---

### Method 5: Delete a Todo

1. **Create new request**
2. **Method:** `DELETE`
3. **URL:** `{{base_url}}/api/todos/1`
4. **Click Send**

**Expected Response:** `204 No Content` (empty body)

**Verify deletion:**
- Send GET request to `/api/todos/1`
- Should return `404 Not Found` error

---

### Method 6: Get Completed Todos

1. **Create new request**
2. **Method:** `GET`
3. **URL:** `{{base_url}}/api/todos/filter/completed`
4. **Click Send**

**Expected Response:** Array of only completed todos (where `completed: true`)

---

### Method 7: Get Pending Todos

1. **Create new request**
2. **Method:** `GET`
3. **URL:** `{{base_url}}/api/todos/filter/pending`
4. **Click Send**

**Expected Response:** Array of only pending todos (where `completed: false`)

---

### Method 8: Search Todos by Title

1. **Create new request**
2. **Method:** `GET`
3. **URL:** `{{base_url}}/api/todos/search`
4. **Params tab:** Add query parameter
   - Key: `title`
   - Value: `documentation`
5. **Click Send**

**Expected Response:** Array of todos matching the search term

**Try different searches:**
- `title=documentation` → finds docs-related todos
- `title=test` → finds test-related todos
- `title=database` → finds database-related todos
- Search is case-insensitive

---

## Complete Postman Collection (JSON Import)

You can import this collection directly into Postman:

1. **In Postman:** Click "Import" button
2. **Paste the following JSON:**

```json
{
  "info": {
    "name": "Todo API",
    "description": "Complete Todo List API Collection",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Todos",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/todos",
          "host": ["{{base_url}}"],
          "path": ["api", "todos"]
        }
      }
    },
    {
      "name": "Get Todo by ID",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/todos/1",
          "host": ["{{base_url}}"],
          "path": ["api", "todos", "1"]
        }
      }
    },
    {
      "name": "Create Todo",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"New Todo\",\n  \"description\": \"Todo description\",\n  \"completed\": false\n}"
        },
        "url": {
          "raw": "{{base_url}}/api/todos",
          "host": ["{{base_url}}"],
          "path": ["api", "todos"]
        }
      }
    },
    {
      "name": "Update Todo",
      "request": {
        "method": "PUT",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"title\": \"Updated Todo\",\n  \"description\": \"Updated description\",\n  \"completed\": true\n}"
        },
        "url": {
          "raw": "{{base_url}}/api/todos/1",
          "host": ["{{base_url}}"],
          "path": ["api", "todos", "1"]
        }
      }
    },
    {
      "name": "Delete Todo",
      "request": {
        "method": "DELETE",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/todos/1",
          "host": ["{{base_url}}"],
          "path": ["api", "todos", "1"]
        }
      }
    },
    {
      "name": "Get Completed Todos",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/todos/filter/completed",
          "host": ["{{base_url}}"],
          "path": ["api", "todos", "filter", "completed"]
        }
      }
    },
    {
      "name": "Get Pending Todos",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/todos/filter/pending",
          "host": ["{{base_url}}"],
          "path": ["api", "todos", "filter", "pending"]
        }
      }
    },
    {
      "name": "Search Todos",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/todos/search?title=documentation",
          "host": ["{{base_url}}"],
          "path": ["api", "todos", "search"],
          "query": [
            {
              "key": "title",
              "value": "documentation"
            }
          ]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:8080"
    }
  ]
}
```

3. **Click Import** and select the JSON

---

## Postman Tips & Tricks

### Use Environment Variables
- Define `base_url = http://localhost:8080` in your environment
- Use `{{base_url}}` in all requests for easier switching between environments
- Switch between Local, Dev, Prod environments with one click

### Testing Workflow
1. **Start** with `GET /api/todos` to see existing todos
2. **Create** a new todo with `POST /api/todos`
3. **Get** the created todo by ID
4. **Update** the todo with `PUT /api/todos/{id}`
5. **Verify** with `GET /api/todos/{id}`
6. **Delete** with `DELETE /api/todos/{id}`
7. **Confirm** deletion with `GET /api/todos/{id}` (should return 404)

### Response Validation
- Check the returned HTTP status code
- Verify `id` in response (auto-generated for POST)
- Confirm `createdAt` and `updatedAt` timestamps
- For updates, `updatedAt` should be newer than `createdAt`

### Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Connection refused` | Server not running | Run `mvn spring-boot:run` |
| `404 Not Found` | Todo ID doesn't exist | Verify ID exists with GET /api/todos |
| `400 Bad Request` | Missing/invalid data | Check JSON body format and required fields |
| `500 Internal Server Error` | Database error | Verify PostgreSQL is running and connected |

---

## Project Structure

```
src/
├── main/
│   ├── java/com/todolist/
│   │   ├── TodoListApiApplication.java    # Main application entry point
│   │   ├── controller/
│   │   │   └── TodoController.java        # REST API endpoints
│   │   ├── service/
│   │   │   └── TodoService.java           # Business logic & validation
│   │   ├── repository/
│   │   │   └── TodoRepository.java        # Database queries
│   │   ├── entity/
│   │   │   └── TodoEntity.java            # JPA entity with db mapping
│   │   └── dto/
│   │       └── TodoDTO.java               # Data transfer object
│   └── resources/
│       └── application.properties         # Spring Boot configuration
└── test/
    └── java/
```

---

## Technologies Used

### Core Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| Java | 17+ | Programming language |
| Spring Boot | 3.2.0 | Web framework & application runtime |
| Maven | 3.6+ | Build tool & dependency management |
| PostgreSQL | 12+ | Relational database |

### Spring Boot Dependencies

| Dependency | Version | Purpose |
|-----------|---------|---------|
| Spring Boot Starter Web | 3.2.0 | REST API & MVC support |
| Spring Data JPA | 3.2.0 | Database ORM & query abstraction |
| Spring Boot Starter Validation | 3.2.0 | Input validation framework |
| Spring Boot DevTools | 3.2.0 | Hot reload during development |
| Spring Boot Starter Test | 3.2.0 | Unit testing framework |

### Database & ORM

| Library | Version | Purpose |
|-----------|---------|---------|
| Hibernate ORM | 6.3.1+ | Object-Relational Mapping |
| Jakarta Persistence (JPA) | 3.1+ | Java Persistence standard |
| PostgreSQL JDBC Driver | Latest | Database connectivity |

### Utilities & Tools

| Library | Version | Purpose |
|-----------|---------|---------|
| Lombok | Latest | Reduce boilerplate code |
| Python (seed script) | 3.8+ | Database seeding utility |
| psycopg2-binary | 2.9.9 | Python PostgreSQL adapter |

### API & Web Standards

| Technology | Purpose |
|-----------|---------|
| REST API | API architectural style |
| JSON | Data format |
| HTTP | Protocol |
| CORS | Cross-Origin Resource Sharing |

---

## Architecture Stack

**Backend Stack:**
- Spring Boot 3.2.0 (Embedded Tomcat server)
- Spring Data JPA + Hibernate ORM
- PostgreSQL 12+

**Data Flow:**
Request → Controller → Service → Repository → Database

**Package Structure:**
- `controller` - REST endpoints
- `service` - Business logic
- `repository` - Data access layer
- `entity` - Database models
- `dto` - Data transfer objects

---

## Response Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Successful request |
| 201 | Created - Resource successfully created |
| 204 | No Content - Successful deletion |
| 400 | Bad Request - Invalid input |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

---

## Troubleshooting

### Database Connection Error
- ✅ Ensure PostgreSQL is running
- ✅ Verify `todo_db` database exists in pgAdmin 4
- ✅ Check credentials in `application.properties`

### Port 8080 Already in Use
```bash
# Change port in application.properties
server.port=8081
```

### Tables Not Created
- ✅ Application automatically creates tables on first run
- ✅ Check database with: `psql -U postgres -d todo_db -c "\dt"`

---

## Example Workflow

1. Start the application: `mvn spring-boot:run`
2. Create a todo: `POST /api/todos`
3. View all todos: `GET /api/todos`
4. Update a todo: `PUT /api/todos/1`
5. Mark as completed: `PUT /api/todos/1` with `completed: true`
6. Filter completed: `GET /api/todos/filter/completed`
7. Delete complete: `DELETE /api/todos/1`

---

## App

![App](https://github.com/rakheshkrishna2005/Taskify/blob/main/public/app.png)
