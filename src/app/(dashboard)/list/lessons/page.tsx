import FormModal from "@/components/FormModal";
import ListSearchBar from "@/components/ListSearchBar";
import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import {  lessonsData,  role,  } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Class, Lesson, Prisma, Teacher } from "@prisma/client";
import Link from "next/link";
import { CgMathPlus } from "react-icons/cg";
import {  FaExternalLinkAlt, FaSortAmountDown } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

type LessonList = Lesson & {class: Class , teacher: Teacher}

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
     header: "Actions" , 
     accessor: "actions", 
     classname: "text-left"
    }, 


]

const renderRow = (item:LessonList)=>{
    return <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-school-purple-Light">
        <td className="flex items-center p-4 gap-2" >
        <div className="flex flex-col ">
            <h3 className="font-semibold ">{item.name}</h3>
        </div>
        </td>
        <td className="hidden md:table-cell">{item.class.name}</td>
        <td className="hidden md:table-cell">{item.teacher.name}</td>
        <td>
            <div className="flex items-center gap-2">
                    <Link href={`/list/teacher/${item.id}`}>
                    <FormModal type="update" table="lesson" data={item} id={item.id} />
                    </Link>
                   {role=="admin" && <FormModal type="delete" table="lesson" data={item} id={item.id} />
}
            </div>
        </td>
    </tr>
}

export default async function StudentList({searchParams}:{searchParams: {[key:string]: string | undefined}}){

    const {page, ...queryParams} = await searchParams; 

    const p= page? parseInt(page) : 1; 

    const query: Prisma.LessonWhereInput = {}; 

    if(queryParams){
        for(const [key,value] of Object.entries(queryParams)){
            if(value){
                switch(key){
                    case 'search':
                        query.name = {
                            contains: value, 
                            mode: 'insensitive'
                        }
                }
            }
        }
    }

    const [data , count] = await prisma.$transaction([
        prisma.lesson.findMany({
            where: query, 
            include:{
                class:true,
                teacher: true, 
            },
            take:ITEM_PER_PAGE,
            skip:ITEM_PER_PAGE*(p-1)

        }),
        prisma.lesson.count({where:query})
    ])

    return <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            <div className="w-full flex items-center justify-between ">
                        <h1 className="hidden md:block font-semibold text-lg">All Lessons</h1>
                        <div className="flex flex-col md:flex-row items-center  w-full md:w-auto gap-4">  
                                <ListSearchBar />
                                <div className="flex gap-2 self-end">
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <IoFilterSharp width={14} height={14} />
                                </button>
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <FaSortAmountDown width={14} height={14} />
                                </button>
                                <FormModal type="create" table="lesson"  />
                                </div>
                        </div>
            </div>
            <Table  columns  = {cols} renderRow = {renderRow} data={data}/>
            <Pagination count={count} page={p} />
    </div>
}