import FormModal from "@/components/FormModal";
import ListSearchBar from "@/components/ListSearchBar";
import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import { role,  } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import Link from "next/link";
import { FaSortAmountDown } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";

type ExamLists  = Exam & {lesson: {
    subject: Subject; 
    class: Class, 
    teacher: Teacher
}}

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
     header: "Date" , 
     accessor: "date", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Actions" , 
     accessor: "actions", 
     classname: "text-left"
    }, 


]

const renderRow = (item:ExamLists)=>{
    return <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-school-purple-Light">
        <td className="flex items-center p-4 gap-2" >
        <div className="flex flex-col ">
            <h3 className="font-semibold ">{item.lesson.subject.name}</h3>
        </div>
        </td>
        <td className="hidden md:table-cell">{item.lesson.class.name}</td>
        <td className="hidden md:table-cell">{item.lesson.teacher.name}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
        <td>
            <div className="flex items-center gap-2">
                    <Link href={`/list/exams/${item.id}`}>
                    <FormModal type="update" data={item} id={item.id} table="exam" />
                    </Link>
                   {role=="admin" &&<FormModal data={item} id={item.id} table="exam" type="delete" />
}
            </div>
        </td>
    </tr>
}

export default async function ExamList({searchParams}: {searchParams:{[key:string]:string|undefined}}){

    const {page, ...queryparams} = await searchParams; 

    const p = page? parseInt(page): 1; 

    const query: Prisma.ExamWhereInput = {}

    if(queryparams){
        for(const [key, value] of Object.entries(queryparams)){
            if(value!==undefined){
                switch (key){
                    case 'classId': 
                    query.lesson = { classId : parseInt(value)}                      
                    break; 
                    case 'teacherId':
                    query.lesson =  {teacherId :  value}; 
                    break; 
                    case 'search':
                        query.lesson = {
                            subject : {name: {contains : value, mode: 'insensitive'}}
                        }
                    break; 
                    default:  
                    break; 
                }
            }
        }
    }
    

    const [data, count] = await prisma.$transaction([
        prisma.exam.findMany({
            where: query, 
            include:{
                lesson:{
                    select:{
                        subject: {select: {name:true}}, 
                        teacher: {select: {name:true, surname: true}}, 
                        class: {select:{name:true}}, 
                    }
                }
            }, 
            take: ITEM_PER_PAGE,
            skip: ITEM_PER_PAGE*(p-1)
        }),
        prisma.exam.count({where:query})
              
    ])
    return <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            <div className="w-full flex items-center justify-between ">
                        <h1 className="hidden md:block font-semibold text-lg">All Exams</h1>
                        <div className="flex flex-col md:flex-row items-center  w-full md:w-auto gap-4">  
                                <ListSearchBar />
                                <div className="flex gap-2 self-end">
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <IoFilterSharp width={14} height={14} />
                                </button>
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <FaSortAmountDown width={14} height={14} />
                                </button>
                                <FormModal table="exam" type="create"/>
                                </div>
                        </div>
            </div>
            <Table  columns  = {cols} renderRow = {renderRow} data={data}/>
            <Pagination  count={count} page={p} />
    </div>
}
