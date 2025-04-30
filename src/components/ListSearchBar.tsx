"use client"

import { CiSearch } from "react-icons/ci";
import { useRouter } from "next/navigation";
import React from "react";

export default function ListSearchBar(){

    const router = useRouter(); 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=> {
            e.preventDefault();

        const value = (e.currentTarget[0] as HTMLInputElement).value; 
        
        const params = new URLSearchParams(window.location.search); 
        params.set("search", value); 
        router.push(`${window.location.pathname}/?${params}`); 
}

    return <form onSubmit={handleSubmit} className="bg-white w-full md:w-auto  flex  items-center gap-2 ring-[1.5px] ring-gray-300 px-2 rounded-full text-xs  ">
                    <CiSearch  width={14} height={14}/>
        <input type="text" placeholder="Search..." className="bg-transparent w-[200px] outline-none p-2" />
    </form>
}