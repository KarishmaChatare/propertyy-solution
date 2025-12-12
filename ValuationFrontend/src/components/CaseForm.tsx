import { X } from 'lucide-react';
import { useState } from 'react';
import { Case } from '../types';
import api from '../api';
import { EditableDropdown } from "./EditableDropdown";

interface CaseFormProps {
  caseData?: Case;
  onSave: (data: Case) => void;
  onCancel: () => void;
  nextSrNo: number;

  // backend objects: [{id, name}]
  banks: any[];
  valuers: any[];
  visitPersons: any[];
  reporters: any[];
}

export function CaseForm({
  caseData,
  onSave,
  onCancel,
  nextSrNo,
  banks,
  valuers,
  visitPersons,
  reporters,
}: CaseFormProps) {

  const [formData, setFormData] = useState<Case>(
    caseData || {
      id: 0,
      srNo: nextSrNo,
      date: new Date().toISOString().split('T')[0],
      clientName: '',
      clientContact: '',
      valuerName: '',
      bankName: '',
      bankPersonName: '',
      visitPerson: '',
      reportDoneBy: '',
      valuationPayment: 0,
      paymentStatus: 'None',
      paymentMode: 'None',
      utrNumber: '',
      reportStatus: 'None',
      remark: '',
      reportOutdate: new Date().toISOString().split('T')[0],
    }
  );

  const handleChange = (field: keyof Case, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updated = { ...formData };

    try {
      let response;
      if (caseData?.id) {
        response = await api.put(`/cases/${caseData.id}`, updated);
      } else {
        response = await api.post('/cases', updated);
      }

      onSave(response.data);

    } catch (err) {
      console.error("Error saving case", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full my-8">

        {/* HEADER */}
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gradient-to-r from-[#0052CC]/5 to-[#00C2A8]/5">
          <h2 className="text-gray-900">{caseData ? "Edit Case" : "Add New Case"}</h2>
          <button onClick={onCancel} className="p-2 hover:bg-white rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* SR NO */}
            <div>
              <label className="block text-gray-700 mb-2">Sr No</label>
              <input
                type="number"
                disabled
                value={formData.srNo}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-gray-100"
              />
            </div>

            {/* DATE */}
            <div>
              <label className="block text-gray-700 mb-2">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleChange("date", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            {/* CLIENT NAME */}
            <div>
              <label className="block text-gray-700 mb-2">Client Name *</label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) => handleChange("clientName", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            {/* CLIENT CONTACT */}
            <div>
              <label className="block text-gray-700 mb-2">Client Contact *</label>
              <input
                type="tel"
                value={formData.clientContact}
                onChange={(e) => handleChange("clientContact", e.target.value)}
                required
                pattern="[0-9]{10}"
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            {/* ⭐ VALUER (STRING ARRAY) */}
            <EditableDropdown
              label="Valuer *"
              value={formData.valuerName}
              options={valuers.map(v => v.name)}
              onChange={v => handleChange("valuerName", v)}
            />

            {/* ⭐ BANK NAME */}
            <EditableDropdown
              label="Bank Name *"
              value={formData.bankName}
              options={banks.map(b => b.name)}
              onChange={v => handleChange("bankName", v)}
            />

            {/* BANK PERSON */}
            <div>
              <label className="block text-gray-700 mb-2">Bank Person Name</label>
              <input
                type="text"
                value={formData.bankPersonName}
                onChange={(e) => handleChange("bankPersonName", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            {/* ⭐ VISIT PERSON */}
            <EditableDropdown
              label="Visit Person *"
              value={formData.visitPerson}
              options={visitPersons.map(v => v.name)}
              onChange={v => handleChange("visitPerson", v)}
            />

            {/* ⭐ REPORT DONE BY */}
            <EditableDropdown
              label="Report Done By *"
              value={formData.reportDoneBy}
              options={reporters.map(r => r.name)}
              onChange={v => handleChange("reportDoneBy", v)}
            />

            {/* PAYMENT */}
            <div>
              <label className="block text-gray-700 mb-2">Valuation Payment *</label>
              <input
                type="number"
                min="0"
                value={formData.valuationPayment}
                onChange={(e) => handleChange("valuationPayment", Number(e.target.value))}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            {/* PAYMENT STATUS */}
            <div>
              <label className="block text-gray-700 mb-2">Payment Status *</label>
              <select
                value={formData.paymentStatus}
                onChange={(e) => handleChange("paymentStatus", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white"
              >
                <option value="None">None</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* PAYMENT MODE */}
            <div>
              <label className="block text-gray-700 mb-2">Payment Mode</label>
              <select
                value={formData.paymentMode}
                onChange={(e) => handleChange("paymentMode", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white"
              >
                <option value="None">None</option>
                <option value="GPay">GPay</option>
                <option value="PhonePe">PhonePe</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="BHIM">BHIM</option>
                <option value="Paytm">Paytm</option>
                <option value="CRED">CRED</option>
              </select>
            </div>

            {/* UTR */}
            <div>
              <label className="block text-gray-700 mb-2">UTR Number</label>
              <input
                type="text"
                value={formData.utrNumber}
                onChange={(e) => handleChange("utrNumber", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            {/* REPORT STATUS */}
            <div>
              <label className="block text-gray-700 mb-2">Report Status *</label>
              <select
                value={formData.reportStatus}
                onChange={(e) => handleChange("reportStatus", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl bg-white"
              >
                <option value="None">None</option>
                <option value="Done">Done</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* REPORT OUTDATE */}
            <div>
              <label className="block text-gray-700 mb-2">Report Outdate *</label>
              <input
                type="date"
                value={formData.reportOutdate}
                onChange={(e) => handleChange("reportOutdate", e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-xl"
              />
            </div>

            {/* REMARK */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2">Remark</label>
              <textarea
                rows={3}
                value={formData.remark}
                onChange={(e) => handleChange("remark", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl resize-none"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-200">
            <button type="submit" className="px-6 py-2 bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white rounded-xl">
              Save Case
            </button>

            <button type="button" onClick={onCancel} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
