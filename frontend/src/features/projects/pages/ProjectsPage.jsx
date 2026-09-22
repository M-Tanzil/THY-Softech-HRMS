import React, { useState, useEffect, useCallback } from 'react';
import { Plus, FolderKanban, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

import projectService from '../services/projectService';
import ProjectStats from '../components/ProjectStats';
import ProjectFilters from '../components/ProjectFilters';
import ProjectTable from '../components/ProjectTable';
import ProjectCard from '../components/ProjectCard';
import ProjectForm from '../components/ProjectForm';
import ProjectDetailsModal from '../components/ProjectDetailsModal';

/**
 * ProjectsPage Component
 * Main page container for Projects management in THY Softech HRMS.
 */
const ProjectsPage = () => {
  // Projects data state
  const [projects, setProjects] = useState([]);
  const [stats, setStats] = useState({ total: 0, inProgress: 0, planning: 0, completed: 0, onHold: 0 });
  const [options, setOptions] = useState({ companies: [], branches: [], departments: [], managers: [], statuses: [] });
  
  // UI Loading states
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'card'

  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    status: 'ALL',
    department_id: 'ALL',
    branch_id: 'ALL'
  });

  // Modal control states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  /**
   * Fetch projects list based on current filters
   */
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await projectService.getProjects(filters);
      if (res.success) {
        setProjects(res.data);
      } else {
        toast?.error(res.message || 'Failed to fetch projects');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      toast?.error('An unexpected error occurred while loading projects.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  /**
   * Fetch initial options and stats
   */
  const fetchInitialData = async () => {
    try {
      const [optRes, statRes] = await Promise.all([
        projectService.getProjectOptions(),
        projectService.getProjectStats()
      ]);
      if (optRes.success) setOptions(optRes.data);
      if (statRes.success) setStats(statRes.data);
    } catch (err) {
      console.error('Error loading initial options/stats:', err);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  /**
   * Filter changes handler
   */
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Reset all filters
   */
  const handleResetFilters = () => {
    setFilters({
      search: '',
      status: 'ALL',
      department_id: 'ALL',
      branch_id: 'ALL'
    });
  };

  /**
   * Open modal to create a project
   */
  const handleOpenCreate = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  /**
   * Open modal to edit a project
   */
  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  /**
   * Open inspector modal to view details
   */
  const handleOpenDetails = (project) => {
    setSelectedProject(project);
    setIsDetailsOpen(true);
  };

  /**
   * Submit Create or Edit form
   */
  const handleFormSubmit = async (formData) => {
    setActionLoading(true);
    try {
      if (editingProject) {
        // Update action
        const res = await projectService.updateProject(editingProject.id, formData);
        if (res.success) {
          toast?.success(res.message || 'Project updated successfully!');
          setIsFormOpen(false);
          setEditingProject(null);
          fetchProjects();
          fetchInitialData();
          // Update selected project if inspecting
          if (selectedProject?.id === editingProject.id) {
            setSelectedProject(res.data);
          }
        } else {
          toast?.error(res.message || 'Failed to update project.');
        }
      } else {
        // Create action
        const res = await projectService.createProject(formData);
        if (res.success) {
          toast?.success(res.message || 'New project created successfully!');
          setIsFormOpen(false);
          fetchProjects();
          fetchInitialData();
        } else {
          toast?.error(res.message || 'Failed to create project.');
        }
      }
    } catch (err) {
      console.error('Error saving project:', err);
      toast?.error('Failed to save project. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-50 text-[#0B5ED7] rounded-xl border border-blue-100">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Projects</h1>
              <p className="text-xs text-slate-500">
                Manage organization projects, department allocations, managers, and schedules.
              </p>
            </div>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            type="button"
            onClick={fetchProjects}
            className="p-2 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors shadow-2xs"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            type="button"
            onClick={handleOpenCreate}
            className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-white bg-[#0B5ED7] hover:bg-blue-700 rounded-xl shadow-sm hover:shadow transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      {/* KPI Stats Widgets */}
      <ProjectStats stats={stats} loading={loading && projects.length === 0} />

      {/* Filters Toolbar */}
      <ProjectFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        options={options}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main View: Table vs Card Grid */}
      {viewMode === 'table' ? (
        <ProjectTable
          projects={projects}
          loading={loading}
          onView={handleOpenDetails}
          onEdit={handleOpenEdit}
          onResetFilters={handleResetFilters}
        />
      ) : (
        <div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 h-48 animate-pulse" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-2xs">
              <p className="text-sm text-slate-500 mb-3">No projects found matching your criteria.</p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-[#0B5ED7] font-medium hover:underline"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onView={handleOpenDetails}
                  onEdit={handleOpenEdit}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create / Edit Form Modal */}
      <ProjectForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProject}
        options={options}
        loading={actionLoading}
      />

      {/* Inspector Details Modal */}
      <ProjectDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        project={selectedProject}
        onEdit={handleOpenEdit}
      />
    </div>
  );
};

export default ProjectsPage;
