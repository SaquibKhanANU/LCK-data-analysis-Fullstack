import { NavLink } from 'react-router-dom';
import './external-nav-link.css';

function ExternalNavLink({ to, children }) {
  return (
    <NavLink to={to} className="external-link">
      {children}
      <span className="external-arrow">&#x2197;</span>
    </NavLink>
  );
}

export default ExternalNavLink;