
import {ProtectedRoute} from '@/components/ProtectedRoute';

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <div className="dashboard-layout">
        {/* Add any dashboard-specific layout elements here */}
        <main>{children}</main>
      </div>
    </ProtectedRoute>
  );
}