"use client";

import "./Header.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Clapperboard } from "lucide-react";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>Watchlist</h1>
          </Link>
          <Clapperboard />
        </div>

        <div className="menu-icon" onClick={toggleMenu}>
          <div className={`menu-line ${menuOpen ? "open" : ""}`}></div>
          <div className={`menu-line ${menuOpen ? "open" : ""}`}></div>
          <div className={`menu-line ${menuOpen ? "open" : ""}`}></div>
        </div>

        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/watchlist" onClick={() => setMenuOpen(false)}>
                Your watchlist
              </Link>
            </li>
          </ul>
        </nav>

        <div className="sign-in">
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default Header;
