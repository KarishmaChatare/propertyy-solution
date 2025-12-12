import { useState, useMemo, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./components/Dashboard";
import { Cases } from "./components/Cases";
import { CaseForm } from "./components/CaseForm";
import { Profile } from "./components/Profile";
import { Settings } from "./components/Settings";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Case, ChartData } from "./types";
import BankPersonsSummary from "./components/BankPersonsSummary";
import { ApiResponse } from "./types";
import { User } from "./types/";
import api from "./api";
import { Toaster, toast } from "sonner";

// 🔹 filter preset type for Cases page
type CasesFilterPreset = "pending" | "done" | "today" | "month" | null;

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authView, setAuthView] = useState<"signin" | "signup">("signin");
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [cases, setCases] = useState<Case[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  const [showCaseForm, setShowCaseForm] = useState(false);
  const [editingCase, setEditingCase] = useState<Case | undefined>(undefined);

  // 🔹 which filter should Cases page start with?
  const [casesFilterPreset, setCasesFilterPreset] =
    useState<CasesFilterPreset>(null);

  // ⭐ BACKEND LISTS
  const [banks, setBanks] = useState<any[]>([]);
  const [valuers, setValuers] = useState<any[]>([]);
  const [visitPersons, setVisitPersons] = useState<any[]>([]);
  const [reporters, setReporters] = useState<any[]>([]);

  // Load Cases (NO POPUP)
  useEffect(() => {
    const loadCases = async () => {
      try {
        const res = await api.get("/cases");
        setCases(res.data);
      } catch {
        // removed popup
      }
    };
    loadCases();
  }, []);

  // ⭐ Load Dropdown Data (NO POPUP)
  useEffect(() => {
    const loadAll = async () => {
      try {
        const b = await api.get("/banks");
        setBanks(b.data);

        const v = await api.get("/valuers");
        setValuers(v.data);

        const vp = await api.get("/visitors");
        setVisitPersons(vp.data);

        const r = await api.get("/reporters");
        setReporters(r.data);
      } catch {
        // removed popup
      }
    };

    loadAll();
  }, []);

  // ⭐ Load Users (Admin only)
  useEffect(() => {
    if (currentUser?.role !== "admin") return;

    const loadUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await api.get("/users", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = res.data.data || res.data;
        setUsers(data);
      } catch {
        toast.error("Failed to load users");
      }
    };

    loadUsers();
  }, [currentUser]);

  // Dashboard Chart Calculation
  const chartData = useMemo((): ChartData[] => {
    const today = new Date();
    const weeklyData: Record<string, { valuations: number; payments: number }> =
      {};

    for (let i = 3; i >= 0; i--) {
      const weekDate = new Date(today);
      weekDate.setDate(today.getDate() - i * 7);

      const weekStart = new Date(weekDate);
      weekStart.setDate(weekDate.getDate() - weekDate.getDay());

      const key = weekStart.toISOString().split("T")[0];
      weeklyData[key] = { valuations: 0, payments: 0 };
    }

    cases.forEach((c) => {
      const date = new Date(c.date);
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      const key = weekStart.toISOString().split("T")[0];

      if (weeklyData[key]) {
        weeklyData[key].valuations += 1;

        if (c.paymentStatus === "Paid") {
          weeklyData[key].payments += c.valuationPayment;
        }
      }
    });

    return Object.keys(weeklyData).map((week, i) => ({
      name: `Week ${i + 1}`,
      valuations: weeklyData[week].valuations,
      payments: weeklyData[week].payments,
    }));
  }, [cases]);

  // Add Case
  const handleAddCase = () => {
    setEditingCase(undefined);
    setShowCaseForm(true);
  };

  // Edit Case
  const handleEditCase = (data: Case) => {
    setEditingCase(data);
    setShowCaseForm(true);
  };

  // Save Case
  const handleSaveCase = (savedCase: Case) => {
    if (editingCase) {
      setCases(cases.map((c) => (c.id === savedCase.id ? savedCase : c)));
      toast.success("Case updated!");
    } else {
      setCases([...cases, savedCase]);
      toast.success("Case added!");
    }
    setShowCaseForm(false);
  };

  // Delete Case
  const handleDeleteCase = async (id: number) => {
    if (!window.confirm("Delete this case?")) return;

    try {
      await api.delete(`/cases/${id}`);
      setCases(cases.filter((c) => Number(c.id) !== id));
      toast.success("Case deleted");
    } catch {
      toast.error("Failed to delete case");
    }
  };

  // Signup
  const handleSignUp = async (
    name: string,
    email: string,
    password: string,
    phone: string,
    role: "admin" | "user"
  ) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, password, role }),
      });

      const result: ApiResponse<any> = await res.json();

      if (!result.success) {
        toast.error(result.message || "Signup failed");
        return;
      }

      toast.success("Signup successful! Please login.");
      setAuthView("signin");
    } catch {
      toast.error("Invalid Credentials");
    }
  };

  // Login
  const handleSignIn = async (
    email: string,
    password: string,
    role: "admin" | "user"
  ) => {
    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const result = await res.json();

      if (!result.success && result.status !== "success") {
        toast.error(result.message || "Invalid credentials");
        return;
      }

      const token = result.data.token;
      const user = result.data.user;

      localStorage.setItem("token", token);

      setCurrentUser({
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        role: user.role.toLowerCase(),
        createdAt: user.createdAt || "",
        lastLogin: user.lastLogin || "",
        loginCount: user.loginCount || 0,
        status: user.status?.toLowerCase() === "active" ? "active" : "inactive",
      });

      setIsAuthenticated(true);
      toast.success(`Welcome back, ${user.name}!`);
    } catch {
      toast.error("Invalid Credentials");
    }
  };

  // Logout
  const handleSignOut = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    toast.success("Signed out!");
  };

  const nextSrNo =
    cases.length > 0 ? Math.max(...cases.map((c) => c.srNo)) + 1 : 1;

  // handle navigation from sidebar/header
  const handleNavigate = (page: string) => {
    if (page !== "cases") {
      setCasesFilterPreset(null); // clear preset when leaving cases
    }
    setCurrentPage(page);
  };

  // Show Auth Forms
  if (!isAuthenticated) {
    return (
      <>
        <Toaster position="top-right" richColors />
        {authView === "signin" ? (
          <SignIn
            onSignIn={handleSignIn}
            onSwitchToSignUp={() => setAuthView("signup")}
          />
        ) : (
          <SignUp
            onSignUp={handleSignUp}
            onSwitchToSignIn={() => setAuthView("signin")}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F8FA]">
      <Toaster position="top-right" richColors />

      <Sidebar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        user={currentUser as User}
        isCollapsed={isSidebarCollapsed}
      />

      <Header
        user={currentUser as User}
        onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        isCollapsed={isSidebarCollapsed}
        onNavigate={handleNavigate}
        onSignOut={handleSignOut}
      />

      <main
        className={`transition-all duration-300 pt-16 ${
          isSidebarCollapsed ? "ml-20" : "ml-64"
        }`}
      >
        <div className="p-6">
          {currentPage === "dashboard" && (
            <Dashboard
              cases={cases}
              chartData={chartData}
              onPendingCasesClick={() => {
                setCasesFilterPreset("pending");
                setCurrentPage("cases");
              }}
              onDoneCasesClick={() => {
                setCasesFilterPreset("done");
                setCurrentPage("cases");
              }}
              onTodayCasesClick={() => {
                setCasesFilterPreset("today");
                setCurrentPage("cases");
              }}
              onMonthlyCasesClick={() => {
                setCasesFilterPreset("month");
                setCurrentPage("cases");
              }}
            />
          )}

          {currentPage === "cases" && (
            <Cases
              cases={cases}
              onAddCase={handleAddCase}
              onEditCase={handleEditCase}
              onDeleteCase={handleDeleteCase}
              onUpdateCase={(u) => {
                setCases(cases.map((c) => (c.id === u.id ? u : c)));
                toast.success("Case updated");
              }}
              filterPreset={casesFilterPreset} // 🔹 important
            />
          )}

          {currentPage === "bankSummary" && (
            <BankPersonsSummary cases={cases} />
          )}

          {currentPage === "profile" && (
            <Profile user={currentUser as User} />
          )}

          {currentPage === "settings" && currentUser?.role === "admin" && (
            <Settings
              users={users}
              onAddUser={(u) => {
                const newU = { ...u, id: (users.length + 1).toString() };
                setUsers([...users, newU]);
                toast.success("User added");
              }}
              onUpdateUser={(u) => {
                setUsers(users.map((x) => (x.id === u.id ? u : x)));
                toast.success("User updated");
              }}
              onDeleteUser={(id) => {
                setUsers(users.filter((u) => u.id !== id));
                toast.success("User deleted");
              }}
            />
          )}
        </div>
      </main>

      {showCaseForm && (
        <CaseForm
          caseData={editingCase}
          onSave={handleSaveCase}
          onCancel={() => {
            setShowCaseForm(false);
            setEditingCase(undefined);
          }}
          nextSrNo={nextSrNo}
          banks={banks}
          valuers={valuers}
          visitPersons={visitPersons}
          reporters={reporters}
        />
      )}
    </div>
  );
}
