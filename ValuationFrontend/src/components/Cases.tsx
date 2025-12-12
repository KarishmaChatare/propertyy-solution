// // File: src/components/Cases.tsx

// import { Case } from "../types";
// import { CasesTable } from "./CasesTable";
// import { CaseStatusBadge } from "./CaseStatusBadge";
// import { getOverdueCases, getDueSoonCases } from "../lib/utils";
// import { useState } from "react";

// interface CasesProps {
//   cases: Case[];
//   onAddCase: () => void;
//   onEditCase: (caseData: Case) => void;
//   onDeleteCase: (id: number) => void;
//   onUpdateCase: (caseData: Case) => void;
// }

// export function Cases({
//   cases,
//   onAddCase,
//   onEditCase,
//   onDeleteCase,
//   onUpdateCase,
// }: CasesProps) {
  
//   const [page, setPage] = useState(1);
//   const itemsPerPage = 20;

//   const startIndex = (page - 1) * itemsPerPage;
//   const paginated = cases.slice(startIndex, startIndex + itemsPerPage);

//   const overdue = getOverdueCases(cases);
//   const dueSoon = getDueSoonCases(cases);

//   return (
//     <div className="space-y-6">

//       {/* PAGE TITLE */}
// <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0052CC]/5 to-[#00C2A8]/5">
//   <h2 className="text-gray-900 text-xl font-semibold !text-2xl">
//     Propertyy Valuation Cases
//   </h2>
//   <p className="text-gray-600 mt-1">
//     Manage all valuation cases and payments
//   </p>
// </div>

//       {/* BADGES */}
//       {(overdue.length > 0 || dueSoon.length > 0) && (
//         <div className="flex gap-3 flex-wrap mb-2">
//           {overdue.length > 0 && (
//             <CaseStatusBadge type="overdue" cases={overdue} onUpdateCase={onUpdateCase} />
//           )}

//           {dueSoon.length > 0 && (
//             <CaseStatusBadge type="due-soon" cases={dueSoon} onUpdateCase={onUpdateCase} />
//           )}
//         </div>
//       )}

//       {/* CASES TABLE */}
//       <CasesTable
//         cases={paginated}
//         onAddCase={onAddCase}
//         onEditCase={onEditCase}
//         onDeleteCase={(id: number) => onDeleteCase(id)}
//       />

//       {/* PAGINATION */}
//       <div className="flex items-center gap-4 pt-4">
//         <button
//           onClick={() => setPage((p) => Math.max(1, p - 1))}
//           disabled={page === 1}
//           className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
//         >
//           Prev
//         </button>

//         <span>Page {page} / {Math.ceil(cases.length / itemsPerPage)}</span>

//         <button
//           onClick={() => setPage((p) => (startIndex + itemsPerPage >= cases.length ? p : p + 1))}
//           disabled={startIndex + itemsPerPage >= cases.length}
//           className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }



// File: src/components/Cases.tsx

import { Case } from "../types";
import { CasesTable } from "./CasesTable";
import { CaseStatusBadge } from "./CaseStatusBadge";
import { getOverdueCases, getDueSoonCases } from "../lib/utils";

type CasesFilterPreset = "pending" | "done" | "today" | "month" | null;

interface CasesProps {
  cases: Case[];
  onAddCase: () => void;
  onEditCase: (caseData: Case) => void;
  onDeleteCase: (id: number) => void;
  onUpdateCase: (caseData: Case) => void;
  filterPreset?: CasesFilterPreset; // 🔹 new
}

export function Cases({
  cases,
  onAddCase,
  onEditCase,
  onDeleteCase,
  onUpdateCase,
  filterPreset,
}: CasesProps) {
  const overdue = getOverdueCases(cases);
  const dueSoon = getDueSoonCases(cases);

  return (
    <div className="space-y-6">
      {/* PAGE TITLE */}
      <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-[#0052CC]/5 to-[#00C2A8]/5">
        <h2 className="text-gray-900 text-xl font-semibold !text-2xl">
          Propertyy Valuation Cases
        </h2>
        <p className="text-gray-600 mt-1">
          Manage all valuation cases and payments
        </p>
      </div>

      {/* BADGES */}
      {(overdue.length > 0 || dueSoon.length > 0) && (
        <div className="flex gap-3 flex-wrap mb-2">
          {overdue.length > 0 && (
            <CaseStatusBadge
              type="overdue"
              cases={overdue}
              onUpdateCase={onUpdateCase}
            />
          )}

          {dueSoon.length > 0 && (
            <CaseStatusBadge
              type="due-soon"
              cases={dueSoon}
              onUpdateCase={onUpdateCase}
            />
          )}
        </div>
      )}

      {/* CASES TABLE */}
      <CasesTable
        cases={cases}
        onAddCase={onAddCase}
        onEditCase={onEditCase}
        onDeleteCase={onDeleteCase}
        filterPreset={filterPreset} // 👈 pass it down
      />
    </div>
  );
}
