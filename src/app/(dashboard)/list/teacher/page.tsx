import ListSearchBar from "@/components/ListSearchBar";
import Pagination from "@/components/Pagenation";
import { CgMathPlus } from "react-icons/cg";
import {  FaSortAmountDown } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";

export default function TeacherList(){
    return <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            <div className="w-full flex items-center justify-between ">
                        <h1 className="hidden md:block font-semibold text-lg">All Teachers</h1>
                        <div className="flex flex-col md:flex-row items-center  w-full md:w-auto gap-4">  
                                <ListSearchBar />
                                <div className="flex gap-2 self-end">
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <IoFilterSharp width={14} height={14} />
                                </button>
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <FaSortAmountDown width={14} height={14} />
                                </button>
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <CgMathPlus width={14} height={14}/>
                                </button>
                                </div>
                        </div>
            </div>

            <div className=""></div>
            <Pagination/>
    </div>
}