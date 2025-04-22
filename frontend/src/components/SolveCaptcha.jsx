import React, { useState } from "react";
import axios from "../axios";

function SolveCaptcha() {
  const [captchaType, setCaptchaType] = useState("text");
  const [captchaData, setCaptchaData] = useState("");
  const [solution, setSolution] = useState("");
  const [confidence, setConfidence] = useState(null);
  const [error, setError] = useState("");

  const handleCaptchaChange = (e) => {
    setCaptchaType(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCaptchaData(reader.result.split(",")[1]); // Remove base64 prefix
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/captcha/solve`, {
        type: captchaType,
        data: captchaData,
      });
      setSolution(response.data.solution);
      setConfidence(response.data.confidence);
    } catch (err) {
      console.error(err);
      setError("Failed to solve CAPTCHA. Try again.");
    }
  };
  

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Solve CAPTCHA</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Choose CAPTCHA Type:</label>
        <select
          value={captchaType}
          onChange={handleCaptchaChange}
          className="mb-4 p-2 border rounded"
        >
          <option value="text">Text CAPTCHA</option>
          <option value="image">Image CAPTCHA</option>
          <option value="audio">Audio CAPTCHA</option>
        </select>

        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 p-2 border rounded"
        />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Solve CAPTCHA
        </button>
      </form>

      {error && <div className="mt-4 text-red-500">{error}</div>}

      {solution && (
        <div className="mt-4">
          <h3 className="font-bold">Solution: {solution}</h3>
          <p>Confidence: {confidence}</p>
        </div>
      )}
    </div>
  );
}

export default SolveCaptcha;
