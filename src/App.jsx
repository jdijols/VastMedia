import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Booking from './pages/Booking'
import PortfolioLayout from './pages/portfolio/PortfolioLayout'
import RealEstate from './pages/portfolio/RealEstate'
import Videography from './pages/portfolio/Videography'
import Portraits from './pages/portfolio/Portraits'
import Events from './pages/portfolio/Events'

import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './pages/admin/AdminLayout'
import Login from './pages/admin/Login'
import DashboardHome from './pages/admin/DashboardHome'
import PortfolioManager from './pages/admin/PortfolioManager'
import PricingManager from './pages/admin/PricingManager'
import TestimonialsManager from './pages/admin/TestimonialsManager'
import AboutEditor from './pages/admin/AboutEditor'
import HomeEditor from './pages/admin/HomeEditor'
import FooterEditor from './pages/admin/FooterEditor'

export default function App() {
  return (
    <Routes>
      {/* Public site */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<About />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/portfolio" element={<PortfolioLayout />}>
          <Route index element={<RealEstate />} />
          <Route path="videography" element={<Videography />} />
          <Route path="portraits" element={<Portraits />} />
          <Route path="events" element={<Events />} />
        </Route>
      </Route>

      {/* Admin dashboard */}
      <Route
        path="/admin/login"
        element={
          <AuthProvider>
            <Login />
          </AuthProvider>
        }
      />
      <Route
        path="/admin"
        element={
          <AuthProvider>
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          </AuthProvider>
        }
      >
        <Route index element={<DashboardHome />} />
        <Route path="portfolio" element={<PortfolioManager />} />
        <Route path="pricing" element={<PricingManager />} />
        <Route path="testimonials" element={<TestimonialsManager />} />
        <Route path="about" element={<AboutEditor />} />
        <Route path="home" element={<HomeEditor />} />
        <Route path="footer" element={<FooterEditor />} />
      </Route>
    </Routes>
  )
}
