import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading, authError, refreshSession } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner text="Checking authentication status..." />;
  }

  if (authError) {
    return (
      <section className="mx-auto flex min-h-[55vh] max-w-xl flex-col items-center justify-center px-5 text-center">
        <div className="rounded-3xl border border-[#e5e8df] bg-white p-8 shadow-sm sm:p-10">
          <h1 className="font-heading text-2xl font-semibold text-[#1d3529]">We can’t reach your account right now</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{authError}</p>
          <button type="button" onClick={refreshSession} className="mt-6 rounded-full bg-[#24513d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#193f2f]">
            Try again
          </button>
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
    // Redirect to login but remember the intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
