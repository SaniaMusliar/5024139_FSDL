import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="sidebar">
      <h2>TaskApp</h2>

      <Link to="/">Dashboard</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Navbar;