import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Captcha Accessibility Solver</h1>
        <nav>
          <Link className="mr-4" to="/">
            Home
          </Link>
          <Link className="mr-4" to="/dashboard">
            Dashboard
          </Link>
          <Link to="/solve">Solve CAPTCHA</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
