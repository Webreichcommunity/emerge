import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Layout from "./Layout";
import Home from "./Pages/Home/Home";
import ProjectDetail from "./Pages/OurProjectDetails/OurProjectDetails";
import Projects from "./Pages/Projects/Projects";
import Services from "./Pages/Services/Services";
import About from "./Pages/AboutUs/About";
import Main from "./Pages/Main";
import ContactForm from "./Pages/ContactUs/ContactUs";
// import OurProjectDetails from "./Pages/OurProjectDetails/OurProjectDetails";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Animation duration: 3 seconds total

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      {showSplash ? (
        <SplashScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<ContactForm />} />
            <Route path="about" element={<About />} />
            <Route path="ourwork" element={<Projects />} />
            <Route path="ourwork/:slug" element={<ProjectDetail />} />
          </Route>
        </Routes>
      )}
    </Router>
  );
}

function SplashScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50 backdrop-blur-sm">
      <div className="text-center">
        <div className="relative mb-4 animate-[pulse_2s_ease-in-out_infinite]">
          <img
            src="/logo.png"
            alt="Emerge Construction Logo"
            className="w-48 h-48 mx-auto"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-500 to-gray-300 mix-blend-overlay rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50"></div>
        </div>
        <h1 className="text-5xl font-bold mb-2 text-white animate-[slideInFromTop_0.8s_ease-out_0.5s_both]">
          <span className="bg-gradient-to-r from-stone-500 to-gray-300 bg-clip-text text-transparent">
            EMERGE
          </span>
        </h1>
        <h2 className="text-3xl font-semibold text-gray-300 animate-[slideInFromBottom_0.8s_ease-out_0.8s_both]">
          CONSTRUCTION CONSULTANTS
        </h2>
      </div>
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInFromTop {
          from { 
            transform: translateY(-30px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        @keyframes slideInFromBottom {
          from { 
            transform: translateY(30px); 
            opacity: 0; 
          }
          to { 
            transform: translateY(0); 
            opacity: 1; 
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes ping {
          75%, 100% { 
            transform: scale(1.5); 
            opacity: 0; 
          }
        }
      `}</style>
    </div>
  );
}

export default App;