// import React from "react";
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
// } from "recharts";

// function Chart({ logs }) {
//   const data = logs.map((log) => ({
//     type: log.captcha_type,
//     success: log.success_count,
//     failures: log.failure_count,
//   }));

//   return (
//     <ResponsiveContainer width="100%" height={300}>
//       <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="type" />
//         <YAxis />
//         <Tooltip />
//         <Bar dataKey="success" stackId="a" fill="#4ade80" />
//         <Bar dataKey="failures" stackId="a" fill="#f87171" />
//       </BarChart>
//     </ResponsiveContainer>
//   );
// }

// export default Chart;
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function Chart({ logs }) {
  const data = logs.map((log) => ({
    type: log.captcha_type,
    success: log.success_count,
    failures: log.failure_count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 20, right: 30, bottom: 20, left: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="success" stackId="a" fill="#4ade80" />
        <Bar dataKey="failures" stackId="a" fill="#f87171" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Chart;
