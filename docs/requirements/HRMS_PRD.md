# HRMS — Product Requirements Document (PRD)

**Version:** 1.0  
**Status:** Draft / Baseline  
**Product:** Multi-Branch Human Resource Management System (HRMS)

---

## 1. Product Overview

The HRMS is a centralized, multi-branch platform for managing employees, organizational structure, attendance, leave, payroll, tasks, management expenses, recruitment, performance, work-from-home requests, documents, announcements, notifications, reporting, and audit activity.

The system will provide separate experiences for:

- Super Admin
- HR Admin
- HR Executive
- Manager
- Employee

The system is designed around a company and branch hierarchy so that employees, operations, permissions, expenses, attendance, and reports can be managed according to organizational responsibility.

### Explicit Exclusion

The following feature is **not part of the product scope**:

- Employee Birthday & Anniversary Management

---

# 2. Product Goals

The HRMS should:

1. Centralize HR and employee operations.
2. Support multiple company branches.
3. Provide role-based access control.
4. Maintain accurate employee records.
5. Automate attendance and working-hour calculations.
6. Manage leave allocation, applications, and approvals.
7. Calculate payroll with additions, deductions, tax, and overtime.
8. Allow managers to create and monitor employee tasks.
9. Provide controlled company-funded wallets for business expenses.
10. Support recruitment from job requisition through hiring.
11. Support employee performance management.
12. Manage WFH requests.
13. Store and verify employee documents.
14. Provide announcements and notifications.
15. Provide management reports and analytics.
16. Maintain audit trails for sensitive operations.

---

# 3. Target Users

## 3.1 Super Admin

Responsible for overall system administration.

Capabilities include:

- Company management
- Branch management
- User management
- Role management
- Permission management
- System settings
- Full reporting access
- Full audit-log access

## 3.2 HR Admin

Responsible for HR and administrative operations.

Capabilities include:

- Employee management
- Attendance management
- Leave management
- Payroll management
- Recruitment
- Performance management
- Document management
- WFH management
- Wallet and expense administration
- Reports

## 3.3 HR Executive

Handles assigned HR operations according to permissions.

Capabilities depend on assigned permissions and organizational scope.

## 3.4 Manager

Responsible for team-level operations.

Capabilities include:

- View/manage assigned team
- Team attendance
- Leave approvals
- WFH approvals
- Create and assign tasks
- Monitor task progress
- Team performance information
- Authorized fund allocation
- Expense approval

## 3.5 Employee

Employee self-service portal.

Capabilities include:

- Own profile
- Attendance
- Leave
- Payroll/payslips
- Assigned tasks
- Task progress updates
- Wallet
- Expense requests
- Documents
- Performance
- WFH requests
- Holidays
- Announcements
- Notifications

---

# 4. Product Portals

The product will contain three logical portal experiences.

## Admin / HR Portal

Used by:

- SUPER ADMIN
- HR ADMIN
- HR EXECUTIVE

## Manager Portal

Used by:

- MANAGER

## Employee Portal

Used by:

- EMPLOYEE

Access to individual screens and actions must additionally be controlled by permissions.

---

# 5. Organization Management

## 5.1 Company

The system shall support company-level configuration.

Required information may include:

- Company name
- Company logo
- Contact information
- Address
- Status
- System configuration

## 5.2 Branches

Branches are first-class organizational entities.

Each branch should support:

- Branch name
- Branch code
- Branch logo, if required
- Address
- Contact information
- Status
- Company association

Employees must be associated with a branch through `branch_id`.

## 5.3 Departments

The system shall support departments under the organization.

Examples:

- HR
- Finance
- IT
- Sales
- Operations

## 5.4 Designations

The system shall maintain employee designations.

## 5.5 Shifts

The system shall support employee shifts for attendance and working-hour calculations.

## 5.6 Reporting Hierarchy

Employees may have a manager through:

`employees.manager_id → employees.id`

The hierarchy controls team visibility and approval workflows.

---

# 6. Authentication & Security

## Requirements

The system shall provide:

- Login
- Logout
- Password hashing
- JWT authentication
- Refresh-token handling
- Role-based access control
- Permission-based access control
- Session termination
- Protected routes
- Secure API authorization

### Authentication Flow

```text
Login
  ↓
Validate Credentials
  ↓
Generate Access Token
  ↓
Generate Refresh Token
  ↓
Load Roles & Permissions
  ↓
Route User to Correct Portal
```

### Security

Passwords shall be securely hashed using bcrypt.

Sensitive actions shall be recorded in audit logs.

---

# 7. Role-Based Access Control

The authorization model shall use:

```text
Users
  ↓
User Roles
  ↓
Roles
  ↓
Role Permissions
  ↓
Permissions
```

Permissions should be granular enough to control actions such as:

- View
- Create
- Update
- Delete
- Approve
- Reject
- Export
- Verify
- Allocate
- Process

Permissions should also respect organizational scope where applicable.

---

# 8. Employee Management

## 8.1 Employee Creation

Authorized HR users shall be able to create employees.

Employee records should include:

- Employee code
- First name
- Last name
- Profile image
- Email
- Phone
- Date of birth
- Date of joining
- Company
- Branch
- Department
- Designation
- Manager
- Employment status
- Address
- Emergency contact
- Document verification status

## 8.2 Employee Profile

Employees can view their own profile.

Authorized HR/management users can view employees within their permitted scope.

## 8.3 Employee Profile Image

The system shall support employee profile-image upload and management.

## 8.4 Branch Assignment

Each employee must have a `branch_id`.

The system should maintain branch-transfer history.

### Branch Transfer History

```text
employee_id
branch_id
effective_from
effective_to
transfer_reason
transferred_by
```

## 8.5 Document Verification

Employees can upload required documents.

HR-authorized users can verify documents.

The employee record shall contain:

```text
documents_verified BOOLEAN DEFAULT FALSE
```

Individual documents remain stored in:

```text
employee_documents
```

---

# 9. Document Management

## Document Types

The system shall define document categories using `document_types`.

## Employee Documents

The system shall use:

```text
employee_documents
```

This table must not be renamed to `documents`.

Each document belongs to an employee through:

```text
employee_documents.employee_id
    ↓
employees.id
```

Document functionality:

- Upload
- View
- Download where permitted
- Verify
- Reject
- Expiry tracking
- Status tracking
- Upload history

---

# 10. Attendance Management

## 10.1 Employee Check-In

Employees shall be able to check in.

The system records:

- Employee
- Attendance date
- Timestamp
- Shift
- Check-in event
- Device/IP/location information where configured

## 10.2 Employee Check-Out

Employees shall be able to check out.

The system records the checkout event and calculates working time.

## 10.3 Attendance History

Employees shall be able to view their attendance history.

Managers and authorized HR users shall be able to view attendance for permitted employees.

## 10.4 Attendance Calculation

The system should calculate:

- Working hours
- Regular hours
- Overtime hours

## 10.5 Attendance Logs

Check-in and check-out events shall be retained in:

```text
attendance_logs
```

Event types:

- CHECK_IN
- CHECK_OUT

## 10.6 Attendance Adjustment

Authorized users may modify attendance according to permission.

Attendance adjustments must be auditable.

---

# 11. Overtime Management

The system shall identify overtime based on configured shift/attendance rules.

### Flow

```text
Check In
   ↓
Check Out
   ↓
Calculate Actual Hours
   ↓
Compare With Regular Hours
   ↓
Overtime Detected?
   ↓ Yes
Calculate Overtime
   ↓
Create Overtime Record
   ↓
Send Overtime Alert
```

The system shall support:

- Overtime calculation
- Overtime status
- Overtime approval
- Overtime alerts
- Overtime history
- Overtime reporting

Overtime records shall be stored in:

```text
overtime_records
```

---

# 12. Leave Management

## Leave Types

HR-authorized users shall define leave types.

Examples:

- Casual Leave
- Sick Leave
- Earned Leave
- Other company-defined leave

## Leave Allocation

Each employee shall have an annual leave balance.

The system shall support:

- Allocated leave
- Used leave
- Pending leave
- Remaining leave
- Carried-forward leave

Example:

```text
Allocated = 12
Used = 4
Pending = 1
Remaining = 7
```

## Leave Application

Employees shall be able to:

- Select leave type
- Select dates
- Enter reason
- Submit request
- View status
- Cancel eligible requests

## Approval

Managers/HR-authorized users shall be able to:

- Approve
- Reject
- Review leave requests

All approval actions should be auditable.

---

# 13. Payroll Management

The payroll module shall calculate employee compensation.

## Salary Calculation

```text
Basic Salary
+ Allowances
+ Bonus
+ Overtime
+ Other Additions
-------------------------
= Gross Salary

Gross Salary
- Income Tax
- PF
- ESI
- Professional Tax
- Other Deductions
-------------------------
= Net Salary
```

## Payroll Requirements

The system shall support:

- Salary structures
- Salary components
- Monthly payroll
- Additions
- Deductions
- Tax deduction
- Overtime
- Gross salary
- Net salary
- Payroll status
- Payslip generation

## Payroll Additions

Examples:

- HRA
- Travel Allowance
- Performance Bonus
- Overtime
- Incentive
- Commission
- Other Allowance

## Payroll Deductions

Examples:

- Income Tax
- PF
- ESI
- Professional Tax
- Loan Deduction
- Advance Salary
- Late Deduction
- Other Deduction

---

# 14. Payslips

Authorized payroll users shall be able to generate payslips.

Employees shall be able to view/download their own payslips according to permissions.

Payslips should contain:

- Employee information
- Salary period
- Basic salary
- Additions
- Deductions
- Tax
- Gross salary
- Net salary

---

# 15. Project & Task Management

## 15.1 Projects

Managers/authorized users shall be able to create projects.

Project information:

- Project name
- Description
- Branch
- Department
- Manager
- Start date
- End date
- Status

## 15.2 Tasks

Managers shall be able to:

- Create tasks
- Assign tasks
- Assign multiple employees
- Set priority
- Set start date
- Set deadline
- Monitor progress

## Task Status

```text
BACKLOG
ASSIGNED
IN PROGRESS
BLOCKED
COMPLETED
UNDER REVIEW
CLOSED
CANCELLED
```

## Priority

```text
LOW
MEDIUM
HIGH
URGENT
```

## Employee Task Updates

Employees shall be able to update:

- Status
- Progress percentage
- Work notes
- Blockers
- Time spent
- Comments
- Attachments

Employees can mark tasks as completed or submit them for review according to workflow.

## Manager Monitoring

Managers shall be able to monitor:

- Assigned tasks
- Progress percentage
- Status
- Deadlines
- Overdue tasks
- Blockers
- Time spent
- Completion history

---

# 16. Wallet Management

The wallet is a **company-funded internal business-expense wallet**, not a personal banking or cryptocurrency wallet.

## Wallet Purpose

Authorized superiors can allocate company funds to eligible employees/managers for business or management expenses.

## Wallet Flow

```text
Superior
   ↓
Fund Allocation
   ↓
Employee / Manager Wallet
   ↓
Business Expense
   ↓
Expense Request
   ↓
Approval
   ↓
Wallet Debit
   ↓
Ledger Transaction
```

## Wallet Requirements

Each eligible user may have a wallet.

The wallet shall support:

- Current balance
- Fund allocation
- Wallet credit
- Wallet debit
- Transaction history
- Expense linkage
- Refund/reversal
- Freeze/unfreeze
- Spending limits

## Fund Allocation

Authorized managers/HR users can allocate funds to subordinate wallets according to permissions.

Allocation records should contain:

- Sender
- Recipient
- Amount
- Purpose
- Branch
- Date
- Status
- Approval information where applicable

---

# 17. Management Expenses

## Expense Categories

Examples:

- Travel
- Fuel
- Accommodation
- Meals
- Office Supplies
- Client Meeting
- Transportation
- Communication
- Training
- Other Business Expense

## Expense Request

Employees/managers shall be able to submit expenses according to permission.

Expense requests may contain:

- Category
- Amount
- Date
- Description
- Business purpose
- Wallet
- Receipt
- Status

## Receipt Management

Receipts can be uploaded and linked to expense requests.

## Approval

Authorized managers/HR users shall be able to:

- Review
- Approve
- Reject
- Request correction

## Expense Limits

The system should support configurable:

- Per-transaction limits
- Daily limits
- Monthly limits
- Category limits
- Branch limits
- Approval thresholds
- Receipt requirements

## Wallet Ledger

Every wallet balance change must create a transaction.

The system must not silently overwrite historical wallet transactions.

Corrections should be represented through new transactions such as:

- Refund
- Reversal
- Adjustment

---

# 18. Recruitment / ATS

The recruitment module shall support:

```text
Job Requisition
      ↓
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

Features:

- Job requisitions
- Job postings
- Candidate records
- Applications
- Screening
- Interviews
- Offers
- Hiring conversion

---

# 19. Performance Management

The performance module shall support:

- Performance cycles
- Goals
- Reviews
- Feedback

Managers and authorized HR users can evaluate employee performance.

Task progress can provide factual work-progress information for reviews, but task management and performance management remain separate modules.

---

# 20. Work From Home

Employees shall be able to submit WFH requests.

WFH requests should contain:

- Employee
- Date/date range
- Reason
- Status
- Approver
- Approval/rejection information

Managers/HR-authorized users shall be able to:

- Approve
- Reject
- Review
- View WFH history

---

# 21. Holidays & Calendar

The system shall support:

- Holiday creation
- Holiday dates
- Holiday descriptions
- Branch-specific holidays
- Employee holiday calendar

Branches may have different holiday schedules.

---

# 22. Announcements

Authorized users shall be able to create company/branch/team announcements.

Announcements can be targeted based on:

- Company
- Branch
- Department
- Role
- Employees

Employees shall see announcements relevant to their scope.

---

# 23. Notifications

The system shall provide notifications for important events.

Potential notification events:

- Leave submitted
- Leave approved/rejected
- WFH submitted
- WFH approved/rejected
- Task assigned
- Task status changed
- Task deadline approaching
- Task overdue
- Overtime detected
- Expense submitted
- Expense approved/rejected
- Wallet funded
- Document verification status changed
- Payroll processed
- New announcement

Notification preferences shall be configurable.

---

# 24. Reports & Analytics

The system shall provide reports for authorized users.

## Employee Reports

- Employee count
- Active/inactive employees
- Branch-wise employees
- Department-wise employees
- Designation-wise employees

## Attendance Reports

- Daily attendance
- Monthly attendance
- Absence
- Late attendance
- Working hours
- Overtime

## Leave Reports

- Leave allocation
- Leave usage
- Pending requests
- Approved/rejected requests
- Department/branch leave summary

## Payroll Reports

- Monthly payroll
- Gross salary
- Additions
- Deductions
- Tax
- Net salary
- Overtime cost

## Task Reports

- Assigned tasks
- Completed tasks
- Overdue tasks
- Progress
- Employee workload
- Team productivity information

## Expense Reports

- Wallet balances
- Fund allocations
- Expenses
- Category-wise expenses
- Branch-wise expenses
- Employee-wise expenses
- Pending approvals

## Recruitment Reports

- Open positions
- Applications
- Interviews
- Offers
- Hiring conversion

---

# 25. Audit Logs

Sensitive actions shall be recorded.

Examples:

- Employee created
- Employee updated
- Employee deactivated
- Branch changed
- Document verified
- Salary changed
- Payroll processed
- Leave approved/rejected
- Wallet funded
- Expense approved/rejected
- Task reassigned
- Permission changed
- Role changed

Audit records should contain enough information to identify:

- Actor
- Action
- Entity
- Entity ID
- Timestamp
- Relevant change/context
- Request metadata where appropriate

---

# 26. System Settings

System administrators shall be able to configure system-wide settings.

Potential settings include:

- Company configuration
- Attendance policies
- Overtime rules
- Leave rules
- Payroll settings
- Expense limits
- Notification settings
- Approval thresholds
- Security settings

---

# 27. Core Business Rules

## Employee

- Every employee belongs to a company.
- Every employee belongs to a branch.
- Employees may belong to a department and designation.
- Employees may have a manager.
- Employee code must be unique.
- Overall document verification is represented by `documents_verified`.

## Attendance

- Check-in and check-out events must be recorded.
- Working hours should be calculated from attendance events.
- Overtime should be calculated according to configured rules.
- Attendance modifications must be auditable.

## Leave

- Leave balances must be tracked per employee and leave type.
- Pending leave must be distinguished from used leave.
- Approval changes must update the relevant balance appropriately.

## Payroll

- Payroll must retain additions and deductions.
- Tax deductions must be separately identifiable.
- Net salary must be derived from gross salary and deductions.
- Processed payroll should not be silently altered.

## Tasks

- Tasks can have multiple assignees.
- Employees can update progress.
- Managers can monitor team task progress.
- Task history should be retained.

## Wallet

- Wallets represent company funds.
- Every wallet balance change must have a ledger transaction.
- Fund allocation must identify sender and recipient.
- Expense debits should be traceable to expense requests.
- Refunds/reversals should create new ledger entries.

## Documents

- Individual documents are stored in `employee_documents`.
- `employee_documents.employee_id` references `employees.id`.
- Document verification should be auditable.

---

# 28. Non-Functional Requirements

## Security

- Secure password hashing
- JWT authentication
- Refresh-token security
- RBAC
- Permission checks
- Input validation
- Protected API routes
- Audit logging

## Performance

The application should provide responsive interaction for normal HRMS operations and efficiently handle lists, dashboards, reports, and searches.

## Scalability

The architecture should support:

- Multiple branches
- Growing employee counts
- Increasing transaction volume
- Additional modules
- Additional permissions

## Reliability

Critical data operations should use appropriate database transactions and preserve historical records where required.

## Data Integrity

Foreign-key relationships and validation rules must prevent invalid organizational and transactional data.

---

# 29. Technical Requirements

## Frontend

```text
React.js
Vite
Tailwind CSS
Motion
Lucide React
```

Motion shall be used for appropriate:

- Page transitions
- Dashboard animations
- Sidebar interactions
- Modal/dropdown animations
- Card/list animations
- Hover interactions
- Progress animations
- Loading states
- Notification animations
- UI micro-interactions

## Backend

```text
Node.js
Express.js
REST API
JWT Authentication
RBAC / Permissions
Zod Validation
bcrypt
```

## Database

```text
PostgreSQL
Prisma ORM
```

## Development

```text
Git
GitHub
```

---

# 30. High-Level Request Flow

```text
Frontend
   ↓
React Router
   ↓
Authentication Guard
   ↓
Permission Guard
   ↓
REST API
   ↓
Express Routes
   ↓
Authentication Middleware
   ↓
Permission Middleware
   ↓
Zod Validation
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Prisma ORM
   ↓
PostgreSQL
```

---

# 31. Core User Flows

## Login

```text
User
 ↓
Login
 ↓
Validate Credentials
 ↓
Load Roles
 ↓
Load Permissions
 ↓
Determine Portal
 ↓
Dashboard
```

## Employee Onboarding

```text
HR
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
Upload Documents
 ↓
Document Verification
 ↓
Employee Active
```

## Attendance

```text
Employee
 ↓
Check In
 ↓
Work
 ↓
Check Out
 ↓
Calculate Hours
 ↓
Check Overtime
 ↓
Update Attendance
 ↓
Generate Alert if Required
```

## Leave

```text
Employee
 ↓
Select Leave Type
 ↓
Select Dates
 ↓
Submit
 ↓
Manager/HR Review
 ↓
Approve / Reject
 ↓
Update Leave Balance
 ↓
Notify Employee
```

## Payroll

```text
Salary Structure
 ↓
Basic Salary
 ↓
Additions
 ↓
Overtime
 ↓
Gross Salary
 ↓
Deductions
 ↓
Tax
 ↓
Net Salary
 ↓
Payslip
```

## Task

```text
Manager
 ↓
Create Project/Task
 ↓
Assign Employee(s)
 ↓
Employee Works
 ↓
Progress Update
 ↓
Manager Monitors
 ↓
Review
 ↓
Complete / Close
```

## Wallet / Expense

```text
Superior
 ↓
Allocate Funds
 ↓
Employee Wallet
 ↓
Business Expense
 ↓
Submit Expense
 ↓
Attach Receipt
 ↓
Approval
 ↓
Wallet Transaction
 ↓
Expense Report
```

## Recruitment

```text
Requisition
 ↓
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
Hire
 ↓
Employee
```

---

# 32. Database Scope

The current planned database contains **61 tables**.

### Authentication & Access

1. `users`
2. `roles`
3. `permissions`
4. `user_roles`
5. `role_permissions`
6. `refresh_tokens`

### Organization

7. `companies`
8. `branches`
9. `departments`
10. `designations`
11. `shifts`

### Employees

12. `employees`
13. `employee_branch_history`

### Attendance

14. `attendance`
15. `attendance_logs`
16. `attendance_adjustments`
17. `attendance_policies`
18. `overtime_records`

### Leave

19. `leave_types`
20. `leave_balances`
21. `leave_requests`
22. `leave_approvals`

### Payroll

23. `salary_structures`
24. `salary_components`
25. `payroll`
26. `payslips`
27. `payroll_additions`
28. `payroll_deductions`

### Tasks

29. `projects`
30. `tasks`
31. `task_assignments`
32. `task_updates`
33. `task_comments`
34. `task_time_logs`
35. `task_attachments`

### Wallet & Expenses

36. `wallets`
37. `wallet_transactions`
38. `fund_allocations`
39. `expense_categories`
40. `expense_requests`
41. `expense_receipts`

### Recruitment

42. `job_requisitions`
43. `job_postings`
44. `candidates`
45. `applications`
46. `interviews`
47. `offers`

### Performance

48. `performance_cycles`
49. `performance_goals`
50. `performance_reviews`
51. `performance_feedback`

### WFH & Documents

52. `wfh_requests`
53. `document_types`
54. `employee_documents`

### Calendar & Communication

55. `holidays`
56. `holiday_branches`
57. `announcements`
58. `announcement_targets`
59. `notifications`
60. `notification_preferences`

### Audit

61. `audit_logs`

---

# 33. Key Employee Data Model

```text
employees
---------
id PK
user_id FK → users.id
company_id FK → companies.id
branch_id FK → branches.id
department_id FK → departments.id
designation_id FK → designations.id
manager_id FK → employees.id
employee_code UNIQUE
first_name
last_name
profile_image
phone
email
date_of_birth
date_of_joining
employment_status
documents_verified BOOLEAN DEFAULT FALSE
address
emergency_contact
created_at
updated_at
```

---

# 34. Employee Document Data Model

```text
employee_documents
------------------
id PK
employee_id FK → employees.id
document_type_id FK → document_types.id
file_name
file_path
uploaded_by FK → users.id
uploaded_at
expiry_date
status
```

Relationship:

```text
EMPLOYEES 1 : N EMPLOYEE_DOCUMENTS
```

---

# 35. Attendance Data Model

```text
attendance
----------
id
employee_id
shift_id
attendance_date
status
working_hours
regular_hours
overtime_hours
overtime_status
overtime_alert_sent
remarks
created_at
updated_at
```

```text
attendance_logs
---------------
id
employee_id
attendance_id
event_type
event_time
location
ip_address
device_info
created_at
```

```text
overtime_records
----------------
id
employee_id
attendance_id
overtime_date
regular_hours
actual_hours
overtime_hours
status
approved_by
approved_at
created_at
```

---

# 36. Leave Balance Data Model

```text
leave_balances
--------------
id
employee_id
leave_type_id
year
allocated
used
pending
remaining
carried_forward
```

---

# 37. Payroll Data Model

```text
payroll
-------
id
employee_id
month
year
basic_salary
gross_salary
total_additions
total_deductions
tax_deduction
net_salary
status
processed_at
```

```text
payroll_additions
-----------------
id
payroll_id
employee_id
name
type
amount
description
created_at
```

```text
payroll_deductions
------------------
id
payroll_id
employee_id
name
type
amount
description
created_at
```

---

# 38. Task Data Model

```text
projects
--------
project_id
branch_id
department_id
manager_id
project_name
description
start_date
end_date
status
```

```text
tasks
-----
task_id
branch_id
project_id
created_by
title
description
priority
status
start_date
due_date
completed_at
created_at
updated_at
```

```text
task_assignments
----------------
assignment_id
task_id
employee_id
assigned_by
assigned_at
status
```

```text
task_updates
------------
update_id
task_id
employee_id
progress_percentage
status
update_text
blocker
created_at
```

```text
task_comments
-------------
comment_id
task_id
employee_id
comment
created_at
```

```text
task_time_logs
--------------
time_log_id
task_id
employee_id
work_date
hours
description
```

---

# 39. Wallet Data Model

Core wallet entities:

```text
wallets
wallet_transactions
fund_allocations
expense_categories
expense_requests
expense_receipts
```

The wallet system must preserve a traceable transaction history for every balance change.

---

# 40. Acceptance Criteria — Baseline

## Authentication

- User can log in with valid credentials.
- Invalid credentials are rejected.
- Unauthorized users cannot access protected resources.
- Users receive access according to roles and permissions.
- Logout terminates the active session/token flow.

## Employee Management

- Authorized HR users can create employees.
- Employee records require company and branch association.
- Employee profile images can be stored.
- Employees can be assigned managers.
- Documents can be uploaded.
- Documents can be verified.
- Overall document verification status is maintained.

## Attendance

- Employee can check in.
- Employee can check out.
- Check-in/check-out events are retained.
- Working hours are calculated.
- Overtime is calculated according to configured rules.
- Overtime alerts can be generated.
- Attendance modifications are auditable.

## Leave

- Leave types can be configured.
- Employee leave balances can be allocated.
- Employees can submit leave requests.
- Authorized users can approve/reject requests.
- Leave balances update according to approved requests.

## Payroll

- Salary structures can be configured.
- Additions and deductions can be recorded.
- Tax deductions can be recorded separately.
- Overtime can contribute to payroll.
- Gross and net salary can be calculated.
- Payslips can be generated.

## Tasks

- Managers can create tasks.
- Tasks can be assigned to one or multiple employees.
- Employees can update progress.
- Managers can monitor progress.
- Task comments and updates are retained.
- Task deadlines and overdue states are visible.

## Wallet / Expenses

- Eligible users can have wallets.
- Authorized superiors can allocate funds.
- Wallet balances reflect ledger transactions.
- Employees can submit business expenses.
- Receipts can be attached.
- Authorized users can approve/reject expenses.
- Refunds/reversals remain traceable.

## Recruitment

- Authorized users can create requisitions.
- Job postings can be created.
- Candidates and applications can be tracked.
- Interviews can be recorded.
- Offers can be recorded.
- Successful hiring can lead to employee creation.

## Performance

- Performance cycles can be created.
- Goals can be assigned.
- Reviews can be recorded.
- Feedback can be recorded.

## WFH

- Employees can submit WFH requests.
- Managers/HR can approve/reject requests.
- WFH history is available.

## Notifications

- Important workflow events generate notifications where configured.
- Users can manage notification preferences.

## Audit

- Sensitive operations create audit records.
- Audit records identify the actor and affected entity.

---

# 41. Future Expansion

Potential future capabilities can include:

- Mobile application
- Biometric attendance integration
- GPS/geofencing attendance
- Email/SMS/WhatsApp integrations
- Advanced payroll compliance automation
- Advanced analytics dashboards
- Expense card integration
- Recruitment portal integration
- Third-party accounting integration
- Advanced workflow automation
- Multi-company tenancy
- Advanced approval workflows

These are not required for the baseline implementation unless explicitly added to scope.

---

# 42. MVP Implementation Priority

## Phase 1 — Foundation

- Authentication
- Users
- Roles
- Permissions
- Company
- Branches
- Departments
- Designations
- Shifts

## Phase 2 — Core HR

- Employee management
- Employee documents
- Attendance
- Overtime
- Leave

## Phase 3 — Payroll

- Salary structures
- Payroll
- Additions
- Deductions
- Payslips

## Phase 4 — Operations

- Projects
- Tasks
- Task progress
- Wallet
- Management expenses

## Phase 5 — Advanced HR

- Recruitment
- Performance
- WFH
- Holidays
- Announcements
- Notifications

## Phase 6 — Intelligence & Governance

- Reports
- Analytics
- Audit logs
- Advanced settings

---

# 43. Definition of Done

A module is considered complete when:

1. Database schema is implemented.
2. Backend API is implemented.
3. Authentication/permission checks are applied.
4. Validation is implemented.
5. Frontend pages are implemented.
6. Loading/error/empty states are handled.
7. Required notifications are implemented.
8. Audit requirements are implemented.
9. Reports are implemented where required.
10. Core acceptance criteria pass.
11. Sensitive operations are tested.
12. The feature works correctly within company/branch/role scope.

---

## End of PRD
