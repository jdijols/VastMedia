import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout() {
  const { pathname } = useLocation()
  const mainRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    mainRef.current?.focus({ preventScroll: true })
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand-950 focus:text-white focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <Navbar />
      <main
        ref={mainRef}
        id="main-content"
        tabIndex={-1}
        className="flex-1 pt-16 md:pt-20 focus:outline-none"
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
