import { Routes, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Helmet>
        <title>Pasindu Saranga — Software Engineer</title>
        <meta
          name="description"
          content="Pasindu Saranga — Software Engineer. Portfolio of full-stack, Flutter, React, and Python projects."
        />
        <meta property="og:image" content="https://pasindusaranga.me/og-image.png" />
        <script type="application/ld+json">
          {JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Pasindu Saranga",
              "jobTitle": "Software Engineer",
              "url": "https://pasindusaranga.me",
              "sameAs": [
                "https://github.com/SAR4NGA",
                "https://www.linkedin.com/in/sar4nga"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Pasindu Saranga — Portfolio",
              "url": "https://pasindusaranga.me"
            }
          ])}
        </script>
      </Helmet>
      <a href="#about" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-white">Skip to content</a>
      <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}
