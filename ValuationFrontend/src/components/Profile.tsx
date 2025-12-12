import { User, Mail, Shield, Calendar } from 'lucide-react';
import { User as UserType } from '../types';
import { formatDate } from '../lib/utils';

interface ProfileProps {
  user: UserType;
}

export function Profile({ user }: ProfileProps) {
  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0052CC] to-[#00C2A8] h-32" />

        {/* Profile Content */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16">
            {/* Avatar */}
            <div className="w-32 h-32 rounded-2xl bg-white shadow-lg flex items-center justify-center text-white text-[3rem] bg-gradient-to-br from-[#0052CC] to-[#00C2A8]">
              {getInitials(user.name)}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left pt-4">
              <h2 className="text-gray-900 mb-2">{user.name}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          {/* Details Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-[#0052CC]" />
                </div>
                <h3 className="text-gray-900">Personal Information</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500">Full Name</p>
                  <p className="text-gray-900">{user.name}</p>
                </div>
                <div>
                  <p className="text-gray-500">User ID</p>
                  <p className="text-gray-900">{user.id}</p>
                </div>
                <div>
                  <p className="text-gray-500">Member Since</p>
                  <p className="text-gray-900">{formatDate(user.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#00C2A8]" />
                </div>
                <h3 className="text-gray-900">Contact Information</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500">Email Address</p>
                  <p className="text-gray-900">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-gray-900">Account Details</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500">Role</p>
                  <span className="inline-flex px-3 py-1 rounded-lg bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white">
                    {user.role === 'admin' ? 'Administrator' : 'User'}
                  </span>
                </div>
                <div>
                  <p className="text-gray-500">Status</p>
                  <span className="inline-flex px-3 py-1 rounded-lg bg-green-100 text-green-700">
                    Active
                  </span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#FFA500]" />
                </div>
                <h3 className="text-gray-900">Activity</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500">Last Login</p>
                  <p className="text-gray-900">{formatDate(user.lastLogin)}</p>
                </div>
                <div>
                  <p className="text-gray-500">Total Logins</p>
                  <p className="text-gray-900">{user.loginCount} times</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
