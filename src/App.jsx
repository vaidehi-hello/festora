import { useEffect } from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastProvider } from './components/Toast';
import { useTheme } from './hooks/useTheme';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import MyTickets from './pages/MyTickets';
import About from './pages/About';
import NotFound from './pages/NotFound';

// jump back to the top when moving between pages
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
  window.scrollTo(0, 0);
}, [pathname]);
  return null;
}

export default function App() {
  const [dark, toggleTheme] = useTheme();

  return (
    <HashRouter>
      <ToastProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Navbar dark={dark} toggleTheme={toggleTheme} />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:slug" element={<EventDetails />} />
              <Route path="/tickets" element={<MyTickets />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ToastProvider>
    </HashRouter>
  );
}
