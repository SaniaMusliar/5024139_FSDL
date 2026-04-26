import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      {/* Router links */}
      <Link to="/">Home</Link>
      <Link to="/notes">Notes</Link>
      <Link to="/calendar">Calendar</Link>
    </nav>
  );
}

export default Navbar;