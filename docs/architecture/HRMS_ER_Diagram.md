# HRMS — ER Diagram

## 1. Master ER Diagram

```text
                         ┌───────────────────┐
                         │       ROLES       │
                         ├───────────────────┤
                         │ PK role_id        │
                         │ role_name         │
                         └─────────┬─────────┘
                                   │ 1:N
                                   ▼
                         ┌───────────────────┐
                         │       USERS       │
                         ├───────────────────┤
                         │ PK user_id        │
                         │ FK employee_id    │
                         │ FK role_id        │
                         │ username          │
                         │ password_hash     │
                         │ status            │
                         │ last_login        │
                         └─────────┬─────────┘
                                   │
                                   │ 1:N
                                   ▼
                         ┌───────────────────┐
                         │    AUDIT_LOGS     │
                         ├───────────────────┤
                         │ PK log_id         │
                         │ FK user_id        │
                         │ action            │
                         │ module            │
                         │ entity_type       │
                         │ entity_id         │
                         │ old_value         │
                         │ new_value         │
                         │ ip_address        │
                         │ created_at        │
                         └───────────────────┘


┌───────────────────┐       1:N       ┌──────────────────────────┐
│    DEPARTMENTS    │────────────────►│        EMPLOYEES         │
├───────────────────┤                 ├──────────────────────────┤
│ PK department_id  │                 │ PK employee_id            │
│ department_name   │                 │ FK department_id          │
│ description       │                 │ FK designation_id         │
│ FK head_employee  │                 │ FK manager_id             │
└───────────────────┘                 │ FK shift_id               │
                                      │ employee_code             │
┌───────────────────┐       1:N       │ first_name                │
│   DESIGNATIONS    │────────────────►│ last_name                 │
├───────────────────┤                 │ email                     │
│ PK designation_id │                 │ phone                     │
│ designation_name  │                 │ joining_date              │
│ description       │                 │ employment_status         │
└───────────────────┘                 └───────────┬───────────────┘
                                                  │
                    ┌─────────────────────────────┼──────────────────────────┐
                    │             │               │              │           │
                    ▼             ▼               ▼              ▼           ▼
             ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐
             │ ATTENDANCE │ │   LEAVES   │ │  PAYROLL   │ │ DOCUMENTS  │ │    GOALS   │
             └────────────┘ └────────────┘ └────────────┘ └────────────┘ └────────────┘
                    │             │               │              │
                    │             ▼               ▼              │
                    │       ┌────────────┐  ┌────────────┐       │
                    │       │LEAVE_TYPES │  │  PAYSLIPS  │       │
                    │       └────────────┘  └────────────┘       │
                    │                                            │
                    ▼                                            ▼
              ATTENDANCE                                  EMPLOYEE_DOCUMENTS


┌───────────────────┐       1:N       ┌───────────────────┐
│      SHIFTS       │────────────────►│     EMPLOYEES     │
├───────────────────┤                 └───────────────────┘
│ PK shift_id       │
│ shift_name        │
│ start_time        │
│ end_time          │
│ grace_period      │
└───────────────────┘


┌──────────────────────────┐
│    LEAVE_POLICIES        │
├──────────────────────────┤
│ PK policy_id             │
│ FK leave_type_id         │
│ FK department_id         │
│ annual_limit             │
│ carry_forward            │
└──────────────┬───────────┘
               │
               ▼
          LEAVE_TYPES


┌──────────────────────────┐
│    LEAVE_BALANCES        │
├──────────────────────────┤
│ PK balance_id            │
│ FK employee_id           │
│ FK leave_type_id         │
│ year                     │
│ allocated_days           │
│ used_days                │
│ remaining_days           │
└──────────────────────────┘


┌──────────────────────────┐
│     LEAVE_REQUESTS       │
├──────────────────────────┤
│ PK leave_id              │
│ FK employee_id           │
│ FK leave_type_id         │
│ FK approved_by           │
│ start_date               │
│ end_date                 │
│ total_days               │
│ reason                   │
│ status                   │
│ applied_at               │
│ approved_at              │
└──────────────────────────┘


┌──────────────────────────┐
│   SALARY_STRUCTURES      │
├──────────────────────────┤
│ PK structure_id          │
│ structure_name           │
│ effective_from           │
│ effective_to             │
└──────────────┬───────────┘
               │ 1:N
               ▼
┌──────────────────────────┐
│    EMPLOYEE_SALARY       │
├──────────────────────────┤
│ PK employee_salary_id    │
│ FK employee_id           │
│ FK structure_id          │
│ basic_salary             │
│ effective_from           │
└──────────────┬───────────┘
               │
               ▼
┌──────────────────────────┐
│         PAYROLL          │
├──────────────────────────┤
│ PK payroll_id            │
│ FK employee_id           │
│ payroll_month            │
│ basic_salary             │
│ allowances               │
│ overtime_amount          │
│ bonus                    │
│ gross_salary             │
│ deductions               │
│ tax                      │
│ net_salary               │
│ status                   │
└──────────────┬───────────┘
               │ 1:1
               ▼
┌──────────────────────────┐
│        PAYSLIPS          │
├──────────────────────────┤
│ PK payslip_id            │
│ FK payroll_id            │
│ file_path                │
│ generated_at             │
└──────────────────────────┘
```

## 2. Attendance Entity

```text
┌─────────────────────────────┐
│         ATTENDANCE          │
├─────────────────────────────┤
│ PK attendance_id            │
│ FK employee_id              │
│ date                        │
│ check_in                    │
│ check_out                   │
│ status                      │
│ working_hours               │
│ overtime_hours              │
│ attendance_type             │
│ remarks                     │
└─────────────────────────────┘

EMPLOYEES 1 ─────────── N ATTENDANCE
```

## 3. WFH Entity

```text
┌─────────────────────────────┐
│        WFH_REQUESTS         │
├─────────────────────────────┤
│ PK wfh_id                   │
│ FK employee_id              │
│ FK approved_by              │
│ start_date                  │
│ end_date                    │
│ reason                      │
│ status                      │
│ applied_at                  │
└─────────────────────────────┘

EMPLOYEES 1 ─────────── N WFH_REQUESTS
```

## 4. Recruitment ER

```text
┌─────────────────────────┐
│      JOB_POSTINGS       │
├─────────────────────────┤
│ PK job_id               │
│ FK department_id        │
│ FK designation_id       │
│ title                   │
│ description             │
│ requirements            │
│ vacancies               │
│ status                  │
│ created_at              │
└────────────┬────────────┘
             │ 1:N
             ▼
┌─────────────────────────┐
│      APPLICATIONS       │
├─────────────────────────┤
│ PK application_id       │
│ FK job_id               │
│ FK candidate_id         │
│ applied_at              │
│ status                  │
│ source                  │
└────────────┬────────────┘
             │ N:1
             ▼
┌─────────────────────────┐
│       CANDIDATES        │
├─────────────────────────┤
│ PK candidate_id         │
│ name                    │
│ email                   │
│ phone                   │
│ resume_path             │
│ experience              │
│ status                  │
└────────────┬────────────┘
             │ 1:N
             ▼
┌─────────────────────────┐
│       INTERVIEWS        │
├─────────────────────────┤
│ PK interview_id         │
│ FK application_id       │
│ interviewer_id          │
│ scheduled_at            │
│ feedback                │
│ status                  │
└─────────────────────────┘

APPLICATIONS 1 ───────── N INTERVIEWS
```

## 5. Performance ER

```text
┌─────────────────────────┐
│         GOALS           │
├─────────────────────────┤
│ PK goal_id              │
│ FK employee_id          │
│ title                   │
│ description             │
│ target_date             │
│ status                  │
└────────────┬────────────┘
             │
             ▼
         EMPLOYEES


┌─────────────────────────┐
│   PERFORMANCE_REVIEWS   │
├─────────────────────────┤
│ PK review_id            │
│ FK employee_id          │
│ FK reviewer_id          │
│ review_period           │
│ rating                  │
│ comments                │
│ employee_comments       │
│ review_date              │
└─────────────────────────┘

EMPLOYEES 1 ───────── N GOALS
EMPLOYEES 1 ───────── N PERFORMANCE_REVIEWS
```

## 6. Documents ER

```text
┌─────────────────────────┐
│     DOCUMENT_TYPES      │
├─────────────────────────┤
│ PK document_type_id     │
│ type_name               │
│ description             │
└────────────┬────────────┘
             │ 1:N
             ▼
┌─────────────────────────┐
│   EMPLOYEE_DOCUMENTS    │
├─────────────────────────┤
│ PK document_id          │
│ FK employee_id          │
│ FK document_type_id     │
│ document_name           │
│ file_path               │
│ uploaded_at             │
└─────────────────────────┘

EMPLOYEES 1 ───────── N EMPLOYEE_DOCUMENTS
```

## 7. Communication ER

```text
┌─────────────────────────┐
│     ANNOUNCEMENTS       │
├─────────────────────────┤
│ PK announcement_id      │
│ FK created_by           │
│ FK department_id        │
│ title                   │
│ description             │
│ publish_date            │
│ expiry_date             │
│ status                  │
└─────────────────────────┘


┌─────────────────────────┐
│      NOTIFICATIONS      │
├─────────────────────────┤
│ PK notification_id      │
│ FK employee_id          │
│ title                   │
│ message                 │
│ type                    │
│ is_read                 │
│ created_at              │
└─────────────────────────┘

EMPLOYEES 1 ───────── N NOTIFICATIONS
```

## 8. Calendar ER

```text
┌─────────────────────────┐
│        HOLIDAYS         │
├─────────────────────────┤
│ PK holiday_id           │
│ holiday_name            │
│ holiday_date            │
│ description             │
│ status                  │
└─────────────────────────┘


┌─────────────────────────┐
│      WORKING_DAYS       │
├─────────────────────────┤
│ PK working_day_id       │
│ day_of_week             │
│ is_working              │
│ start_time              │
│ end_time                │
└─────────────────────────┘
```

## 9. RBAC ER

```text
┌───────────────┐       N:M       ┌──────────────────┐
│     ROLES     │─────────────────│   PERMISSIONS    │
└───────┬───────┘                 └──────────────────┘
        │
        │ 1:N
        ▼
      USERS
```

If implemented relationally, use a junction table:

```text
┌─────────────────────────┐
│    ROLE_PERMISSIONS     │
├─────────────────────────┤
│ PK role_permission_id   │
│ FK role_id              │
│ FK permission_id        │
└─────────────────────────┘
```

## 10. Complete Table Inventory

### Authentication / Access

1. `users`
2. `roles`
3. `permissions`
4. `role_permissions`
5. `user_sessions`

### Organization

6. `departments`
7. `designations`
8. `employees`
9. `employee_managers`
10. `shifts`

### Attendance

11. `attendance`
12. `attendance_adjustments`
13. `overtime`

### Leave

14. `leave_types`
15. `leave_policies`
16. `leave_balances`
17. `leave_requests`

### Payroll

18. `salary_structures`
19. `salary_components`
20. `employee_salary`
21. `payroll`
22. `payroll_items`
23. `payslips`

### Recruitment

24. `job_postings`
25. `candidates`
26. `applications`
27. `interviews`
28. `offers`

### Performance

29. `goals`
30. `performance_reviews`
31. `performance_review_items`

### WFH

32. `wfh_requests`

### Documents

33. `document_types`
34. `employee_documents`

### Communication

35. `announcements`
36. `notifications`

### Calendar

37. `holidays`
38. `working_days`

### System

39. `audit_logs`
40. `system_settings`

## 11. Core Relationship Summary

```text
ROLES 1:N USERS

USERS 1:1 EMPLOYEES
USERS 1:N AUDIT_LOGS

DEPARTMENTS 1:N EMPLOYEES
DESIGNATIONS 1:N EMPLOYEES
SHIFTS 1:N EMPLOYEES

EMPLOYEES 1:N ATTENDANCE
EMPLOYEES 1:N LEAVE_REQUESTS
EMPLOYEES 1:N LEAVE_BALANCES
EMPLOYEES 1:N EMPLOYEE_DOCUMENTS
EMPLOYEES 1:N WFH_REQUESTS
EMPLOYEES 1:N GOALS
EMPLOYEES 1:N PERFORMANCE_REVIEWS
EMPLOYEES 1:N NOTIFICATIONS
EMPLOYEES 1:N PAYROLL

LEAVE_TYPES 1:N LEAVE_REQUESTS
LEAVE_TYPES 1:N LEAVE_BALANCES
LEAVE_TYPES 1:N LEAVE_POLICIES

SALARY_STRUCTURES 1:N EMPLOYEE_SALARY
EMPLOYEE_SALARY 1:N PAYROLL
PAYROLL 1:1 PAYSLIPS

DEPARTMENTS 1:N JOB_POSTINGS
DESIGNATIONS 1:N JOB_POSTINGS
JOB_POSTINGS 1:N APPLICATIONS
CANDIDATES 1:N APPLICATIONS
APPLICATIONS 1:N INTERVIEWS

ROLES N:M PERMISSIONS
```

## 12. Wallet & Expense ER

```text
┌───────────────────────────┐
│          WALLETS          │
├───────────────────────────┤
│ PK wallet_id              │
│ FK employee_id            │
│ FK branch_id              │
│ wallet_name               │
│ spending_limit            │
│ status                    │
│ created_at                │
└──────────────┬────────────┘
               │ 1:N
               ▼
┌───────────────────────────┐
│     WALLET_TRANSACTIONS   │
├───────────────────────────┤
│ PK transaction_id         │
│ FK wallet_id              │
│ FK created_by             │
│ transaction_type          │
│ amount                    │
│ balance_after             │
│ reference_type            │
│ reference_id              │
│ description               │
│ created_at                │
└───────────────────────────┘

┌───────────────────────────┐
│    EXPENSE_CATEGORIES     │
├───────────────────────────┤
│ PK category_id            │
│ category_name             │
│ description               │
│ spending_limit            │
│ receipt_required          │
│ status                    │
└──────────────┬────────────┘
               │ 1:N
               ▼
┌───────────────────────────┐
│      EXPENSE_REQUESTS     │
├───────────────────────────┤
│ PK expense_id             │
│ FK wallet_id              │
│ FK employee_id            │
│ FK category_id            │
│ FK approver_id            │
│ amount                    │
│ expense_date              │
│ description               │
│ status                    │
│ submitted_at              │
│ approved_at               │
└──────────────┬────────────┘
               │ 1:N
               ▼
┌───────────────────────────┐
│     EXPENSE_RECEIPTS      │
├───────────────────────────┤
│ PK receipt_id             │
│ FK expense_id             │
│ file_path                 │
│ file_name                 │
│ uploaded_at               │
└───────────────────────────┘
```

## 13. Fund Allocation ER

```text
┌───────────────────────────┐
│     FUND_ALLOCATIONS      │
├───────────────────────────┤
│ PK allocation_id          │
│ FK wallet_id              │
│ FK allocated_by           │
│ FK employee_id            │
│ FK branch_id              │
│ amount                    │
│ purpose                   │
│ allocation_date           │
│ status                    │
└──────────────┬────────────┘
               │ 1:1 / reference
               ▼
       WALLET_TRANSACTIONS
```

## 14. Wallet Relationships

```text
BRANCH 1 ───────── N WALLETS
EMPLOYEE 1 ─────── 1 WALLETS
WALLETS 1 ──────── N WALLET_TRANSACTIONS
WALLETS 1 ──────── N EXPENSE_REQUESTS
EXPENSE_CATEGORIES 1 ───── N EXPENSE_REQUESTS
EXPENSE_REQUESTS 1 ─────── N EXPENSE_RECEIPTS
USERS 1 ────────── N WALLET_TRANSACTIONS
USERS 1 ────────── N EXPENSE_REQUESTS
FUND_ALLOCATIONS 1 ─────── 1 WALLET_TRANSACTIONS
```

## 15. Updated Master ER Relationship

```text
COMPANY
   │
   │ 1:N
   ▼
BRANCHES
   │
   ├──────────────► DEPARTMENTS
   │                    │
   │                    ▼
   │                EMPLOYEES
   │                    │
   │       ┌────────────┼─────────────────────────────────┐
   │       │            │           │          │           │
   │       ▼            ▼           ▼          ▼           ▼
   │   ATTENDANCE      LEAVES     PAYROLL     TASKS      WALLETS
   │       │            │           │          │           │
   │       │            ▼           ▼          ├── ASSIGNMENTS
   │       │       LEAVE_TYPES    PAYSLIPS     ├── UPDATES  │
   │       │                                  ├── COMMENTS │
   │       │                                  └── TIME LOGS│
   │       │                                              │
   │       │                                              ▼
   │       │                                      WALLET_TRANSACTIONS
   │       │                                              │
   │       │                                      EXPENSE_REQUESTS
   │       │                                              │
   │       │                                      EXPENSE_RECEIPTS
   │
   ├──────────────► HOLIDAYS
   ├──────────────► JOB_POSTINGS
   └──────────────► ANNOUNCEMENTS

EMPLOYEES
   ├── DOCUMENTS
   ├── GOALS
   ├── PERFORMANCE_REVIEWS
   ├── WFH_REQUESTS
   └── NOTIFICATIONS

JOB_POSTINGS
   └── APPLICATIONS
          └── INTERVIEWS

USERS
   ├── ROLES / PERMISSIONS
   └── AUDIT_LOGS
```

## 16. Updated Table Inventory

### Authentication / Access
1. `users`
2. `roles`
3. `permissions`
4. `role_permissions`
5. `user_sessions`

### Organization
6. `companies`
7. `branches`
8. `departments`
9. `designations`
10. `employees`
11. `employee_managers`
12. `shifts`

### Attendance
13. `attendance`
14. `attendance_adjustments`
15. `overtime`

### Leave
16. `leave_types`
17. `leave_policies`
18. `leave_balances`
19. `leave_requests`

### Payroll
20. `salary_structures`
21. `salary_components`
22. `employee_salary`
23. `payroll`
24. `payroll_items`
25. `payslips`

### Task Management
26. `projects`
27. `tasks`
28. `task_assignments`
29. `task_updates`
30. `task_comments`
31. `task_time_logs`

### Wallet / Expense Management
32. `wallets`
33. `wallet_transactions`
34. `fund_allocations`
35. `expense_categories`
36. `expense_requests`
37. `expense_receipts`

### Recruitment
38. `job_postings`
39. `candidates`
40. `applications`
41. `interviews`
42. `offers`

### Performance
43. `goals`
44. `performance_reviews`
45. `performance_review_items`

### WFH
46. `wfh_requests`

### Documents
47. `document_types`
48. `employee_documents`

### Communication
49. `announcements`
50. `notifications`

### Calendar
51. `holidays`
52. `working_days`

### System
53. `audit_logs`
54. `system_settings`
```
