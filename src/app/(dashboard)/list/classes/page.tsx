import FormModal from "@/components/FormModal";
import ListSearchBar from "@/components/ListSearchBar";
import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { getUser } from "@/lib/util";
import { auth } from "@clerk/nextjs/server";
import { Class, Grade, Prisma, Teacher } from "@prisma/client";
import {   FaSortAmountDown } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";

type ClasesList = Class & {supervisor: Teacher, Grade: Grade}



export default async function ClasesList({searchParams}:{searchParams:{[key:string]: string | undefined}}){

         const {userId, role } = await getUser();

const cols = [
    {
     header: "Info" , 
     accessor: "info",
     classname: "text-left "
    },  
    {
     header: "Capacity" , 
     accessor: "capacityu", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Grade" , 
     accessor: "grade", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Supervisor" , 
     accessor: "supervisor", 
     classname: "hidden md:table-cell text-left"
    }, 
    ...(role=="admin" ? [{
     header: "Actions" , 
     accessor: "actions", 
     classname: "text-left"
    }]: []), 


]

const renderRow = (item:ClasesList)=>{
    return <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-school-purple-Light">
        <td className="flex items-center p-4 gap-2" >
        <div className="flex flex-col ">
            <h3 className="font-semibold ">{item.name}</h3>
        </div>
        </td>
        <td className="hidden md:table-cell">{item.capacity}</td>
        <td className="hidden md:table-cell">{item.Grade.level}</td>
        <td className="hidden md:table-cell">{item.supervisor.name}</td>
        <td>
            <div className="flex items-center gap-2">
                
                {role=="admin" &&
                <>
                <FormModal type="update" table="class" data={item} id={item.id} /> 
                 <FormModal table="class" data={item} id={item.id} type="delete" />
                 </>
}
            </div>
        </td>
    </tr>
}


    const {page, ...queryParams} = await searchParams; 

    const p = page? parseInt(page): 1; 

    const query : Prisma.ClassWhereInput = {}; 

    if(queryParams){
        for(const[key, value] of Object.entries(queryParams)){
            if(value){
                switch(key){
                    case 'teacherId': 
                    query.supervisorId = value; 
                    break;                     
                    case 'search': 
                        query.name = {
                            contains: value, 
                            mode :'insensitive', 
                        }
                    break; 
                    default: 
                    break; 
                }
            }
        }
    }

        const [data, count] = await prisma.$transaction([
            prisma.class.findMany({
                where: query, 
                include: {
                    supervisor: true,
                    Grade: true
                }, 
                take: ITEM_PER_PAGE, 
                skip: ITEM_PER_PAGE*(p-1)
            }),
            prisma.class.count({where:query})

        ])
    return <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            <div className="w-full flex items-center justify-between ">
                        <h1 className="hidden md:block font-semibold text-lg">All Classes</h1>
                        <div className="flex flex-col md:flex-row items-center  w-full md:w-auto gap-4">  
                                <ListSearchBar />
                                <div className="flex gap-2 self-end">
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <IoFilterSharp width={14} height={14} />
                                </button>
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <FaSortAmountDown width={14} height={14} />
                                </button>
                                { role=="admin" && 
                                <FormModal type="create" table="class" />
                                }
                                </div>
                        </div>
            </div>
            <Table  columns  = {cols} renderRow = {renderRow} data={data}/>
            <Pagination page={p} count={count} />
    </div>
}