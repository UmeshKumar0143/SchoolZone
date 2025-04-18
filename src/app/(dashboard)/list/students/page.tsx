import FormModal from "@/components/FormModal";
import ListSearchBar from "@/components/ListSearchBar";
import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import { role, studentsData} from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import { CgMathPlus } from "react-icons/cg";
import {  FaExternalLinkAlt, FaSortAmountDown } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

type Student = {
    id: number; 
    studentId: string; 
    name: string; 
    email?: string;
    photo: string;
    phone?: string; 
    grade:number; 
    class:string 
    address: string; 
}

const cols = [
    {
     header: "Info" , 
     accessor: "info",
     classname: "text-left "
    }, 
    {
     header: "Student ID" , 
     accessor: "studentId", 
     classname: "hidden md:table-cell text-left text-left"
    }, 
    {
     header: "Grade" , 
     accessor: "grade", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Phone" , 
     accessor: "phone", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Address" , 
     accessor: "address", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Actions" , 
     accessor: "actions", 
     classname: "text-left"
    }, 


]

const renderRow = (item:Student)=>{
    return <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-school-purple-Light">
        <td className="flex items-center p-4 gap-2" >
        <Image src={item.photo} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover md:hidden xl:block " />
        <div className="flex flex-col ">
            <h3 className="font-semibold ">{item.name}</h3>
            <p className="text-xs text-gray-500">{item.class}</p>
        </div>
        </td>
        <td className="hidden md:table-cell">{item.studentId}</td>
        <td className="hidden md:table-cell">{item.grade}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
            <div className="flex items-center gap-2">
                    <Link href={`/list/students/${item.id}`}>
                   <FormModal id={item.id} type="update" table="student" data={item}/>
                    </Link>
                   {role=="admin" && <FormModal id={item.id} type="delete" table="student" data={item}/>
}
            </div>
        </td>
    </tr>
}

export default function StudentList(){
    return <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            <div className="w-full flex items-center justify-between ">
                        <h1 className="hidden md:block font-semibold text-lg">All Students</h1>
                        <div className="flex flex-col md:flex-row items-center  w-full md:w-auto gap-4">  
                                <ListSearchBar />
                                <div className="flex gap-2 self-end">
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <IoFilterSharp width={14} height={14} />
                                </button>
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <FaSortAmountDown width={14} height={14} />
                                </button>
                               <FormModal type="create" table="student" />
                                </div>
                        </div>
            </div>
            <Table  columns  = {cols} renderRow = {renderRow} data={studentsData}/>
            <Pagination/>
    </div>
}