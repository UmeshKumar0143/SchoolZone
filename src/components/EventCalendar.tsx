"use client"

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { CgMore } from "react-icons/cg";
type ValuePeice  = Date | null;

type Value = ValuePeice | [ValuePeice, ValuePeice]; 

const events = [
    {
      id: 1,
      title: "Lorem ipsum dolor",
      time: "12:00 PM - 2:00 PM",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 2,
      title: "Lorem ipsum dolor",
      time: "12:00 PM - 2:00 PM",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor",
      time: "12:00 PM - 2:00 PM",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ];

export default function EventCalander(){
    const [value, onChange]= useState<Value>(new Date()); 
    return <div className="bg-white p-4 rounded-md">
        <Calendar onChange={onChange} value={value} /> 
        <div className="flex items-center justify-between my-2">
            <h1 className="text-xl font-semibold my-2">Events</h1>
            <CgMore width={20} height={20}/>
        </div>
        <div className="flex flex-col gap-4">
                {events.map(event=>(
                    <div className="p-5 rounded-md border-gray-100 border-t-4 odd:border-t-school-blue even:border-t-school-purple" key={event.id}>
                        <div className="flex justify-between items-center">
                        <h1 className="font-semibold text-gray-600">{event.title}</h1>
                        <span className="text-xs text-gray-400">{event.time}</span>
                        </div>
                        <p className="mt-4  text-sm text-gray-400">{event.description}</p>
                    </div>
                
                ))}
        </div>
    </div>
}