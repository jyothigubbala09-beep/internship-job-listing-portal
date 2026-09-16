import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Career<span>Hub</span>
      </Link>

      <div className="navbar-links">
        <Link to="/" className="navbar-link">
          Opportunities
        </Link>

        <Link to="/admin" className="navbar-link">
          Admin
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;