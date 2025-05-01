import FormModal from "@/components/FormModal";
import ListSearchBar from "@/components/ListSearchBar";
import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import { role, studentsData} from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Class, Prisma, Student } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { CgMathPlus } from "react-icons/cg";
import {  FaExternalLinkAlt, FaSortAmountDown } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

type StudentList = Student & {class: Class} 

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

const renderRow = (item:StudentList)=>{
    return <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-school-purple-Light">
        <td className="flex items-center p-4 gap-2" >
        <Image src={item.img || '/noAvatar.png'} alt="" width={40} height={40} className="w-10 h-10 rounded-full object-cover md:hidden xl:block " />
        <div className="flex flex-col ">
            <h3 className="font-semibold ">{item.name}</h3>
            <p className="text-xs text-gray-500">{item.class.name}</p>
        </div>
        </td>
        <td className="hidden md:table-cell">{item.username}</td>
        <td className="hidden md:table-cell">{item.class.name[0]}</td>
        <td className="hidden md:table-cell">{item.phone}</td>
        <td className="hidden md:table-cell">{item.address}</td>
        <td>
            <div className="flex items-center gap-2">
                    <Link  href={`/list/students/${item.id}`}>
                    <button className="w-7 h-7 flex items-center justify-center rounded-full bg-school-blue-light"> <Image src={'/view.png'} alt="view" width={16} height={16}/> </button>
                    </Link>
                   <FormModal id={item.id} type="update" table="student" data={item}/>
                   {role=="admin" && <FormModal id={item.id} type="delete" table="student" data={item}/>
}
            </div>
        </td>
    </tr>
}
export default async function  StudentList({searchParams}: {searchParams: {[key:string]: string | undefined}}){
    const {page, ...queryParams} = await searchParams; 
    const p = page? parseInt(page) : 1; 
    
    const query: Prisma.StudentWhereInput = {} 

    if(queryParams){
        for(const[key, value] of Object.entries(queryParams)){
            if(value!=undefined){
                switch (key){
                    case 'teacherId': 
                    query.class= {
                        lessons: {
                            some: {
                                teacherId: value
                            }
                        }
                    }
                    break; 
                    case 'search': 
                     query.name = {
                        contains: value, 
                        mode: 'insensitive'
                     }
                }
        }
    }
    }

    const [data, count] = await prisma.$transaction([
                prisma.student.findMany({
                    where: query, 
                    include: {
                        class: true
                    },
                    take: ITEM_PER_PAGE,
                    skip: ITEM_PER_PAGE *(p-1)
                }),
                
                prisma.student.count()
        ]
    )
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
            <Table  columns  = {cols} renderRow = {renderRow} data={data}/>
            <Pagination count={count} page={p}  />
    </div>
}