import React from 'react';

/**
 * ProjectStatusBadge Component
 * Displays project status with semantic color treatments adhering to 
 * THY Softech HRMS Balanced Tricolor theme specs.
 */
const ProjectStatusBadge = ({ status, className = '' }) => {
  const getStatusStyles = (statusVal) => {
    switch (statusVal) {
      case 'In Progress':
      case 'Active':
        return {
          container: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
          dot: 'bg-blue-600 animate-pulse'
        };
      case 'Completed':
      case 'Finished':
        return {
          container: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
          dot: 'bg-emerald-600'
        };
      case 'On Hold':
      case 'Pending':
        return {
          container: 'bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
          dot: 'bg-amber-500'
        };
      case 'Planning':
      case 'Draft':
        return {
          container: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
          dot: 'bg-slate-500'
        };
      case 'Cancelled':
      case 'Archived':
        return {
          container: 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800',
          dot: 'bg-rose-600'
        };
      default:
        return {
          container: 'bg-gray-100 text-gray-700 border-gray-200',
          dot: 'bg-gray-400'
        };
    }
  };

  const style = getStatusStyles(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border shadow-2xs transition-colors ${style.container} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {status || 'Unknown'}
    </span>
  );
};

export default ProjectStatusBadge;
