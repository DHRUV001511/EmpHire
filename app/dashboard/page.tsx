import { EmployeeDashboard } from "@/components/dashboard/employee-dashboard"

export default function DashboardPage() {
  // In a real app, you'd determine user type from authentication
  const userType = "employee" // This would come from auth context

  return <EmployeeDashboard />
}
