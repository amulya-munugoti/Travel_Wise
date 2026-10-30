import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Footer() {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();

  if (pathname === '/login' || pathname === '/register') return null;

  return (
    <footer className="border-t border-[#d7d5eb] bg-[#f8f6ee]">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-9 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <Link to="/" className="inline-flex items-center gap-2 font-bold text-[#242354]">
            <Compass className="h-5 w-5 text-[#4842db]" />
            TravelWise
          </Link>
          <p className="mt-2 max-w-sm text-sm text-[#77768c]">Find places, plan your days and keep your trips together.</p>
        </div>
        {isAuthenticated && (
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-[#656481]">
            <Link to="/places" className="inline-flex items-center gap-1.5 hover:text-[#4842db]"><MapPin className="h-4 w-4" /> Explore places</Link>
            <Link to="/create-trip" className="hover:text-[#4842db]">Plan a trip</Link>
            <Link to="/saved-trips" className="hover:text-[#4842db]">My trips</Link>
          </nav>
        )}
      </div>
      <div className="border-t border-[#e1deef] py-4 text-center text-xs text-[#828198]">
        © {new Date().getFullYear()} TravelWise
      </div>
    </footer>
  );
}
