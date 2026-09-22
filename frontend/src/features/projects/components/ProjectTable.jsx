import React, { useState } from 'react';
import { Eye, Edit3, ArrowUpDown, ChevronLeft, ChevronRight, FolderOpen } from 'lucide-react';
import ProjectStatusBadge from './ProjectStatusBadge';

/**
 * ProjectTable Component
 * Enterprise responsive table view adhering to section 13 of the HRMS design theme.
 */
const ProjectTable = ({ projects, loading, onView, onEdit, onResetFilters }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Sort projects locally
  const sortedProjects = [...projects].sort((a, b) => {
    let valA = a[sortField] || '';
    let valB = b[sortField] || '';
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();

    if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
    if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedProjects.length / pageSize) || 1;
  const paginatedProjects = sortedProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-4 space-y-3">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="h-12 bg-slate-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-2xs">
        <div className="w-12 h-12 bg-blue-50 text-[#0B5ED7] rounded-full flex items-center justify-center mx-auto mb-4">
          <FolderOpen className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 mb-1">No Projects Found</h3>
        <p className="text-sm text-slate-500 mb-4 max-w-md mx-auto">
          No projects match your current search query or filter criteria. Try resetting your filters to view all records.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="px-4 py-2 text-xs font-medium text-[#0B5ED7] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            Reset Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs flex flex-col justify-between">
      {/* Table Container with horizontal scroll for responsiveness */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600 uppercase tracking-wider">
              <th
                onClick={() => handleSort('name')}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Project Name</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('manager_name')}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Manager</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4">Department & Branch</th>
              <th
                onClick={() => handleSort('start_date')}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Start Date</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('end_date')}
                className="py-3.5 px-4 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>End Date</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {paginatedProjects.map((project) => (
              <tr
                key={project.id}
                className="hover:bg-blue-50/40 transition-colors group"
              >
                {/* Name */}
                <td className="py-3.5 px-4 font-medium text-slate-900">
                  <div>
                    <span 
                      onClick={() => onView(project)}
                      className="font-semibold text-slate-900 group-hover:text-[#0B5ED7] transition-colors cursor-pointer"
                    >
                      {project.name}
                    </span>
                    <p className="text-[11px] text-slate-400 font-normal line-clamp-1">
                      {project.description || 'No description'}
                    </p>
                  </div>
                </td>

                {/* Manager */}
                <td className="py-3.5 px-4 text-slate-700">
                  <div className="font-medium text-slate-800">{project.manager_name}</div>
                  <div className="text-[11px] text-slate-400">{project.manager_role || 'Manager'}</div>
                </td>

                {/* Department & Branch */}
                <td className="py-3.5 px-4 text-slate-700">
                  <div className="font-medium text-slate-800">{project.department_name}</div>
                  <div className="text-[11px] text-slate-400">{project.branch_name}</div>
                </td>

                {/* Start Date */}
                <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                  {formatDate(project.start_date)}
                </td>

                {/* End Date */}
                <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                  {formatDate(project.end_date)}
                </td>

                {/* Status */}
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <ProjectStatusBadge status={project.status} />
                </td>

                {/* Actions */}
                <td className="py-3.5 px-4 text-right whitespace-nowrap">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => onView(project)}
                      className="p-1.5 text-slate-500 hover:text-[#0B5ED7] hover:bg-blue-100/60 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onEdit(project)}
                      className="p-1.5 text-slate-500 hover:text-[#0B5ED7] hover:bg-blue-100/60 rounded-lg transition-colors"
                      title="Edit Project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-100 bg-slate-50/50 text-xs text-slate-500">
        <div>
          Showing{' '}
          <span className="font-medium text-slate-700">
            {(currentPage - 1) * pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-medium text-slate-700">
            {Math.min(currentPage * pageSize, sortedProjects.length)}
          </span>{' '}
          of <span className="font-medium text-slate-700">{sortedProjects.length}</span> projects
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <span className="text-slate-700 font-medium px-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;
