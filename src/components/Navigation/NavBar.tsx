import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const NavBarLinks: React.FC = () => {
  const links = [{ path: "/", label: "Home", className: styles.highlineColor }];

  return (
    <div className={styles.navbarLinks}>
      {links.map((link) => (
        <Link key={link.path} to={link.path} className={link.className || ""}>
          {link.label}
        </Link>
      ))}
    </div>
  );
};

const NavBar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={`${styles.navbarMainSection} ${styles.boxShadow}`}>
        <div className={styles.navbarBrand}>
          <span>Counter</span>
          <span className={styles.highlineColor}>App</span>
        </div>
        <div
          className={styles.toggleButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>
        <NavBarLinks />
      </div>
      {menuOpen && (
        <div className={`${styles.navbarDropdownMenu} ${styles.boxShadow}`}>
          <NavBarLinks />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
