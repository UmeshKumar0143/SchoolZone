import FormModal from "@/components/FormModal";
import ListSearchBar from "@/components/ListSearchBar";
import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import {  resultsData,  role,  } from "@/lib/data";
import Link from "next/link";
import { CgMathPlus } from "react-icons/cg";
import {  FaExternalLinkAlt, FaSortAmountDown } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

type Result = {
    id: number; 
    subject: string; 
    class: string;
    teacher: string; 
    student: string; 
    date: string; 
    type: string; 
    score: number; 
}

const cols = [
    {
     header: "Info" , 
     accessor: "info",
     classname: "text-left "
    },  
    {
     header: "Student" , 
     accessor: "student", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Score" , 
     accessor: "score", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Teacher" , 
     accessor: "teacher", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Class" , 
     accessor: "class", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: " Date" , 
     accessor: "date", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Actions" , 
     accessor: "actions", 
     classname: "text-left"
    }, 


]

const renderRow = (item:Result)=>{
    return <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-school-purple-Light">
        <td className="flex items-center p-4 gap-2" >
        <div className="flex flex-col ">
            <h3 className="font-semibold ">{item.subject}</h3>
        </div>
        </td>
        <td className="hidden md:table-cell">{item.student}</td>
        <td className="hidden md:table-cell">{item.score}</td>
        <td className="hidden md:table-cell">{item.teacher}</td>
        <td className="hidden md:table-cell">{item.class}</td>
        <td className="hidden md:table-cell">{item.date}</td>
        <td>
            <div className="flex items-center gap-2">
                    <Link href={`/list/results/${item.id}`}>
                    <FormModal data={item} id={item.id} type="update" table="result" />
                    </Link>
                   {role=="admin" && <FormModal data={item} id={item.id} type="delete" table="result" />
}
            </div>
        </td>
    </tr>
}

export default function ResultList(){
    return <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            <div className="w-full flex items-center justify-between ">
                        <h1 className="hidden md:block font-semibold text-lg">All Results</h1>
                        <div className="flex flex-col md:flex-row items-center  w-full md:w-auto gap-4">  
                                <ListSearchBar />
                                <div className="flex gap-2 self-end">
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <IoFilterSharp width={14} height={14} />
                                </button>
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <FaSortAmountDown width={14} height={14} />
                                </button>
                                <FormModal type="create" table="result" />
                                </div>
                        </div>
            </div>
            <Table  columns  = {cols} renderRow = {renderRow} data={resultsData}/>
            <Pagination/>
    </div>
}