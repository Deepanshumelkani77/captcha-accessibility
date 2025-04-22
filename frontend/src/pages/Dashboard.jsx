// import React, { useEffect, useState } from "react";
// import { fetchLogs } from "../services/api";
// import Chart from "./Chart";

// function Dashboard() {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     const getLogs = async () => {
//       const data = await fetchLogs();
//       setLogs(data);
//     };
//     getLogs();
//   }, []);

//   return (
//     <div className="bg-white rounded-xl shadow p-6">
//       <h2 className="text-xl font-semibold mb-4">CAPTCHA Solving Logs</h2>
//       <Chart logs={logs} />
//     </div>
//   );
// }

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "../axios";
import Chart from "../components/Chart";

function Dashboard() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get("/captcha/logs");
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      <Chart logs={logs} />
    </div>
  );
}

export default Dashboard;
