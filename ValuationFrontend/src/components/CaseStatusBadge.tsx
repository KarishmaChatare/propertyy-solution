// File: src/components/CaseStatusBadge.tsx

import { AlertTriangle, Clock } from "lucide-react";
import { useState } from "react";
import { Case } from "../types";
import { CasePopup } from "./CasePopup";

type BadgeType = "overdue" | "due-soon";

interface CaseStatusBadgeProps {
  type: BadgeType;
  cases: Case[];
  onUpdateCase: (caseData: Case) => void;
}

const BADGE_CONFIG: Record<
  BadgeType,
  {
    label: string;
    icon: React.ElementType;
    buttonColor: string;
    textColor: string;
    bgColor: string;
  }
> = {
  "overdue": {
    label: "Overdue",
    icon: AlertTriangle,
    buttonColor: "bg-red-500 hover:bg-red-600",
    textColor: "text-red-600",
    bgColor: "bg-red-50"
  },
  "due-soon": {
    label: "Due Soon",
    icon: Clock,
    buttonColor: "bg-orange-500 hover:bg-orange-600",
    textColor: "text-orange-600",
    bgColor: "bg-orange-50"
  }
};

export function CaseStatusBadge({ type, cases, onUpdateCase }: CaseStatusBadgeProps) {
  const [showPopup, setShowPopup] = useState(false);
  const cfg = BADGE_CONFIG[type];
  const Icon = cfg.icon;

  return (
    <>
      <button
        onClick={() => setShowPopup(true)}
        className={`${cfg.buttonColor} text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105`}
      >
        <Icon className="w-4 h-4" />
        <span>{cfg.label}</span>
        <span className="bg-white/20 px-2 py-0.5 rounded-full">{cases.length}</span>
      </button>

      {showPopup && (
        <CasePopup
          title={`${cfg.label} Cases`}
          cases={cases}
          onClose={() => setShowPopup(false)}
          onUpdateCase={onUpdateCase}
          accentColor={cfg.textColor}
          bgColor={cfg.bgColor}
        />
      )}
    </>
  );
}
