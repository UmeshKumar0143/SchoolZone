import FormModal from "@/components/FormModal";
import ListSearchBar from "@/components/ListSearchBar";
import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { Prisma, Subject, Teacher } from "@/generated/prisma/client";
import Link from "next/link";
import {  FaSortAmountDown } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { getCurrentUser } from "@/lib/util";

type SubjectList= Subject & {teachers: Teacher[]}



export default async function SubjectsList({searchParams}:{searchParams:{[key:string]: string | undefined}}){

    const {role, userId} = await getCurrentUser(); 


    const cols = [
    {
     header: "Info" , 
     accessor: "info",
     classname: "text-left "
    },  
    {
     header: "Teachers" , 
     accessor: "teachers", 
     classname: "hidden md:table-cell text-left"
    }, 
  ...(role=="admin" ?    [  {
        header: "Actions" , 
        accessor: "actions", 
        classname: "text-left"
       }]:[]), 

]

const renderRow = (item:SubjectList)=>{
    return <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-school-purple-Light">
        <td className="flex items-center p-4 gap-2" >
        <div className="flex flex-col ">
            <h3 className="font-semibold ">{item.name}</h3>
        </div>
        </td>
        <td className="hidden md:table-cell">{item.teachers.map(item=>item.name).join(",")}</td>
        <td>
            <div className="flex items-center gap-2">
                    <Link href={`/list/teacher/${item.id}`}>
                    <FormModal type="update" id={item.id} table="subject" data={item}  />
                    </Link>
                   {role=="admin" && <FormModal id={item.id} table="subject" type="delete" />
}
            </div>
        </td>
    </tr>
}

    const {page, ...qeuryparams} = await searchParams; 

    const p= page? parseInt(page) : 1; 

    const query : Prisma.SubjectWhereInput = {}

    if(qeuryparams){
        for(const [key , value] of Object.entries(qeuryparams)){
                if(value!=undefined){
                    switch (key){
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
        prisma.subject.findMany({
            where: query, 
            include: {
                teachers: true, 
            },
            take: ITEM_PER_PAGE , 
            skip: ITEM_PER_PAGE*(p-1)
        }), 
        prisma.subject.count({where: query})
    ])

    return <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            <div className="w-full flex items-center justify-between ">
                        <h1 className="hidden md:block font-semibold text-lg">All Subjects</h1>
                        <div className="flex flex-col md:flex-row items-center  w-full md:w-auto gap-4">  
                                <ListSearchBar />
                                <div className="flex gap-2 self-end">
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <IoFilterSharp width={14} height={14} />
                                </button>
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <FaSortAmountDown width={14} height={14} />
                                </button>
                                <FormModal type="create" table="subject" />
                                </div>
                        </div>
            </div>
            <Table  columns  = {cols} renderRow = {renderRow} data={data}/>
            <Pagination count={count} page={p} />
    </div>
}