import FormModal from "@/components/FormModal";
import ListSearchBar from "@/components/ListSearchBar";
import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import { role, teachersData } from "@/lib/data";
import Image from "next/image";
import Link from "next/link";
import {  FaSortAmountDown } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

type Teacher = {
    id: number; 
    teacherId: string; 
    name: string; 
    email: string;
    photo: string; 
    phone: string; 
    subjects: string[]; 
    classes: string[]; 
    address: string; 
}

const cols = [
    {
     header: "Info" , 
     accessor: "info",
     classname: "text-center"
    }, 
    {
     header: "Teacher ID" , 
     accessor: "teacherId", 
     classname: "hidden md:table-cell text-left text-left"
    }, 
    {
     header: "Subjects" , 
     accessor: "subjects", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Classes" , 
     accessor: "classes", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Phone" , 
     accessor: "phone", 
     classname: "hidden lg:table-cell text-left"
    }, 
    {
     header: "Address" , 
     accessor: "address", 
     classname: "hidden lg:table-cell text-left"
    }, 
    {
     header: "Actions" , 
     accessor: "actions", 
     classname: "text-left"
    }, 


]

const renderRow = (item:Teacher)=>{
    return <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-school-purple-Light">
        <td className="flex items-center p-4 gap-2" >
        <Image src={item.photo} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover md:hidden xl:block " />
        <div className="flex flex-col ">
            <h3 className="font-semibold ">{item.name}</h3>
            <p className="text-xs text-gray-500">{item.email}</p>
        </div>
        </td>
        <td className="hidden md:table-cell">{item.teacherId}</td>
        <td className="hidden md:table-cell">{item.subjects.join(",")}</td>
        <td className="hidden md:table-cell">{item.classes.join(",")}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
            <div className="flex items-center gap-2">
                    <Link href={`/list/teachers/${item.id}`}>
                    <FormModal id={item.id} table="teacher" type="update" data={item} />
                    </Link>
                   {role=="admin" && <FormModal table="teacher" id={item.id} type="delete" data={item} /> }
            </div>
        </td>
    </tr>
}

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
                                {role=="admin" && <FormModal  type="create" table="teacher" />}
                                </div>
                        </div>
            </div>
            <Table  columns  = {cols} renderRow = {renderRow} data={teachersData}/>
            <Pagination/>
    </div>
}