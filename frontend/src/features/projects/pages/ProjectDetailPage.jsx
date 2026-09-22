import React, { useState, useEffect } from 'react';
import { ArrowLeft, Building2, MapPin, Layers, UserCheck, Calendar, ListTodo, Edit3, CheckSquare, Clock } from 'lucide-react';
import projectService from '../services/projectService';
import ProjectStatusBadge from '../components/ProjectStatusBadge';
import ProjectForm from '../components/ProjectForm';

/**
 * ProjectDetailPage Component
 * Standalone page view for inspecting a specific project by ID.
 */
const ProjectDetailPage = ({ projectId, onBack }) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState({});
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchProjectData = async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const [pRes, optRes] = await Promise.all([
        projectService.getProjectById(projectId),
        projectService.getProjectOptions()
      ]);
      if (pRes.success) setProject(pRes.data);
      if (optRes.success) setOptions(optRes.data);
    } catch (err) {
      console.error('Error fetching project detail:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const handleEditSubmit = async (formData) => {
    setActionLoading(true);
    try {
      const res = await projectService.updateProject(projectId, formData);
      if (res.success) {
        setProject(res.data);
        setIsEditOpen(false);
      }
    } catch (err) {
      console.error('Error updating project:', err);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-[#F5F7FA] min-h-screen">
        <div className="max-w-5xl mx-auto space-y-4 animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4"></div>
          <div className="h-48 bg-white rounded-xl border border-slate-200"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6 bg-[#F5F7FA] min-h-screen">
        <div className="max-w-md mx-auto text-center py-16 bg-white rounded-xl border border-slate-200 shadow-2xs p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Project Not Found</h2>
          <p className="text-xs text-slate-500 mb-4">
            The project record you are looking for could not be found or may have been deleted.
          </p>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#0B5ED7] rounded-lg"
            >
              Back to Projects
            </button>
          )}
        </div>
      </div>
    );
  }

  const taskProgress = project.tasks_count > 0
    ? Math.round((project.completed_tasks_count / project.tasks_count) * 100)
    : 0;

  return (
    <div className="p-6 bg-[#F5F7FA] min-h-screen">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg transition-colors shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>

          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#0B5ED7] hover:bg-blue-700 rounded-lg transition-colors shadow-2xs"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Project</span>
          </button>
        </div>

        {/* Header Summary Banner */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
                <ProjectStatusBadge status={project.status} />
              </div>
              <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
                {project.description || 'No detailed description specified.'}
              </p>
            </div>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Manager Info */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
              Project Manager
            </h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-[#0B5ED7] rounded-full flex items-center justify-center font-bold text-sm border border-blue-100">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">{project.manager_name}</h4>
                <p className="text-xs text-slate-500">{project.manager_role || 'Project Lead'}</p>
                {project.manager_email && (
                  <p className="text-[11px] text-slate-400 mt-0.5">{project.manager_email}</p>
                )}
              </div>
            </div>
          </div>

          {/* Card 2: Organization Hierarchy */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Hierarchy Allocation
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span className="font-medium">{project.company_name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Layers className="w-4 h-4 text-slate-400" />
              <span>{project.department_name}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <MapPin className="w-4 h-4 text-slate-400" />
              <span>{project.branch_name}</span>
            </div>
          </div>

          {/* Card 3: Timeline */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Timeline Schedule
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="font-medium">Start: {project.start_date}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="font-medium">End: {project.end_date}</span>
            </div>
          </div>
        </div>

        {/* Tasks Summary Placeholder Section */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <ListTodo className="w-5 h-5 text-[#0B5ED7]" />
              <h3 className="text-base font-bold text-slate-900">Tasks Summary Placeholder</h3>
            </div>
            <span className="text-xs font-medium text-[#0B5ED7] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Tasks Module Integration Ready
            </span>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between items-center text-xs text-slate-600 mb-1.5 font-medium">
              <span>Overall Task Completion</span>
              <span>
                {project.completed_tasks_count || 0} of {project.tasks_count || 0} tasks completed ({taskProgress}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-[#0B5ED7] h-full rounded-full transition-all duration-300"
                style={{ width: `${taskProgress}%` }}
              />
            </div>
          </div>

          {/* Placeholder List */}
          <div className="space-y-2 text-xs pt-2">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <CheckSquare className="w-4 h-4 text-[#2E7D32]" />
                <span>Initial kickoff & requirements specification</span>
              </div>
              <span className="text-[11px] font-semibold text-[#2E7D32] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                Completed
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-700 font-medium">
                <Clock className="w-4 h-4 text-[#0B5ED7]" />
                <span>Projects frontend UI module development</span>
              </div>
              <span className="text-[11px] font-semibold text-[#0B5ED7] bg-blue-50 px-2.5 py-0.5 rounded-full">
                In Progress
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form Modal */}
      <ProjectForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSubmit={handleEditSubmit}
        initialData={project}
        options={options}
        loading={actionLoading}
      />
    </div>
  );
};

export default ProjectDetailPage;
