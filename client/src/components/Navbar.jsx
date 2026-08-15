import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/clerk-react';
import { Sparkles, FileText, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="logo">
          <Sparkles className="text-primary" size={24} color="var(--primary)" />
          <span className="text-gradient">ResumeCookAIX</span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="btn btn-outline btn-sm">Log in</button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="btn btn-primary btn-sm">Sign Up</button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link to="/dashboard" className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LayoutDashboard size={18} />
              <span className="hidden-mobile">Dashboard</span>
            </Link>
            <Link to="/builder" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} />
              <span className="hidden-mobile">Create Resume</span>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
