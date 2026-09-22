import React, { useState, useEffect } from 'react';
import { X, Calendar, Building, Layers, UserCheck, AlertCircle, Save } from 'lucide-react';

/**
 * ProjectForm Component
 * Modal form for creating and editing projects with client-side validation.
 */
const ProjectForm = ({ isOpen, onClose, onSubmit, initialData = null, options = {}, loading = false }) => {
  const isEditMode = Boolean(initialData && initialData.id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    company_id: '',
    branch_id: '',
    department_id: '',
    manager_id: '',
    start_date: '',
    end_date: '',
    status: 'Planning'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        company_id: initialData.company_id || (options.companies?.[0]?.id || ''),
        branch_id: initialData.branch_id || (options.branches?.[0]?.id || ''),
        department_id: initialData.department_id || (options.departments?.[0]?.id || ''),
        manager_id: initialData.manager_id || (options.managers?.[0]?.id || ''),
        start_date: initialData.start_date || '',
        end_date: initialData.end_date || '',
        status: initialData.status || 'Planning'
      });
    } else {
      // Set default initial state for creation
      setFormData({
        name: '',
        description: '',
        company_id: options.companies?.[0]?.id || '',
        branch_id: options.branches?.[0]?.id || '',
        department_id: options.departments?.[0]?.id || '',
        manager_id: options.managers?.[0]?.id || '',
        start_date: new Date().toISOString().split('T')[0],
        end_date: '',
        status: 'Planning'
      });
    }
    setErrors({});
  }, [initialData, options, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name || formData.name.trim().length < 3) {
      newErrors.name = 'Project name must be at least 3 characters.';
    }

    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required.';
    }

    if (!formData.end_date) {
      newErrors.end_date = 'End date is required.';
    } else if (formData.start_date && new Date(formData.end_date) < new Date(formData.start_date)) {
      newErrors.end_date = 'End date cannot be earlier than start date.';
    }

    if (!formData.company_id) {
      newErrors.company_id = 'Please select a company.';
    }

    if (!formData.branch_id) {
      newErrors.branch_id = 'Please select a branch.';
    }

    if (!formData.department_id) {
      newErrors.department_id = 'Please select a department.';
    }

    if (!formData.manager_id) {
      newErrors.manager_id = 'Please assign a project manager.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {isEditMode ? 'Edit Project' : 'Create New Project'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditMode
                ? 'Update existing project parameters and scheduling.'
                : 'Fill in project specifications to add a new project record.'}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-5 flex-1">
          {/* Project Name */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project Name <span className="text-[#D32F2F]">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. HRMS Mobile App Redesign"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              className={`w-full px-3.5 py-2 text-sm bg-white border rounded-lg focus:outline-none transition-all ${
                errors.name
                  ? 'border-[#D32F2F] focus:ring-2 focus:ring-[#D32F2F]/20'
                  : 'border-slate-200 focus:border-[#0B5ED7] focus:ring-2 focus:ring-[#0B5ED7]/20'
              }`}
            />
            {errors.name && (
              <p className="flex items-center gap-1 text-xs text-[#D32F2F] mt-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.name}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Provide key objectives, deliverables, or technical scope..."
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0B5ED7] focus:ring-2 focus:ring-[#0B5ED7]/20 transition-all text-slate-900"
            />
          </div>

          {/* Grid 1: Company & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Company <span className="text-[#D32F2F]">*</span>
              </label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={formData.company_id}
                  onChange={(e) => handleChange('company_id', e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none transition-all ${
                    errors.company_id ? 'border-[#D32F2F]' : 'border-slate-200 focus:border-[#0B5ED7]'
                  }`}
                >
                  {options.companies?.map((comp) => (
                    <option key={comp.id} value={comp.id}>
                      {comp.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.company_id && (
                <p className="text-xs text-[#D32F2F] mt-1">{errors.company_id}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Project Status <span className="text-[#D32F2F]">*</span>
              </label>
              <select
                value={formData.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:border-[#0B5ED7] transition-all font-medium text-slate-800"
              >
                {options.statuses?.map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid 2: Branch & Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Branch <span className="text-[#D32F2F]">*</span>
              </label>
              <select
                value={formData.branch_id}
                onChange={(e) => handleChange('branch_id', e.target.value)}
                className={`w-full px-3 py-2 text-sm bg-white border rounded-lg focus:outline-none transition-all ${
                  errors.branch_id ? 'border-[#D32F2F]' : 'border-slate-200 focus:border-[#0B5ED7]'
                }`}
              >
                <option value="">Select Branch...</option>
                {options.branches?.map((br) => (
                  <option key={br.id} value={br.id}>
                    {br.name}
                  </option>
                ))}
              </select>
              {errors.branch_id && (
                <p className="text-xs text-[#D32F2F] mt-1">{errors.branch_id}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Department <span className="text-[#D32F2F]">*</span>
              </label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <select
                  value={formData.department_id}
                  onChange={(e) => handleChange('department_id', e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none transition-all ${
                    errors.department_id ? 'border-[#D32F2F]' : 'border-slate-200 focus:border-[#0B5ED7]'
                  }`}
                >
                  <option value="">Select Department...</option>
                  {options.departments?.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.department_id && (
                <p className="text-xs text-[#D32F2F] mt-1">{errors.department_id}</p>
              )}
            </div>
          </div>

          {/* Manager Selection */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Project Manager <span className="text-[#D32F2F]">*</span>
            </label>
            <div className="relative">
              <UserCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <select
                value={formData.manager_id}
                onChange={(e) => handleChange('manager_id', e.target.value)}
                className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none transition-all ${
                  errors.manager_id ? 'border-[#D32F2F]' : 'border-slate-200 focus:border-[#0B5ED7]'
                }`}
              >
                <option value="">Assign Employee as Manager...</option>
                {options.managers?.map((mgr) => (
                  <option key={mgr.id} value={mgr.id}>
                    {mgr.name} — {mgr.role} ({mgr.department})
                  </option>
                ))}
              </select>
            </div>
            {errors.manager_id && (
              <p className="text-xs text-[#D32F2F] mt-1">{errors.manager_id}</p>
            )}
          </div>

          {/* Timeline: Start Date & End Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Start Date <span className="text-[#D32F2F]">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => handleChange('start_date', e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none transition-all ${
                    errors.start_date ? 'border-[#D32F2F]' : 'border-slate-200 focus:border-[#0B5ED7]'
                  }`}
                />
              </div>
              {errors.start_date && (
                <p className="text-xs text-[#D32F2F] mt-1">{errors.start_date}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                End Date <span className="text-[#D32F2F]">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                <input
                  type="date"
                  value={formData.end_date}
                  onChange={(e) => handleChange('end_date', e.target.value)}
                  className={`w-full pl-9 pr-3 py-2 text-sm bg-white border rounded-lg focus:outline-none transition-all ${
                    errors.end_date ? 'border-[#D32F2F]' : 'border-slate-200 focus:border-[#0B5ED7]'
                  }`}
                />
              </div>
              {errors.end_date && (
                <p className="text-xs text-[#D32F2F] mt-1">{errors.end_date}</p>
              )}
            </div>
          </div>

          {/* Modal Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 text-xs font-medium text-white bg-[#0B5ED7] hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all inline-flex items-center gap-1.5 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Saving...' : isEditMode ? 'Update Project' : 'Create Project'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
