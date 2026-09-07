import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">CareerHub</Link>

      <div>
        <Link to="/">Opportunities</Link>
        <Link to="/admin">Admin</Link>
      </div>
    </nav>
  );
}

export default Navbar;