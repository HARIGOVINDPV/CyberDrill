import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>

        <li>
          <NavLink to="/dashboard" end>Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/scenarios">Scenarios</NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/progress">Progress_Tracker</NavLink>
        </li>

        <li>
          <NavLink to="/wip">Leaderboard</NavLink>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;