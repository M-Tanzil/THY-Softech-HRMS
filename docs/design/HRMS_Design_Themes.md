# HRMS Design Theme Specification

**Selected Theme:** Theme 4 — Balanced Tricolor  
**Brand:** THY Softech Private Limited  
**Product:** Human Resource Management System (HRMS)  
**Status:** Approved Design Direction  
**Version:** 1.0

---

## 1. Design Direction

The HRMS will use a **Balanced Tricolor** visual identity inspired by the THY Softech logo.

The interface will combine the three primary brand colors:

- Blue
- Red
- Green

with a supporting orange accent and neutral backgrounds.

The goal is to create a professional enterprise HRMS while maintaining a strong connection with the company's existing brand identity.

### Design Personality

- Professional
- Modern
- Clean
- Enterprise-oriented
- People-centric
- Trustworthy
- Energetic without being overly colorful

---

# 2. Primary Brand Palette

| Color | Hex | Primary Usage |
|---|---|---|
| Brand Blue | `#0B5ED7` | Primary actions, navigation, links, active states |
| Brand Red | `#D32F2F` | Important alerts, selected status, critical actions |
| Brand Green | `#2E7D32` | Success, approvals, positive states |
| Accent Orange | `#FFB300` | Warnings, pending states, highlights |
| Soft Background | `#F5F7FA` | Application background |
| White | `#FFFFFF` | Cards, panels, modals |
| Dark Text | `#172033` | Main text |
| Secondary Text | `#64748B` | Supporting text |
| Border | `#E2E8F0` | Borders and dividers |

---

# 3. Color Roles

Colors must have consistent semantic meanings throughout the application.

## Blue — Primary

Use blue for:

- Primary buttons
- Active navigation
- Links
- Selected tabs
- Primary indicators
- Information states
- Main charts
- Progress indicators where appropriate

Example:

```text
Primary Button
[ Save Employee ]

Active Navigation
[ Dashboard ]
```

---

## Red — Critical / Attention

Use red for:

- Errors
- Critical alerts
- Destructive actions
- Rejected requests
- Important warnings
- Critical payroll/expense issues

Do not use red as the dominant color across the entire application.

---

## Green — Success

Use green for:

- Approved
- Completed
- Present
- Successful operations
- Verified documents
- Positive wallet transactions
- Successful payroll processing

Example:

```text
✓ Approved
✓ Verified
✓ Completed
```

---

## Orange — Pending / Warning

Use orange for:

- Pending approvals
- Warnings
- Approaching deadlines
- Pending expenses
- Overtime alerts
- Attention-required states

Example:

```text
⚠ Pending Approval
```

---

# 4. Application Background

The main application background should use:

```text
#F5F7FA
```

This provides enough contrast against white cards while keeping the interface clean.

Avoid pure white as the entire application background.

Recommended hierarchy:

```text
Application
└── #F5F7FA
    ├── Cards
    │   └── #FFFFFF
    ├── Modals
    │   └── #FFFFFF
    └── Tables
        └── #FFFFFF
```

---

# 5. Sidebar Design

The sidebar should use a **brand-aware blue primary treatment**.

Recommended structure:

```text
┌─────────────────────┐
│ THY LOGO            │
│ HRMS                │
├─────────────────────┤
│ 🏠 Dashboard        │
│ 👥 Employees        │
│ ◷ Attendance        │
│ 📅 Leave            │
│ ₹ Payroll           │
│ ✓ Tasks             │
│ Recruitment         │
│ Performance         │
│ Wallet & Expenses   │
│ Documents           │
│ Reports             │
│ Settings            │
├─────────────────────┤
│ Admin User          │
│ Super Admin         │
└─────────────────────┘
```

### Sidebar Rules

- Active item: Brand Blue
- Hover: light blue background
- Icons: consistent Lucide icons
- Text: dark/navy or white depending on sidebar implementation
- Avoid using all three brand colors simultaneously in the sidebar

The sidebar should establish **blue as the primary navigation color**.

---

# 6. Topbar

The topbar should remain mostly neutral.

Elements:

```text
┌──────────────────────────────────────────────────────────┐
│ Search...                🔔   💬   ☀   Admin ▼           │
└──────────────────────────────────────────────────────────┘
```

Recommended:

- Background: `#FFFFFF`
- Border: `#E2E8F0`
- Text: `#172033`
- Icons: `#64748B`
- Active/notification indicators: brand colors

---

# 7. Buttons

## Primary Button

```text
Background: #0B5ED7
Text: #FFFFFF
```

Examples:

- Add Employee
- Save
- Create Task
- Submit
- Process Payroll

## Success Button

```text
Background: #2E7D32
Text: #FFFFFF
```

Use for:

- Approve
- Verify
- Complete

## Danger Button

```text
Background: #D32F2F
Text: #FFFFFF
```

Use for:

- Delete
- Reject
- Deactivate

## Warning Button

```text
Background: #FFB300
Text: #172033
```

Use sparingly for attention-required actions.

---

# 8. Cards

Cards should use:

```text
Background: #FFFFFF
Border: #E2E8F0
Border Radius: 12px
Shadow: Very subtle
```

Avoid excessive shadows.

### KPI Card

```text
┌─────────────────────────────┐
│ 👥                           │
│                             │
│ 1,248                       │
│ Total Employees             │
│                             │
│ ↑ 4.2% from last month      │
└─────────────────────────────┘
```

Each KPI can use a small semantic color indicator:

- Employees → Blue
- Present → Green
- On Leave → Red
- Pending Approvals → Orange

---

# 9. Status Badges

Status should use soft backgrounds rather than highly saturated blocks.

| Status | Background Direction | Text |
|---|---|---|
| Active | Light Green | Green |
| Approved | Light Green | Green |
| Completed | Light Green | Green |
| Pending | Light Orange | Orange/Dark |
| In Progress | Light Blue | Blue |
| Rejected | Light Red | Red |
| Blocked | Light Red | Red |
| Cancelled | Light Gray | Slate |

Example:

```text
[ Active ]
[ Pending ]
[ Approved ]
[ Rejected ]
[ In Progress ]
```

---

# 10. Dashboard Theme

The dashboard should use a neutral white-card layout with controlled brand colors.

```text
Background
#F5F7FA

        ↓

White KPI Cards

        ↓

Charts
Blue / Green / Red / Orange

        ↓

Activity
Neutral + semantic indicators

        ↓

Approvals
Blue / Green / Orange / Red
```

Do not make the entire dashboard multicolored.

The **tricolor identity should appear through controlled accents**.

---

# 11. Dashboard KPI Colors

Recommended mapping:

```text
Total Employees
→ Blue

Present Today
→ Green

On Leave
→ Red

Pending Approvals
→ Orange
```

This creates an intuitive visual language.

---

# 12. Charts

Charts should use the brand palette consistently.

### Primary chart

```text
Blue → #0B5ED7
```

### Secondary

```text
Green → #2E7D32
```

### Attention

```text
Red → #D32F2F
```

### Highlight

```text
Orange → #FFB300
```

Avoid using unrelated random colors.

---

# 13. Tables

Tables should remain mostly neutral.

```text
┌────────────────────────────────────────────────────────┐
│ Employee │ Department │ Branch │ Status │ Action       │
├────────────────────────────────────────────────────────┤
│ Rahul    │ IT         │ Mumbai │ Active │ ⋮            │
│ Amit     │ HR         │ Patna  │ Active │ ⋮            │
└────────────────────────────────────────────────────────┘
```

### Table rules

- Header: subtle gray background
- Body: white
- Borders: `#E2E8F0`
- Hover: very light blue
- Status: semantic badge
- Actions: neutral icon buttons

Avoid coloring entire table rows unless there is a specific alert.

---

# 14. Forms

Forms should be clean and spacious.

```text
Employee Information

First Name
[________________________]

Last Name
[________________________]

Branch
[ Select Branch ▼ ]

Department
[ Select Department ▼ ]

Designation
[ Select Designation ▼ ]
```

### Input States

Normal:

```text
Border: #E2E8F0
```

Focus:

```text
Border: #0B5ED7
```

Error:

```text
Border: #D32F2F
```

Success:

```text
Border: #2E7D32
```

---

# 15. Navigation States

## Default

```text
Text: #64748B
Icon: #64748B
```

## Hover

```text
Background: Light Blue
Text: #0B5ED7
```

## Active

```text
Background: #0B5ED7
Text: #FFFFFF
```

## Disabled

```text
Text: #CBD5E1
```

---

# 16. Employee Profile

The employee profile should be professional and clean.

```text
┌──────────────────────────────────────────────────────┐
│ [Profile Image]                                      │
│                                                      │
│ Rahul Sharma                                         │
│ EMP-00124                                            │
│ Software Developer                                   │
│ Mumbai Branch                                        │
│                                                      │
│ [Overview] [Attendance] [Leave] [Payroll]            │
│ [Documents] [Tasks] [Performance]                    │
└──────────────────────────────────────────────────────┘
```

Use:

- Blue for active tab
- Green for verified information
- Red for issues
- Orange for pending verification

---

# 17. Attendance Theme

Attendance should primarily use blue and green.

```text
Present       → Green
Absent        → Red
Late          → Orange
On Leave      → Blue
Overtime      → Orange
```

Example:

```text
✓ Present
✕ Absent
⚠ Late
◷ Overtime
```

---

# 18. Leave Theme

Leave balances can use:

```text
Allocated → Blue
Used      → Red
Pending   → Orange
Remaining → Green
```

Example:

```text
Allocated    12
Used          4
Pending       1
Remaining     7
```

---

# 19. Payroll Theme

Payroll should be visually conservative.

Primary:

```text
Blue
```

Positive:

```text
Green
```

Deductions:

```text
Red
```

Warnings:

```text
Orange
```

Example:

```text
Basic Salary        ₹40,000
+ Additions          ₹8,000
----------------------------
Gross Salary        ₹48,000

- Tax                ₹3,000
- PF                 ₹2,000
----------------------------
Net Salary          ₹43,000
```

Net salary can be highlighted with a subtle green treatment.

---

# 20. Task Management Theme

Task status colors:

```text
BACKLOG
→ Gray

ASSIGNED
→ Blue

IN PROGRESS
→ Blue

BLOCKED
→ Red

COMPLETED
→ Green

UNDER REVIEW
→ Orange

CLOSED
→ Green

CANCELLED
→ Gray/Red
```

Progress bars should primarily use brand blue.

---

# 21. Wallet & Expense Theme

Wallet balance should use blue/green.

```text
Wallet Balance
→ Blue

Funds Received
→ Green

Expense
→ Red

Pending Expense
→ Orange
```

Example:

```text
Current Balance
₹12,500

Funds Received       +₹10,000
Business Expense     -₹2,400
Pending Expense      ₹1,200
```

---

# 22. Recruitment Theme

Recruitment pipeline can use controlled semantic colors:

```text
Requisition → Blue
Applied     → Blue
Screening   → Orange
Interview   → Purple/Blue-neutral
Offer       → Green
Hired       → Green
Rejected    → Red
```

Purple should be used sparingly because it is not part of the core THY brand palette.

---

# 23. Performance Theme

Performance should primarily use:

- Blue
- Green
- Neutral gray

Progress:

```text
0–39%   → Red/neutral warning
40–69%  → Orange
70–89%  → Blue
90–100% → Green
```

This is a functional semantic mapping, not a decorative color system.

---

# 24. Notifications

Notification indicators should follow semantic colors.

```text
Information → Blue
Success     → Green
Warning     → Orange
Critical    → Red
```

Example:

```text
🔵 New task assigned
🟢 Leave approved
🟠 Expense pending
🔴 Document rejected
```

---

# 25. Typography

Recommended font characteristics:

- Modern sans-serif
- High readability
- Professional appearance
- Strong numerical readability for dashboards

Hierarchy:

```text
Page Title       28–32px
Section Title    20–24px
Card Title       16–18px
Body             14–16px
Table            13–14px
Caption          12px
```

Use font weights consistently:

```text
400 → Body
500 → Labels
600 → Headings / Important data
700 → Major numbers
```

---

# 26. Border Radius

Recommended:

```text
Small controls       6px
Inputs               8px
Buttons              8px
Cards                12px
Large panels         16px
Modal                16px
```

Avoid excessive pill-shaped UI except for:

- Status badges
- Small tags
- Filters where appropriate

---

# 27. Spacing System

Use a consistent spacing scale based around multiples of 4.

```text
4px
8px
12px
16px
20px
24px
32px
40px
48px
64px
```

Dashboard sections should generally use 24px–32px spacing.

---

# 28. Iconography

Use **Lucide React** as the primary icon library.

Icons should:

- Have consistent stroke weight
- Be used with labels when clarity is important
- Avoid mixing multiple icon styles
- Use semantic colors only when useful

Examples:

```text
Users       → Users
Attendance  → Clock
Leave       → Calendar
Payroll     → Wallet
Tasks       → CheckSquare
Documents   → FileText
Reports     → BarChart3
Settings    → Settings
```

---

# 29. Motion Design

Use Motion for subtle interactions.

### Page Transition

```text
Opacity: 0 → 1
Y: 8 → 0
```

### Modal

```text
Opacity: 0 → 1
Scale: 0.96 → 1
```

### Sidebar

```text
Slide / width transition
```

### Cards

Small hover movement or shadow transition.

### Progress

Animate progress bars when loaded.

### Notifications

Use subtle slide/fade animations.

Animations must never interfere with HR operations or data entry.

---

# 30. Dark Mode

Dark mode can be added later.

It should preserve the same semantic brand system:

```text
Blue → Primary
Red → Critical
Green → Success
Orange → Warning
```

Dark mode should not simply invert colors.

---

# 31. Logo Usage

The THY Softech logo is the primary brand reference.

The UI should maintain:

- Adequate logo clear space
- Correct aspect ratio
- No unnecessary recoloring
- No distortion
- Consistent placement

Recommended locations:

- Login page
- Sidebar/header
- System loading screen
- PDF/payslip branding where applicable
- Authentication pages

---

# 32. Login Page Direction

The login page should introduce the brand.

Suggested structure:

```text
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│       THY LOGO                  HRMS LOGIN                 │
│                                                             │
│       Human Resource            Welcome Back               │
│       Management System         Sign in to continue        │
│                                                             │
│                                Email                       │
│                                [________________]           │
│                                                             │
│                                Password                    │
│                                [________________]           │
│                                                             │
│                                [ Sign In ]                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

The visual treatment can use subtle blue/red/green brand accents without turning the login page into a multicolor gradient.

---

# 33. Responsive Design

## Desktop

```text
Sidebar
+
Topbar
+
Main Content
```

## Tablet

```text
Collapsed Sidebar
+
Topbar
+
Main Content
```

## Mobile

```text
Topbar
+
Main Content
+
Mobile Navigation / Drawer
```

Tables should become:

- Horizontally scrollable
- Condensed
- Or card-based where appropriate

---

# 34. Accessibility

The design must maintain:

- Sufficient text/background contrast
- Keyboard navigation
- Visible focus states
- Accessible labels
- Semantic buttons
- Tooltips for icon-only actions
- Color-independent status indicators

Important statuses should never be communicated by color alone.

For example:

```text
✓ Approved
⚠ Pending
✕ Rejected
```

rather than relying only on green/orange/red.

---

# 35. Design Tokens

The frontend should centralize the theme tokens instead of scattering color values across components.

Conceptually:

```text
theme
├── colors
│   ├── primary
│   ├── secondary
│   ├── success
│   ├── warning
│   ├── danger
│   ├── background
│   ├── surface
│   ├── text
│   └── border
│
├── typography
├── spacing
├── radius
├── shadows
└── motion
```

This allows the entire HRMS theme to be changed without rewriting individual components.

---

# 36. Final Theme Summary

## Theme 4 — Balanced Tricolor

```text
Primary Blue     #0B5ED7
Brand Red        #D32F2F
Brand Green      #2E7D32
Accent Orange    #FFB300

Background       #F5F7FA
Card             #FFFFFF
Text             #172033
Secondary Text   #64748B
Border           #E2E8F0
```

### Core Principle

**Blue is the primary UI color.**

**Green, red, and orange are semantic/supporting colors.**

This prevents the HRMS from becoming visually chaotic while still giving the product a distinctive THY Softech identity.

---

# 37. Design Approval

The selected design direction is:

> **Theme 4 — Balanced Tricolor**

The implementation should follow this theme consistently across:

- Admin/HR Portal
- Manager Portal
- Employee Portal
- Authentication
- Dashboards
- Employee management
- Attendance
- Leave
- Payroll
- Tasks
- Wallet
- Expenses
- Recruitment
- Performance
- WFH
- Documents
- Reports
- Notifications
- Settings
