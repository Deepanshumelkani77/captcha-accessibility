import { useEffect,useState } from "react";
import axios from 'axios';
// import Chart from './Chart';

export default function Dashboard(){
    const [logs,setLogs]=useState([]);

    useEffect(()=>{
        axios.get('/api/captcha/logs').then(res=>setLogs(res.data));
    },[]);
return (
    <div className="p-4">
        <h1 className="text-xl font-bold">
            Solver Performance
        </h1>
        {/* <Chart data={logs}/> */}
    </div>
);

}