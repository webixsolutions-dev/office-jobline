import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Employers from './pages/Employers'
import PostJob from './pages/PostJob'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'

function App() {
  const location = useLocation()

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f8fb]">
      <Navbar />
      <ScrollToTop />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/employers" element={<Employers />} />
            <Route path="/post-a-job" element={<PostJob />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

export default App
