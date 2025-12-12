// File: src/components/CasePopup.tsx

import { useState } from "react";
import { X, Search, Edit2, Save } from "lucide-react";
import { Case } from "../types";
import api from "../api";
import { formatDate, formatCurrency } from "../lib/utils";

interface CasePopupProps {
  title: string;
  cases: Case[];
  onClose: () => void;
  onUpdateCase: (caseData: Case) => void;
  accentColor: string;
  bgColor: string;
}

export function CasePopup({
  title,
  cases,
  onClose,
  onUpdateCase,
  accentColor,
  bgColor,
}: CasePopupProps) {
  const [searchQuery, setSearchQuery] = useState("");
const [editingId, setEditingId] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<Case> | null>(null);
  const [loading, setLoading] = useState(false);

  const filteredCases = cases.filter(
    (c) =>
      c.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.bankName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startEdit = (c: Case) => {
  setEditingId(Number(c.id));
    setEditData({ ...c });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData(null);
  };

  const saveEdit = async (original: Case) => {
    if (!editData) return;

    const payload: Case = { ...original, ...editData };

    try {
      setLoading(true);

      const response = await api.put(`/cases/${payload.id}`, payload);

      onUpdateCase(response.data);

      setLoading(false);
      cancelEdit();
    } catch (err) {
      console.error("Error updating case:", err);
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className={`${bgColor} px-6 py-4 border-b border-gray-200 rounded-t-2xl flex items-center justify-between`}
        >
          <h2 className={accentColor}>{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by client or bank..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl"
            />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {filteredCases.map((c) => {
            const isEditing = editingId === c.id;
            const data = isEditing ? editData! : c;

            return (
              <div
                key={c.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
              >
                {/* Top Row */}
                <div className="flex items-start justify-between mb-3">
                  <div>
                    {isEditing ? (
                      <input
                        className="px-2 py-1 border rounded-lg w-full"
                        value={data.clientName ?? ""}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...(prev ?? {}),
                            clientName: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      <h4 className="text-gray-900">{c.clientName}</h4>
                    )}
                    <p className="text-gray-500">Case #{c.srNo}</p>
                  </div>

                  {!isEditing && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();   // ⭐ FIX: prevent popup close
                        startEdit(c);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>

                {/* Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700">
                  <div>
                    <span className="text-gray-500">Bank:</span>{" "}
                    {isEditing ? (
                      <input
                        className="w-full px-2 py-1 mt-1 border rounded-lg"
                        value={data.bankName ?? ""}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...(prev ?? {}),
                            bankName: e.target.value,
                          }))
                        }
                      />
                    ) : (
                      c.bankName
                    )}
                  </div>

                  <div>
                    <span className="text-gray-500">Report Date:</span>{" "}
                    {formatDate(c.reportOutdate)}
                  </div>

                  <div>
                    <span className="text-gray-500">Report Status:</span>{" "}
                    {isEditing ? (
                      <select
                        className="w-full px-2 py-1 mt-1 border rounded-lg"
                        value={data.reportStatus ?? "Pending"}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...(prev ?? {}),
                            reportStatus: e.target.value as Case["reportStatus"],
                          }))
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Done">Done</option>
                      </select>
                    ) : (
                      c.reportStatus
                    )}
                  </div>

                  <div>
                    <span className="text-gray-500">Payment:</span>{" "}
                    {isEditing ? (
                      <select
                        className="w-full px-2 py-1 mt-1 border rounded-lg"
                        value={data.paymentStatus ?? "Pending"}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...(prev ?? {}),
                            paymentStatus:
                              e.target.value as Case["paymentStatus"],
                          }))
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                      </select>
                    ) : (
                      c.paymentStatus
                    )}
                  </div>

                  <div className="col-span-2">
                    <span className="text-gray-500">Amount:</span>{" "}
                    {isEditing ? (
                      <input
                        type="number"
                        className="w-full px-2 py-1 mt-1 border rounded-lg"
                        value={data.valuationPayment ?? 0}
                        onChange={(e) =>
                          setEditData((prev) => ({
                            ...(prev ?? {}),
                            valuationPayment: Number(e.target.value),
                          }))
                        }
                      />
                    ) : (
                      formatCurrency(c.valuationPayment)
                    )}
                  </div>
                </div>

                {/* Save Buttons */}
                {isEditing && (
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();  // prevent popup close
                        saveEdit(c);
                      }}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white rounded-lg"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        cancelEdit();
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {filteredCases.length === 0 &&
            <p className="text-center py-10 text-gray-500">No cases found</p>
          }
        </div>
      </div>
    </div>
  );
}
