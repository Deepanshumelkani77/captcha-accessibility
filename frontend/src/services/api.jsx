import axios from "axios";

export const fetchLogs = async () => {
  try {
    const res = await axios.get("http://localhost:8000/logs");
    return res.data.logs;
  } catch (err) {
    console.error("Failed to fetch logs:", err);
    return [];
  }
};
