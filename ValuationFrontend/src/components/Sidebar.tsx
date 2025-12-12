import { Home, FileText, User, Settings } from 'lucide-react';
import { User as UserType } from '../types';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: UserType;
  isCollapsed: boolean;
}

export function Sidebar({ currentPage, onNavigate, user, isCollapsed }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'cases', label: 'Cases', icon: FileText },
    { id: 'bankSummary', label: 'Bank Person', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
    ...(user.role === 'admin' ? [{ id: 'settings', label: 'Settings', icon: Settings }] : []),
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">

        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"     // <-- replace with your file
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
              <span className="bg-gradient-to-r from-[#0052CC] to-[#00C2A8] bg-clip-text text-transparent font-semibold text-lg">
                Propertyy Solutions
              </span>
            </div>
          )}

          {isCollapsed && (
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-10 object-contain mx-auto"
            />
          )}
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-[#0052CC]'
                    }`}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isCollapsed ? 'mx-auto' : ''}`} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

      </div>
    </div>
  );
}
