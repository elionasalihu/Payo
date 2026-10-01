import "../styles/global/Footer.css";

function Logo() {
  return (
    <a href="/" className="payo-logo" aria-label="Payo home">
      <span className="payo-logo-mark">
        <span />
      </span>

      <span className="payo-logo-text">pay</span> <span className="payo-logo-o">o</span> <span className="payo-logo-text">.</span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="payo-footer" id="about">
      <div className="payo-footer-main">
        <div className="payo-footer-brand">
          <Logo />

          <p>
            Pay together.
            <br />
            Stay organized.
          </p>
        </div>

        <div className="payo-footer-column">
          <span>Product</span>

          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="/register">Get started</a>
        </div>

        <div className="payo-footer-column">
          <span>Company</span>

          <a href="#about">About</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>

        <div className="payo-footer-column">
          <span>Account</span>

          <a href="/login">Log in</a>
          <a href="/register">Sign up</a>
        </div>
      </div>

      <div className="payo-footer-bottom">
        <span>© 2026 Payo. All rights reserved.</span>

        <span>University degree project.</span>
      </div>
    </footer>
  );
}

export default Footer;