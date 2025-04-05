import { IoIosMore } from "react-icons/io";

export default function UserCard({type}:{type:string}){
    return <div className="rounded-2xl odd:bg-school-blue even:bg-school-yellow p-4 flex-1">
        <div className="flex  justify-between items-center">
            <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">2024/25</span>
            <IoIosMore width={20} height={20} />
        </div>
        <h1 className="text-2xl my-2 font-semibold ">1,234</h1>
        <h2 className="text-sm capitalize font-medium text-gray-500">{type}</h2>
    </div>
}