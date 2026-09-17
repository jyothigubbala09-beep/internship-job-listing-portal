import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-brand">
          <h2>
            Career<span>Hub</span>
          </h2>

          <p>
            Discover internships and job opportunities
            and take the next step in your career.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <a href="/">Opportunities</a>
          <a href="/admin">Admin Dashboard</a>
        </div>

        <div className="footer-info">
          <h3>CareerHub</h3>

          <p>
            Internship & Job Listing Portal
          </p>

          <p>
            Built with React, Node.js, Express.js
            and MongoDB.
          </p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} CareerHub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;