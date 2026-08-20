
import { useLocation } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import AppRoutes from './routes/AppRoutes'

// Pages that manage their own chrome (auth screens + dashboard)
const AUTH_PAGES = ['/signin', '/signup', '/register']
const DASHBOARD_PAGES = ['/dashboard','/dashboard','/recruiter']

function App() {
  const location = useLocation()
  const isAuthPage = AUTH_PAGES.includes(location.pathname)
  const isDashboardPage = DASHBOARD_PAGES.some((path) => location.pathname.startsWith(path))
  const hideChrome = isAuthPage || isDashboardPage
  return (
    <div className="flex min-h-screen flex-col bg-offwhite">
      {!hideChrome && <Navbar />}
      <ScrollToTop />
      <main className="flex-1">
        <AppRoutes />
      </main>
      {!hideChrome && <Footer />}
    </div>
  )
}

export default App