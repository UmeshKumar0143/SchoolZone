"use client"

import Image from "next/image";
import { CgMore } from "react-icons/cg";
import { Legend, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

const data = [
    {
        name: 'Total',
        count: 106,
        fill: 'white'
    },
    {
        name: 'Boys',
        count: 50,
        fill: '#C3EBFa',
    },
    {
        name: 'Girls',
        count: 50,
        fill: '#FAE27C',
    },
];
export default function CountChart() {
    return <div className="bg-white w-full h-full rounded-xl p-4">
        <div className="flex justify-between items-center ">
            <h1 className="text-lg font-semibold">Students</h1>
            <CgMore width={20} height={20} />
        </div>
        <div className="w-full relative h-[75%]">
            <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart cx="50%" cy="50%" innerRadius="40%" outerRadius="100%" barSize={32} data={data}>
                    <RadialBar
                        background
                        dataKey="count"
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <Image src={"/maleFemale.png"} width={50} height={50} alt="" className="absolute top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2" />
        </div>
        <div className="flex justify-center  gap-16">
            <div className="flex flex-col gap-1">
                <div className="w-5 h-5 bg-school-blue rounded-full" />
                <h1 className="font-bold ">1,234</h1>
                <h2 className="text-xs text-gray-300">Boys (55%)</h2>
            </div>
            <div className="flex flex-col gap-1">
                <div className="w-5 h-5 bg-school-yellow rounded-full" />
                <h1 className="font-bold ">1,234</h1>
                <h2 className="text-xs text-gray-300">Girls (45%)</h2>
            </div>
        </div>
    </div>
}