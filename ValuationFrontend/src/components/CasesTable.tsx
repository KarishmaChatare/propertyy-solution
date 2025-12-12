// import { useState } from 'react';
// import { Search, Edit2, Trash2, Plus, Download, FileText, FileSpreadsheet } from 'lucide-react';
// import { Case } from '../types';
// import { getCaseRowStatus, formatDate, formatCurrency, exportToCSV, exportToExcel, exportToPDF } from '../lib/utils';

// interface CasesTableProps {
//   cases: Case[];
//   onAddCase: () => void;
//   onEditCase: (caseData: Case) => void;
//   onDeleteCase: (id: number) => void;
// }

// export function CasesTable({ cases, onAddCase, onEditCase, onDeleteCase }: CasesTableProps) {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [statusFilter, setStatusFilter] = useState('all');
//   const [paymentFilter, setPaymentFilter] = useState('all');
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [showExportMenu, setShowExportMenu] = useState(false);

// const filteredCases = cases
//   .slice()                // copy array
//   .sort((a, b) => b.id - a.id)   // newest first
//   .filter((c) => {
//   const query = searchQuery.toLowerCase();

//   const matchesSearch =
//     c.clientName.toLowerCase().includes(query) ||
//     c.bankName.toLowerCase().includes(query) ||
//     c.bankPersonName.toLowerCase().includes(query) ||
//     c.valuerName.toLowerCase().includes(query) ||
//     c.visitPerson.toLowerCase().includes(query) ||
//     c.clientContact.toLowerCase().includes(query) ||
//     c.paymentStatus.toLowerCase().includes(query) ||
//     c.reportDoneBy.toLowerCase().includes(query) ||
//     c.remark.toLowerCase().includes(query) ||
//     String(c.srNo).includes(query) ||
//     String(c.id).includes(query) ||
//     c.reportOutdate.includes(searchQuery) ||
//     c.date.includes(searchQuery);

//   const matchesStatus =
//     statusFilter === "all" || c.reportStatus === statusFilter;

//   const matchesPayment =
//     paymentFilter === "all" || c.paymentStatus === paymentFilter;

//   let matchesDateRange = true;
//   if (fromDate) matchesDateRange = matchesDateRange && c.reportOutdate >= fromDate;
//   if (toDate) matchesDateRange = matchesDateRange && c.reportOutdate <= toDate;

//   return matchesSearch && matchesStatus && matchesPayment && matchesDateRange;
// });

//   const getRowClassName = (caseData: Case) => {
//     const status = getCaseRowStatus(caseData.reportOutdate, caseData.reportStatus);
//     switch (status) {
//       case 'overdue': return 'bg-red-50 hover:bg-red-100';
//       case 'due-soon': return 'bg-orange-50 hover:bg-orange-100';
//       default: return 'hover:bg-gray-50';
//     }
//   };

//   const handleExportCSV = () => {
//     exportToCSV(filteredCases, `cases-${new Date().toISOString().split('T')[0]}.csv`);
//     setShowExportMenu(false);
//   };

//   const handleExportExcel = () => {
//     exportToExcel(filteredCases, `cases-${new Date().toISOString().split('T')[0]}.xlsx`);
//     setShowExportMenu(false);
//   };

//   const handleExportPDF = () => {
//     exportToPDF(filteredCases, `cases-${new Date().toISOString().split('T')[0]}.pdf`);
//     setShowExportMenu(false);
//   };

//   const handleClearFilters = () => {
//     setSearchQuery('');
//     setFromDate('');
//     setToDate('');
//     setStatusFilter('all');
//     setPaymentFilter('all');
//   };

//   return (
//     <div className="space-y-4">

//       {/* Filters Bar */}
//       <div className="flex flex-col gap-4">
//         <div className="flex flex-col sm:flex-row gap-3 flex-wrap">

//           {/* Search */}
//           <div className="relative flex-1 min-w-[200px]">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by client, bank, or date..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC]"
//             />
//           </div>

//           {/* Date Range */}
//           <div className="flex gap-2">
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => setFromDate(e.target.value)}
//               className="px-4 py-2 border rounded-xl bg-white"
//             />
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => setToDate(e.target.value)}
//               className="px-4 py-2 border rounded-xl bg-white"
//             />
//           </div>

//           {/* Status Filter */}
//           <select
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//             className="px-4 py-2 border rounded-xl bg-white"
//           >
//             <option value="all">All Status</option>
//             <option value="Done">Done</option>
//             <option value="Pending">Pending</option>
//           </select>

//           {/* Payment Filter */}
//           <select
//             value={paymentFilter}
//             onChange={(e) => setPaymentFilter(e.target.value)}
//             className="px-4 py-2 border rounded-xl bg-white"
//           >
//             <option value="all">All Payments</option>
//             <option value="Paid">Paid</option>
//             <option value="Pending">Pending</option>
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between items-center">
//           <button onClick={handleClearFilters} className="px-4 py-2 text-gray-600">
//             Clear Filters
//           </button>

//           <div className="flex gap-2">
//             {/* Export */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowExportMenu(!showExportMenu)}
//                 className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl"
//               >
//                 <Download className="w-4 h-4" />
//                 Export
//               </button>

//               {/* Export Menu */}
//               {showExportMenu && (
//                 <>
//                   <div className="fixed inset-0 z-10" onClick={() => setShowExportMenu(false)} />
//                   <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-xl z-20">
//                     <button onClick={handleExportCSV} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
//                       <FileText className="w-4 h-4" /> Export CSV
//                     </button>
//                     <button onClick={handleExportExcel} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
//                       <FileSpreadsheet className="w-4 h-4" /> Export Excel
//                     </button>
//                     <button onClick={handleExportPDF} className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3">
//                       <FileText className="w-4 h-4" /> Export PDF
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Add Case */}
//             <button
//               onClick={onAddCase}
//               className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white rounded-xl"
//             >
//               <Plus className="w-4 h-4" />
//               Add Case
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b sticky top-0 z-10">
//               <tr>
//                 <th className="px-3 py-4 text-left">Sr No</th>
//                 <th className="px-3 py-4 text-left">Date</th>
//                 <th className="px-3 py-4 text-left">Client Name</th>
//                 <th className="px-3 py-4 text-left">Client Contact</th>
//                 <th className="px-3 py-4 text-left">Valuer Name</th>
//                 <th className="px-3 py-4 text-left">Bank Name</th>
//                 <th className="px-3 py-4 text-left">Bank Person</th>
//                 <th className="px-3 py-4 text-left">Visit Person</th>
//                 <th className="px-3 py-4 text-left">Report Done By</th>
//                 <th className="px-3 py-4 text-left">Valuation Payment</th>
//                 <th className="px-3 py-4 text-left">Payment Status</th>
//                 <th className="px-3 py-4 text-left">Payment Mode</th>
//                 <th className="px-3 py-4 text-left">UTR Number</th>
//                 <th className="px-3 py-4 text-left">Report Status</th>
//                 <th className="px-3 py-4 text-left">Remark</th>
//                 <th className="px-3 py-4 text-left">Report Outdate</th>
//                 <th className="px-3 py-4 text-left">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {filteredCases.map((caseData) => (
//                 <tr key={caseData.id} className={`border-b ${getRowClassName(caseData)}`}>
//                   <td className="px-3 py-4">#{caseData.srNo}</td>
//                   <td className="px-3 py-4">{formatDate(caseData.date)}</td>
//                   <td className="px-3 py-4">{caseData.clientName}</td>
//                   <td className="px-3 py-4">{caseData.clientContact}</td>
//                   <td className="px-3 py-4">{caseData.valuerName}</td>
//                   <td className="px-3 py-4">{caseData.bankName}</td>
//                   <td className="px-3 py-4">{caseData.bankPersonName}</td>
//                   <td className="px-3 py-4">{caseData.visitPerson}</td>
//                   <td className="px-3 py-4">{caseData.reportDoneBy}</td>
//                   <td className="px-3 py-4">{formatCurrency(caseData.valuationPayment)}</td>
//                   <td className="px-3 py-4">
//                     <span className={`px-3 py-1 rounded-lg ${
//                       caseData.paymentStatus === 'Paid' ? 'bg-green-100 text-green-700'
//                       : caseData.paymentStatus === 'Pending' ? 'bg-red-100 text-red-700'
//                       : 'bg-gray-100 text-gray-700'
//                     }`}>
//                       {caseData.paymentStatus}
//                     </span>
//                   </td>
//                   <td className="px-3 py-4">{caseData.paymentMode}</td>
//                   <td className="px-3 py-4">{caseData.utrNumber || '-'}</td>
//                   <td className="px-3 py-4">
//                     <span className={`px-3 py-1 rounded-lg ${
//                       caseData.reportStatus === 'Done' ? 'bg-green-100 text-green-700'
//                       : caseData.reportStatus === 'Pending' ? 'bg-orange-100 text-orange-700'
//                       : 'bg-gray-100 text-gray-700'
//                     }`}>
//                       {caseData.reportStatus}
//                     </span>
//                   </td>
//                   <td className="px-3 py-4 max-w-xs truncate" title={caseData.remark}>{caseData.remark}</td>
//                   <td className="px-3 py-4">{formatDate(caseData.reportOutdate)}</td>
//                   <td className="px-3 py-4">
//                     <div className="flex items-center gap-1">
//                       <button onClick={() => onEditCase(caseData)} className="p-2 text-[#0052CC]">
//                         <Edit2 className="w-4 h-4" />
//                       </button>
// <button onClick={() => onDeleteCase(Number(caseData.id))} className="p-2 text-red-600">
//   <Trash2 className="w-4 h-4" />


//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {filteredCases.length === 0 && (
//             <div className="text-center py-12 text-gray-500">
//               <p>No cases found.</p>
//               <button onClick={handleClearFilters} className="mt-4 text-[#0052CC] underline">
//                 Clear Filters
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import {
//   Search,
//   Edit2,
//   Trash2,
//   Plus,
//   Download,
//   FileText,
//   FileSpreadsheet,
// } from "lucide-react";
// import { Case } from "../types";
// import {
//   getCaseRowStatus,
//   formatDate,
//   formatCurrency,
//   exportToCSV,
//   exportToExcel,
//   exportToPDF,
// } from "../lib/utils";

// // 🔹 same preset type we use in App/Cases
// type CasesFilterPreset = "pending" | "done" | "today" | "month" | null;

// interface CasesTableProps {
//   cases: Case[];
//   onAddCase: () => void;
//   onEditCase: (caseData: Case) => void;
//   onDeleteCase: (id: number) => void;
//   filterPreset?: CasesFilterPreset;   // 🔹 new
// }

// export function CasesTable({
//   cases,
//   onAddCase,
//   onEditCase,
//   onDeleteCase,
//   filterPreset,
// }: CasesTableProps) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [paymentFilter, setPaymentFilter] = useState("all");
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [showExportMenu, setShowExportMenu] = useState(false);

//   // pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 20; // 🔹 20 per page

//   // 🔹 Apply filter preset from Dashboard (Pending / Done / Today / Month)
//   useEffect(() => {
//     if (!filterPreset) return;

//     const todayStr = new Date().toISOString().slice(0, 10);

//     if (filterPreset === "pending") {
//       setStatusFilter("Pending");
//       setFromDate("");
//       setToDate("");
//     } else if (filterPreset === "done") {
//       setStatusFilter("Done");
//       setFromDate("");
//       setToDate("");
//     } else if (filterPreset === "today") {
//       setStatusFilter("all");
//       setFromDate(todayStr);
//       setToDate(todayStr);
//     } else if (filterPreset === "month") {
//       const now = new Date();
//       const first = new Date(now.getFullYear(), now.getMonth(), 1)
//         .toISOString()
//         .slice(0, 10);
//       const last = new Date(now.getFullYear(), now.getMonth() + 1, 0)
//         .toISOString()
//         .slice(0, 10);
//       setStatusFilter("all");
//       setFromDate(first);
//       setToDate(last);
//     }

//     setCurrentPage(1);
//   }, [filterPreset]);

//   // Sort newest → oldest and apply ALL filters on FULL dataset
//   const filteredCases = cases
//     .slice()
//     .sort((a, b) => b.id - a.id)
//     .filter((c) => {
//       const query = searchQuery.toLowerCase();

//       const matchesSearch =
//         c.clientName.toLowerCase().includes(query) ||
//         c.bankName.toLowerCase().includes(query) ||
//         c.bankPersonName.toLowerCase().includes(query) ||
//         c.valuerName.toLowerCase().includes(query) ||
//         c.visitPerson.toLowerCase().includes(query) ||
//         c.clientContact.toLowerCase().includes(query) ||
//         c.paymentStatus.toLowerCase().includes(query) ||
//         c.reportDoneBy.toLowerCase().includes(query) ||
//         c.remark.toLowerCase().includes(query) ||
//         String(c.srNo ?? "").includes(query) ||
//         String(c.id).includes(query) ||
//         c.reportOutdate.includes(searchQuery) ||
//         c.date.includes(searchQuery);

//       const matchesStatus =
//         statusFilter === "all" ||
//         c.reportStatus?.toLowerCase() === statusFilter.toLowerCase(); // 🔹 case-insensitive, supports Hold

//       const matchesPayment =
//         paymentFilter === "all" ||
//         c.paymentStatus?.toLowerCase() === paymentFilter.toLowerCase();

//       let matchesDateRange = true;
//       if (fromDate)
//         matchesDateRange = matchesDateRange && c.reportOutdate >= fromDate;
//       if (toDate)
//         matchesDateRange = matchesDateRange && c.reportOutdate <= toDate;

//       return (
//         matchesSearch && matchesStatus && matchesPayment && matchesDateRange
//       );
//     });

//   const totalPages = Math.max(1, Math.ceil(filteredCases.length / rowsPerPage));
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const paginatedCases = filteredCases.slice(
//     startIndex,
//     startIndex + rowsPerPage
//   );

//   const getRowClassName = (caseData: Case) => {
//     const status = getCaseRowStatus(
//       caseData.reportOutdate,
//       caseData.reportStatus
//     );
//     switch (status) {
//       case "overdue":
//         return "bg-red-50 hover:bg-red-100";
//       case "due-soon":
//         return "bg-orange-50 hover:bg-orange-100";
//       default:
//         return "hover:bg-gray-50";
//     }
//   };

//   const handleExportCSV = () => {
//     exportToCSV(
//       filteredCases,
//       `cases-${new Date().toISOString().split("T")[0]}.csv`
//     );
//     setShowExportMenu(false);
//   };

//   const handleExportExcel = () => {
//     exportToExcel(
//       filteredCases,
//       `cases-${new Date().toISOString().split("T")[0]}.xlsx`
//     );
//     setShowExportMenu(false);
//   };

//   const handleExportPDF = () => {
//     exportToPDF(
//       filteredCases,
//       `cases-${new Date().toISOString().split("T")[0]}.pdf`
//     );
//     setShowExportMenu(false);
//   };

//   const handleClearFilters = () => {
//     setSearchQuery("");
//     setFromDate("");
//     setToDate("");
//     setStatusFilter("all");
//     setPaymentFilter("all");
//     setCurrentPage(1);
//   };

//   const handleSearchChange = (value: string) => {
//     setSearchQuery(value);
//     setCurrentPage(1);
//   };

//   const handleStatusChange = (value: string) => {
//     setStatusFilter(value);
//     setCurrentPage(1);
//   };

//   const handlePaymentChange = (value: string) => {
//     setPaymentFilter(value);
//     setCurrentPage(1);
//   };

//   const handleFromDateChange = (value: string) => {
//     setFromDate(value);
//     setCurrentPage(1);
//   };

//   const handleToDateChange = (value: string) => {
//     setToDate(value);
//     setCurrentPage(1);
//   };

//   const goToPage = (page: number) => {
//     if (page < 1 || page > totalPages) return;
//     setCurrentPage(page);
//   };

//   return (
//     <div className="space-y-4">
//       {/* Filters Bar */}
//       <div className="flex flex-col gap-4">
//         <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
//           {/* Search */}
//           <div className="relative flex-1 min-w-[200px]">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
//             <input
//               type="text"
//               placeholder="Search by client, bank, or date..."
//               value={searchQuery}
//               onChange={(e) => handleSearchChange(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC]"
//             />
//           </div>

//           {/* Date Range */}
//           <div className="flex gap-2">
//             <input
//               type="date"
//               value={fromDate}
//               onChange={(e) => handleFromDateChange(e.target.value)}
//               className="px-4 py-2 border rounded-xl bg-white"
//             />
//             <input
//               type="date"
//               value={toDate}
//               onChange={(e) => handleToDateChange(e.target.value)}
//               className="px-4 py-2 border rounded-xl bg-white"
//             />
//           </div>

//           {/* Status Filter */}
//           <select
//             value={statusFilter}
//             onChange={(e) => handleStatusChange(e.target.value)}
//             className="px-4 py-2 border rounded-xl bg-white"
//           >
//             <option value="all">All Status</option>
//             <option value="Done">Done</option>
//             <option value="Pending">Pending</option>
//           </select>

//           {/* Payment Filter */}
//           <select
//             value={paymentFilter}
//             onChange={(e) => handlePaymentChange(e.target.value)}
//             className="px-4 py-2 border rounded-xl bg-white"
//           >
//             <option value="all">All Payments</option>
//             <option value="Paid">Paid</option>
//             <option value="Pending">Pending</option>
//           </select>
//         </div>

//         {/* Buttons */}
//         <div className="flex justify-between items-center">
//           <button
//             onClick={handleClearFilters}
//             className="px-4 py-2 text-gray-600"
//           >
//             Clear Filters
//           </button>

//           <div className="flex gap-2">
//             {/* Export */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowExportMenu(!showExportMenu)}
//                 className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl"
//               >
//                 <Download className="w-4 h-4" />
//                 Export
//               </button>

//               {showExportMenu && (
//                 <>
//                   <div
//                     className="fixed inset-0 z-10"
//                     onClick={() => setShowExportMenu(false)}
//                   />
//                   <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-xl z-20">
//                     <button
//                       onClick={handleExportCSV}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
//                     >
//                       <FileText className="w-4 h-4" /> Export CSV
//                     </button>
//                     <button
//                       onClick={handleExportExcel}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
//                     >
//                       <FileSpreadsheet className="w-4 h-4" /> Export Excel
//                     </button>
//                     <button
//                       onClick={handleExportPDF}
//                       className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
//                     >
//                       <FileText className="w-4 h-4" /> Export PDF
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>

//             {/* Add Case */}
//             <button
//               onClick={onAddCase}
//               className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white rounded-xl"
//             >
//               <Plus className="w-4 h-4" />
//               Add Case
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead className="bg-gray-50 border-b sticky top-0 z-10">
//               <tr>
//                 <th className="px-3 py-4 text-left">Sr No</th>
//                 <th className="px-3 py-4 text-left">Date</th>
//                 <th className="px-3 py-4 text-left">Client Name</th>
//                 <th className="px-3 py-4 text-left">Client Contact</th>
//                 <th className="px-3 py-4 text-left">Valuer Name</th>
//                 <th className="px-3 py-4 text-left">Bank Name</th>
//                 <th className="px-3 py-4 text-left">Bank Person</th>
//                 <th className="px-3 py-4 text-left">Visit Person</th>
//                 <th className="px-3 py-4 text-left">Report Done By</th>
//                 <th className="px-3 py-4 text-left">Valuation Payment</th>
//                 <th className="px-3 py-4 text-left">Payment Status</th>
//                 <th className="px-3 py-4 text-left">Payment Mode</th>
//                 <th className="px-3 py-4 text-left">UTR Number</th>
//                 <th className="px-3 py-4 text-left">Report Status</th>
//                 <th className="px-3 py-4 text-left">Remark</th>
//                 <th className="px-3 py-4 text-left">Report Outdate</th>
//                 <th className="px-3 py-4 text-left">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {paginatedCases.map((caseData, index) => {
//                 const status = caseData.reportStatus?.toLowerCase();

//                 return (
//                   <tr
//                     key={caseData.id}
//                     className={`border-b ${getRowClassName(caseData)}`}
//                   >
//                     {/* 🔹 Sr No continuous across pages */}
//                     <td className="px-3 py-4">{startIndex + index + 1}</td>
//                     <td className="px-3 py-4">{formatDate(caseData.date)}</td>
//                     <td className="px-3 py-4">{caseData.clientName}</td>
//                     <td className="px-3 py-4">{caseData.clientContact}</td>
//                     <td className="px-3 py-4">{caseData.valuerName}</td>
//                     <td className="px-3 py-4">{caseData.bankName}</td>
//                     <td className="px-3 py-4">{caseData.bankPersonName}</td>
//                     <td className="px-3 py-4">{caseData.visitPerson}</td>
//                     <td className="px-3 py-4">{caseData.reportDoneBy}</td>
//                     <td className="px-3 py-4">
//                       {formatCurrency(caseData.valuationPayment)}
//                     </td>
//                     <td className="px-3 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-lg ${
//                           caseData.paymentStatus === "Paid"
//                             ? "bg-green-100 text-green-700"
//                             : caseData.paymentStatus === "Pending"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-gray-100 text-gray-700"
//                         }`}
//                       >
//                         {caseData.paymentStatus}
//                       </span>
//                     </td>
//                     <td className="px-3 py-4">{caseData.paymentMode}</td>
//                     <td className="px-3 py-4">{caseData.utrNumber || "-"}</td>
//                     <td className="px-3 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-lg ${
//                           status === "done"
//                             ? "bg-green-100 text-green-700"
//                             : status === "pending"
//                             ? "bg-orange-100 text-orange-700"
//                             : "bg-gray-100 text-gray-700"
//                         }`}
//                       >
//                         {caseData.reportStatus}
//                       </span>
//                     </td>
//                     <td
//                       className="px-3 py-4 max-w-xs truncate"
//                       title={caseData.remark}
//                     >
//                       {caseData.remark}
//                     </td>
//                     <td className="px-3 py-4">
//                       {formatDate(caseData.reportOutdate)}
//                     </td>
//                     <td className="px-3 py-4">
//                       <div className="flex items-center gap-1">
//                         <button
//                           onClick={() => onEditCase(caseData)}
//                           className="p-2 text-[#0052CC]"
//                         >
//                           <Edit2 className="w-4 h-4" />
//                         </button>
//                         <button
//                           onClick={() => onDeleteCase(Number(caseData.id))}
//                           className="p-2 text-red-600"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>

//           {filteredCases.length === 0 && (
//             <div className="text-center py-12 text-gray-500">
//               <p>No cases found.</p>
//               <button
//                 onClick={handleClearFilters}
//                 className="mt-4 text-[#0052CC] underline"
//               >
//                 Clear Filters
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Pagination footer */}
//         {filteredCases.length > 0 && (
//           <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-gray-600">
//             <div>
//               Showing{" "}
//               <span className="font-medium">
//                 {filteredCases.length === 0 ? 0 : startIndex + 1}
//               </span>{" "}
//               to{" "}
//               <span className="font-medium">
//                 {Math.min(startIndex + rowsPerPage, filteredCases.length)}
//               </span>{" "}
//               of <span className="font-medium">{filteredCases.length}</span>{" "}
//               cases
//             </div>
//             <div className="flex items-center gap-2">
//               <button
//                 onClick={() => goToPage(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="px-3 py-1 border rounded-lg disabled:opacity-50"
//               >
//                 Prev
//               </button>
//               <span>
//                 Page <span className="font-medium">{currentPage}</span> of{" "}
//                 <span className="font-medium">{totalPages}</span>
//               </span>
//               <button
//                 onClick={() => goToPage(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="px-3 py-1 border rounded-lg disabled:opacity-50"
//               >
//                 Next
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



// src/components/CasesTable.tsx
import { useState, useEffect } from "react";
import {
  Search,
  Edit2,
  Trash2,
  Plus,
  Download,
  FileText,
  FileSpreadsheet,
} from "lucide-react";
import { Case } from "../types";
import {
  getCaseRowStatus,
  formatDate,
  formatCurrency,
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "../lib/utils";

// 🔹 same preset type we use in App/Cases
type CasesFilterPreset = "pending" | "done" | "today" | "month" | null;

interface CasesTableProps {
  cases: Case[];
  onAddCase: () => void;
  onEditCase: (caseData: Case) => void;
  onDeleteCase: (id: number) => void;
  filterPreset?: CasesFilterPreset; // 🔹 new
}

export function CasesTable({
  cases,
  onAddCase,
  onEditCase,
  onDeleteCase,
  filterPreset,
}: CasesTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showExportMenu, setShowExportMenu] = useState(false);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // 🔹 20 per page

  // 🔹 Apply filter preset from Dashboard (Pending / Done / Today / Month)
  useEffect(() => {
    if (!filterPreset) return;

    const todayStr = new Date().toISOString().slice(0, 10);

    if (filterPreset === "pending") {
      setStatusFilter("Pending");
      setFromDate("");
      setToDate("");
    } else if (filterPreset === "done") {
      setStatusFilter("Done");
      setFromDate("");
      setToDate("");
    } else if (filterPreset === "today") {
      setStatusFilter("all");
      setFromDate(todayStr);
      setToDate(todayStr);
    } else if (filterPreset === "month") {
      const now = new Date();
      const first = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .slice(0, 10);
      const last = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .slice(0, 10);
      setStatusFilter("all");
      setFromDate(first);
      setToDate(last);
    }

    setCurrentPage(1);
  }, [filterPreset]);

  // Sort newest → oldest and apply ALL filters on FULL dataset
  const filteredCases = cases
    .slice()
    .sort((a, b) => b.id - a.id)
    .filter((c) => {
      const query = searchQuery.toLowerCase();

      const matchesSearch = (() => {
        return (
          (c.clientName || "").toLowerCase().includes(query) ||
          (c.bankName || "").toLowerCase().includes(query) ||
          (c.bankPersonName || "").toLowerCase().includes(query) ||
          (c.valuerName || "").toLowerCase().includes(query) ||
          (c.visitPerson || "").toLowerCase().includes(query) ||
          (c.clientContact || "").toLowerCase().includes(query) ||
          (c.paymentStatus || "").toLowerCase().includes(query) ||
          (c.reportDoneBy || "").toLowerCase().includes(query) ||
          (c.remark || "").toLowerCase().includes(query) ||
          String(c.srNo ?? "").includes(query) ||
          String(c.id ?? "").includes(query) ||
          (c.reportOutdate || "").includes(searchQuery) ||
          (c.date || "").includes(searchQuery)
        );
      })();

      const matchesStatus =
        statusFilter === "all" ||
        (c.reportStatus || "").toLowerCase() === statusFilter.toLowerCase();

      const matchesPayment =
        paymentFilter === "all" ||
        (c.paymentStatus || "").toLowerCase() === paymentFilter.toLowerCase();

      let matchesDateRange = true;
      if (fromDate) matchesDateRange = matchesDateRange && (c.reportOutdate || "") >= fromDate;
      if (toDate) matchesDateRange = matchesDateRange && (c.reportOutdate || "") <= toDate;

      return (
        matchesSearch && matchesStatus && matchesPayment && matchesDateRange
      );
    });

  const totalPages = Math.max(1, Math.ceil(filteredCases.length / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedCases = filteredCases.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const getRowClassName = (caseData: Case) => {
    const status = getCaseRowStatus(
      caseData.reportOutdate,
      caseData.reportStatus
    );
    switch (status) {
      case "overdue":
        return "bg-red-50 hover:bg-red-100";
      case "due-soon":
        return "bg-orange-50 hover:bg-orange-100";
      default:
        return "hover:bg-gray-50";
    }
  };

  const handleExportCSV = () => {
    exportToCSV(
      filteredCases,
      `cases-${new Date().toISOString().split("T")[0]}.csv`
    );
    setShowExportMenu(false);
  };

  const handleExportExcel = () => {
    exportToExcel(
      filteredCases,
      `cases-${new Date().toISOString().split("T")[0]}.xlsx`
    );
    setShowExportMenu(false);
  };

  const handleExportPDF = () => {
    exportToPDF(
      filteredCases,
      `cases-${new Date().toISOString().split("T")[0]}.pdf`
    );
    setShowExportMenu(false);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setFromDate("");
    setToDate("");
    setStatusFilter("all");
    setPaymentFilter("all");
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePaymentChange = (value: string) => {
    setPaymentFilter(value);
    setCurrentPage(1);
  };

  const handleFromDateChange = (value: string) => {
    setFromDate(value);
    setCurrentPage(1);
  };

  const handleToDateChange = (value: string) => {
    setToDate(value);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="space-y-4">
      {/* Filters Bar */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3 flex-wrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by client, bank, or date..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0052CC]"
            />
          </div>

          {/* Date Range */}
          <div className="flex gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => handleFromDateChange(e.target.value)}
              className="px-4 py-2 border rounded-xl bg-white"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => handleToDateChange(e.target.value)}
              className="px-4 py-2 border rounded-xl bg-white"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="px-4 py-2 border rounded-xl bg-white"
          >
            <option value="all">All Status</option>
            <option value="Done">Done</option>
            <option value="Pending">Pending</option>
          </select>

          {/* Payment Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => handlePaymentChange(e.target.value)}
            className="px-4 py-2 border rounded-xl bg-white"
          >
            <option value="all">All Payments</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-gray-600"
          >
            Clear Filters
          </button>

          <div className="flex gap-2">
            {/* Export */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-white border rounded-xl"
              >
                <Download className="w-4 h-4" />
                Export
              </button>

              {showExportMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowExportMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-xl z-20">
                    <button
                      onClick={handleExportCSV}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
                    >
                      <FileText className="w-4 h-4" /> Export CSV
                    </button>
                    <button
                      onClick={handleExportExcel}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
                    >
                      <FileSpreadsheet className="w-4 h-4" /> Export Excel
                    </button>
                    <button
                      onClick={handleExportPDF}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3"
                    >
                      <FileText className="w-4 h-4" /> Export PDF
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Add Case */}
            <button
              onClick={onAddCase}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0052CC] to-[#00C2A8] text-white rounded-xl"
            >
              <Plus className="w-4 h-4" />
              Add Case
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b sticky top-0 z-10">
              <tr>
                <th className="px-3 py-4 text-left">Sr No</th>
                <th className="px-3 py-4 text-left">Date</th>
                <th className="px-3 py-4 text-left">Client Name</th>
                <th className="px-3 py-4 text-left">Client Contact</th>
                <th className="px-3 py-4 text-left">Valuer Name</th>
                <th className="px-3 py-4 text-left">Bank Name</th>
                <th className="px-3 py-4 text-left">Bank Person</th>
                <th className="px-3 py-4 text-left">Visit Person</th>
                <th className="px-3 py-4 text-left">Report Done By</th>
                <th className="px-3 py-4 text-left">Valuation Payment</th>
                <th className="px-3 py-4 text-left">Payment Status</th>
                <th className="px-3 py-4 text-left">Payment Mode</th>
                <th className="px-3 py-4 text-left">UTR Number</th>
                <th className="px-3 py-4 text-left">Report Status</th>
                <th className="px-3 py-4 text-left">Remark</th>
                <th className="px-3 py-4 text-left">Report Outdate</th>
                <th className="px-3 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedCases.map((caseData, index) => {
                const status = (caseData.reportStatus || "").toLowerCase();

                return (
                  <tr
                    key={caseData.id}
                    className={`border-b ${getRowClassName(caseData)}`}
                  >
                    {/* 🔹 Sr No continuous across pages */}
                    <td className="px-3 py-4">{startIndex + index + 1}</td>
                    <td className="px-3 py-4">{formatDate(caseData.date)}</td>
                    <td className="px-3 py-4">{caseData.clientName}</td>
                    <td className="px-3 py-4">{caseData.clientContact}</td>
                    <td className="px-3 py-4">{caseData.valuerName}</td>
                    <td className="px-3 py-4">{caseData.bankName}</td>
                    <td className="px-3 py-4">{caseData.bankPersonName}</td>
                    <td className="px-3 py-4">{caseData.visitPerson}</td>
                    <td className="px-3 py-4">{caseData.reportDoneBy}</td>
                    <td className="px-3 py-4">
                      {formatCurrency(caseData.valuationPayment)}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`px-3 py-1 rounded-lg ${
                          caseData.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : caseData.paymentStatus === "Pending"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {caseData.paymentStatus || "-"}
                      </span>
                    </td>
                    <td className="px-3 py-4">{caseData.paymentMode || "-"}</td>
                    <td className="px-3 py-4">{caseData.utrNumber || "-"}</td>
                    <td className="px-3 py-4">
                      <span
                        className={`px-3 py-1 rounded-lg ${
                          status === "done"
                            ? "bg-green-100 text-green-700"
                            : status === "pending"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {caseData.reportStatus || "-"}
                      </span>
                    </td>
                    <td
                      className="px-3 py-4 max-w-xs truncate"
                      title={caseData.remark || ""}
                    >
                      {caseData.remark || "-"}
                    </td>
                    <td className="px-3 py-4">
                      {formatDate(caseData.reportOutdate)}
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => onEditCase(caseData)}
                          className="p-2 text-[#0052CC]"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteCase(Number(caseData.id))}
                          className="p-2 text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredCases.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p>No cases found.</p>
              <button
                onClick={handleClearFilters}
                className="mt-4 text-[#0052CC] underline"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Pagination footer */}
        {filteredCases.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t text-sm text-gray-600">
            <div>
              Showing{" "}
              <span className="font-medium">
                {filteredCases.length === 0 ? 0 : startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(startIndex + rowsPerPage, filteredCases.length)}
              </span>{" "}
              of <span className="font-medium">{filteredCases.length}</span>{" "}
              cases
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-lg disabled:opacity-50"
              >
                Prev
              </button>
              <span>
                Page <span className="font-medium">{currentPage}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
              </span>
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-lg disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
