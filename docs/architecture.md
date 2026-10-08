# System Architecture

## 1. Architecture Overview

This project follows a simple client-server architecture designed for accessibility, maintainability, and future scalability.

The frontend is built using React and Vite. It provides the user interface and handles accessible user interactions.

The backend is built using Node.js and Express. It exposes REST API endpoints and separates request handling from application services.

### High-Level Architecture

```text
                    User
                     |
                     v
          +---------------------+
          |   React Client      |
          |     + Vite          |
          +----------+----------+
                     |
                HTTP / REST
                     |
                     v
          +---------------------+
          |   Express Server    |
          +----------+----------+
                     |
                     v
          +---------------------+
          |   Route Layer       |
          +----------+----------+
                     |
                     v
          +---------------------+
          |  Controller Layer   |
          +----------+----------+
                     |
                     v
          +---------------------+
          | Service/Data Layer  |
          +---------------------+
```

## 2. Architecture Goals

The architecture is designed around the following goals:

- **Accessibility:** UI components should support keyboard navigation, visible focus, semantic HTML, and screen-reader-friendly labels.
- **Separation of concerns:** Client, server, controllers, and services should have clear responsibilities.
- **Maintainability:** Features should be organized into predictable folders.
- **Testability:** Client and server code should be independently testable.
- **Scalability:** The current structure should allow additional APIs and features to be added later.
- **Simplicity:** Avoid unnecessary complexity for the current project scope.

## 3. Repository Structure

```text
accessibility-baseline-audit/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.test.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── test/
│   └── package.json
│
├── docs/
│   ├── accessibility-audit.md
│   ├── architecture.md
│   ├── keyboard-test.md
│   └── screenshots/
│
├── tests/
│   └── README.md
│
├── .gitignore
├── package.json
└── README.md
```

## 4. Client Architecture

The client application is responsible for the presentation layer and user interaction.

### Main Responsibilities

- Render the user interface.
- Provide accessible form controls.
- Handle keyboard interaction.
- Send API requests to the server.
- Display API responses.
- Provide visible focus indicators.
- Maintain semantic HTML structure.

### Client Flow

```text
User Interaction
       |
       v
React Component
       |
       v
Search Form
       |
       v
HTTP Request
       |
       v
Express API
       |
       v
JSON Response
       |
       v
Accessible Result List
```

The client should not directly contain server-side business logic.

## 5. Server Architecture

The server uses Express and follows a layered structure.

### Route Layer

Routes define the available API endpoints and forward requests to the appropriate controllers.

Example:

```text
GET /api/services
GET /api/health
```

### Controller Layer

Controllers handle HTTP request and response logic.

Responsibilities include:

- Reading query parameters.
- Calling the appropriate service.
- Returning JSON responses.
- Handling request-level errors.

### Service Layer

The service layer contains application logic and data access responsibilities.

Keeping this logic outside the routes makes the application easier to test and extend.

### Server Flow

```text
HTTP Request
     |
     v
Route
     |
     v
Controller
     |
     v
Service
     |
     v
Data
     |
     v
Controller
     |
     v
JSON Response
```

## 6. API Architecture

The current prototype exposes a small REST API.

### Health Endpoint

```text
GET /api/health
```

#### Purpose

- Verify that the backend server is running.
- Provide a simple endpoint for health checks.

### Services Endpoint

```text
GET /api/services?query=
```

#### Purpose

- Search available service data.
- Return matching records as JSON.
- Provide data to the React client.

### Example Request

```text
GET /api/services?query=aadhaar
```

### Example Response

```json
{
  "results": [
    {
      "name": "Aadhaar Services",
      "description": "Information about Aadhaar related services."
    }
  ]
}
```

## 7. Accessibility Architecture

Accessibility is treated as a core part of the frontend architecture rather than as a separate feature.

### Semantic Structure

The interface uses semantic HTML elements such as:

```html
<header>
  <nav>
    <main>
      <section>
        <form>
          <footer></footer>
        </form>
      </section>
    </main>
  </nav>
</header>
```

This provides meaningful structure for assistive technologies.

### Keyboard Accessibility

The interface supports:

- Keyboard navigation using `Tab`.
- Visible focus indicators.
- Logical focus order.
- Keyboard-accessible controls.
- Skip navigation functionality.

### Form Accessibility

Form controls should have:

- Associated labels.
- Clear instructions.
- Meaningful accessible names.
- Appropriate feedback for users.

### Dynamic Content

Dynamic search results use accessible status communication so that changes can be communicated to assistive technology users.

Example:

```html
<div aria-live="polite">Search results</div>
```

### Focus Visibility

Interactive elements provide a visible focus state.

Example:

```css
:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}
```

## 8. Accessibility Remediation Architecture

The Lighthouse audit identified several areas that should be addressed in the real target website.

The main remediation areas are:

1. Accessible names for buttons.
2. Alternative text for meaningful images.
3. Appropriate touch target size and spacing.
4. Consistent purpose for identical links.
5. Logical heading hierarchy.

These improvements should be implemented at the component level so that the same accessibility patterns can be reused throughout the application.

### Recommended Component Approach

```text
AccessibleButton
AccessibleImage
AccessibleLink
HeadingStructure
AccessibleFormControl
```

Reusable accessible components can reduce repeated accessibility errors.

## 9. Testing Architecture

Testing is divided into multiple levels.

### Unit Testing

Unit tests verify individual client and server functions.

Example:

```text
client/src/App.test.jsx
```

### API Testing

Backend tests should verify:

- API response status.
- Response structure.
- Query behaviour.
- Error handling.

### Accessibility Testing

Accessibility testing should include:

- Lighthouse.
- Keyboard-only navigation.
- Visible focus verification.
- Screen reader testing where available.
- Responsive and zoom testing.

### Manual Keyboard Test

The audit specifically checks:

```text
Tab Navigation
      |
      v
Visible Focus
      |
      v
Logical Focus Order
      |
      v
Keyboard Menu Interaction
      |
      v
Keyboard Trap Check
```

## 10. Development Workflow

The project separates development responsibilities between the client and server.

### Client

```text
React + Vite
```

The client runs independently during development.

### Server

```text
Node.js + Express
```

The server provides the REST API.

### Combined Development

The root project uses `concurrently` so the client and server can be started together.

```bash
npm run dev
```

The application therefore follows:

```text
Developer
   |
   +---- Client
   |
   +---- Server
   |
   +---- Tests
   |
   +---- Documentation
```

## 11. Architecture Decisions

### React + Vite

React provides a component-based UI architecture while Vite provides a fast development environment.

### Express

Express provides a lightweight REST API layer and keeps the backend simple for the current project.

### Layered Backend

Separating routes, controllers, and services makes the backend easier to maintain.

### Monorepo

Client, server, documentation, and tests are maintained in a single repository.

This makes the project easier to understand and allows the complete architecture to be reviewed from one location.

### Accessibility as a Design Requirement

Accessibility requirements are considered during component and architecture design instead of being added only after development.

## 12. Future Improvements

The current architecture can be extended with:

- Persistent database storage.
- Authentication and authorization.
- Centralized error handling.
- API validation.
- Automated accessibility testing.
- End-to-end testing.
- CI/CD accessibility checks.
- Reusable accessible component library.
- Production monitoring and logging.

A future production architecture could be:

```text
React Client
     |
     v
API Layer
     |
     v
Authentication
     |
     v
Controllers
     |
     v
Services
     |
     v
Database
```

## 13. Summary

The project uses a modular client-server architecture with React on the frontend and Express on the backend.

The architecture separates presentation, HTTP routing, controller logic, and service/data responsibilities.

Accessibility is included as an architectural concern through semantic HTML, keyboard navigation, visible focus, accessible forms, dynamic content announcements, and reusable accessible components.

This structure provides a simple foundation that can be extended into a larger production application while keeping the codebase maintainable and testable.
