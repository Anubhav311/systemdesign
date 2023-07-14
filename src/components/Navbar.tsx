import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  children: React.ReactNode;
}
const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const location = useLocation();

  // Array of dynamically generated navbar items
  const navbarItems = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <div>
      <nav>
        <ul className="flex">
          {navbarItems.map((item) => (
            <li key={item.path} className="mr-5">
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      {children}
    </div>
  );
};

export default Navbar;
