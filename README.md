# Accessibility Baseline & Repository Architecture Audit

## Project Overview

This project documents an accessibility baseline audit and repository architecture for a modern web application.

The project was created to:

- Audit a real public service website.
- Identify accessibility issues using Lighthouse.
- Perform manual keyboard accessibility testing.
- Document accessibility findings and remediation priorities.
- Define a maintainable client-server architecture.
- Provide a setup-ready monorepo structure.

---

## Audit Target

**Website:** UIDAI — Unique Identification Authority of India

**URL:** https://www.uidai.gov.in/

### Audit Tools

- Google Chrome
- Lighthouse
- Manual keyboard-only testing

### Accessibility Score

**85**

The Lighthouse audit identified several accessibility-related findings that were documented with evidence and remediation priorities.

---

## Accessibility Findings

The audit identified the following five issues:

| # | Finding | Priority |
|---|---|---|
| 1 | Buttons do not have an accessible name | High |
| 2 | Image elements do not have `alt` attributes | High |
| 3 | Touch targets do not have sufficient size or spacing | Medium |
| 4 | Identical links have the same purpose | Medium |
| 5 | Heading elements are not in a sequential-descending order | Medium |

Detailed evidence is available in:

`docs/accessibility-audit.md`

---

## Keyboard Accessibility

A manual keyboard-only test was also performed.

The following areas were checked:

- Tab navigation
- Visible focus
- Focus order
- Keyboard menu interaction
- Keyboard trap

No critical keyboard navigation blocker was identified during the test.

Detailed results are available in:

`docs/keyboard-test.md`

---

## Repository Architecture

The project follows a monorepo structure.

```text
accessibility-baseline-audit/
│
├── client/
│   ├── src/
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

---

## Technology Stack

### Client

- React
- Vite
- JavaScript
- CSS

### Server

- Node.js
- Express

### Testing and Audit

- Lighthouse
- Manual keyboard testing
- Client unit tests
- Server/API tests

---

## Application Architecture

The application follows a layered client-server architecture:

```text
User
  |
  v
React Client
  |
  | HTTP / REST
  v
Express Server
  |
  v
Routes
  |
  v
Controllers
  |
  v
Services / Data
  |
  v
JSON Response
  |
  v
React Client
```

This separation keeps presentation, API handling, and application logic independent.

---

## Accessibility Architecture

Accessibility is treated as part of the application architecture.

Important accessibility practices include:

- Semantic HTML
- Keyboard accessibility
- Visible focus indicators
- Accessible form labels
- Accessible names for controls
- Alternative text for meaningful images
- Logical heading structure
- Appropriate touch target sizing
- Accessible dynamic content updates

---

## Development Setup

### 1. Install Dependencies

From the project root:

```bash
npm install
```

Then install client dependencies:

```bash
npm install --prefix client
```

Install server dependencies:

```bash
npm install --prefix server
```

---

## Running the Project

Start both client and server:

```bash
npm run dev
```

The root project uses `concurrently` to run both applications during development.

---

## Testing

Run the available tests with:

```bash
npm test
```

Client and server tests are separated so that each layer can be tested independently.

---

## Documentation

Important project documentation:

| Document | Purpose |
|---|---|
| `docs/accessibility-audit.md` | Detailed Lighthouse accessibility audit |
| `docs/keyboard-test.md` | Manual keyboard accessibility testing |
| `docs/architecture.md` | System and repository architecture |
| `docs/screenshots/` | Audit evidence screenshots |
| `tests/README.md` | Testing documentation |

---

## Audit Evidence

Screenshots supporting the audit findings are stored in:

```text
docs/screenshots/
```

Expected evidence includes:

```text
lighthouse-overview.png
issue-1-buttons.png
issue-2-images.png
issue-3-touch-targets.png
issue-4-identical-links.png
issue-5-heading-order.png
```

---

## Remediation Priority

The recommended remediation order is:

### High Priority

1. Add accessible names to buttons.
2. Add appropriate alternative text to meaningful images.

### Medium Priority

3. Improve touch target size and spacing.
4. Review identical links and ensure their purpose is clear.
5. Correct heading hierarchy.

These changes should be implemented using reusable accessible components where possible.

---

## Project Goals

The project demonstrates the ability to:

- Perform a practical accessibility audit.
- Use Lighthouse to identify accessibility problems.
- Conduct manual keyboard testing.
- Document evidence and remediation priorities.
- Design a scalable repository architecture.
- Separate frontend and backend responsibilities.
- Include accessibility in application architecture.

---

## Future Improvements

Future versions could include:

- Automated accessibility testing
- End-to-end testing
- Screen reader testing
- CI/CD accessibility checks
- Persistent database storage
- Authentication and authorization
- Centralized error handling
- Production monitoring and logging

---

## Conclusion

This repository provides an accessibility baseline, documented evidence, and a maintainable client-server architecture.

The project combines accessibility auditing with practical software architecture so that identified issues can be translated into concrete development improvements.