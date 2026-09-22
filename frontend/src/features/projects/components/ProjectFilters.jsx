import React from 'react';
import { Search, Filter, RotateCcw, LayoutGrid, Table as TableIcon } from 'lucide-react';

/**
 * ProjectFilters Component
 * Search bar, status dropdown, branch/department filters, clear action,
 * and View Mode toggle (Table vs Card Grid).
 */
const ProjectFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
  options,
  viewMode,
  onViewModeChange
}) => {
  const { search = '', status = 'ALL', department_id = 'ALL', branch_id = 'ALL' } = filters;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs mb-6 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search projects by name, manager, department..."
            value={search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B5ED7]/20 focus:border-[#0B5ED7] transition-all text-slate-900 placeholder-slate-400"
          />
          {search && (
            <button
              onClick={() => onFilterChange('search', '')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 bg-slate-200/60 rounded-full px-1.5 py-0.5"
            >
              ✕
            </button>
          )}
        </div>

        {/* Layout Switcher (Table vs Card Grid) */}
        <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200 self-end md:self-auto">
          <button
            type="button"
            onClick={() => onViewModeChange('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'table'
                ? 'bg-white text-[#0B5ED7] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Table View"
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Table</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('card')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              viewMode === 'card'
                ? 'bg-white text-[#0B5ED7] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            title="Card View"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Cards</span>
          </button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mr-1">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span>Filter by:</span>
        </div>

        {/* Status Filter */}
        <div className="w-full sm:w-auto">
          <select
            value={status}
            onChange={(e) => onFilterChange('status', e.target.value)}
            className="w-full sm:w-40 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#0B5ED7] focus:ring-1 focus:ring-[#0B5ED7]"
          >
            <option value="ALL">All Statuses</option>
            {options?.statuses?.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>

        {/* Department Filter */}
        <div className="w-full sm:w-auto">
          <select
            value={department_id}
            onChange={(e) => onFilterChange('department_id', e.target.value)}
            className="w-full sm:w-48 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#0B5ED7] focus:ring-1 focus:ring-[#0B5ED7]"
          >
            <option value="ALL">All Departments</option>
            {options?.departments?.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        {/* Branch Filter */}
        <div className="w-full sm:w-auto">
          <select
            value={branch_id}
            onChange={(e) => onFilterChange('branch_id', e.target.value)}
            className="w-full sm:w-48 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:border-[#0B5ED7] focus:ring-1 focus:ring-[#0B5ED7]"
          >
            <option value="ALL">All Branches</option>
            {options?.branches?.map((br) => (
              <option key={br.id} value={br.id}>
                {br.name}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Action */}
        {(search || status !== 'ALL' || department_id !== 'ALL' || branch_id !== 'ALL') && (
          <button
            type="button"
            onClick={onResetFilters}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectFilters;
