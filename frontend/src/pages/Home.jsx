import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Welcome to CAPTCHA Solver</h2>
      <p className="mb-4">
        This is a tool to help blind or motor-impaired users solve CAPTCHA challenges automatically.
      </p>
      <Link to="/solve" className="bg-blue-600 text-white py-2 px-4 rounded">
        Solve CAPTCHA
      </Link>
    </div>
  );
}

export default Home;
