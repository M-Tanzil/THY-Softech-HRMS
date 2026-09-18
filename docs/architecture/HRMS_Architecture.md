
# 3. High-Level Business Model

The HRMS business model describes how the organization, its users, employees, work operations, HR operations, and company-funded management expenses interact.

```text
                         HRMS
                          │
                          ▼
              ┌──────────────────────┐
              │ Authentication &     │
              │ Security             │
              └──────────┬───────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │ Role & Access Layer  │
              └──────────┬───────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     ADMIN / HR       MANAGER        EMPLOYEE
       PORTAL          PORTAL          PORTAL
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                BUSINESS MODULES
                         │
       ┌─────────────────┼─────────────────┐
       │                 │                 │
       ▼                 ▼                 ▼
   HR OPERATIONS    WORK OPERATIONS    FINANCIAL
       │                 │             OPERATIONS
       ▼                 ▼                 ▼
 Employee             Tasks             Wallet
 Attendance            Projects         Fund Allocation
 Leave                 Progress         Expenses
 Payroll               Time Logs        Approvals
 Recruitment           Comments         Ledger
 Performance
 Documents
       │                 │                 │
       └─────────────────┼─────────────────┘
                         ▼
                REPORTS & ANALYTICS
                         │
                         ▼
                    AUDIT LOGS
```

## 3.1 Business Model Explanation

The **Company** is the root of the organization. The company can have multiple branches. Each branch can contain departments, managers, and employees.

The three portals represent the main business responsibilities:

### Admin / HR Portal

Admin and HR manage the organization's people and HR processes:

```text
Employees
   ↓
Attendance
   ↓
Leave
   ↓
Payroll
   ↓
Recruitment
   ↓
Performance
   ↓
Documents
   ↓
Reports
```

### Manager Portal

Managers manage their teams and operational work:

```text
Team
  ↓
Tasks
  ↓
Assignments
  ↓
Progress
  ↓
Attendance
  ↓
Leave / WFH
  ↓
Performance
  ↓
Expense Approvals
```

### Employee Portal

Employees perform their day-to-day activities through self-service:

```text
Attendance
   ↓
Leave
   ↓
Tasks
   ↓
Progress Updates
   ↓
Payroll
   ↓
Wallet
   ↓
Expenses
   ↓
Documents
   ↓
WFH
```

## 3.2 Organization Business Structure

```text
COMPANY
   │
   ├── BRANCH
   │      │
   │      ├── DEPARTMENT
   │      │       │
   │      │       └── EMPLOYEES
   │      │
   │      └── MANAGERS
   │
   └── BRANCH
          │
          └── DEPARTMENTS
                  │
                  └── EMPLOYEES
```

This structure allows the HRMS to operate as a multi-branch system and supports branch-level access, management, approvals, and reporting.

## 3.3 HR Operations

HR operations manage the employee lifecycle and regular HR activities.

```text
Employee
   │
   ├── Profile
   ├── Attendance
   ├── Leave
   ├── Payroll
   ├── Documents
   ├── Performance
   └── WFH
```

Recruitment extends the employee lifecycle:

```text
Job Posting
    ↓
Candidate
    ↓
Application
    ↓
Screening
    ↓
Interview
    ↓
Offer
    ↓
Hiring
    ↓
Employee
```

## 3.4 Work Operations

Work operations allow managers to assign and monitor actual business work.

```text
MANAGER
   ↓
Create Project
   ↓
Create Task
   ↓
Assign Employee(s)
   ↓
Employee Works
   ↓
Progress Updates
   ↓
Comments / Time Logs
   ↓
Completed
   ↓
Manager Review
   ↓
Closed
```

This gives managers visibility into what work is assigned, who is working on it, how much progress has been made, and which tasks are blocked or overdue.

## 3.5 Financial / Management Expense Operations

The HRMS also contains a company-funded wallet system for authorized management and business spending.

The business relationship is:

```text
SUPERIOR / MANAGER
       │
       │ Allocate company funds
       ▼
EMPLOYEE WALLET
       │
       │ Business / Management spending
       ▼
EXPENSE REQUEST
       │
       ▼
APPROVAL
   ┌───┴───┐
   ▼       ▼
APPROVE  REJECT
   │
   ▼
WALLET LEDGER
   │
   ▼
UPDATED BALANCE
```

The wallet is an internal company spending balance. It is not a personal bank account or cryptocurrency wallet.

### Fund Allocation

An authorized superior can provide funds to a subordinate:

```text
Superior / Authorized Manager
          ↓
Select Employee
          ↓
Select Wallet
          ↓
Enter Amount
          ↓
Enter Purpose
          ↓
Permission Check
          ↓
Policy Validation
          ↓
Fund Allocation
          ↓
Wallet CREDIT
          ↓
Employee Notification
          ↓
Audit Log
```

### Expense

The employee can use the allocated funds for approved company-related expenses:

```text
Employee
   ↓
Create Expense
   ↓
Category
   ↓
Amount
   ↓
Description
   ↓
Receipt
   ↓
Wallet / Policy Validation
   ↓
Approver
   ↓
Approve / Reject
```

When approved:

```text
Approved Expense
      ↓
Wallet DEBIT
      ↓
Ledger Transaction
      ↓
Updated Balance
      ↓
Employee Notification
      ↓
Audit Log
```

## 3.6 Overall Business Model

The complete business model can therefore be represented as:

```text
                         COMPANY
                            │
                            ▼
                         BRANCHES
                            │
                            ▼
                       DEPARTMENTS
                            │
                            ▼
                         EMPLOYEES
                            │
       ┌────────────────────┼────────────────────┐
       │                    │                    │
       ▼                    ▼                    ▼
 HR OPERATIONS         WORK OPERATIONS      FINANCIAL OPS
       │                    │                    │
       ├─ Attendance        ├─ Projects          ├─ Wallet
       ├─ Leave             ├─ Tasks             ├─ Fund Allocation
       ├─ Payroll           ├─ Assignments       ├─ Expenses
       ├─ Recruitment       ├─ Progress          ├─ Approvals
       ├─ Performance       ├─ Comments          └─ Ledger
       └─ Documents         └─ Time Logs
       │                    │                    │
       └────────────────────┼────────────────────┘
                            ▼
                    REPORTS & ANALYTICS
                            │
                            ▼
                       AUDIT & CONTROL
```

### Core Business Principle

The HRMS brings together:

**People + Organization + HR Operations + Work Management + Company Expense Management + Approvals + Reporting + Audit**

into one centralized system.

The system should ensure that every sensitive operation follows:

```text
Request
   ↓
Authentication
   ↓
Role / Permission Check
   ↓
Company / Branch Scope
   ↓
Business Rule Validation
   ↓
Approval (when required)
   ↓
Database Transaction
   ↓
Audit Log
   ↓
Notification
```


# HRMS — Complete System Architecture

## 1. System Overview

The HRMS is a modular, multi-branch Human Resource Management System designed to manage employees, attendance, leave, payroll, tasks, company-funded wallets, management expenses, recruitment, performance, documents, communication, reports, and system administration.

The system supports three primary portals:

- Admin / HR Portal
- Manager Portal
- Employee Portal

The architecture is designed around role-based access control (RBAC), branch-aware data access, approval workflows, auditability, and transactional data integrity.

---

## 2. High-Level Architecture

```text
                                      ┌─────────────────────────────┐
                                      │            HRMS             │
                                      │ Human Resource Management   │
                                      │          Platform           │
                                      └──────────────┬──────────────┘
                                                     │
                                                     ▼
                                      ┌─────────────────────────────┐
                                      │      PRESENTATION LAYER     │
                                      │                             │
                                      │ Web App / Responsive UI     │
                                      │ Admin / Manager / Employee  │
                                      └──────────────┬──────────────┘
                                                     │
                                                     ▼
                                      ┌─────────────────────────────┐
                                      │   AUTHENTICATION & SECURITY  │
                                      │                             │
                                      │ Login / Logout              │
                                      │ Password / Reset Password   │
                                      │ Sessions / MFA              │
                                      │ JWT / Authorization         │
                                      └──────────────┬──────────────┘
                                                     │
                                                     ▼
                                      ┌─────────────────────────────┐
                                      │       RBAC / ACCESS LAYER   │
                                      │                             │
                                      │ Super Admin                  │
                                      │ HR Admin                     │
                                      │ HR Executive                 │
                                      │ Manager                      │
                                      │ Employee                     │
                                      └──────────────┬──────────────┘
                                                     │
                    ┌────────────────────────────────┼────────────────────────────────┐
                    │                                │                                │
                    ▼                                ▼                                ▼
          ┌──────────────────┐             ┌──────────────────┐             ┌──────────────────┐
          │   ADMIN / HR     │             │     MANAGER      │             │    EMPLOYEE      │
          │     PORTAL       │             │      PORTAL      │             │     PORTAL       │
          └────────┬─────────┘             └────────┬─────────┘             └────────┬─────────┘
                   │                                │                                │
                   └────────────────────────────────┼────────────────────────────────┘
                                                    │
                                                    ▼
                                      ┌─────────────────────────────┐
                                      │      BUSINESS MODULES       │
                                      └─────────────────────────────┘
```

---

# 4. Application Architecture

```text
┌───────────────────────────────────────────────┐
│                 FRONTEND / UI                 │
│ React / Responsive Web Application            │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│                   ROUTING                     │
│ Public Routes / Admin / Manager / Employee   │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│             AUTHENTICATION                    │
│ Login / Session / Token / Password           │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│             AUTHORIZATION / RBAC              │
│ Roles / Permissions / Branch Scope            │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│              API / CONTROLLERS                │
│ Request validation / Response handling        │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│             BUSINESS SERVICES                 │
│ HR / Attendance / Leave / Payroll / Wallet    │
│ Tasks / Recruitment / Performance / etc.      │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│            REPOSITORY / ORM LAYER             │
│ Queries / Transactions / Data Access          │
└───────────────────────┬───────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│                  DATABASE                     │
│ Relational HRMS Database                     │
└───────────────────────────────────────────────┘
```

---

# 5. Organization Architecture

The organization structure is the backbone of the HRMS.

```text
COMPANY
   │
   ├── BRANCH 1
   │     ├── Department
   │     │      ├── Designation
   │     │      │      └── Employees
   │     │      └── Employees
   │     └── Managers
   │
   ├── BRANCH 2
   │     ├── Departments
   │     └── Employees
   │
   ├── BRANCH 3
   │     ├── Departments
   │     └── Employees
   │
   └── BRANCH N
```

### Organization Entities

- Company
- Branches
- Departments
- Designations
- Shifts
- Reporting Managers
- Employee Branch Assignment
- Employee Department Assignment

### Branch-Aware Design

Every relevant operational record should be associated with a branch.

Employees should contain:

```text
employee_id
company_id
branch_id
department_id
designation_id
manager_id
```

Branch transfers should be tracked historically instead of silently replacing the employee's previous branch.

---

# 6. Authentication & Security

### Features

- Login
- Logout
- Forgot password
- Reset password
- Change password
- Session management
- Password hashing
- Role-based authorization
- Permission management
- Optional MFA
- Token/session expiration
- Account activation/deactivation

### Security Flow

```text
User Login
    ↓
Validate Credentials
    ↓
Validate Account Status
    ↓
Load Role
    ↓
Load Permissions
    ↓
Load Company / Branch Scope
    ↓
Create Session / Token
    ↓
Redirect to Authorized Portal
```

---

# 7. Role Architecture

## SUPER ADMIN

- Full system access
- Company management
- Branch management
- User management
- Role management
- Permission management
- System settings
- Audit logs

## HR ADMIN

- Employee management
- Organization management
- Attendance
- Leave
- Payroll
- Recruitment
- Performance
- Documents
- Reports
- Wallet and expense administration

## HR EXECUTIVE

- Employee operations
- Attendance operations
- Leave operations
- Document operations
- Assigned HR tasks

## MANAGER

- Team employees
- Team attendance
- Leave approvals
- WFH approvals
- Task creation and assignment
- Task monitoring
- Team performance
- Team reports
- Authorized fund allocation
- Expense approval

## EMPLOYEE

- Own profile
- Own attendance
- Leave
- Payroll / payslips
- Assigned tasks
- Task progress updates
- Wallet
- Expense requests
- Documents
- Performance
- WFH
- Holidays
- Announcements
- Notifications

---

# 8. Employee Management

### Admin / HR

- Create employee
- Edit employee
- Deactivate employee
- Search employee
- Filter by branch
- Filter by department
- Filter by designation
- Assign manager
- Assign shift
- Assign branch
- Maintain employment information
- Upload employee documents

### Employee Profile

```text
Personal Information
Employment Information
Contact Information
Branch
Department
Designation
Reporting Manager
Joining Date
Employment Status
Documents
Salary Information
```

---

# 9. Attendance Management

### Features

- Check-in
- Check-out
- Attendance status
- Late tracking
- Working hours
- Overtime
- Attendance correction
- Attendance adjustment approval
- WFH attendance
- Attendance reports

### Attendance Flow

```text
Employee Check-In
      ↓
Attendance Record
      ↓
Working Hours
      ↓
Check-Out
      ↓
Daily Attendance
      ↓
Manager / HR Review
      ↓
Reports
```

---

# 10. Leave Management

### Features

- Leave types
- Leave policies
- Leave balances
- Leave application
- Leave approval
- Leave rejection
- Leave history
- Leave reports

### Workflow

```text
Employee
   ↓
Apply Leave
   ↓
Validate Balance
   ↓
Manager / Approver
   ├── Reject
   └── Approve
          ↓
     Update Balance
          ↓
       Notify
```

---

# 11. Payroll & Payslips

### Features

- Salary structures
- Salary components
- Basic salary
- Allowances
- Bonuses
- Overtime
- Deductions
- Tax
- Gross salary
- Net salary
- Payroll history
- Payslip generation

### Payroll Flow

```text
Employee Salary Structure
          ↓
Attendance / Overtime
          ↓
Allowances / Bonuses
          ↓
Deductions / Tax
          ↓
Gross Salary
          ↓
Net Salary
          ↓
Payroll Record
          ↓
Payslip
```

---

# 12. Task & Project Management

Task management allows managers to create work, assign employees, monitor progress, and review completed work.

## Manager Capabilities

- Create project
- Create task
- Assign one or multiple employees
- Set priority
- Set start date
- Set deadline
- Monitor progress
- View employee updates
- View blockers
- Comment on tasks
- Review completed tasks
- Reopen tasks
- Monitor overdue tasks
- View team productivity reports

## Employee Capabilities

- View assigned tasks
- Start task
- Update status
- Update progress percentage
- Add progress notes
- Report blockers
- Add comments
- Record time spent
- Upload task files
- Mark task completed
- Request deadline extension
- View task history

## Task Status

```text
BACKLOG
   ↓
ASSIGNED
   ↓
IN PROGRESS
   ↓
UNDER REVIEW
   ↓
COMPLETED
   ↓
CLOSED
```

Alternative states:

```text
IN PROGRESS → BLOCKED → IN PROGRESS
IN PROGRESS → CANCELLED
UNDER REVIEW → REOPENED → IN PROGRESS
```

## Task Flow

```text
Manager Creates Task
        ↓
Assign Employee(s)
        ↓
Employee Starts Task
        ↓
Progress Updates
        ↓
Comments / Time Logs
        ↓
Completed
        ↓
Manager Review
        ├── Reopen
        └── Close
```

---

# 13. Wallet & Management Expense Management

## 12.1 Purpose

The HRMS includes a **company-funded internal wallet for employees/managers who are authorized to handle management or business expenses**.

This wallet is not a personal bank account or cryptocurrency wallet.

The purpose is to allow an authorized superior to provide funds to a subordinate for approved company-related spending.

---

## 12.2 Wallet Hierarchy

```text
COMPANY
   │
   ├── BRANCH
   │      │
   │      ├── MANAGER / SUPERIOR
   │      │        │
   │      │        └── Allocates Funds
   │      │                 │
   │      │                 ▼
   │      │          EMPLOYEE / SUBORDINATE
   │      │                 │
   │      │                 ▼
   │      │              WALLET
   │      │                 │
   │      │        ┌────────┴─────────┐
   │      │        ▼                  ▼
   │      │   FUND CREDIT       EXPENSE REQUEST
   │      │                           │
   │      │                           ▼
   │      │                    APPROVAL WORKFLOW
   │      │                      │          │
   │      │                   APPROVE     REJECT
   │      │                      │
   │      │                      ▼
   │      │               WALLET DEBIT
   │      │
   └──────┴────────────────────────────────────
```

---

## 12.3 Wallet Ownership

Each eligible employee/manager can have one company wallet.

```text
Employee
   │
   └── 1 : 1
          │
          ▼
        Wallet
```

The wallet is associated with:

- Company
- Branch
- Employee
- Wallet status
- Spending limits

---

## 12.4 Fund Allocation

A superior or authorized manager can allocate funds to a subordinate's wallet.

### Allocation Process

```text
Superior / Authorized Manager
          ↓
Select Employee
          ↓
Select Wallet
          ↓
Enter Amount
          ↓
Enter Purpose
          ↓
Permission Check
          ↓
Policy Validation
          ↓
Create Fund Allocation
          ↓
Create Wallet CREDIT Transaction
          ↓
Update Available Balance
          ↓
Notify Employee
          ↓
Audit Log
```

### Fund Allocation Data

- Allocation ID
- Wallet ID
- Employee ID
- Branch ID
- Allocated By
- Amount
- Purpose
- Allocation Date
- Status
- Related Wallet Transaction

---

# 12.5 Expense Management

Employees can submit business/management expenses against their wallet.

### Expense Categories

```text
Travel
Fuel
Accommodation
Meals
Office Supplies
Client Meeting
Transportation
Communication
Training
Other Business Expense
```

Categories should be configurable by Admin/HR.

---

## 12.6 Expense Request Workflow

```text
Employee
   ↓
Create Expense Request
   ↓
Select Category
   ↓
Enter Amount
   ↓
Enter Date
   ↓
Enter Description
   ↓
Upload Receipt
   ↓
Validate Wallet Balance
   ↓
Validate Spending Policy
   ↓
Determine Approver
   ↓
Submit
   ↓
Manager / Superior Review
   │
   ├───────────────┐
   ▼               ▼
APPROVED         REJECTED
   │               │
   ▼               ▼
Wallet DEBIT     Notify Employee
   │
   ▼
Update Balance
   │
   ▼
Notify Employee
   │
   ▼
Audit Log
```

---

# 12.7 Expense Approval

Approval can depend on:

- Employee's reporting hierarchy
- Manager authorization
- Branch
- Expense category
- Expense amount
- Approval threshold
- Company policy

For example:

```text
Expense Submitted
       ↓
Amount / Policy Check
       ↓
Within Manager Limit?
    ┌──┴──┐
   YES    NO
    │      │
    ▼      ▼
 Manager   Higher-Level
 Approval  Approval
    │      │
    └──┬───┘
       ▼
 Final Decision
```

---

# 12.8 Wallet Controls

The system should support:

- Wallet activation/deactivation
- Wallet freeze/unfreeze
- Minimum balance
- Maximum balance
- Per-transaction spending limit
- Daily spending limit
- Monthly spending limit
- Category-specific spending limits
- Branch-specific policies
- Approval thresholds
- Receipt requirement
- Expense cancellation
- Refund support
- Reversal transactions
- Audit trail

---

# 12.9 Wallet Ledger

Wallet balances must be backed by a transaction ledger.

Never silently overwrite the wallet balance.

Every financial change should create a transaction.

### Transaction Types

```text
CREDIT
DEBIT
REVERSAL
ADJUSTMENT
```

### Ledger Example

```text
Opening Balance        ₹0
        ↓
Fund Allocation       +₹10,000
        ↓
Wallet Balance        ₹10,000
        ↓
Approved Expense      -₹2,000
        ↓
Wallet Balance        ₹8,000
        ↓
Approved Expense      -₹1,500
        ↓
Wallet Balance        ₹6,500
```

The ledger should maintain the balance after each transaction for traceability.

---

# 12.10 Wallet & Expense Reporting

### Employee

- Current wallet balance
- Available funds
- Total allocated
- Total spent
- Pending expenses
- Approved expenses
- Rejected expenses
- Transaction history

### Manager

- Team wallet balances
- Funds allocated
- Team expenses
- Pending approvals
- Approved/rejected expenses
- Expense category reports

### HR / Admin

- Company wallet summary
- Branch wallet summary
- Employee wallet summary
- Total allocations
- Total spending
- Pending expenses
- Expense category analysis
- Branch expense reports
- Wallet audit history

---

# 14. Recruitment / ATS

### Features

- Job postings
- Candidate management
- Applications
- Screening
- Interviews
- Offers
- Hiring

### Flow

```text
Job Posting
    ↓
Candidate
    ↓
Application
    ↓
Screening
    ↓
Interview
    ↓
Offer
    ↓
Hiring
    ↓
Employee Record
```

---

# 15. Performance Management

### Features

- Goals
- KPIs
- Progress
- Performance reviews
- Manager comments
- Employee comments
- Appraisal records

Task progress data can be used as factual work-progress information during performance review, while performance records remain a separate module.

---

# 16. Work From Home

### Features

- WFH request
- Manager approval
- WFH history
- WFH attendance
- WFH reports

### Workflow

```text
Employee
   ↓
WFH Request
   ↓
Manager
   ├── Reject
   └── Approve
          ↓
       WFH Date
          ↓
    WFH Attendance
```

---

# 17. Document Management

### Features

- Document types
- Employee documents
- Upload
- View
- Download
- Document metadata
- Document access control

Examples:

```text
Identity Documents
Employment Documents
Education Documents
Salary Documents
Company Documents
Other HR Documents
```

---

# 18. Holidays & Calendar

### Features

- Holiday management
- Holiday calendar
- Working days
- Branch-specific holidays
- Company-wide holidays

---

# 19. Communication & Notifications

### Announcements

- Company announcements
- Branch announcements
- Department announcements
- Targeted announcements

### Notifications

- Leave status
- WFH status
- Task assignment
- Task updates
- Expense approval
- Fund allocation
- Payroll/payslip
- System notifications

---

# 20. Reports & Analytics

### HR Reports

- Employee report
- Branch report
- Department report
- Attendance report
- Leave report
- Payroll report
- Recruitment report
- Performance report

### Task Reports

- Project progress
- Task status
- Overdue tasks
- Employee task workload
- Completed tasks
- Time logs
- Team productivity data

### Wallet / Expense Reports

- Wallet balance
- Fund allocation report
- Expense report
- Branch expense report
- Category-wise expenses
- Pending expense report
- Approved/rejected expense report
- Employee spending report
- Wallet transaction ledger

### Export

- PDF
- Excel

---

# 21. Audit & System Administration

### Audit Logs

The system should record sensitive actions such as:

- Login
- Logout
- Employee creation
- Employee modification
- Role changes
- Permission changes
- Attendance adjustments
- Leave approval
- Payroll changes
- Task changes
- Wallet fund allocation
- Wallet debit
- Expense approval
- Expense rejection
- Wallet freeze/unfreeze
- Document actions
- System setting changes

### System Settings

- Company settings
- Branch settings
- Leave policies
- Attendance policies
- Payroll settings
- Expense policies
- Wallet limits
- Approval thresholds
- Notification settings
- Working days
- Holiday settings

---

# 22. Core Business Modules

```text
HRMS
│
├── Authentication & Security
│
├── Organization
│   ├── Company
│   ├── Branches
│   ├── Departments
│   ├── Designations
│   └── Shifts
│
├── Employee Management
│
├── Attendance
│
├── Leave Management
│
├── Payroll & Payslips
│
├── Task Management
│   ├── Projects
│   ├── Tasks
│   ├── Assignments
│   ├── Progress Updates
│   ├── Comments
│   ├── Time Logs
│   └── Task Reports
│
├── Wallet & Management Expense
│   ├── Employee Wallets
│   ├── Fund Allocations
│   ├── Wallet Ledger
│   ├── Expense Categories
│   ├── Expense Requests
│   ├── Receipts
│   ├── Approvals
│   └── Expense Reports
│
├── Recruitment / ATS
│
├── Performance Management
│
├── Work From Home
│
├── Document Management
│
├── Holidays / Calendar
│
├── Announcements
│
├── Notifications
│
├── Reports & Analytics
│
├── Audit Logs
│
└── System Settings
```

---

# 23. Database Module Inventory

The architecture should support the following core tables:

```text
1.  users
2.  roles
3.  permissions
4.  role_permissions
5.  user_sessions

6.  companies
7.  branches
8.  departments
9.  designations
10. employees
11. employee_managers
12. shifts

13. attendance
14. attendance_adjustments
15. overtime

16. leave_types
17. leave_policies
18. leave_balances
19. leave_requests

20. salary_structures
21. salary_components
22. employee_salary
23. payroll
24. payroll_items
25. payslips

26. projects
27. tasks
28. task_assignments
29. task_updates
30. task_comments
31. task_time_logs

32. wallets
33. wallet_transactions
34. fund_allocations
35. expense_categories
36. expense_requests
37. expense_receipts

38. job_postings
39. candidates
40. applications
41. interviews
42. offers

43. goals
44. performance_reviews
45. performance_review_items

46. wfh_requests

47. document_types
48. employee_documents

49. announcements
50. notifications
51. holidays
52. working_days

53. audit_logs
54. system_settings
```

---

# 24. Wallet Database Structure

```text
WALLETS
---------
wallet_id PK
company_id FK
branch_id FK
employee_id FK
wallet_name
spending_limit
status
created_at
updated_at


WALLET_TRANSACTIONS
-------------------
transaction_id PK
wallet_id FK
created_by FK
transaction_type
amount
balance_after
reference_type
reference_id
description
created_at


FUND_ALLOCATIONS
----------------
allocation_id PK
wallet_id FK
employee_id FK
branch_id FK
allocated_by FK
amount
purpose
allocation_date
status
transaction_id FK
created_at


EXPENSE_CATEGORIES
------------------
category_id PK
category_name
description
spending_limit
receipt_required
status
created_at


EXPENSE_REQUESTS
----------------
expense_id PK
wallet_id FK
employee_id FK
category_id FK
approver_id FK
amount
expense_date
description
status
submitted_at
approved_at
rejected_at


EXPENSE_RECEIPTS
----------------
receipt_id PK
expense_id FK
file_path
file_name
uploaded_at
```

---

# 25. Important Database Relationships

```text
COMPANY
   │
   └── 1:N BRANCHES
             │
             ├── 1:N DEPARTMENTS
             │
             └── 1:N EMPLOYEES
                       │
                       ├── 1:N ATTENDANCE
                       ├── 1:N LEAVE_REQUESTS
                       ├── 1:N PAYROLL
                       ├── 1:N TASK_ASSIGNMENTS
                       ├── 1:N TASK_UPDATES
                       ├── 1:N TASK_COMMENTS
                       ├── 1:N TASK_TIME_LOGS
                       │
                       └── 1:1 WALLET
                                  │
                                  ├── 1:N WALLET_TRANSACTIONS
                                  ├── 1:N FUND_ALLOCATIONS
                                  └── 1:N EXPENSE_REQUESTS
                                              │
                                              └── 1:N EXPENSE_RECEIPTS
```

---

# 26. Sensitive Operation Architecture

All sensitive operations should follow this standard:

```text
REQUEST
   ↓
AUTHENTICATION
   ↓
ROLE CHECK
   ↓
PERMISSION CHECK
   ↓
COMPANY / BRANCH SCOPE CHECK
   ↓
INPUT VALIDATION
   ↓
BUSINESS RULE VALIDATION
   ↓
DATABASE TRANSACTION
   ↓
AUDIT LOG
   ↓
NOTIFICATION
   ↓
RESPONSE
```

For wallet and expense operations:

```text
REQUEST
   ↓
AUTHENTICATION
   ↓
RBAC
   ↓
BRANCH / HIERARCHY CHECK
   ↓
WALLET / EXPENSE POLICY CHECK
   ↓
BALANCE CHECK
   ↓
APPROVAL CHECK
   ↓
DATABASE TRANSACTION
   ↓
LEDGER ENTRY
   ↓
AUDIT LOG
   ↓
NOTIFICATION
```

---

# 27. Overall HRMS Workflow

```text
                         SYSTEM START
                              │
                              ▼
                         LOGIN / AUTH
                              │
                              ▼
                        VALIDATE USER
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
                  ADMIN              MANAGER
                    │                   │
                    │                   │
                    └─────────┬─────────┘
                              │
                              ▼
                         EMPLOYEE
                              │
                              ▼
                      AUTHORIZED PORTAL
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
   HR OPERATIONS         WORK OPERATIONS       FINANCIAL OPS
        │                     │                     │
        ├─ Employee           ├─ Projects          ├─ Wallet
        ├─ Attendance         ├─ Tasks             ├─ Fund Allocation
        ├─ Leave              ├─ Progress          ├─ Expenses
        ├─ Payroll            ├─ Comments          ├─ Approvals
        ├─ Recruitment        └─ Time Logs         └─ Ledger
        └─ Performance
        │                     │                     │
        └─────────────────────┼─────────────────────┘
                              │
                              ▼
                     REPORTS / ANALYTICS
                              │
                              ▼
                         AUDIT LOGS
                              │
                              ▼
                            LOGOUT
```

---

# 28. Final Architecture Principles

1. **Multi-branch first:** branch is a first-class organizational entity.
2. **RBAC:** every module is controlled through roles and permissions.
3. **Hierarchy-aware:** manager/superior relationships control approvals and fund allocation.
4. **Approval-driven:** sensitive operations use explicit approval workflows.
5. **Ledger-based wallet:** financial wallet changes are represented by immutable transactions.
6. **Auditability:** sensitive actions are recorded in audit logs.
7. **Separation of concerns:** controllers, services, repositories, and database layers remain separate.
8. **Branch-aware reporting:** reports can be filtered by company, branch, department, and employee.
9. **Employee self-service:** employees can manage their own operational requests without receiving unauthorized administrative access.
10. **Scalable modules:** new HRMS modules can be added without redesigning the complete system.
11. **Transactional integrity:** wallet, payroll, leave balance, and other sensitive updates should use database transactions.
12. **Secure document handling:** employee documents and receipts require controlled access.
13. **Traceable corrections:** corrections should create adjustment/reversal records instead of silently modifying historical records.
14. **No birthday/anniversary module:** Employee Birthday & Anniversary is intentionally excluded from this architecture.
