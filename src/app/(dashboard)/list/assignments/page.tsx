import FormModal from "@/components/FormModal";
import ListSearchBar from "@/components/ListSearchBar";
import Pagination from "@/components/Pagenation";
import Table from "@/components/Table";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/setting";
import { getUser } from "@/lib/util";
import { auth } from "@clerk/nextjs/server";
import { Assignment, Class, Prisma, Subject, Teacher } from "@prisma/client";
import {FaSortAmountDown } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";

type AssingmentList = Assignment &{lesson: {
        subject: Subject; 
        class: Class; 
        teacher: Teacher
}}  




export default async function  AssignmentsList({
  searchParams
}: {
  searchParams: { [key: string]: string | undefined };
}){
    const {userId, role } = await getUser();

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
     header: "Due Date" , 
     accessor: "duedate", 
     classname: "hidden md:table-cell text-left"
    }, 
      ...(role === "admin" || role === "teacher" ? [{
     header: "Actions" , 
     accessor: "actions", 
     classname: "text-left"
    }] : []), 


]

const renderRow = (item:AssingmentList)=>{
    return <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-school-purple-Light">
        <td className="flex items-center p-4 gap-2" >
        <div className="flex flex-col ">
            <h3 className="font-semibold ">{item.lesson?.subject.name}</h3>
        </div>
        </td>
        <td className="hidden md:table-cell">{item.lesson?.class.name}</td>
        <td className="hidden md:table-cell">{item.lesson?.teacher.name}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(new Date(item?.dueDate))}</td>
        <td>
            <div className="flex items-center gap-2">
                   {(role=="admin" || role=="teacher") &&
                   <>
                    <FormModal id={item.id} data={item} type="update" table="assignment" />
                    <FormModal id={item.id} data={item} type="delete" table="assignment" />
                    </>
}
            </div>
        </td>
    </tr>
}

    const { page, ...queryParams } = await searchParams;

  const p = page ? parseInt(page) : 1;


  const query: Prisma.AssignmentWhereInput = {};

  query.lesson = {};



  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson.classId = parseInt(value);
            break;
          case "teacherId":
            query.lesson.teacherId = value;
            break;
          case "search":
            query.lesson.subject = {
              name: { contains: value, mode: "insensitive" },
            };
            break;
          default:
            break;
        }
      }
    }
  }

  switch(role){
    case "admin": 
    break; 
    case "teacher" : 
    query.lesson.teacherId = userId!; 
    break; 
    case "student": 
    query.lesson.class = {
      Students:{
      some: {
      id: userId!, 
      }
    }
  }
  break;
  case "parent": 
  query.lesson.class ={
    Students: {
        some: {
          parent: {
            id: userId!
          }
        }
    }
  } 
  break; 
  default: 
  break; 
}
    const [data, count] = await prisma.$transaction([
    prisma.assignment.findMany({
      where: query,
      include: {
        lesson: {
          select: {
            subject: { select: { name: true } },
            teacher: { select: { name: true, surname: true } },
            class: { select: { name: true } },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.assignment.count({ where: query }),
  ]);

    return <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">

            <div className="w-full flex items-center justify-between ">
                        <h1 className="hidden md:block font-semibold text-lg">All Assingments</h1>
                        <div className="flex flex-col md:flex-row items-center  w-full md:w-auto gap-4">  
                                <ListSearchBar />
                                <div className="flex gap-2 self-end">
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <IoFilterSharp width={14} height={14} />
                                </button>
                                <button className="bg-school-yellow w-8 h-8 rounded-full p-2">
                                <FaSortAmountDown width={14} height={14} />
                                </button>
                                {(role=="admin" || role=="teacher" ) &&
                                <FormModal type="create" table="assignment" />
                                }
                                </div>
                        </div>
            </div>
            <Table  columns  = {cols} renderRow = {renderRow} data={data}/>
            <Pagination page={p} count={count}/>
    </div>
}