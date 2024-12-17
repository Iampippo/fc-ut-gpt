import React from 'react';

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  collapsed?: boolean;
  badge?: string;
  onClick?: () => void;
}

export function NavLink({ icon, label, active, collapsed, badge, onClick }: NavLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors relative ${
        active
          ? 'bg-green-500/20 text-green-400'
          : 'text-gray-400 hover:bg-green-500/10 hover:text-green-400'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      {icon}
      {!collapsed && (
        <>
          <span className="font-medium">{label}</span>
          {badge && (
            <span className="absolute right-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">
              {badge}
            </span>
          )}
        </>
      )}
      {collapsed && badge && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
      )}
    </button>
  );
}