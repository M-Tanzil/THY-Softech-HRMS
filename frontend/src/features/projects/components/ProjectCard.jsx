import React from 'react';
import { Calendar, Building2, User, Eye, Edit3, MapPin } from 'lucide-react';
import ProjectStatusBadge from './ProjectStatusBadge';

/**
 * ProjectCard Component
 * Displays a single project in a clean HRMS card layout.
 */
const ProjectCard = ({ project, onView, onEdit }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Calculate task progress percentage if tasks exist
  const taskProgress = project.tasks_count > 0 
    ? Math.round((project.completed_tasks_count / project.tasks_count) * 100)
    : 0;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Header: Title + Status Badge */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 
              onClick={() => onView(project)}
              className="font-semibold text-slate-900 group-hover:text-[#0B5ED7] transition-colors line-clamp-1 cursor-pointer"
              title={project.name}
            >
              {project.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2 min-h-8">
              {project.description || 'No project description provided.'}
            </p>
          </div>
          <ProjectStatusBadge status={project.status} className="shrink-0" />
        </div>

        {/* Organization metadata */}
        <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="font-medium text-slate-800 line-clamp-1">
              Manager: {project.manager_name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="line-clamp-1">{project.department_name}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="line-clamp-1">{project.branch_name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>
              {formatDate(project.start_date)} - {formatDate(project.end_date)}
            </span>
          </div>
        </div>

        {/* Task progress preview */}
        {project.tasks_count !== undefined && (
          <div className="mt-3">
            <div className="flex justify-between items-center text-[11px] text-slate-500 mb-1">
              <span>Tasks Progress</span>
              <span className="font-medium text-slate-700">{project.completed_tasks_count || 0} / {project.tasks_count || 0}</span>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#0B5ED7] h-full rounded-full transition-all duration-300"
                style={{ width: `${taskProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Card Actions */}
      <div className="flex items-center justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
        <button
          type="button"
          onClick={() => onView(project)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-[#0B5ED7] hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View</span>
        </button>
        <button
          type="button"
          onClick={() => onEdit(project)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 hover:text-[#0B5ED7] hover:bg-blue-50 rounded-lg transition-colors"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit</span>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
