import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/admin/Sidebar'

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-brand-50">
      <Sidebar />
      <div className="lg:pl-64">
        <main className="p-6 lg:p-10 max-w-6xl mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
