import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bookmark, Compass, LogOut, Menu, MapPin, UserRound, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const links = [
    { label: 'Home', to: '/' },
    ...(isAuthenticated
      ? [
          { label: 'Explore places', to: '/places', icon: MapPin },
          { label: 'Plan a trip', to: '/create-trip', icon: Compass },
          { label: 'My trips', to: '/saved-trips', icon: Bookmark },
        ]
      : []),
  ];

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  };

  const signOut = () => {
    logout();
    closeMenus();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#e6e9e0] bg-[#fbfaf7]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={closeMenus} className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#24513d] text-white shadow-sm shadow-[#24513d]/20">
            <Compass className="h-[18px] w-[18px]" />
          </span>
          <span className="text-[17px] font-extrabold tracking-[-.035em] text-[#203b2b]">
            Travel<span className="text-[#658366]">Wise</span>
          </span>
        </Link>

        {!isAuthPage && <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {links.map(({ label, to, icon: Icon }) => {
            const active = location.pathname === to || (to === '/saved-trips' && location.pathname === '/dashboard');
            return (
              <Link
                key={to}
                to={to}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                  active ? 'bg-[#eaf0e6] text-[#315c40]' : 'text-[#68746b] hover:bg-[#f0f1eb] hover:text-[#253b2b]'
                }`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {label}
              </Link>
            );
          })}
        </nav>}

        {!isAuthPage && <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                aria-expanded={userMenuOpen}
                aria-label="Open account menu"
                onClick={() => setUserMenuOpen((open) => !open)}
                className="grid h-9 w-9 place-items-center rounded-full bg-slate-100 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
              >
                {user?.full_name?.charAt(0)?.toUpperCase() || <UserRound className="h-4 w-4" />}
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-12 w-56 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                  <p className="truncate px-3 py-2 text-xs text-slate-500">{user?.email}</p>
                  <Link to="/profile" onClick={closeMenus} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <UserRound className="h-4 w-4" /> Travel preferences
                  </Link>
                  <button type="button" onClick={signOut} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rose-700 hover:bg-rose-50">
                    <LogOut className="h-4 w-4" /> Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-[13px] font-semibold text-[#68746b] transition hover:text-[#203b2b]">Sign in</Link>
              <Link to="/register" className="rounded-full border border-[#dce3d8] bg-white px-4 py-2.5 text-[13px] font-bold text-[#315c40] transition hover:border-[#c2d0c0] hover:bg-[#f7f8f4]">Create account</Link>
            </>
          )}
        </div>}

        {!isAuthPage && <button
          type="button"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>}
      </div>

      {!isAuthPage && mobileMenuOpen && (
        <nav aria-label="Mobile navigation" className="border-t border-slate-200 bg-white px-4 py-3 md:hidden">
          <div className="mx-auto max-w-7xl space-y-1">
            {links.map(({ label, to, icon: Icon }) => (
              <Link key={to} to={to} onClick={closeMenus} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                {Icon && <Icon className="h-4 w-4 text-slate-500" />}
                {label}
              </Link>
            ))}
            {isAuthenticated ? (
              <div className="border-t border-slate-100 pt-2">
                <p className="px-3 py-2 text-xs text-slate-500">{user?.email}</p>
                <Link to="/profile" onClick={closeMenus} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                  <UserRound className="h-4 w-4" /> Travel preferences
                </Link>
                <button type="button" onClick={signOut} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-rose-700 hover:bg-rose-50">
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-3">
                <Link to="/login" onClick={closeMenus} className="rounded-lg border border-slate-200 px-3 py-2.5 text-center text-sm font-semibold text-slate-700">Sign in</Link>
                <Link to="/register" onClick={closeMenus} className="rounded-lg bg-slate-900 px-3 py-2.5 text-center text-sm font-semibold text-white">Create account</Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
