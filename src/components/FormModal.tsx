import Image from "next/image";

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

    return <>
        <button className={`${size} flex justify-center hover:cursor-pointer items-center rounded-full ${bgColor}`}>
            <Image src={`/${type}.png`} alt="" width={16} height={16} /> 
        </button>
    </>
}