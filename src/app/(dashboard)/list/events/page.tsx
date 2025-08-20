import FormModal from "@/components/FormModal";
import ListSearchBar from "@/components/ListSearchBar";
import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { getUser } from "@/lib/util";
import { Class, Event, Prisma } from "@prisma/client";
import { CgMathPlus } from "react-icons/cg";
import {  FaSortAmountDown } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";

type EventList = Event & {
    class: Class, 

} ;




export default async function EventsList({searchParams}: {searchParams: {[key:string ]: string | undefined}}){


    const {userId, role} = await getUser(); 


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
     header: "Date" , 
     accessor: "date", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "Start Time" , 
     accessor: "startTime", 
     classname: "hidden md:table-cell text-left"
    }, 
    {
     header: "End Time" , 
     accessor: "endtime", 
     classname: "hidden md:table-cell text-left"
    }, 
    ...(role=="admin" ?[{
     header: "Actions" , 
     accessor: "actions", 
     classname: "text-left"
    }]:[]), 


]

const renderRow = (item:EventList)=>{
    return <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-school-purple-Light">
        <td className="flex items-center p-4 gap-2" >
        <div className="flex flex-col ">
            <h3 className="font-semibold ">{item.title}</h3>
        </div>
        </td>
        <td className="hidden md:table-cell">{item.class.name}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-Us").format(item.startTime)}</td>
        <td className="hidden md:table-cell">{item.startTime.toLocaleTimeString("en-US",{hour:"2-digit", minute:"2-digit", hour12:false })}</td>
        <td className="hidden md:table-cell">{item.endTime.toLocaleTimeString("en-US", {hour: "2-digit", minute: "2-digit", hour12: false})}</td>
        <td>
            <div className="flex items-center gap-2">
            { role=="admin" && 
                <>
                    <FormModal data={item} id={item.id} type="update" table="event" />
                   role=="admin" && <FormModal data={item} id={item.id} type="delete" table="event" />
                   </>
                    }
            </div>
        </td>
    </tr>
}



    const {page, ...queryParams} = await searchParams; 

    const p = page? parseInt(page): 1; 

    const query:Prisma.EventWhereInput = {};  

    if(queryParams){
        for(const [key, value] of Object.entries(queryParams)){
            if(value!=undefined){
                switch(key){
                case 'search': 
                    query.OR = [
                        {title: {contains: value, mode: "insensitive"}}, 
                        {class:{ is: {name: {contains: value, mode: "insensitive"}}}}
                    ]
                    break; 
                default: 
                break; 
                }
            }
        }
    }

    const roleConditions = {
        teacher: {lessons: {some: {teacherId: userId!}}},
        student: {Students: {some: {id: userId!}}},
        parent: {Students: {some: {parentId: userId!}}},
    }

        query.OR = [
            {classId: null}, 
            {class: roleConditions[role as keyof typeof roleConditions]} || {}
        ]
  

   

    const [data, count]  = await prisma.$transaction([
         prisma.event.findMany({
            where:query, 
            include: {
                class: {
                    select: { name: true}
                }
            }, 
            take: ITEM_PER_PAGE, 
            skip: ITEM_PER_PAGE*(p-1)
        }), 
        prisma.event.count({where:query})
    ])



    return <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            <div className="w-full flex items-center justify-between ">
                        <h1 className="hidden md:block font-semibold text-lg">All Events</h1>
                        <div className="flex flex-col md:flex-row items-center  w-full md:w-auto gap-4">  
                                <ListSearchBar />
                                <div className="flex gap-2 self-end">
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <IoFilterSharp width={14} height={14} />
                                </button>
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <FaSortAmountDown width={14} height={14} />
                                </button>

                                {role === "admin" && <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <CgMathPlus width={14} height={14}/>
                                </button>}
                                </div>
                        </div>
            </div>
            <Table  columns  = {cols} renderRow = {renderRow} data={data}/>
            <Pagination page={p} count={count}/>
    </div>
}