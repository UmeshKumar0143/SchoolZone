import ListSearchBar from "@/components/ListSearchBar";
import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import { assignmentsData, classesData,  lessonsData,  role,  } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { CgMathPlus } from "react-icons/cg";
import {  FaExternalLinkAlt, FaSortAmountDown } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

type Assingment = {
    id: number; 
    subject: string; 
    class: string;
    teacher: string; 
    dueDate: string; 
}

const cols = [
    {
     header: "Info" , 
     accessor: "info",
     classname: "text-left "
    },  
    {
     header: "Class" , 
     accessor: "class", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Teacher" , 
     accessor: "teacher", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Due Date" , 
     accessor: "duedate", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Actions" , 
     accessor: "actions", 
     classname: "text-left"
    }, 


]

const renderRow = (item:Assingment)=>{
    return <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-school-purple-Light">
        <td className="flex items-center p-4 gap-2" >
        <div className="flex flex-col ">
            <h3 className="font-semibold ">{item.subject}</h3>
        </div>
        </td>
        <td className="hidden md:table-cell">{item.class}</td>
        <td className="hidden md:table-cell">{item.teacher}</td>
        <td className="hidden md:table-cell">{item.dueDate}</td>
        <td>
            <div className="flex items-center gap-2">
                    <Link href={`/list/teacher/${item.id}`}>
                    <button className="w-7 h-7 rounded-full bg-school-blue flex text-white items-center justify-center"><FaExternalLinkAlt width={16} height={16}/></button>
                    </Link>
                   {role=="admin" && <button className="w-7 h-7 rounded-full flex text-red-400 bg-school-blue items-center justify-center"><MdDeleteOutline width={16} height={16}/></button>
}
            </div>
        </td>
    </tr>
}

export default function AssignmentsList(){
    return <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            <div className="w-full flex items-center justify-between ">
                        <h1 className="hidden md:block font-semibold text-lg">All Assingments</h1>
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
            <Table  columns  = {cols} renderRow = {renderRow} data={assignmentsData}/>
            <Pagination/>
    </div>
}