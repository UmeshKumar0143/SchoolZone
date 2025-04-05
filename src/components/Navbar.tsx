import Image from "next/image";
import { AiOutlineMessage } from "react-icons/ai";
import {  CiBellOn, CiSearch } from "react-icons/ci";

export default function Navbar(){
    return <div className="flex justify-between items-center p-4">
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 ">
            <CiSearch  width={14} height={14}/>
            <input type="text" placeholder="Search..." className="w-[200px]  p-2 bg-transparent outline-none" />
        </div>

        <div className="flex items-center gap-6 w-full justify-end">
            <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer ">
                <AiOutlineMessage width={20} height={20}/>
            </div>
            <div className="bg-white rounded-full w-7 h-7 relative flex items-center justify-center cursor-pointer ">
                <CiBellOn width={20} height={20}/>
                <div  className="w-5 h-5 rounded-full bg-purple-500 flex justify-center items-center text-white -top-3 -right-3 absolute">1</div>
            </div>
            <div className="flex flex-col">
                    <span className="text-xs ">Jhon Doe</span>
                    <span className="text-[10px] text-right text-gray-500">Admin</span>
            </div>
            <Image src={"/avatar.png"} alt="avatar" width={36} height={36} className="rounded-full" />
        </div>
    </div>
}