
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserRound, LogOut, Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import "../styles/global/Header.css";

function HomeHeader() {
  const navigate = useNavigate();

  const {
    user,
    isAuthenticated,
    loading,
    signOut,
    role,
  } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  // Redirect according to the user's role from Supabase.
  const handleUserClick = () => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }

    setMenuOpen(false);
  };

  // Sign out the current user.
  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const { error } = await signOut();

      if (error) {
        throw error;
      }

      setMenuOpen(false);
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  const authenticated = isAuthenticated && !!user;

  return (
    <header className="home-header">
      <div className="home-header-inner">
        {/* Logo */}
        <Link
          to="/"
          className="home-header-logo"
          aria-label="Payo home"
          onClick={() => setMenuOpen(false)}
        >
        <span>pay</span>
            <span className="payo-logo-o">o</span>
            <span className="payo-logo-text">.</span>
        </Link>

        {/* Desktop navigation */}
        <nav
          className="home-header-nav"
          aria-label="Main navigation"
        >
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">About</a>
        </nav>

        {/* Header actions */}
        <div className="home-header-actions">
          {!loading && (
            authenticated ? (
              <div className="home-header-user-actions">
                <button
                  type="button"
                  className="home-header-user-icon"
                  onClick={handleUserClick}
                  aria-label={
                    role === "admin"
                      ? "Open admin dashboard"
                      : "Open user dashboard"
                  }
                  title={
                    role === "admin"
                      ? "Admin dashboard"
                      : "My dashboard"
                  }
                >
                  <UserRound
                    size={20}
                    strokeWidth={1.8}
                  />
                </button>

                <button
                  type="button"
                  className="home-header-logout"
                  onClick={handleLogout}
                  disabled={loggingOut}
                  aria-label="Sign out"
                  title="Sign out"
                >
                  <LogOut
                    size={18}
                    strokeWidth={1.8}
                  />
                </button>
              </div>
            ) : (
              <div className="home-header-auth-links">
                <Link
                  to="/login"
                  className="home-header-login"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="home-header-get-started"
                >
                  Get Started
                </Link>
              </div>
            )
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="home-header-menu-toggle"
            onClick={() =>
              setMenuOpen((previous) => !previous)
            }
            aria-label={
              menuOpen
                ? "Close navigation"
                : "Open navigation"
            }
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav
          className="home-header-mobile-nav"
          aria-label="Mobile navigation"
        >
          <a
            href="#features"
            onClick={() => setMenuOpen(false)}
          >
            Features
          </a>

          <a
            href="#how-it-works"
            onClick={() => setMenuOpen(false)}
          >
            How it works
          </a>

          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
          >
            About
          </a>

          {!loading && (
            authenticated ? (
              <>
                <button
                  type="button"
                  onClick={handleUserClick}
                >
                  <UserRound size={18} />
                  {role === "admin"
                    ? "Admin dashboard"
                    : "My dashboard"}
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  disabled={loggingOut}
                >
                  <LogOut size={18} />
                  {loggingOut
                    ? "Signing out..."
                    : "Sign out"}
                </button>
              </>
            ) : (
              <div className="home-header-mobile-auth">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="home-header-get-started"
                  onClick={() => setMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            )
          )}
        </nav>
      )}
    </header>
  );
}

export default HomeHeader;
