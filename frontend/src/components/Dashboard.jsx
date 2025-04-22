import React, { useEffect, useState } from "react";
import { fetchLogs } from "../services/api";
import Chart from "./Chart";

function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const getLogs = async () => {
      const data = await fetchLogs();
      setLogs(data);
    };
    getLogs();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-semibold mb-4">CAPTCHA Solving Logs</h2>
      <Chart logs={logs} />
    </div>
  );
}

export default Dashboard;
