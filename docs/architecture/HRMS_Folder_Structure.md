# HRMS Project Folder Structure

## 1. Project Overview

This document defines the recommended folder and file structure for the complete HRMS application.

### Technology Stack

```text
Frontend
├── React.js
├── Vite
├── Tailwind CSS
├── Motion
└── Lucide React

Backend
├── Node.js
├── Express.js
├── REST API
├── JWT Authentication
├── RBAC / Permissions
├── Zod Validation
└── bcrypt

Database
├── PostgreSQL
└── Prisma ORM

Development
├── Git
└── GitHub
```

---

# 2. Complete Project Structure

```text
hrms/
│
├── frontend/
│   │
│   ├── public/
│   │   ├── logo/
│   │   └── images/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── fonts/
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── ui/
│   │   │   ├── forms/
│   │   │   └── tables/
│   │   │
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── ManagerLayout.jsx
│   │   │   └── EmployeeLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   ├── admin/
│   │   │   ├── manager/
│   │   │   └── employee/
│   │   │
│   │   ├── features/
│   │   │   ├── employees/
│   │   │   ├── attendance/
│   │   │   ├── leave/
│   │   │   ├── payroll/
│   │   │   ├── tasks/
│   │   │   ├── wallet/
│   │   │   ├── recruitment/
│   │   │   ├── performance/
│   │   │   ├── documents/
│   │   │   ├── wfh/
│   │   │   ├── announcements/
│   │   │   └── notifications/
│   │   │
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .env.example
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/
│   │
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.js
│   │
│   ├── src/
│   │   │
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── services/
│   │   │
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── roles/
│   │   │   ├── companies/
│   │   │   ├── branches/
│   │   │   ├── departments/
│   │   │   ├── designations/
│   │   │   ├── employees/
│   │   │   ├── attendance/
│   │   │   ├── leave/
│   │   │   ├── payroll/
│   │   │   ├── projects/
│   │   │   ├── tasks/
│   │   │   ├── wallet/
│   │   │   ├── expenses/
│   │   │   ├── recruitment/
│   │   │   ├── performance/
│   │   │   ├── wfh/
│   │   │   ├── documents/
│   │   │   ├── holidays/
│   │   │   ├── announcements/
│   │   │   ├── notifications/
│   │   │   └── audit/
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── uploads/
│   │   ├── employees/
│   │   ├── documents/
│   │   ├── payslips/
│   │   ├── receipts/
│   │   ├── tasks/
│   │   └── recruitment/
│   │
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── architecture/
│   │   ├── HRMS_Architecture.md
│   │   ├── HRMS_Workflow.md
│   │   └── HRMS_ER_Diagram.md
│   │
│   ├── database/
│   │   └── HRMS_Database_Structure.md
│   │
│   └── api/
│       └── API_Documentation.md
│
├── .gitignore
├── README.md
└── package.json
```

---

# 3. Frontend Structure

The frontend uses **feature-based organization**. This keeps each HRMS module's UI, pages, hooks, and API logic organized together.

## 3.1 `frontend/public/`

Public assets that do not need to be imported through React.

```text
public/
├── logo/
└── images/
```

Use for:

- Company logo
- Static public images
- Public branding assets

---

## 3.2 `frontend/src/assets/`

Application assets imported by React.

```text
assets/
├── images/
├── icons/
└── fonts/
```

---

# 4. Frontend Components

## `components/common/`

Reusable application-wide components.

Examples:

```text
LoadingSpinner.jsx
EmptyState.jsx
ErrorMessage.jsx
ConfirmDialog.jsx
StatusBadge.jsx
Avatar.jsx
```

## `components/layout/`

Shared layout components.

Examples:

```text
Sidebar.jsx
Topbar.jsx
Navbar.jsx
Breadcrumb.jsx
PageHeader.jsx
MobileNavigation.jsx
```

## `components/ui/`

Generic UI components.

Examples:

```text
Button.jsx
Input.jsx
Select.jsx
Modal.jsx
Dropdown.jsx
Card.jsx
Tabs.jsx
Badge.jsx
Tooltip.jsx
```

## `components/forms/`

Reusable form components.

Examples:

```text
FormInput.jsx
FormSelect.jsx
FormDatePicker.jsx
FormFileUpload.jsx
FormTextarea.jsx
```

## `components/tables/`

Reusable data-table components.

Examples:

```text
DataTable.jsx
TablePagination.jsx
TableFilters.jsx
TableSearch.jsx
```

---

# 5. Frontend Layouts

There are three primary application portals.

```text
layouts/
├── AdminLayout.jsx
├── ManagerLayout.jsx
└── EmployeeLayout.jsx
```

### Admin / HR Portal

Used by:

```text
SUPER_ADMIN
HR_ADMIN
HR_EXECUTIVE
```

### Manager Portal

Used by:

```text
MANAGER
```

### Employee Portal

Used by:

```text
EMPLOYEE
```

---

# 6. Frontend Pages

```text
pages/
├── auth/
├── admin/
├── manager/
└── employee/
```

The `pages` folder contains route-level pages, while reusable module functionality belongs in `features`.

Example:

```text
pages/admin/
├── Dashboard.jsx
├── Employees.jsx
├── Attendance.jsx
├── Leave.jsx
├── Payroll.jsx
└── Reports.jsx
```

---

# 7. Frontend Features

Each major HRMS module has its own feature folder.

## `features/employees/`

```text
employees/
├── components/
│   ├── EmployeeCard.jsx
│   ├── EmployeeTable.jsx
│   ├── EmployeeForm.jsx
│   ├── EmployeeProfile.jsx
│   └── EmployeeDocuments.jsx
│
├── pages/
│   ├── Employees.jsx
│   ├── EmployeeDetails.jsx
│   └── EditEmployee.jsx
│
├── services/
│   └── employeeService.js
│
├── hooks/
│   └── useEmployees.js
│
└── employee.constants.js
```

## `features/attendance/`

```text
attendance/
├── components/
├── pages/
├── services/
├── hooks/
└── attendance.constants.js
```

Handles:

- Check-in
- Check-out
- Attendance history
- Attendance corrections
- Overtime
- Overtime alerts
- Attendance reports

## `features/leave/`

Handles:

- Leave types
- Leave application
- Leave approval
- Leave balance
- Leave history

## `features/payroll/`

Handles:

- Salary
- Payroll processing
- Additions
- Deductions
- Tax deduction
- Payslips
- Payroll reports

## `features/tasks/`

Handles:

- Projects
- Tasks
- Task assignment
- Progress updates
- Comments
- Time logs
- Attachments
- Task monitoring

## `features/wallet/`

Handles:

- Wallet balance
- Fund allocation
- Wallet transactions
- Expense requests
- Expense approvals
- Receipts

## Other feature folders

```text
recruitment/
performance/
documents/
wfh/
announcements/
notifications/
```

---

# 8. Frontend Global Folders

## `contexts/`

Global React state.

Examples:

```text
AuthContext.jsx
UserContext.jsx
NotificationContext.jsx
```

## `hooks/`

Global reusable hooks.

Examples:

```text
useAuth.js
useDebounce.js
useModal.js
usePagination.js
```

## `services/`

Shared API configuration.

Example:

```text
api.js
```

This can contain the Axios instance and authentication interceptors.

## `utils/`

Generic utility functions.

Examples:

```text
dateUtils.js
currencyUtils.js
validationUtils.js
formatUtils.js
```

## `constants/`

Global constants.

Examples:

```text
roles.js
permissions.js
status.js
routes.js
```

## `routes/`

React Router configuration.

Examples:

```text
AppRoutes.jsx
ProtectedRoute.jsx
RoleRoute.jsx
```

---

# 9. Backend Structure

The backend uses **module-based architecture**.

```text
backend/src/
├── config/
├── middlewares/
├── utils/
├── validators/
├── services/
├── modules/
├── app.js
└── server.js
```

---

# 10. Backend Core Folders

## `config/`

Application configuration.

Examples:

```text
database.js
env.js
jwt.js
```

## `middlewares/`

Express middleware.

Examples:

```text
auth.middleware.js
role.middleware.js
permission.middleware.js
error.middleware.js
upload.middleware.js
```

## `utils/`

Backend utility functions.

Examples:

```text
ApiError.js
ApiResponse.js
pagination.js
logger.js
```

## `validators/`

Global validation helpers.

Module-specific validation should remain inside its module.

## `services/`

Shared backend services.

Examples:

```text
email.service.js
notification.service.js
file.service.js
```

---

# 11. Backend Modules

Every major business domain gets its own module.

```text
modules/
├── auth/
├── users/
├── roles/
├── companies/
├── branches/
├── departments/
├── designations/
├── employees/
├── attendance/
├── leave/
├── payroll/
├── projects/
├── tasks/
├── wallet/
├── expenses/
├── recruitment/
├── performance/
├── wfh/
├── documents/
├── holidays/
├── announcements/
├── notifications/
└── audit/
```

---

# 12. Standard Backend Module Structure

Each module follows:

```text
module/
├── module.controller.js
├── module.service.js
├── module.repository.js
├── module.routes.js
├── module.validator.js
└── module.constants.js
```

Example:

```text
modules/employees/
├── employee.controller.js
├── employee.service.js
├── employee.repository.js
├── employee.routes.js
├── employee.validator.js
└── employee.constants.js
```

### Controller

Handles:

```text
HTTP request
HTTP response
```

### Service

Contains business logic.

### Repository

Handles database operations through Prisma.

### Routes

Defines API endpoints.

### Validator

Validates request data using Zod.

### Constants

Stores module-specific constants and statuses.

---

# 13. Example Employee Backend Flow

```text
HTTP Request
     ↓
employee.routes.js
     ↓
Authentication Middleware
     ↓
Permission Middleware
     ↓
employee.validator.js
     ↓
employee.controller.js
     ↓
employee.service.js
     ↓
employee.repository.js
     ↓
Prisma
     ↓
PostgreSQL
```

---

# 14. Example Attendance Backend Structure

```text
modules/attendance/
├── attendance.controller.js
├── attendance.service.js
├── attendance.repository.js
├── attendance.routes.js
├── attendance.validator.js
├── attendance.constants.js
└── overtime.service.js
```

Attendance business logic includes:

```text
Check-in
Check-out
Attendance calculation
Working hours
Overtime calculation
Overtime alerts
Attendance adjustment
Attendance reports
```

---

# 15. Example Payroll Backend Structure

```text
modules/payroll/
├── payroll.controller.js
├── payroll.service.js
├── payroll.repository.js
├── payroll.routes.js
├── payroll.validator.js
├── payroll.constants.js
├── salary.service.js
└── payslip.service.js
```

Payroll handles:

```text
Salary Structure
       ↓
Gross Salary
       ↓
Additions
       ↓
Deductions
       ↓
Tax
       ↓
Net Salary
       ↓
Payslip
```

---

# 16. Example Wallet Backend Structure

```text
modules/wallet/
├── wallet.controller.js
├── wallet.service.js
├── wallet.repository.js
├── wallet.routes.js
├── wallet.validator.js
└── wallet.constants.js
```

```text
modules/expenses/
├── expense.controller.js
├── expense.service.js
├── expense.repository.js
├── expense.routes.js
├── expense.validator.js
└── expense.constants.js
```

Wallet flow:

```text
Superior
   ↓
Fund Allocation
   ↓
Wallet CREDIT
   ↓
Employee Expense
   ↓
Expense Request
   ↓
Approval
   ↓
Wallet DEBIT
   ↓
Transaction Ledger
```

---

# 17. Prisma Structure

```text
backend/prisma/
├── schema.prisma
├── migrations/
└── seed.js
```

## `schema.prisma`

Contains the database models and relations.

## `migrations/`

Contains PostgreSQL migration history generated by Prisma.

## `seed.js`

Creates initial data such as:

```text
Company
Branches
Departments
Designations
Roles
Permissions
Admin User
Leave Types
Expense Categories
```

---

# 18. Upload Structure

Uploaded files are organized by business purpose.

```text
backend/uploads/
├── employees/
├── documents/
├── payslips/
├── receipts/
├── tasks/
└── recruitment/
```

### `employees/`

Employee profile images.

### `documents/`

Employee documents.

### `payslips/`

Generated payslips.

### `receipts/`

Expense receipts.

### `tasks/`

Task attachments.

### `recruitment/`

Candidate resumes and recruitment documents.

---

# 19. Documentation Structure

```text
docs/
├── architecture/
│   ├── HRMS_Architecture.md
│   ├── HRMS_Workflow.md
│   └── HRMS_ER_Diagram.md
│
├── database/
│   └── HRMS_Database_Structure.md
│
└── api/
    └── API_Documentation.md
```

Documentation should be maintained alongside development.

---

# 20. Root Files

## `.gitignore`

Must exclude:

```text
node_modules/
.env
uploads/
dist/
build/
*.log
```

## `README.md`

Contains:

- Project overview
- Features
- Technology stack
- Installation
- Environment setup
- Database setup
- Development commands
- Deployment information

## Root `package.json`

Can be used for workspace-level commands such as:

```text
npm run dev
npm run frontend
npm run backend
npm run install:all
```

---

# 21. Business Module Mapping

```text
AUTHENTICATION
├── auth
├── users
└── roles

ORGANIZATION
├── companies
├── branches
├── departments
├── designations
└── employees

HR OPERATIONS
├── attendance
├── leave
├── payroll
├── documents
└── wfh

WORK MANAGEMENT
├── projects
└── tasks

FINANCE
├── wallet
└── expenses

TALENT MANAGEMENT
├── recruitment
└── performance

SYSTEM
├── holidays
├── announcements
├── notifications
└── audit
```

---

# 22. Frontend ↔ Backend Mapping

Each frontend feature communicates with its corresponding backend module.

```text
FRONTEND                         BACKEND

features/employees       →       modules/employees
features/attendance      →       modules/attendance
features/leave           →       modules/leave
features/payroll         →       modules/payroll
features/tasks           →       modules/tasks
features/wallet          →       modules/wallet
features/recruitment     →       modules/recruitment
features/performance     →       modules/performance
features/documents       →       modules/documents
features/wfh             →       modules/wfh
features/notifications   →       modules/notifications
```

---

# 23. RBAC Structure

The application has three logical portals.

```text
ADMIN / HR PORTAL
├── SUPER_ADMIN
├── HR_ADMIN
└── HR_EXECUTIVE

MANAGER PORTAL
└── MANAGER

EMPLOYEE PORTAL
└── EMPLOYEE
```

Access should be controlled using:

```text
Authentication
      ↓
User
      ↓
Role
      ↓
Permission
      ↓
Module
      ↓
Action
```

Example:

```text
MANAGER
   ↓
task.assign
   ↓
Task Assignment
```

---

# 24. Important Design Principles

## Feature-Based Frontend

Keep module-specific UI code together.

```text
employees/
attendance/
leave/
payroll/
tasks/
wallet/
```

## Module-Based Backend

Keep business logic separated by domain.

```text
employees/
attendance/
leave/
payroll/
tasks/
wallet/
```

## Separation of Responsibilities

```text
Controller
   ↓
Service
   ↓
Repository
   ↓
Prisma
   ↓
PostgreSQL
```

Controllers should not contain complex database/business logic.

## Shared Components

Only genuinely reusable UI should go into:

```text
components/
```

Module-specific components stay inside their feature.

## Security

Never commit:

```text
.env
passwords
JWT secrets
database credentials
uploaded private files
```

---

# 25. Final Recommended Structure

```text
hrms/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── features/
│   │   ├── contexts/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── migrations/
│   │   └── seed.js
│   ├── src/
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── validators/
│   │   ├── services/
│   │   ├── modules/
│   │   ├── app.js
│   │   └── server.js
│   ├── uploads/
│   ├── .env
│   ├── .env.example
│   └── package.json
│
├── docs/
│   ├── architecture/
│   ├── database/
│   └── api/
│
├── .gitignore
├── README.md
└── package.json
```

This structure is the baseline for implementing the HRMS. It keeps the frontend, backend, database, uploaded files, and documentation separated while keeping each business module independently maintainable.
