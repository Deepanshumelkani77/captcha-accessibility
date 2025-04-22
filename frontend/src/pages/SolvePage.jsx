import React from "react";
import SolveCaptcha from "../components/SolveCaptcha";

function SolvePage() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Solve CAPTCHA</h2>
      <SolveCaptcha />
    </div>
  );
}

export default SolvePage;
