export type UserRole = 'admin' | 'user';
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;           // backend sends: "ADMIN" / "USER"
  createdAt: string;
  lastLogin: string;
  loginCount: number;
  status: string;         // backend sends: "ACTIVE" / "INACTIVE"
}




export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface LoginUser {
  id: number;
  name: string;
  email: string;
  role: string;
  active: boolean;
}

export interface LoginData {
  token: string;
  user: LoginUser;
}





export interface Case {
  id: number;
  srNo: number;
  date: string;
  clientName: string;
  clientContact: string;
  valuerName: string;
  bankName: string;
  bankPersonName: string;
  visitPerson: string;
  reportDoneBy: string;
  valuationPayment: number;
  paymentStatus: 'None' | 'Paid' | 'Pending';
  paymentMode: 'None' | 'GPay' | 'PhonePe' | 'Bank Transfer' | 'Cash' | 'UPI';
  utrNumber: string;
  reportStatus: 'None' | 'Done' | 'Pending';
  remark: string;
  reportOutdate: string;
}

export interface DashboardStats {
  totalCasesDone: number;
  pendingCases: number;
  todayCases: number;
  totalPayment: number;
  paidPayment: number;
  pendingPayment: number;
  todayCompletedCases: number;
  totalMonthlyCases: number;
}

export interface ChartData {
  name: string;
  valuations: number;
  payments: number;
}
