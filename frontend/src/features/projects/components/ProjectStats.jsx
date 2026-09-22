import React from 'react';
import { FolderKanban, Clock, CheckCircle2, PauseCircle, FileText } from 'lucide-react';

/**
 * ProjectStats Component
 * Renders executive KPI summary cards adhering to section 8 of the 
 * HRMS Design Themes documentation.
 */
const ProjectStats = ({ stats, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {[...Array(5)].map((_, idx) => (
          <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 animate-pulse h-24">
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
            <div className="h-7 bg-slate-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  const { total = 0, inProgress = 0, planning = 0, completed = 0, onHold = 0 } = stats || {};

  const statItems = [
    {
      title: 'Total Projects',
      value: total,
      icon: FolderKanban,
      color: 'text-[#0B5ED7] bg-blue-50 border-blue-100',
      badge: 'All Active & Past'
    },
    {
      title: 'In Progress',
      value: inProgress,
      icon: Clock,
      color: 'text-blue-600 bg-blue-50 border-blue-100',
      badge: 'Active Work execution'
    },
    {
      title: 'Planning',
      value: planning,
      icon: FileText,
      color: 'text-slate-600 bg-slate-100 border-slate-200',
      badge: 'Upcoming Projects'
    },
    {
      title: 'Completed',
      value: completed,
      icon: CheckCircle2,
      color: 'text-[#2E7D32] bg-emerald-50 border-emerald-100',
      badge: 'Successfully Delivered'
    },
    {
      title: 'On Hold',
      value: onHold,
      icon: PauseCircle,
      color: 'text-amber-700 bg-amber-50 border-amber-100',
      badge: 'Pending Review'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      {statItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500">{item.title}</span>
              <div className={`p-2 rounded-lg border ${item.color}`}>
                <IconComponent className="w-4 h-4" />
              </div>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-bold text-slate-900">{item.value}</span>
              <span className="text-[10px] text-slate-400 font-normal">{item.badge}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectStats;
