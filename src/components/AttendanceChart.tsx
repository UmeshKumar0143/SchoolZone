"use client"
import { CgMore } from "react-icons/cg";
import { Bar, BarChart, CartesianGrid, Legend, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
    {
      name: 'Mon',
      Present: 40,
      Absent: 24,
    },
    {
      name: 'Tue',
      Present: 30,
      Absent: 19,
    },
    {
      name: 'Wed',
      Present: 90,
      Absent: 30,
    },
    {
      name: 'Thu',
      Present: 28,
      Absent: 18,
    },
    {
      name: 'Fri',
      Present: 90,
      Absent: 48,
    },
  ];

export default function AttendanceChart(){
    return <div className="w-ful h-full bg-white rounded-xl p-4">
        <div className="flex justify-between items-center">
            <h1 className="text-lg font-semibold">Attendance</h1>
            <CgMore width={20} height={20}/>
        </div>
        <div className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          barSize={20}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis dataKey="name" axisLine={false} tick={{fill:'#d1d5db'}} tickLine={false} />
          <YAxis axisLine={false} tick={{fill:'#d1d5db'}} tickLine={false} />
          <Tooltip contentStyle={{borderRadius:"10px", borderColor:"lightgray"}} />
          <Legend align="left" verticalAlign="top" wrapperStyle={{paddingTop:"20px", paddingBottom:"40px"}}  />
          <Bar dataKey="Present" fill="#FAE27C"  legendType="circle" radius={[10,10,0,0]} />
          <Bar dataKey="Absent" fill="#C3EBFA" legendType="circle" radius={[10,10,0,0]} />
        </BarChart>
      </ResponsiveContainer>
        </div>
    </div>
}