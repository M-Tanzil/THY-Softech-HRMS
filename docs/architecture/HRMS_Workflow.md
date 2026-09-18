# HRMS — Complete Workflow

## 1. Global Authentication Workflow

```text
SYSTEM START
     ↓
Login Screen
     ↓
Enter Credentials
     ↓
Validate User
     ↓
┌───────────────┬────────────────┐
│ Invalid       │ Valid          │
↓               ↓
Login Error     Load User + Role
                ↓
         Permission Check
                ↓
        Role-Based Dashboard
```

## 2. Admin / HR Workflow

```text
ADMIN / HR LOGIN
      ↓
Validate Credentials
      ↓
Admin Dashboard
      ↓
┌─────┬───────────┬─────────┬───────────┬────────────┐
↓     ↓           ↓         ↓           ↓
Employees Attendance     Leave       Payroll     Recruitment
↓     ↓           ↓         ↓           ↓
CRUD  Manage      Approve/  Salary     Jobs/
      Records     Reject    Process    Candidates
      ↓           ↓         ↓           ↓
      Reports     Balance   Payslip     Interviews
```

## 3. Employee Workflow

```text
EMPLOYEE LOGIN
      ↓
Employee Dashboard
      ↓
┌──────────┬────────────┬──────────┬───────────┬───────────┐
↓          ↓            ↓          ↓           ↓
Profile  Attendance    Leave     Payroll     Documents
↓          ↓            ↓          ↓           ↓
Update   Check-in     Apply     Salary      View/
Details  Check-out    Leave     History     Download
         History      Status    Payslip
```

## 4. Manager Workflow

```text
MANAGER LOGIN
      ↓
Manager Dashboard
      ↓
My Team
      ↓
┌────────────┬────────────┬──────────────┐
↓            ↓            ↓
Attendance   Leave        WFH
↓            ↓            ↓
View Team    Review       Review
Records      Request      Request
             ↓            ↓
        Approve/Reject  Approve/Reject
             ↓            ↓
          Employee Notification
```

## 5. Employee Lifecycle

```text
Job Opening
    ↓
Candidate
    ↓
Application
    ↓
Screening
    ↓
Shortlisted
    ↓
Interview
    ↓
Selected
    ↓
Offer
    ↓
Offer Accepted
    ↓
Onboarding
    ↓
Employee Record
    ↓
Department Assignment
    ↓
Designation Assignment
    ↓
Manager Assignment
    ↓
Shift Assignment
    ↓
Salary Assignment
    ↓
Active Employment
    ↓
Attendance / Leave / WFH / Payroll / Performance
    ↓
Promotion / Transfer
    ↓
Resignation / Termination
    ↓
Offboarding
```

## 6. Employee Onboarding Workflow

```text
HR Creates Employee
       ↓
Generate Employee ID
       ↓
Assign Department
       ↓
Assign Designation
       ↓
Assign Manager
       ↓
Assign Shift
       ↓
Assign Salary Structure
       ↓
Upload Required Documents
       ↓
Create User Account
       ↓
Send Login Information
       ↓
Employee Activated
```

## 7. Attendance Workflow

```text
Employee
   ↓
Attendance Check
   ↓
┌─────────────┬──────────────┬─────────────┐
↓             ↓              ↓
Office        WFH            Leave
↓             ↓              ↓
Check-in      WFH Status     Leave Status
↓
Working
↓
Check-out
↓
Calculate Working Hours
↓
Calculate Late / Early / Overtime
↓
Save Attendance
↓
Attendance Report
↓
Payroll Input
```

## 8. Leave Workflow

```text
Employee
   ↓
Select Leave Type
   ↓
Select Dates
   ↓
Enter Reason
   ↓
Check Leave Balance
   ↓
Check Overlapping Requests
   ↓
Create Leave Request
   ↓
Notify Manager
   ↓
Manager Review
   ↓
┌──────────────┬──────────────┐
↓              ↓
Reject         Approve
↓              ↓
Notify         Update Leave Balance
Employee       ↓
               Update Calendar
               ↓
               Notify Employee
```

## 9. Work From Home Workflow

```text
Employee
   ↓
Create WFH Request
   ↓
Select Date / Period
   ↓
Enter Reason
   ↓
Manager Review
   ↓
┌──────────────┬──────────────┐
↓              ↓
Reject         Approve
↓              ↓
Notify         Create Approved WFH
Employee       ↓
               WFH Attendance
               ↓
               Attendance Report
```

## 10. Payroll Workflow

```text
Payroll Period
      ↓
Select Employees
      ↓
Load Employee Salary
      ↓
Load Attendance
      ↓
Load Leave / Absence
      ↓
Load Overtime
      ↓
Load Bonuses
      ↓
Calculate Earnings
      ↓
Gross Salary
      ↓
Calculate Deductions
      ↓
Tax / PF / Other Deductions
      ↓
Net Salary
      ↓
Payroll Review
      ↓
Approve Payroll
      ↓
Generate Payslip
      ↓
Employee Notification
      ↓
Employee Downloads Payslip
```

## 11. Recruitment Workflow

```text
HR
 ↓
Create Job Opening
 ↓
Publish Job
 ↓
Candidate Applies
 ↓
Application Created
 ↓
Screening
 ↓
┌──────────────┬──────────────┐
↓              ↓
Rejected       Shortlisted
               ↓
          Schedule Interview
               ↓
            Interview
               ↓
        ┌──────┴───────┐
        ↓              ↓
     Rejected       Selected
                       ↓
                     Offer
                       ↓
                Offer Accepted
                       ↓
                   Onboarding
                       ↓
                   Employee
```

## 12. Performance Workflow

```text
Manager
   ↓
Create Goals / KPIs
   ↓
Assign to Employee
   ↓
Employee Progress
   ↓
Review Period
   ↓
Manager Review
   ↓
Rating + Comments
   ↓
Employee Comments
   ↓
Final Review
   ↓
Performance Record
```

## 13. Document Workflow

```text
Employee / HR
      ↓
Select Document Type
      ↓
Upload File
      ↓
Validate File
      ↓
Store File
      ↓
Save Metadata
      ↓
Database Record
      ↓
Authorized Access
      ↓
View / Download
```

## 14. Notification Workflow

```text
Business Event
      ↓
Notification Engine
      ↓
Determine Recipient
      ↓
Create Notification
      ↓
┌──────────┬──────────┬──────────┐
↓          ↓          ↓
In-App     Email      Push
      ↓
Read / Unread Tracking
```

## 15. Audit Workflow

```text
User Action
    ↓
Authentication
    ↓
Permission Check
    ↓
Execute Action
    ↓
Database Change
    ↓
Create Audit Log
    ↓
Record:
- User
- Action
- Module
- Entity
- Old Value
- New Value
- Timestamp
- IP
```

## 16. Reporting Workflow

```text
User Selects Report
       ↓
Select Filters
       ↓
Validate Access
       ↓
Query Database
       ↓
Aggregate Data
       ↓
Generate Report
       ↓
┌─────────────┬─────────────┐
↓             ↓
View Online   Export
              ↓
          PDF / Excel
```

## 17. Logout Workflow

```text
User Clicks Logout
       ↓
Invalidate Session / Token
       ↓
Clear Client Authentication State
       ↓
Write Logout Activity
       ↓
Redirect to Login
```

## 18. Wallet & Expense Management Workflow

### Fund Allocation Workflow

```text
SUPERIOR / AUTHORIZED MANAGER
            │
            ▼
       Select Employee
            │
            ▼
       Select Wallet
            │
            ▼
      Enter Amount
            │
            ▼
      Enter Purpose
            │
            ▼
      Permission Check
            │
            ▼
       Create Credit
            │
            ▼
       Wallet Ledger
            │
            ▼
    Employee Balance Updated
            │
            ▼
       Notification
```

### Expense Submission Workflow

```text
EMPLOYEE
   │
   ▼
Open Wallet
   │
   ▼
Request Expense
   │
   ├── Category
   ├── Amount
   ├── Date
   ├── Description
   └── Receipt
   │
   ▼
Validate Available Balance
   │
   ├──────── Insufficient ───────► Reject Submission
   │
   ▼
Check Spending Policy
   │
   ▼
Create Expense Request
   │
   ▼
Manager / Superior Review
   │
   ├──────── REJECT ─────────► Notify Employee
   │
   ▼
APPROVE
   │
   ▼
Create Wallet Debit Transaction
   │
   ▼
Update Available Balance
   │
   ▼
Notify Employee
   │
   ▼
Audit Log
```

### Expense Approval Workflow

```text
Expense Request
      ↓
Determine Approver
      ↓
Check Amount / Category / Branch Policy
      ↓
┌───────────────┬────────────────┐
↓               ↓
Within Limit    Above Approval Limit
↓               ↓
Manager         Higher-Level
Approval        Approval
↓               ↓
└───────────────┴───────────────┐
                                ▼
                         Approved / Rejected
                                │
                                ▼
                         Wallet Ledger
```

### Wallet Transaction Workflow

```text
                    WALLET LEDGER
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
       CREDIT          DEBIT         REVERSAL
          │              │              │
     Fund Allocation   Expense       Refund /
     / Adjustment      Approved      Correction
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                  Running Balance
```

### Wallet Monitoring Workflow

```text
MANAGER / HR
     │
     ▼
Select Branch / Team / Employee
     │
     ▼
View Wallets
     │
     ├── Current Balance
     ├── Allocated Funds
     ├── Total Spend
     ├── Pending Expenses
     ├── Rejected Expenses
     └── Transaction History
     │
     ▼
Expense Analytics / Reports
```

### Wallet Safety Rules

```text
Every credit/debit
       ↓
Ledger Transaction
       ↓
Reference Source
       ↓
Audit Log
       ↓
Notification where required
```
