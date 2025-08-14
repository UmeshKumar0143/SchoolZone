import FormModal from "@/components/FormModal";
import ListSearchBar from "@/components/ListSearchBar";
import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import { role,  } from "@/lib/data";
import Link from "next/link";
import {  FaSortAmountDown } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";

type ResultList = {
    id:number
    title: string
    studentName: string
    studentSurname: string
    teacherName: string
    teacherSurname: string
    score:number
    className:string
    startTime: Date
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

const renderRow = (item:ResultList)=>{
    return <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-school-purple-Light">
        <td className="flex items-center p-4 gap-2" >
        <div className="flex flex-col ">
            <h3 className="font-semibold ">{item.title}</h3>
        </div>
        </td>
        <td className="hidden md:table-cell">{item.studentName +" "+ item.studentSurname}</td>
        <td className="hidden md:table-cell">{item.score}</td>
        <td className="hidden md:table-cell">{item.teacherName +" "+ item.teacherSurname}</td>
        <td className="hidden md:table-cell">{item.className}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>
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

export default async function ResultList({
searchParams
}:{searchParams:{[key:string]: string | undefined}}){

        const {page, ...queryParams} =  await searchParams; 

        const p = page? parseInt(page) : 1; 

        const query : Prisma.ResultWhereInput = {}; 

        if(query){
            for(const [key , value ] of Object.entries(queryParams)){
                if(value!=undefined){                    
                    switch(key){
                        case 'classId': 
                        query.exam!.lesson = {classId: parseInt(value)}
                        break; 
                        case 'teacherId': 
                        query.exam!.lesson = {teacherId: value}
                        break; 
                        case 'search': 
                        query.OR = [
                                {exam: {title: {contains:value, mode:"insensitive"}}}, 
                                {Student:{name:{contains:value, mode:"insensitive"}}}
                        ]
                        break; 
                        default: 
                        break; 
                }
            }
            }
        }


        const [dataRes, count] = await prisma.$transaction([
            prisma.result.findMany({
                where: query, 
                include: {
                    Student: {select: {name: true, surname: true}}, 
                    exam: {
                        include: {
                            lesson:{
                                select:{
                                    class: {select: {name: true}}, 
                                    teacher: {select: {name: true, surname: true}}, 
                                }
                            }
                        }
                    },
                    assignment:{
                        include: {
                            lesson:{
                                select:{
                                    class:{select:{name:true}}, 
                                    teacher:{select:{name:true, surname:true}}, 
                                }
                            }
                        }
                    }
                },
                
                take:ITEM_PER_PAGE, 
                skip: ITEM_PER_PAGE*(p-1), 
            }), 
            prisma.result.count({where:query}), 
        ])

        const data = dataRes.map((item)=>{
            const assement  = item.exam || item.assignment; 

            if(!assement) return null; 

            const isExam  = "startTime" in assement; 

            return {
                   id: item.id, 
                   title: assement.title, 
                   studentName: item.Student?.name, 
                   studentSurname: item.Student?.surname, 
                   teacherName: assement?.lesson.teacher.name, 
                   teacherSurname: assement.lesson.teacher.surname, 
                   score:item.score, 
                   className:assement.lesson.class.name, 
                   startTime: isExam? assement.startTime : assement.startDate
            }
        })


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
            <Table  columns  = {cols} renderRow = {renderRow} data={data}/>
            <Pagination page={p} count={count} />
    </div>
}