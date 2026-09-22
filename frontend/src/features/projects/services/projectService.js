/**
 * projectService.js
 * 
 * Service layer for Projects module.
 * Structured with async promises to allow effortless drop-in replacement
 * with Axios/REST API requests when backend endpoints are connected.
 */

// Isolated temporary mock data for UI preview
let mockProjects = [
  {
    id: "proj-101",
    name: "HRMS Enterprise Portal Refactor",
    description: "Modernizing the core HRMS frontend architecture with React, Vite, and Tailwind CSS. Implementing micro-frontend modules.",
    company_id: "comp-1",
    company_name: "THY Softech Private Limited",
    branch_id: "br-1",
    branch_name: "Headquarters (Mumbai)",
    department_id: "dept-1",
    department_name: "Engineering & IT",
    manager_id: "emp-101",
    manager_name: "Rajesh Kumar",
    manager_email: "rajesh.kumar@thysoftech.com",
    manager_role: "Tech Lead",
    start_date: "2026-01-15",
    end_date: "2026-06-30",
    status: "In Progress",
    created_at: "2026-01-10T09:30:00Z",
    updated_at: "2026-02-01T14:20:00Z",
    tasks_count: 18,
    completed_tasks_count: 12
  },
  {
    id: "proj-102",
    name: "Payroll & Tax Automation Engine",
    description: "Automating monthly payroll calculations, TDS deduction rules, and compliance report generation across all branches.",
    company_id: "comp-1",
    company_name: "THY Softech Private Limited",
    branch_id: "br-2",
    branch_name: "Bangalore Development Center",
    department_id: "dept-2",
    department_name: "Finance & Payroll",
    manager_id: "emp-102",
    manager_name: "Priya Sharma",
    manager_email: "priya.sharma@thysoftech.com",
    manager_role: "Finance Manager",
    start_date: "2026-02-01",
    end_date: "2026-08-15",
    status: "Planning",
    created_at: "2026-01-20T11:00:00Z",
    updated_at: "2026-02-10T16:45:00Z",
    tasks_count: 10,
    completed_tasks_count: 2
  },
  {
    id: "proj-103",
    name: "Mobile Attendance App (Geo-fencing)",
    description: "Cross-platform mobile application supporting biometric authentication, GPS location check-in, and offline logs sync.",
    company_id: "comp-1",
    company_name: "THY Softech Private Limited",
    branch_id: "br-1",
    branch_name: "Headquarters (Mumbai)",
    department_id: "dept-1",
    department_name: "Engineering & IT",
    manager_id: "emp-103",
    manager_name: "Amit Patel",
    manager_email: "amit.patel@thysoftech.com",
    manager_role: "Product Manager",
    start_date: "2025-09-01",
    end_date: "2025-12-31",
    status: "Completed",
    created_at: "2025-08-15T10:00:00Z",
    updated_at: "2025-12-31T18:00:00Z",
    tasks_count: 24,
    completed_tasks_count: 24
  },
  {
    id: "proj-104",
    name: "AI Recruitment Candidate Screening",
    description: "Integrating ML-driven resume parsing and skill matching algorithms into the HR recruitment pipeline.",
    company_id: "comp-1",
    company_name: "THY Softech Private Limited",
    branch_id: "br-3",
    branch_name: "Pune Tech Hub",
    department_id: "dept-3",
    department_name: "Human Resources",
    manager_id: "emp-104",
    manager_name: "Neha Gupta",
    manager_email: "neha.gupta@thysoftech.com",
    manager_role: "HR Director",
    start_date: "2026-03-01",
    end_date: "2026-09-30",
    status: "On Hold",
    created_at: "2026-02-15T08:30:00Z",
    updated_at: "2026-03-05T12:15:00Z",
    tasks_count: 8,
    completed_tasks_count: 3
  },
  {
    id: "proj-105",
    name: "Employee Self-Service (ESS) Portal",
    description: "Redesigning the ESS interface for leave applications, payslip downloads, and reimbursement claims.",
    company_id: "comp-1",
    company_name: "THY Softech Private Limited",
    branch_id: "br-1",
    branch_name: "Headquarters (Mumbai)",
    department_id: "dept-1",
    department_name: "Engineering & IT",
    manager_id: "emp-101",
    manager_name: "Rajesh Kumar",
    manager_email: "rajesh.kumar@thysoftech.com",
    manager_role: "Tech Lead",
    start_date: "2026-04-01",
    end_date: "2026-07-31",
    status: "In Progress",
    created_at: "2026-03-10T14:00:00Z",
    updated_at: "2026-03-15T10:30:00Z",
    tasks_count: 14,
    completed_tasks_count: 5
  },
  {
    id: "proj-106",
    name: "Legacy Infrastructure Migration",
    description: "Migrating legacy on-premise servers to AWS Cloud infrastructure with automated CI/CD pipelines.",
    company_id: "comp-1",
    company_name: "THY Softech Private Limited",
    branch_id: "br-2",
    branch_name: "Bangalore Development Center",
    department_id: "dept-4",
    department_name: "DevOps & Security",
    manager_id: "emp-105",
    manager_name: "Venkatesh Rao",
    manager_email: "venkatesh.rao@thysoftech.com",
    manager_role: "DevOps Lead",
    start_date: "2025-10-01",
    end_date: "2026-01-15",
    status: "Cancelled",
    created_at: "2025-09-20T10:00:00Z",
    updated_at: "2026-01-15T16:00:00Z",
    tasks_count: 6,
    completed_tasks_count: 1
  }
];

// Isolated dropdown lookup options for forms & filters
const mockOptions = {
  companies: [
    { id: "comp-1", name: "THY Softech Private Limited" }
  ],
  branches: [
    { id: "br-1", name: "Headquarters (Mumbai)" },
    { id: "br-2", name: "Bangalore Development Center" },
    { id: "br-3", name: "Pune Tech Hub" },
    { id: "br-4", name: "Delhi Regional Office" }
  ],
  departments: [
    { id: "dept-1", name: "Engineering & IT" },
    { id: "dept-2", name: "Finance & Payroll" },
    { id: "dept-3", name: "Human Resources" },
    { id: "dept-4", name: "DevOps & Security" },
    { id: "dept-5", name: "Operations & Admin" }
  ],
  managers: [
    { id: "emp-101", name: "Rajesh Kumar", role: "Tech Lead", department: "Engineering & IT" },
    { id: "emp-102", name: "Priya Sharma", role: "Finance Manager", department: "Finance & Payroll" },
    { id: "emp-103", name: "Amit Patel", role: "Product Manager", department: "Engineering & IT" },
    { id: "emp-104", name: "Neha Gupta", role: "HR Director", department: "Human Resources" },
    { id: "emp-105", name: "Venkatesh Rao", role: "DevOps Lead", department: "DevOps & Security" },
    { id: "emp-106", name: "Siddharth Mehta", role: "VP Operations", department: "Operations & Admin" }
  ],
  statuses: [
    "Planning",
    "In Progress",
    "On Hold",
    "Completed",
    "Cancelled"
  ]
};

/**
 * Helper to simulate network latency
 */
const delay = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch all projects with optional filtering, search, and pagination
 */
export const getProjects = async (filters = {}) => {
  await delay(250);

  let result = [...mockProjects];

  // Search filter (name, manager, department, description)
  if (filters.search && filters.search.trim() !== '') {
    const q = filters.search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.manager_name.toLowerCase().includes(q) ||
        p.department_name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  // Status filter
  if (filters.status && filters.status !== 'ALL') {
    result = result.filter((p) => p.status === filters.status);
  }

  // Department filter
  if (filters.department_id && filters.department_id !== 'ALL') {
    result = result.filter((p) => p.department_id === filters.department_id);
  }

  // Branch filter
  if (filters.branch_id && filters.branch_id !== 'ALL') {
    result = result.filter((p) => p.branch_id === filters.branch_id);
  }

  // Sorting
  if (filters.sortBy) {
    const order = filters.sortOrder === 'desc' ? -1 : 1;
    result.sort((a, b) => {
      if (a[filters.sortBy] < b[filters.sortBy]) return -1 * order;
      if (a[filters.sortBy] > b[filters.sortBy]) return 1 * order;
      return 0;
    });
  } else {
    // Default sort by updated_at desc
    result.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  }

  return {
    success: true,
    data: result,
    total: result.length
  };
};

/**
 * Fetch project details by ID
 */
export const getProjectById = async (id) => {
  await delay(200);
  const project = mockProjects.find((p) => p.id === id);
  if (!project) {
    return {
      success: false,
      message: `Project with ID ${id} not found.`
    };
  }
  return {
    success: true,
    data: project
  };
};

/**
 * Create a new project record
 */
export const createProject = async (projectData) => {
  await delay(350);

  // Look up labels for foreign key IDs
  const company = mockOptions.companies.find(c => c.id === projectData.company_id) || mockOptions.companies[0];
  const branch = mockOptions.branches.find(b => b.id === projectData.branch_id) || mockOptions.branches[0];
  const department = mockOptions.departments.find(d => d.id === projectData.department_id) || mockOptions.departments[0];
  const manager = mockOptions.managers.find(m => m.id === projectData.manager_id) || mockOptions.managers[0];

  const now = new Date().toISOString();

  const newProject = {
    id: `proj-${Date.now().toString().slice(-4)}`,
    company_id: projectData.company_id || company.id,
    company_name: company.name,
    branch_id: projectData.branch_id || branch.id,
    branch_name: branch.name,
    department_id: projectData.department_id || department.id,
    department_name: department.name,
    manager_id: projectData.manager_id || manager.id,
    manager_name: manager.name,
    manager_email: `${manager.name.toLowerCase().replace(/\s+/g, '.')}@thysoftech.com`,
    manager_role: manager.role,
    name: projectData.name,
    description: projectData.description || '',
    start_date: projectData.start_date,
    end_date: projectData.end_date,
    status: projectData.status || 'Planning',
    created_at: now,
    updated_at: now,
    tasks_count: 0,
    completed_tasks_count: 0
  };

  mockProjects.unshift(newProject);

  return {
    success: true,
    data: newProject,
    message: "Project created successfully."
  };
};

/**
 * Update an existing project record
 */
export const updateProject = async (id, projectData) => {
  await delay(350);
  const index = mockProjects.findIndex((p) => p.id === id);
  if (index === -1) {
    return {
      success: false,
      message: `Project with ID ${id} not found.`
    };
  }

  const existing = mockProjects[index];

  // Resolve updated entity names
  const company = mockOptions.companies.find(c => c.id === projectData.company_id) || { name: existing.company_name, id: existing.company_id };
  const branch = mockOptions.branches.find(b => b.id === projectData.branch_id) || { name: existing.branch_name, id: existing.branch_id };
  const department = mockOptions.departments.find(d => d.id === projectData.department_id) || { name: existing.department_name, id: existing.department_id };
  const manager = mockOptions.managers.find(m => m.id === projectData.manager_id) || { name: existing.manager_name, id: existing.manager_id, role: existing.manager_role };

  const updatedProject = {
    ...existing,
    ...projectData,
    company_name: company.name,
    branch_name: branch.name,
    department_name: department.name,
    manager_name: manager.name,
    manager_role: manager.role || existing.manager_role,
    updated_at: new Date().toISOString()
  };

  mockProjects[index] = updatedProject;

  return {
    success: true,
    data: updatedProject,
    message: "Project updated successfully."
  };
};

/**
 * Delete a project record
 */
export const deleteProject = async (id) => {
  await delay(250);
  const index = mockProjects.findIndex((p) => p.id === id);
  if (index === -1) {
    return {
      success: false,
      message: `Project with ID ${id} not found.`
    };
  }
  const deleted = mockProjects.splice(index, 1)[0];
  return {
    success: true,
    data: deleted,
    message: "Project deleted successfully."
  };
};

/**
 * Fetch lookup options for form select dropdowns
 */
export const getProjectOptions = async () => {
  await delay(100);
  return {
    success: true,
    data: mockOptions
  };
};

/**
 * Fetch Project KPI summary stats
 */
export const getProjectStats = async () => {
  await delay(150);
  const total = mockProjects.length;
  const inProgress = mockProjects.filter(p => p.status === 'In Progress').length;
  const planning = mockProjects.filter(p => p.status === 'Planning').length;
  const completed = mockProjects.filter(p => p.status === 'Completed').length;
  const onHold = mockProjects.filter(p => p.status === 'On Hold').length;

  return {
    success: true,
    data: {
      total,
      inProgress,
      planning,
      completed,
      onHold
    }
  };
};

const projectService = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  getProjectOptions,
  getProjectStats
};

export default projectService;
