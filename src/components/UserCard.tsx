import prisma from "@/lib/prisma";
import { IoIosMore } from "react-icons/io";

export default async function UserCard({type}:{type: "teacher"| "student"| "parent"}){



    const model_map: Record<string, any> = {
        admin : prisma.admin.count(),
        student : prisma.student.count(),
        teacher : prisma.teacher.count(),
        parent : prisma.parent.count(),
    }

    const data = await model_map[type as keyof typeof model_map];

    return <div className="rounded-2xl odd:bg-school-blue even:bg-school-yellow p-4 flex-1">
        <div className="flex  justify-between items-center">
            <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2024/25</span>
            <IoIosMore width={20} height={20} />
        </div>
        <h1 className="text-2xl my-2 font-semibold ">{data}</h1>
        <h2 className="text-sm capitalize font-medium text-gray-500">{type}s</h2>
    </div>
}