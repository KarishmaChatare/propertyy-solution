// File: src/components/Settings.tsx
import { useState, useEffect } from "react";
import {
  Building2,
  Users as UsersIcon,
  FileText,
  Plus,
  Edit2,
  Trash2,
  UserCog,
} from "lucide-react";
import { UserManagement } from "./UserManagement";
import { User } from "../types";
import api from "../api";
import { toast } from "sonner";

interface SettingsProps {
  users: User[];
  onAddUser: (user: Omit<User, "id">) => void;
  onUpdateUser: (user: User) => void;
  onDeleteUser: (id: string) => void;
}

export function Settings({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
}: SettingsProps) {
  const [banks, setBanks] = useState<any[]>([]);
  const [valuers, setValuers] = useState<any[]>([]);
  const [visitors, setVisitors] = useState<any[]>([]);
  const [reporters, setReporters] = useState<any[]>([]);

  const [activeTab, setActiveTab] = useState<
    "users" | "banks" | "valuers" | "visitors" | "reporters"
  >("users");

  const [newItem, setNewItem] = useState("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const extract = (res: any) => res.data?.data || res.data;

  // -----------------------------------
  // LOAD ALL DATA FROM BACKEND
  // -----------------------------------

  useEffect(() => {
    loadBanks();
    loadValuers();
    loadVisitors();
    loadReporters();
  }, []);

  const loadBanks = async () => {
    try {
      const res: any = await api.get("/banks");
      setBanks(extract(res));
    } catch (e) {
      toast.error("Failed to load banks");
    }
  };

  const loadValuers = async () => {
    try {
      const res: any = await api.get("/valuers");
      setValuers(extract(res));
    } catch (e) {
      toast.error("Failed to load valuers");
    }
  };

  const loadVisitors = async () => {
    try {
      const res: any = await api.get("/visitors");
      setVisitors(extract(res));
    } catch (e) {
      toast.error("Failed to load visitors");
    }
  };

  const loadReporters = async () => {
    try {
      const res: any = await api.get("/reporters");
      setReporters(extract(res));
    } catch (e) {
      toast.error("Failed to load reporters");
    }
  };

  // -----------------------------------
  // ADD NEW
  // -----------------------------------

  const handleAdd = async () => {
    if (!newItem.trim()) return;

    try {
      let res: any;

      if (activeTab === "banks") res = await api.post("/banks", { name: newItem });
      if (activeTab === "valuers") res = await api.post("/valuers", { name: newItem });
      if (activeTab === "visitors") res = await api.post("/visitors", { name: newItem });
      if (activeTab === "reporters") res = await api.post("/reporters", { name: newItem });

      toast.success("Added successfully");
      setNewItem("");

      // reload correct list
      if (activeTab === "banks") loadBanks();
      if (activeTab === "valuers") loadValuers();
      if (activeTab === "visitors") loadVisitors();
      if (activeTab === "reporters") loadReporters();
    } catch (e) {
      toast.error("Failed to add");
    }
  };

  // -----------------------------------
  // START EDIT
  // -----------------------------------

  const handleEdit = (index: number, currentValue: string) => {
    setEditingIndex(index);
    setEditValue(currentValue);
  };

  // -----------------------------------
  // SAVE EDIT
  // -----------------------------------

  const handleSaveEdit = async () => {
    if (editingIndex === null || !editValue.trim()) return;

    try {
      let item;
      if (activeTab === "banks") item = banks[editingIndex];
      if (activeTab === "valuers") item = valuers[editingIndex];
      if (activeTab === "visitors") item = visitors[editingIndex];
      if (activeTab === "reporters") item = reporters[editingIndex];

      let url = "";
      if (activeTab === "banks") url = `/banks/${item.id}`;
      if (activeTab === "valuers") url = `/valuers/${item.id}`;
      if (activeTab === "visitors") url = `/visitors/${item.id}`;
      if (activeTab === "reporters") url = `/reporters/${item.id}`;

      await api.put(url, { name: editValue });

      toast.success("Updated successfully");
      setEditingIndex(null);
      setEditValue("");

      // reload correct list
      if (activeTab === "banks") loadBanks();
      if (activeTab === "valuers") loadValuers();
      if (activeTab === "visitors") loadVisitors();
      if (activeTab === "reporters") loadReporters();
    } catch (e) {
      toast.error("Failed to update");
    }
  };

  // -----------------------------------
  // DELETE ITEM
  // -----------------------------------

  const handleDelete = async (index: number) => {
    try {
      let item;
      if (activeTab === "banks") item = banks[index];
      if (activeTab === "valuers") item = valuers[index];
      if (activeTab === "visitors") item = visitors[index];
      if (activeTab === "reporters") item = reporters[index];

      let url = "";
      if (activeTab === "banks") url = `/banks/${item.id}`;
      if (activeTab === "valuers") url = `/valuers/${item.id}`;
      if (activeTab === "visitors") url = `/visitors/${item.id}`;
      if (activeTab === "reporters") url = `/reporters/${item.id}`;

      await api.delete(url);
      toast.success("Deleted");

      if (activeTab === "banks") loadBanks();
      if (activeTab === "valuers") loadValuers();
      if (activeTab === "visitors") loadVisitors();
      if (activeTab === "reporters") loadReporters();
    } catch (e) {
      toast.error("Failed to delete");
    }
  };

  // -----------------------------------
  // LIST SELECTOR
  // -----------------------------------

  const getCurrentList = () => {
    if (activeTab === "banks") return banks;
    if (activeTab === "valuers") return valuers;
    if (activeTab === "visitors") return visitors;
    if (activeTab === "reporters") return reporters;
    return [];
  };

  const tabs = [
    { id: "users", label: "Users", icon: UserCog },
    { id: "banks", label: "Banks", icon: Building2 },
    { id: "valuers", label: "Valuers", icon: UsersIcon },
    { id: "visitors", label: "Visitors", icon: UsersIcon },
    { id: "reporters", label: "Reporters", icon: FileText },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0052CC]/5 to-[#00C2A8]/5 rounded-2xl">
          <h2 className="text-gray-900 text-xl font-semibold !text-2xl">
            Admin Panel Settings
          </h2>
          <p className="text-gray-600 mt-1">
            Manage banks, valuers, visit persons and report persons
          </p>
        </div>

        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 px-6 py-4 flex items-center justify-center gap-2 transition-colors ${
                    activeTab === tab.id
                      ? "bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "users" ? (
            <UserManagement
              users={users}
              onAddUser={onAddUser}
              onUpdateUser={onUpdateUser}
              onDeleteUser={onDeleteUser}
            />
          ) : (
            <>
              {/* Add New */}
              <div className="mb-6">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder={`Add new ${activeTab}...`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                  />
                  <button
                    onClick={handleAdd}
                    className="px-6 py-2 bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>
              </div>

              {/* List */}
              <div className="space-y-2">
                {getCurrentList().map((item: any, index: number) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow"
                  >
                    {editingIndex === index ? (
                      <>
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="flex-1 px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                          autoFocus
                        />
                        <button
                          onClick={handleSaveEdit}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => {
                            setEditingIndex(null);
                            setEditValue("");
                          }}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <span className="flex-1 text-gray-900">{item.name}</span>

                        <button
                          onClick={() => handleEdit(index, item.name)}
                          className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-[#0052CC]"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDelete(index)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
