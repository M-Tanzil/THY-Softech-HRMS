import React from 'react';
import { X, Calendar, Building2, MapPin, Layers, UserCheck, Clock, CheckSquare, ListTodo, Edit3 } from 'lucide-react';
import ProjectStatusBadge from './ProjectStatusBadge';

/**
 * ProjectDetailsModal Component
 * Detailed inspector modal for a single project, including a Tasks summary placeholder section.
 */
const ProjectDetailsModal = ({ isOpen, onClose, project, onEdit }) => {
  if (!isOpen || !project) return null;

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateDuration = (start, end) => {
    if (!start || !end) return 'N/A';
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  };

  const taskProgress = project.tasks_count > 0
    ? Math.round((project.completed_tasks_count / project.tasks_count) * 100)
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">{project.name}</h2>
                <ProjectStatusBadge status={project.status} />
              </div>
              <p className="text-xs text-slate-500 font-mono mt-0.5">ID: {project.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onClose();
                onEdit(project);
              }}
              className="px-3 py-1.5 text-xs font-medium text-[#0B5ED7] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Project</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {/* Project Description */}
          <div>
            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Project Description
            </h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 leading-relaxed">
              {project.description || 'No detailed description provided for this project.'}
            </div>
          </div>

          {/* Grid Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column 1: Organizational Context */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Organization Context
              </h4>

              <div className="flex items-start gap-3 text-xs">
                <Building2 className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Company</span>
                  <span className="font-medium text-slate-800">{project.company_name}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Branch</span>
                  <span className="font-medium text-slate-800">{project.branch_name}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <Layers className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Department</span>
                  <span className="font-medium text-slate-800">{project.department_name}</span>
                </div>
              </div>
            </div>

            {/* Column 2: Management & Dates */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Management & Timeline
              </h4>

              <div className="flex items-start gap-3 text-xs">
                <UserCheck className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Project Manager</span>
                  <span className="font-medium text-slate-800">{project.manager_name}</span>
                  {project.manager_email && (
                    <span className="text-slate-400 block text-[11px]">{project.manager_email}</span>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs">
                <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                <div>
                  <span className="text-slate-400 block text-[11px]">Duration</span>
                  <span className="font-medium text-slate-800">
                    {formatDate(project.start_date)} — {formatDate(project.end_date)}
                  </span>
                  <span className="text-slate-500 text-[11px] block">
                    ({calculateDuration(project.start_date, project.end_date)})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* TASKS SUMMARY PLACEHOLDER SECTION */}
          <div className="bg-slate-50/70 p-5 rounded-xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-[#0B5ED7]" />
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Tasks Summary Placeholder
                </h4>
              </div>
              <span className="text-[11px] font-medium text-[#0B5ED7] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                Tasks Module Pending
              </span>
            </div>

            {/* Progress overview */}
            <div className="bg-white p-4 rounded-lg border border-slate-200">
              <div className="flex justify-between items-center text-xs text-slate-600 mb-2">
                <span className="font-medium">Completion Progress</span>
                <span className="font-bold text-[#0B5ED7]">
                  {project.completed_tasks_count || 0} / {project.tasks_count || 0} Tasks ({taskProgress}%)
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#0B5ED7] h-full rounded-full transition-all duration-300"
                  style={{ width: `${taskProgress}%` }}
                />
              </div>
            </div>

            {/* Sample task list placeholder items */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-emerald-600" />
                  <span>Requirement gathering & architecture design</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                  Completed
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Frontend UI component implementation (Projects)</span>
                </div>
                <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-medium">
                  In Progress
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 text-slate-400">
                <div className="flex items-center gap-2">
                  <ListTodo className="w-4 h-4 text-slate-400" />
                  <span>Backend REST API & DB integration</span>
                </div>
                <span className="text-[10px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium">
                  Upcoming
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-400">
          <div>
            Created: {formatDate(project.created_at)}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;
