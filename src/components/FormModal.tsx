"use client"
import dynamic from "next/dynamic";
import Image from "next/image";
import { JSX, useState } from "react";

const TeacherForm = dynamic(()=>import("./forms/TeacherForm"),{
    loading: ()=> <h1>Loading...</h1>
})

const StudentForm = dynamic(()=>import("./forms/StudentForm"),{
    loading: ()=> <h1>Loading...</h1>
})

const ParentForm = dynamic(()=>import("./forms/ParentForm"),{
    loading: ()=> <h1>Loading...</h1>
})

const forms: {[key:string]:(type:"create" | "update" ,  data:any)=>JSX.Element}={
    teacher: (type,data) =><TeacherForm type={type} data={data} />,
    student: (type,data) =><StudentForm type={type} data={data} />
 }


export default function FormModal({table , type, data, id}:{table: 
     "teacher"
    | "student" 
    | "parent"
    | "subject" 
    | "class" 
    | "lesson" 
    | "exam" 
    | "assignment" 
    | "result" 
    | "attendance" 
    | "event" 
    | "announcement" 
    type:"update" | "delete"| "create", 
    data?: any , 
    id?: number

}){

    

    const size = type=="create"? "w-8 h-8": "w-7 h-7"; 
    const bgColor = type=="create"? "bg-school-yellow " : type=="update"? "bg-school-blue": "bg-school-purple";


    const Form = () => {
        return type==="delete" && id? (
            <form action="" className="p-4 flex flex-col gap-4">
                <span className="text-center font-medium"> All data will be lost. Are you sure you want to delete this {table}</span>
                <button  className="bg-red-700 hover:cursor-pointer hover:bg-red-600 font-semibold   text-white py-2 px-4 rounded-md border-none  w-max self-center">Delete</button>
            </form>
        ): type=="create" || type=="update"? forms[table](type,data) : "Form not found"
}   

        const [isopen, setisOpen] = useState(false); 

    return <>
        <button onClick={()=>setisOpen(true)} className={`${size} flex justify-center hover:cursor-pointer items-center rounded-full ${bgColor} `}>
            <Image src={`/${type}.png`} alt="" width={16} height={16} /> 
        </button>
            {isopen && (
                <div className="w-screen h-screen top-0 left-0 bg-black/60 z-50 flex justify-center items-center absolute">
                        <div className="bg-white p-4 rounded-md relative w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] 2x:w-[40%]">
                            <Form />
                            <div className="absolute top-4 right-4 cursor-pointer"
                                 onClick={() => setisOpen(false)}>
                                <Image src="/close.png" alt="" width={14} height={14} />
                             </div>
                        </div>
                </div>
            )}
    </>
}

