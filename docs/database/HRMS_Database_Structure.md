# HRMS Database Structure — Updated

## Overview

This document defines the planned PostgreSQL database structure for the complete HRMS.

### Technology Stack

- Database: PostgreSQL
- ORM: Prisma
- Backend: Node.js + Express.js
- Authentication: JWT
- Authorization: RBAC / Permissions
- Frontend: React.js + Vite + Tailwind CSS + Motion + Lucide React

### Total Planned Tables

**61 tables**

The structure includes the latest requirements:

- Company logo
- Branch information
- `branch_id` in the employee table
- Employee profile image
- Employee document verification field
- Employee document table with `employee_id` foreign key
- Check-in/check-out history
- Overtime records and alerts
- Employee-wise allotted/used/pending/remaining leave
- Detailed payroll earnings
- Payroll additions
- Payroll deductions
- Tax deductions
- Wallet and management expenses
- Task and project management
- Recruitment
- Performance
- WFH
- Notifications
- Audit logs

> Employee Birthday & Anniversary functionality is intentionally excluded.

---

# 1. High-Level Database Architecture

```text
COMPANY
   |
   +-- BRANCHES
   |      |
   |      +-- DEPARTMENTS
   |      |      |
   |      |      +-- EMPLOYEES
   |      |             |
   |      |             +-- EMPLOYEE DOCUMENTS
   |      |             +-- ATTENDANCE
   |      |             +-- LEAVES
   |      |             +-- PAYROLL
   |      |             +-- TASK ASSIGNMENTS
   |      |             +-- PERFORMANCE
   |      |             +-- WFH
   |      |             +-- WALLET
   |      |
   |      +-- PROJECTS
   |      |      |
   |      |      +-- TASKS
   |      |
   |      +-- HOLIDAYS
   |
   +-- LEAVE TYPES
   +-- SALARY COMPONENTS
   +-- EXPENSE CATEGORIES
   +-- PERFORMANCE CYCLES

USERS
   |
   +-- ROLES
   |      |
   |      +-- PERMISSIONS
   |
   +-- REFRESH TOKENS
   +-- NOTIFICATIONS
   +-- AUDIT LOGS
```

---

# 2. Authentication & RBAC

## 2.1 `users`

Stores authentication accounts.

| Column | Type | Key | Description |
|---|---|---|---|
| id | UUID | PK | User ID |
| email | VARCHAR | UNIQUE | Login email |
| password_hash | VARCHAR | | Hashed password |
| is_active | BOOLEAN | | Account status |
| last_login_at | TIMESTAMP | | Last login |
| created_at | TIMESTAMP | | Created time |
| updated_at | TIMESTAMP | | Updated time |

## 2.2 `roles`

Stores system roles.

| Column | Type | Key | Description |
|---|---|---|---|
| id | UUID | PK | Role ID |
| name | VARCHAR | UNIQUE | Role name |
| description | TEXT | | Role description |
| created_at | TIMESTAMP | | Created time |

Roles:

```text
SUPER_ADMIN
HR_ADMIN
HR_EXECUTIVE
MANAGER
EMPLOYEE
```

## 2.3 `permissions`

Stores individual system permissions.

| Column | Type | Key | Description |
|---|---|---|---|
| id | UUID | PK | Permission ID |
| name | VARCHAR | UNIQUE | Permission name |
| module | VARCHAR | | Module |
| action | VARCHAR | | Action |
| description | TEXT | | Description |

Examples:

```text
employee.create
employee.update
employee.delete
attendance.view
attendance.modify
leave.approve
payroll.view
task.assign
wallet.allocate
expense.approve
```

## 2.4 `user_roles`

Many-to-many relationship between users and roles.

| Column | Type | Key |
|---|---|---|
| user_id | UUID | PK, FK → users.id |
| role_id | UUID | PK, FK → roles.id |
| assigned_at | TIMESTAMP | |
| assigned_by | UUID | FK → users.id |

## 2.5 `role_permissions`

Many-to-many relationship between roles and permissions.

| Column | Type | Key |
|---|---|---|
| role_id | UUID | PK, FK → roles.id |
| permission_id | UUID | PK, FK → permissions.id |

## 2.6 `refresh_tokens`

Stores refresh tokens for authentication sessions.

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| user_id | UUID | FK → users.id |
| token_hash | VARCHAR | |
| expires_at | TIMESTAMP | |
| revoked_at | TIMESTAMP | |
| created_at | TIMESTAMP | |

---

# 3. Organization

The organization hierarchy is:

```text
COMPANY
   ↓
BRANCH
   ↓
DEPARTMENT
   ↓
EMPLOYEE
```

## 3.1 `companies`

Stores company information and branding.

| Column | Type | Key | Description |
|---|---|---|---|
| id | UUID | PK | Company ID |
| name | VARCHAR | | Company name |
| legal_name | VARCHAR | | Legal name |
| logo | VARCHAR | | Company logo path/URL |
| email | VARCHAR | | Company email |
| phone | VARCHAR | | Company phone |
| address | TEXT | | Address |
| status | VARCHAR | | Company status |
| created_at | TIMESTAMP | | Created time |
| updated_at | TIMESTAMP | | Updated time |

## 3.2 `branches`

Stores all company branches.

| Column | Type | Key | Description |
|---|---|---|---|
| id | UUID | PK | Branch ID |
| company_id | UUID | FK → companies.id | Company |
| name | VARCHAR | | Branch name |
| code | VARCHAR | UNIQUE | Branch code |
| logo | VARCHAR | | Branch logo if required |
| address | TEXT | | Branch address |
| city | VARCHAR | | City |
| state | VARCHAR | | State |
| country | VARCHAR | | Country |
| phone | VARCHAR | | Branch phone |
| email | VARCHAR | | Branch email |
| status | VARCHAR | | Branch status |
| created_at | TIMESTAMP | | Created time |
| updated_at | TIMESTAMP | | Updated time |

## 3.3 `departments`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| branch_id | UUID | FK → branches.id |
| name | VARCHAR | |
| code | VARCHAR | |
| description | TEXT | |
| status | VARCHAR | |
| created_at | TIMESTAMP | |

## 3.4 `designations`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| name | VARCHAR | |
| description | TEXT | |
| level | INTEGER | |
| status | VARCHAR | |

## 3.5 `shifts`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| branch_id | UUID | FK → branches.id |
| name | VARCHAR | |
| start_time | TIME | |
| end_time | TIME | |
| grace_minutes | INTEGER | |
| regular_hours | DECIMAL | |
| status | VARCHAR | |

## 3.6 `employees`

Main employee master table.

| Column | Type | Key | Description |
|---|---|---|---|
| id | UUID | PK | Employee ID |
| user_id | UUID | FK → users.id, UNIQUE | Login account |
| company_id | UUID | FK → companies.id | Company |
| branch_id | UUID | FK → branches.id | Employee branch |
| department_id | UUID | FK → departments.id | Department |
| designation_id | UUID | FK → designations.id | Designation |
| manager_id | UUID | FK → employees.id | Reporting manager |
| employee_code | VARCHAR | UNIQUE | Employee code |
| first_name | VARCHAR | | First name |
| last_name | VARCHAR | | Last name |
| profile_image | VARCHAR | | Employee profile image |
| phone | VARCHAR | | Phone |
| email | VARCHAR | | Employee email |
| date_of_birth | DATE | | Date of birth |
| date_of_joining | DATE | | Joining date |
| employment_status | VARCHAR | | Employment status |
| documents_verified | BOOLEAN | | Overall document verification status |
| address | TEXT | | Address |
| emergency_contact | VARCHAR | | Emergency contact |
| created_at | TIMESTAMP | | Created time |
| updated_at | TIMESTAMP | | Updated time |

### `documents_verified`

```text
BOOLEAN DEFAULT FALSE
```

Meaning:

```text
FALSE → Employee documents are not fully verified
TRUE  → Employee documents have been verified
```

The employee record explicitly contains:

```text
branch_id
profile_image
documents_verified
```

## 3.7 `employee_branch_history`

Tracks employee branch transfers.

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK → employees.id |
| branch_id | UUID | FK → branches.id |
| effective_from | DATE | |
| effective_to | DATE | |
| transfer_reason | TEXT | |
| transferred_by | UUID | FK → users.id |
| created_at | TIMESTAMP | |

---

# 4. Attendance Management

Attendance supports daily attendance plus complete check-in/check-out history and overtime tracking.

## 4.1 `attendance`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK → employees.id |
| shift_id | UUID | FK → shifts.id |
| attendance_date | DATE | |
| status | VARCHAR | |
| working_hours | DECIMAL | |
| regular_hours | DECIMAL | |
| overtime_hours | DECIMAL | |
| overtime_status | VARCHAR | |
| overtime_alert_sent | BOOLEAN | |
| remarks | TEXT | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

Statuses:

```text
PRESENT
ABSENT
HALF_DAY
LATE
ON_LEAVE
HOLIDAY
WEEK_OFF
WFH
```

## 4.2 `attendance_logs`

Stores every check-in/check-out event.

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK → employees.id |
| attendance_id | UUID | FK → attendance.id |
| event_type | VARCHAR | |
| event_time | TIMESTAMP | |
| location | VARCHAR | |
| ip_address | VARCHAR | |
| device_info | TEXT | |
| created_at | TIMESTAMP | |

Event types:

```text
CHECK_IN
CHECK_OUT
```

Example:

```text
Employee: EMP001

09:02 AM → CHECK_IN
01:15 PM → CHECK_OUT
02:00 PM → CHECK_IN
07:10 PM → CHECK_OUT
```

## 4.3 `attendance_adjustments`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| attendance_id | UUID | FK → attendance.id |
| requested_by | UUID | FK → users.id |
| approved_by | UUID | FK → users.id |
| old_check_in | TIMESTAMP | |
| old_check_out | TIMESTAMP | |
| new_check_in | TIMESTAMP | |
| new_check_out | TIMESTAMP | |
| reason | TEXT | |
| status | VARCHAR | |
| created_at | TIMESTAMP | |

## 4.4 `attendance_policies`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| branch_id | UUID | FK → branches.id |
| late_threshold_minutes | INTEGER | |
| half_day_hours | DECIMAL | |
| full_day_hours | DECIMAL | |
| overtime_enabled | BOOLEAN | |
| overtime_threshold_hours | DECIMAL | |
| status | VARCHAR | |

### Overtime flow

```text
Check In / Check Out
        ↓
Calculate working hours
        ↓
Compare with regular hours
        ↓
Working hours > regular hours?
        ↓
       YES
        ↓
Calculate overtime
        ↓
Create overtime record
        ↓
Send overtime alert
```

## 4.5 `overtime_records`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK → employees.id |
| attendance_id | UUID | FK → attendance.id |
| overtime_date | DATE | |
| regular_hours | DECIMAL | |
| actual_hours | DECIMAL | |
| overtime_hours | DECIMAL | |
| status | VARCHAR | |
| approved_by | UUID | FK → users.id |
| approved_at | TIMESTAMP | |
| created_at | TIMESTAMP | |

---

# 5. Leave Management

Leave balances are maintained per employee and leave type.

## 5.1 `leave_types`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| name | VARCHAR | |
| description | TEXT | |
| annual_limit | DECIMAL | |
| is_paid | BOOLEAN | |
| status | VARCHAR | |

## 5.2 `leave_balances`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK → employees.id |
| leave_type_id | UUID | FK → leave_types.id |
| year | INTEGER | |
| allocated | DECIMAL | |
| used | DECIMAL | |
| pending | DECIMAL | |
| remaining | DECIMAL | |
| carried_forward | DECIMAL | |

Example:

```text
Employee: Rahul
Leave Type: Casual Leave

Allocated:       12
Used:             4
Pending:          1
Remaining:        7
```

## 5.3 `leave_requests`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK → employees.id |
| leave_type_id | UUID | FK → leave_types.id |
| start_date | DATE | |
| end_date | DATE | |
| reason | TEXT | |
| status | VARCHAR | |
| approver_id | UUID | FK → users.id |
| approved_at | TIMESTAMP | |
| rejected_at | TIMESTAMP | |
| created_at | TIMESTAMP | |

## 5.4 `leave_approvals`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| leave_request_id | UUID | FK → leave_requests.id |
| approver_id | UUID | FK → users.id |
| action | VARCHAR | |
| comments | TEXT | |
| action_at | TIMESTAMP | |

---

# 6. Payroll

Payroll stores what each employee earns, additions, deductions, taxes, and final net salary.

```text
Basic Salary
     +
Allowances
     +
Bonus
     +
Overtime
     +
Other Additions
     ↓
GROSS SALARY
     ↓
- Income Tax
- PF
- ESI
- Professional Tax
- Other Deductions
     ↓
NET SALARY
```

## 6.1 `salary_structures`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK → employees.id |
| basic_salary | DECIMAL | |
| housing_allowance | DECIMAL | |
| transport_allowance | DECIMAL | |
| other_allowance | DECIMAL | |
| effective_from | DATE | |
| effective_to | DATE | |
| status | VARCHAR | |

## 6.2 `salary_components`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| name | VARCHAR | |
| component_type | VARCHAR | |
| calculation_type | VARCHAR | |
| default_value | DECIMAL | |
| status | VARCHAR | |

## 6.3 `payroll`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK → employees.id |
| month | INTEGER | |
| year | INTEGER | |
| basic_salary | DECIMAL | |
| gross_salary | DECIMAL | |
| total_additions | DECIMAL | |
| total_deductions | DECIMAL | |
| tax_deduction | DECIMAL | |
| net_salary | DECIMAL | |
| status | VARCHAR | |
| processed_at | TIMESTAMP | |

## 6.4 `payslips`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| payroll_id | UUID | FK → payroll.id |
| employee_id | UUID | FK → employees.id |
| file_path | VARCHAR | |
| generated_at | TIMESTAMP | |

## 6.5 `payroll_additions`

Stores every addition to an employee's payroll.

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| payroll_id | UUID | FK → payroll.id |
| employee_id | UUID | FK → employees.id |
| name | VARCHAR | |
| type | VARCHAR | |
| amount | DECIMAL | |
| description | TEXT | |
| created_at | TIMESTAMP | |

Examples:

```text
HRA
Travel Allowance
Performance Bonus
Overtime
Incentive
Commission
Other Allowance
```

## 6.6 `payroll_deductions`

Stores every deduction.

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| payroll_id | UUID | FK → payroll.id |
| employee_id | UUID | FK → employees.id |
| name | VARCHAR | |
| type | VARCHAR | |
| amount | DECIMAL | |
| description | TEXT | |
| created_at | TIMESTAMP | |

Examples:

```text
Income Tax
PF
ESI
Professional Tax
Loan Deduction
Advance Salary
Late Deduction
Other Deduction
```

---

# 7. Task & Project Management

```text
PROJECT
   ↓
TASK
   ├── TASK ASSIGNMENTS
   ├── TASK UPDATES
   ├── TASK COMMENTS
   ├── TIME LOGS
   └── ATTACHMENTS
```

## 7.1 `projects`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| branch_id | UUID | FK → branches.id |
| department_id | UUID | FK → departments.id |
| manager_id | UUID | FK → employees.id |
| name | VARCHAR | |
| description | TEXT | |
| start_date | DATE | |
| end_date | DATE | |
| status | VARCHAR | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

## 7.2 `tasks`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| project_id | UUID | FK → projects.id |
| branch_id | UUID | FK → branches.id |
| created_by | UUID | FK → users.id |
| title | VARCHAR | |
| description | TEXT | |
| priority | VARCHAR | |
| status | VARCHAR | |
| start_date | DATE | |
| due_date | DATE | |
| completed_at | TIMESTAMP | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

Priority:

```text
LOW
MEDIUM
HIGH
URGENT
```

Status:

```text
BACKLOG
ASSIGNED
IN_PROGRESS
BLOCKED
COMPLETED
UNDER_REVIEW
CLOSED
CANCELLED
```

## 7.3 `task_assignments`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| task_id | UUID | FK → tasks.id |
| employee_id | UUID | FK → employees.id |
| assigned_by | UUID | FK → users.id |
| assigned_at | TIMESTAMP | |
| status | VARCHAR | |

## 7.4 `task_updates`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| task_id | UUID | FK → tasks.id |
| employee_id | UUID | FK → employees.id |
| progress_percentage | INTEGER | |
| status | VARCHAR | |
| update_text | TEXT | |
| blocker | TEXT | |
| created_at | TIMESTAMP | |

## 7.5 `task_comments`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| task_id | UUID | FK → tasks.id |
| employee_id | UUID | FK → employees.id |
| comment | TEXT | |
| created_at | TIMESTAMP | |

## 7.6 `task_time_logs`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| task_id | UUID | FK → tasks.id |
| employee_id | UUID | FK → employees.id |
| work_date | DATE | |
| hours | DECIMAL | |
| description | TEXT | |
| created_at | TIMESTAMP | |

## 7.7 `task_attachments`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| task_id | UUID | FK → tasks.id |
| uploaded_by | UUID | FK → users.id |
| file_name | VARCHAR | |
| file_path | VARCHAR | |
| uploaded_at | TIMESTAMP | |

---

# 8. Wallet & Management Expenses

The wallet is a company-funded business/management wallet.

```text
SUPERIOR
   ↓
FUND ALLOCATION
   ↓
EMPLOYEE WALLET
   ↓
EXPENSE REQUEST
   ↓
APPROVAL
   ↓
WALLET DEBIT
   ↓
TRANSACTION LEDGER
```

## 8.1 `wallets`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| branch_id | UUID | FK → branches.id |
| employee_id | UUID | FK → employees.id, UNIQUE |
| wallet_name | VARCHAR | |
| balance | DECIMAL | |
| spending_limit | DECIMAL | |
| status | VARCHAR | |
| created_at | TIMESTAMP | |
| updated_at | TIMESTAMP | |

## 8.2 `wallet_transactions`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| wallet_id | UUID | FK → wallets.id |
| created_by | UUID | FK → users.id |
| transaction_type | VARCHAR | |
| amount | DECIMAL | |
| balance_after | DECIMAL | |
| reference_type | VARCHAR | |
| reference_id | UUID | |
| description | TEXT | |
| created_at | TIMESTAMP | |

Types:

```text
CREDIT
DEBIT
REFUND
REVERSAL
ADJUSTMENT
```

## 8.3 `fund_allocations`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| wallet_id | UUID | FK → wallets.id |
| employee_id | UUID | FK → employees.id |
| branch_id | UUID | FK → branches.id |
| allocated_by | UUID | FK → users.id |
| amount | DECIMAL | |
| purpose | TEXT | |
| allocation_date | DATE | |
| status | VARCHAR | |
| transaction_id | UUID | FK → wallet_transactions.id |
| created_at | TIMESTAMP | |

## 8.4 `expense_categories`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| name | VARCHAR | |
| description | TEXT | |
| spending_limit | DECIMAL | |
| receipt_required | BOOLEAN | |
| status | VARCHAR | |

Categories:

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

## 8.5 `expense_requests`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| wallet_id | UUID | FK → wallets.id |
| employee_id | UUID | FK → employees.id |
| category_id | UUID | FK → expense_categories.id |
| approver_id | UUID | FK → users.id |
| amount | DECIMAL | |
| expense_date | DATE | |
| description | TEXT | |
| status | VARCHAR | |
| submitted_at | TIMESTAMP | |
| approved_at | TIMESTAMP | |
| rejected_at | TIMESTAMP | |

## 8.6 `expense_receipts`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| expense_id | UUID | FK → expense_requests.id |
| file_name | VARCHAR | |
| file_path | VARCHAR | |
| uploaded_at | TIMESTAMP | |

---

# 9. Recruitment / ATS

```text
JOB REQUISITION
      ↓
JOB POSTING
      ↓
CANDIDATE
      ↓
APPLICATION
      ↓
INTERVIEW
      ↓
OFFER
      ↓
HIRED
      ↓
EMPLOYEE
```

## 9.1 `job_requisitions`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| branch_id | UUID | FK → branches.id |
| department_id | UUID | FK → departments.id |
| designation_id | UUID | FK → designations.id |
| requested_by | UUID | FK → users.id |
| position_count | INTEGER | |
| description | TEXT | |
| status | VARCHAR | |
| created_at | TIMESTAMP | |

## 9.2 `job_postings`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| requisition_id | UUID | FK → job_requisitions.id |
| title | VARCHAR | |
| description | TEXT | |
| requirements | TEXT | |
| location | VARCHAR | |
| published_at | TIMESTAMP | |
| closing_date | DATE | |
| status | VARCHAR | |

## 9.3 `candidates`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| first_name | VARCHAR | |
| last_name | VARCHAR | |
| email | VARCHAR | |
| phone | VARCHAR | |
| resume_path | VARCHAR | |
| experience_years | DECIMAL | |
| created_at | TIMESTAMP | |

## 9.4 `applications`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| candidate_id | UUID | FK → candidates.id |
| job_posting_id | UUID | FK → job_postings.id |
| status | VARCHAR | |
| applied_at | TIMESTAMP | |
| source | VARCHAR | |

## 9.5 `interviews`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| application_id | UUID | FK → applications.id |
| interviewer_id | UUID | FK → users.id |
| interview_date | TIMESTAMP | |
| interview_type | VARCHAR | |
| feedback | TEXT | |
| status | VARCHAR | |

## 9.6 `offers`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| application_id | UUID | FK → applications.id |
| offered_salary | DECIMAL | |
| joining_date | DATE | |
| offer_file_path | VARCHAR | |
| status | VARCHAR | |
| issued_at | TIMESTAMP | |

---

# 10. Performance Management

## 10.1 `performance_cycles`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| name | VARCHAR | |
| start_date | DATE | |
| end_date | DATE | |
| status | VARCHAR | |

## 10.2 `performance_goals`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK → employees.id |
| cycle_id | UUID | FK → performance_cycles.id |
| title | VARCHAR | |
| description | TEXT | |
| target | TEXT | |
| progress_percentage | INTEGER | |
| status | VARCHAR | |

## 10.3 `performance_reviews`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK → employees.id |
| cycle_id | UUID | FK → performance_cycles.id |
| reviewer_id | UUID | FK → users.id |
| rating | DECIMAL | |
| strengths | TEXT | |
| improvement_areas | TEXT | |
| comments | TEXT | |
| status | VARCHAR | |
| reviewed_at | TIMESTAMP | |

## 10.4 `performance_feedback`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK → employees.id |
| reviewer_id | UUID | FK → users.id |
| review_id | UUID | FK → performance_reviews.id |
| feedback | TEXT | |
| created_at | TIMESTAMP | |

---

# 11. Work From Home & Documents

## 11.1 `wfh_requests`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK → employees.id |
| approver_id | UUID | FK → users.id |
| start_date | DATE | |
| end_date | DATE | |
| reason | TEXT | |
| status | VARCHAR | |
| created_at | TIMESTAMP | |
| approved_at | TIMESTAMP | |

## 11.2 `document_types`

Defines document categories.

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| name | VARCHAR | |
| description | TEXT | |
| is_required | BOOLEAN | |
| status | VARCHAR | |

Examples:

```text
Aadhaar
PAN
Resume
Joining Letter
Experience Certificate
Salary Certificate
Other
```

## 11.3 `employee_documents`

Stores documents belonging to employees.

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| employee_id | UUID | FK → employees.id |
| document_type_id | UUID | FK → document_types.id |
| file_name | VARCHAR | |
| file_path | VARCHAR | |
| uploaded_by | UUID | FK → users.id |
| uploaded_at | TIMESTAMP | |
| expiry_date | DATE | |
| status | VARCHAR | |

### Document relationship

```text
EMPLOYEES 1 ─────────── N EMPLOYEE_DOCUMENTS
                         |
                         +-- employee_id FK → employees.id
```

One employee can have multiple documents.

The overall employee verification state is stored in:

```text
employees.documents_verified
```

Individual document records remain in:

```text
employee_documents
```

The table is intentionally **not renamed**.

---

# 12. Holidays, Announcements & Notifications

## 12.1 `holidays`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| name | VARCHAR | |
| holiday_date | DATE | |
| description | TEXT | |
| status | VARCHAR | |

## 12.2 `holiday_branches`

Allows holidays to be assigned to specific branches.

| Column | Type | Key |
|---|---|---|
| holiday_id | UUID | PK, FK → holidays.id |
| branch_id | UUID | PK, FK → branches.id |

## 12.3 `announcements`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| company_id | UUID | FK → companies.id |
| created_by | UUID | FK → users.id |
| title | VARCHAR | |
| message | TEXT | |
| publish_at | TIMESTAMP | |
| expires_at | TIMESTAMP | |
| status | VARCHAR | |

## 12.4 `announcement_targets`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| announcement_id | UUID | FK → announcements.id |
| target_type | VARCHAR | |
| target_id | UUID | |

Target types:

```text
COMPANY
BRANCH
DEPARTMENT
ROLE
EMPLOYEE
```

## 12.5 `notifications`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| user_id | UUID | FK → users.id |
| title | VARCHAR | |
| message | TEXT | |
| type | VARCHAR | |
| reference_type | VARCHAR | |
| reference_id | UUID | |
| is_read | BOOLEAN | |
| created_at | TIMESTAMP | |

---

# 13. System

## 13.1 `notification_preferences`

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| user_id | UUID | FK → users.id |
| email_enabled | BOOLEAN | |
| push_enabled | BOOLEAN | |
| leave_notifications | BOOLEAN | |
| attendance_notifications | BOOLEAN | |
| task_notifications | BOOLEAN | |
| wallet_notifications | BOOLEAN | |
| announcement_notifications | BOOLEAN | |

## 13.2 `audit_logs`

Records important system activities.

| Column | Type | Key |
|---|---|---|
| id | UUID | PK |
| user_id | UUID | FK → users.id |
| company_id | UUID | FK → companies.id |
| branch_id | UUID | FK → branches.id |
| action | VARCHAR | |
| entity_type | VARCHAR | |
| entity_id | UUID | |
| old_values | JSONB | |
| new_values | JSONB | |
| ip_address | VARCHAR | |
| created_at | TIMESTAMP | |

---

# 14. Complete Table List

| # | Table | Module |
|---:|---|---|
| 1 | `users` | Authentication |
| 2 | `roles` | RBAC |
| 3 | `permissions` | RBAC |
| 4 | `user_roles` | RBAC |
| 5 | `role_permissions` | RBAC |
| 6 | `refresh_tokens` | Authentication |
| 7 | `companies` | Organization |
| 8 | `branches` | Organization |
| 9 | `departments` | Organization |
| 10 | `designations` | Organization |
| 11 | `shifts` | Organization |
| 12 | `employees` | Employee |
| 13 | `employee_branch_history` | Employee |
| 14 | `attendance` | Attendance |
| 15 | `attendance_logs` | Attendance |
| 16 | `attendance_adjustments` | Attendance |
| 17 | `attendance_policies` | Attendance |
| 18 | `overtime_records` | Attendance |
| 19 | `leave_types` | Leave |
| 20 | `leave_balances` | Leave |
| 21 | `leave_requests` | Leave |
| 22 | `leave_approvals` | Leave |
| 23 | `salary_structures` | Payroll |
| 24 | `salary_components` | Payroll |
| 25 | `payroll` | Payroll |
| 26 | `payslips` | Payroll |
| 27 | `payroll_additions` | Payroll |
| 28 | `payroll_deductions` | Payroll |
| 29 | `projects` | Tasks |
| 30 | `tasks` | Tasks |
| 31 | `task_assignments` | Tasks |
| 32 | `task_updates` | Tasks |
| 33 | `task_comments` | Tasks |
| 34 | `task_time_logs` | Tasks |
| 35 | `task_attachments` | Tasks |
| 36 | `wallets` | Finance |
| 37 | `wallet_transactions` | Finance |
| 38 | `fund_allocations` | Finance |
| 39 | `expense_categories` | Finance |
| 40 | `expense_requests` | Finance |
| 41 | `expense_receipts` | Finance |
| 42 | `job_requisitions` | Recruitment |
| 43 | `job_postings` | Recruitment |
| 44 | `candidates` | Recruitment |
| 45 | `applications` | Recruitment |
| 46 | `interviews` | Recruitment |
| 47 | `offers` | Recruitment |
| 48 | `performance_cycles` | Performance |
| 49 | `performance_goals` | Performance |
| 50 | `performance_reviews` | Performance |
| 51 | `performance_feedback` | Performance |
| 52 | `wfh_requests` | WFH |
| 53 | `document_types` | Documents |
| 54 | `employee_documents` | Documents |
| 55 | `holidays` | Calendar |
| 56 | `holiday_branches` | Calendar |
| 57 | `announcements` | Communication |
| 58 | `announcement_targets` | Communication |
| 59 | `notifications` | Notifications |
| 60 | `notification_preferences` | Notifications |
| 61 | `audit_logs` | System |

---

# 15. Core Relationships

```text
COMPANY
  |
  +-- BRANCH
  |     |
  |     +-- DEPARTMENT
  |     |      |
  |     |      +-- EMPLOYEE
  |     |             |
  |     |             +-- EMPLOYEE_DOCUMENTS
  |     |             +-- ATTENDANCE
  |     |             +-- LEAVE
  |     |             +-- PAYROLL
  |     |             +-- WALLET
  |     |
  |     +-- PROJECT
  |     +-- SHIFT
  |     +-- HOLIDAY
  |
  +-- LEAVE TYPE
  +-- SALARY COMPONENT
  +-- EXPENSE CATEGORY
  +-- PERFORMANCE CYCLE
```

```text
EMPLOYEE
  |
  +-- ATTENDANCE
  |      |
  |      +-- ATTENDANCE LOGS
  |      +-- ATTENDANCE ADJUSTMENTS
  |      +-- OVERTIME RECORDS
  |
  +-- LEAVE BALANCE
  +-- LEAVE REQUEST
  |      |
  |      +-- LEAVE APPROVAL
  |
  +-- SALARY STRUCTURE
  +-- PAYROLL
  |      |
  |      +-- PAYSLIP
  |      +-- PAYROLL ADDITIONS
  |      +-- PAYROLL DEDUCTIONS
  |
  +-- EMPLOYEE DOCUMENTS
  +-- PERFORMANCE
  +-- WFH REQUEST
  +-- TASK ASSIGNMENTS
  +-- WALLET
```

```text
WALLET
  |
  +-- FUND ALLOCATION
  +-- WALLET TRANSACTION
  +-- EXPENSE REQUEST
          |
          +-- EXPENSE RECEIPT
```

```text
PROJECT
  |
  +-- TASK
         |
         +-- TASK ASSIGNMENT
         +-- TASK UPDATE
         +-- TASK COMMENT
         +-- TASK TIME LOG
         +-- TASK ATTACHMENT
```

```text
USERS
  |
  +-- USER ROLES
  |      |
  |      +-- ROLES
  |             |
  |             +-- ROLE PERMISSIONS
  |                    |
  |                    +-- PERMISSIONS
  |
  +-- REFRESH TOKENS
  +-- NOTIFICATIONS
  +-- AUDIT LOGS
```

---

# 16. Important Database Rules

## Multi-Branch

Relevant records should use `company_id` and/or `branch_id` so access and reporting can be scoped correctly.

## Employee Branch

The employee table directly stores:

```text
employees.branch_id → branches.id
```

Branch transfers are separately tracked in:

```text
employee_branch_history
```

## Employee Profile Image

The employee table stores the employee's profile image:

```text
employees.profile_image
```

## Document Verification

The employee table stores the overall verification state:

```text
employees.documents_verified BOOLEAN DEFAULT FALSE
```

Individual documents remain in:

```text
employee_documents
```

with:

```text
employee_documents.employee_id → employees.id
```

## Attendance History

Every check-in/check-out event is stored in `attendance_logs`. This prevents loss of historical attendance events.

## Overtime

Overtime is calculated from actual working hours against the employee's regular/shift hours. Overtime can generate an alert and an `overtime_records` entry.

## Leave

Each employee has a leave balance per leave type and year:

```text
allocated
used
pending
remaining
carried_forward
```

## Payroll

Payroll separates:

```text
Earnings
Additions
Deductions
Tax
Net Salary
```

This allows administrators and employees to see exactly how the final salary was calculated.

## Wallet Ledger

Wallet balance changes should always be represented by transactions.

```text
Allocation → CREDIT
Expense → DEBIT
Refund → REFUND
Correction → REVERSAL / ADJUSTMENT
```

Financial history should not be silently overwritten.

## Auditability

Sensitive operations should create an `audit_logs` record.

Examples:

```text
Employee created
Employee updated
Employee deactivated
Employee branch changed
Document verified
Salary changed
Leave approved
Leave rejected
Wallet funded
Expense approved
Expense rejected
Task reassigned
Permission changed
```

---

# 17. Key Business Flows

## Employee Creation

```text
Create User
    ↓
Create Employee
    ↓
Assign Company
    ↓
Assign Branch
    ↓
Assign Department
    ↓
Assign Designation
    ↓
Assign Manager
    ↓
Upload Employee Documents
    ↓
Verify Documents
    ↓
documents_verified = TRUE
```

## Attendance

```text
Employee
   ↓
CHECK_IN
   ↓
attendance_logs
   ↓
Work
   ↓
CHECK_OUT
   ↓
attendance_logs
   ↓
Calculate Working Hours
   ↓
Check Overtime
   ↓
Overtime Alert if applicable
```

## Leave

```text
Employee
   ↓
Apply Leave
   ↓
Check Leave Balance
   ↓
Manager / HR Approval
   ↓
Update Used / Pending / Remaining
```

## Payroll

```text
Salary Structure
      +
Attendance / Overtime
      +
Payroll Additions
      ↓
Gross Salary
      ↓
Payroll Deductions
      +
Tax Deduction
      ↓
Net Salary
      ↓
Payslip
```

## Wallet

```text
Superior / Authorized Manager
          ↓
     Fund Allocation
          ↓
       Wallet CREDIT
          ↓
    Employee spends
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

# 18. Final Technology Stack

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

This is the updated database blueprint for the HRMS. The next implementation step is to convert these tables into a Prisma `schema.prisma`, create the PostgreSQL migrations, and then implement the backend modules in phases.
