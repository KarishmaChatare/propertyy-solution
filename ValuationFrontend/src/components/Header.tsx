import { useState } from 'react';
import { Menu, User, LogOut, ChevronDown } from 'lucide-react';
import { User as UserType } from '../types';

interface HeaderProps {
  user: UserType;
  onToggleSidebar: () => void;
  isCollapsed: boolean;
  onNavigate: (page: string) => void;
  onSignOut?: () => void;
}

export function Header({ user, onToggleSidebar, isCollapsed, onNavigate, onSignOut }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <header
      className={`fixed top-0 right-0 h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-30 transition-all duration-300 ${
        isCollapsed ? 'left-20' : 'left-64'
      }`}
    >
      <button
        onClick={onToggleSidebar}
        className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      <div className="flex-1" />

      {/* User Profile Section */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-3 hover:bg-gray-50 rounded-xl px-3 py-2 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0052CC] to-[#00C2A8] flex items-center justify-center text-white">
            {getInitials(user.name)}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-gray-900">{user.name}</div>
            <div className="text-gray-500">{user.role === 'admin' ? 'Admin' : 'User'}</div>
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>

        {/* Dropdown Menu */}
        {showDropdown && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setShowDropdown(false)}
            />
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
              <button 
                onClick={() => {
                  onNavigate('profile');
                  setShowDropdown(false);
                }}
                className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors"
              >
                <User className="w-4 h-4" />
                View Profile
              </button>
              <button 
                onClick={() => {
                  setShowDropdown(false);
                  onSignOut && onSignOut();
                }}
                className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
