// import { Clock, Calendar, DollarSign, CheckCircle, AlertCircle, FileText, BarChart3 } from 'lucide-react';
// import { DashboardStats, ChartData, Case } from '../types';
// import { formatCurrency } from '../lib/utils';
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer
// } from 'recharts';

// interface DashboardProps {
//   cases: Case[];
//   chartData: ChartData[];
// }

// export function Dashboard({ cases, chartData }: DashboardProps) {
//   const today = new Date().toISOString().split("T")[0];
//   const currentMonth = new Date().getMonth();
//   const currentYear = new Date().getFullYear();

//   // ⭐ CLEAN LOGIC (ONLY Done + Pending)
//   const stats: DashboardStats = {
//     totalCasesDone: cases.filter(c => c.reportStatus === "Done").length,

//     pendingCases: cases.filter(c => c.reportStatus === "Pending").length,

//     todayCases: cases.filter(c => c.reportOutdate === today).length,

//     totalPayment: cases.reduce((sum, c) => sum + c.valuationPayment, 0),

//     paidPayment: cases.reduce((sum, c) => {
//       return c.paymentStatus === "Paid" ? sum + c.valuationPayment : sum;
//     }, 0),

//     pendingPayment: cases.reduce((sum, c) => {
//       return c.paymentStatus === "Pending" ? sum + c.valuationPayment : sum;
//     }, 0),

//     todayCompletedCases: cases.filter(
//       c => c.reportOutdate === today && c.reportStatus === "Done"
//     ).length,

//     totalMonthlyCases: cases.filter(c => {
//       const d = new Date(c.date);
//       return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
//     }).length,
//   };

//   const statCards = [
//     {
//       title: "Total Cases Done",
//       value: stats.totalCasesDone,
//       icon: CheckCircle,
//       gradient: "from-[#0052CC] to-[#0052CC]/80",
//       bg: "bg-blue-50",
//       textColor: "text-[#0052CC]",
//     },
//     {
//       title: "Pending Cases",
//       value: stats.pendingCases,
//       icon: Clock,
//       gradient: "from-[#FFA500] to-[#FFA500]/80",
//       bg: "bg-orange-50",
//       textColor: "text-[#FFA500]",
//     },
//     {
//       title: "Today's Cases",
//       value: stats.todayCases,
//       icon: Calendar,
//       gradient: "from-[#00C2A8] to-[#00C2A8]/80",
//       bg: "bg-teal-50",
//       textColor: "text-[#00C2A8]",
//     },
//     {
//       title: "Total Payment",
//       value: formatCurrency(stats.totalPayment),
//       icon: DollarSign,
//       gradient: "from-[#0052CC] to-[#00C2A8]",
//       bg: "bg-gradient-to-br from-blue-50 to-teal-50",
//       textColor: "text-[#0052CC]",
//     },
//     {
//       title: "Paid Payment",
//       value: formatCurrency(stats.paidPayment),
//       icon: CheckCircle,
//       gradient: "from-[#28C76F] to-[#28C76F]/80",
//       bg: "bg-green-50",
//       textColor: "text-[#28C76F]",
//     },
//     {
//       title: "Pending Payment",
//       value: formatCurrency(stats.pendingPayment),
//       icon: AlertCircle,
//       gradient: "from-[#FF4C4C] to-[#FF4C4C]/80",
//       bg: "bg-red-50",
//       textColor: "text-[#FF4C4C]",
//     },
//     {
//       title: "Today's Completed",
//       value: stats.todayCompletedCases,
//       icon: FileText,
//       gradient: "from-[#28C76F] to-[#00C2A8]",
//       bg: "bg-gradient-to-br from-green-50 to-teal-50",
//       textColor: "text-[#28C76F]",
//     },
//     {
//       title: "Total Monthly Cases",
//       value: stats.totalMonthlyCases,
//       icon: BarChart3,
//       gradient: "from-[#0052CC] to-[#00C2A8]",
//       bg: "bg-gradient-to-br from-blue-50 to-teal-50",
//       textColor: "text-[#0052CC]",
//     },
//   ];

//   return (
//     <div className="space-y-6">

//       {/* PAGE HEADING */}
//     <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0052CC]/5 to-[#00C2A8]/5 ">
//         <h2 className="text-gray-900 text-xl font-semibold">
//            Propertyy Valuation Overview
//         </h2>
//         <p className="text-gray-600 mt-1">
//             Get insights into your valuation performance and activity
//         </p>
//     </div>



//       {/* ⭐ STAT CARDS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {statCards.map((card, i) => {
//           const Icon = card.icon;
//           return (
//             <div
//               key={i}
//               className={`${card.bg} rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100`}
//             >
//               <div className="flex items-start justify-between">
//                 <div>
//                   <p className="text-gray-600 mb-2">{card.title}</p>
//                   <p className={`${card.textColor} text-xl font-semibold`}>
//                     {card.value}
//                   </p>
//                 </div>

//                 <div
//                   className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}
//                 >
//                   <Icon className="w-6 h-6 text-white" />
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ⭐ CHARTS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//         {/* Line Chart */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <h3 className="mb-6 text-gray-900">Valuation Trends</h3>

//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//               <XAxis dataKey="name" stroke="#666" />
//               <YAxis stroke="#666" />
//               <Tooltip />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="valuations"
//                 stroke="#0052CC"
//                 strokeWidth={3}
//                 dot={{ fill: "#0052CC", r: 4 }}
//                 activeDot={{ r: 6 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Bar Chart */}
//         <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
//           <h3 className="mb-6 text-gray-900">Payment Trends</h3>

//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
//               <XAxis dataKey="name" stroke="#666" />
//               <YAxis stroke="#666" />
//               <Tooltip formatter={(v: number) => formatCurrency(v)} />
//               <Legend />
//               <Bar dataKey="payments" fill="#00C2A8" radius={[8, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//       </div>
//     </div>
//   );
// }



import {
  Clock,
  Calendar,
  DollarSign,
  CheckCircle,
  AlertCircle,
  FileText,
  BarChart3,
} from "lucide-react";
import { DashboardStats, ChartData, Case } from "../types";
import { formatCurrency } from "../lib/utils";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface DashboardProps {
  cases: Case[];
  chartData: ChartData[];

  onPendingCasesClick: () => void;
  onDoneCasesClick: () => void;
  onTodayCasesClick: () => void;
  onMonthlyCasesClick: () => void;
}

export function Dashboard({
  cases,
  chartData,
  onPendingCasesClick,
  onDoneCasesClick,
  onTodayCasesClick,
  onMonthlyCasesClick,
}: DashboardProps) {
  const today = new Date().toISOString().split("T")[0];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const stats: DashboardStats = {
    totalCasesDone: cases.filter((c) => c.reportStatus === "Done").length,
    pendingCases: cases.filter((c) => c.reportStatus === "Pending").length,
    todayCases: cases.filter((c) => c.reportOutdate === today).length,
    totalPayment: cases.reduce((sum, c) => sum + c.valuationPayment, 0),
    paidPayment: cases.reduce(
      (sum, c) =>
        c.paymentStatus === "Paid" ? sum + c.valuationPayment : sum,
      0
    ),
    pendingPayment: cases.reduce(
      (sum, c) =>
        c.paymentStatus === "Pending" ? sum + c.valuationPayment : sum,
      0
    ),
    todayCompletedCases: cases.filter(
      (c) => c.reportOutdate === today && c.reportStatus === "Done"
    ).length,
    totalMonthlyCases: cases.filter((c) => {
      const d = new Date(c.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    }).length,
  };

  const statCards = [
    {
      title: "Total Cases Done",
      value: stats.totalCasesDone,
      icon: CheckCircle,
      gradient: "from-[#0052CC] to-[#0052CC]/80",
      bg: "bg-blue-50",
      textColor: "text-[#0052CC]",
      onClick: onDoneCasesClick,
    },
    {
      title: "Pending Cases",
      value: stats.pendingCases,
      icon: Clock,
      gradient: "from-[#FFA500] to-[#FFA500]/80",
      bg: "bg-orange-50",
      textColor: "text-[#FFA500]",
      onClick: onPendingCasesClick,
    },
    {
      title: "Today's Total Cases",
      value: stats.todayCases,
      icon: Calendar,
      gradient: "from-[#00C2A8] to-[#00C2A8]/80",
      bg: "bg-teal-50",
      textColor: "text-[#00C2A8]",
      onClick: onTodayCasesClick,
    },
    {
      title: "Today's Cases Done",
      value: stats.todayCompletedCases,
      icon: FileText,
      gradient: "from-[#28C76F] to-[#00C2A8]",
      bg: "bg-gradient-to-br from-green-50 to-teal-50",
      textColor: "text-[#28C76F]",
      onClick: onDoneCasesClick, // or onTodayCasesClick if you prefer
    },
    {
      title: "Total Payment",
      value: formatCurrency(stats.totalPayment),
      icon: DollarSign,
      gradient: "from-[#0052CC] to-[#00C2A8]",
      bg: "bg-gradient-to-br from-blue-50 to-teal-50",
      textColor: "text-[#0052CC]",
      onClick: undefined,
    },
    {
      title: "Paid Payment",
      value: formatCurrency(stats.paidPayment),
      icon: CheckCircle,
      gradient: "from-[#28C76F] to-[#28C76F]/80",
      bg: "bg-green-50",
      textColor: "text-[#28C76F]",
      onClick: undefined,
    },
    {
      title: "Pending Payment",
      value: formatCurrency(stats.pendingPayment),
      icon: AlertCircle,
      gradient: "from-[#FF4C4C] to-[#FF4C4C]/80",
      bg: "bg-red-50",
      textColor: "text-[#FF4C4C]",
      onClick: undefined,
    },
    {
      title: "Total Monthly Cases",
      value: stats.totalMonthlyCases,
      icon: BarChart3,
      gradient: "from-[#0052CC] to-[#00C2A8]",
      bg: "bg-gradient-to-br from-blue-50 to-teal-50",
      textColor: "text-[#0052CC]",
      onClick: onMonthlyCasesClick,
    },
  ];

  return (
    <div className="space-y-6">
      {/* PAGE HEADING */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0052CC]/5 to-[#00C2A8]/5 ">
        <h2 className="text-gray-900 text-xl font-semibold">
          Propertyy Valuation Overview
        </h2>
        <p className="text-gray-600 mt-1">
          Get insights into your valuation performance and activity
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          const Tag: any = card.onClick ? "button" : "div";

          return (
            <Tag
              key={i}
              onClick={card.onClick}
              className={`${card.bg} rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 ${
                card.onClick ? "cursor-pointer text-left" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-600 mb-2">{card.title}</p>
                  <p className={`${card.textColor} text-xl font-semibold`}>
                    {card.value}
                  </p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Tag>
          );
        })}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="mb-6 text-gray-900">Valuation Trends</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="valuations"
                stroke="#0052CC"
                strokeWidth={3}
                dot={{ fill: "#0052CC", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="mb-6 text-gray-900">Payment Trends</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
              <XAxis dataKey="name" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip formatter={(v: number) => formatCurrency(v)} />
              <Legend />
              <Bar dataKey="payments" fill="#00C2A8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
