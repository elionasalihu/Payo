
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, UserRound, X } from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import "../styles/global/Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/#features" },
    { label: "How it works", href: "/#how-it-works" },
  ];

  return (
    <header className="payo-header">
      <div className="payo-header-inner">
        {/* Logo */}
        <Link
          to="/"
          className="payo-logo"
          onClick={closeMenu}
          aria-label="Payo home"
        >
         <span>pay</span>

<span className="payo-logo-o">o</span>

<span className="payo-logo-text">.</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="payo-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="payo-nav-link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="payo-header-actions">
          {!loading &&
            (isAuthenticated ? (
              <Link
                to="/dashboard"
                className="payo-user-button"
                aria-label="Open dashboard"
                title="Dashboard"
              >
                <UserRound size={21} strokeWidth={1.8} />
              </Link>
            ) : (
              <>
                <Link to="/login" className="payo-login">
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="payo-header-cta"
                >
                  Get started
                  <ArrowRight size={15} />
                </Link>
              </>
            ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="payo-menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="payo-mobile-menu">
          <nav
            className="payo-mobile-nav"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="payo-mobile-link"
                onClick={closeMenu}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="payo-mobile-actions">
            {!loading &&
              (isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="payo-mobile-dashboard"
                  onClick={closeMenu}
                >
                  <UserRound size={19} />
                  My dashboard
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="payo-mobile-login"
                    onClick={closeMenu}
                  >
                    Log in
                  </Link>

                  <Link
                    to="/register"
                    className="payo-header-cta payo-mobile-cta"
                    onClick={closeMenu}
                  >
                    Get started
                    <ArrowRight size={15} />
                  </Link>
                </>
              ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
