"use client"

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
type ValuePeice  = Date | null;

type Value = ValuePeice | [ValuePeice, ValuePeice]; 

export default function EventCalander(){
    const [value, onChange]= useState<Value>(new Date()); 
    return <div className="bg-white p-4 rounded-md">
        <Calendar onChange={onChange} value={value} /> 
    </div>
}