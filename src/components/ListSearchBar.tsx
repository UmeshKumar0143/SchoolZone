import { CiSearch } from "react-icons/ci";

export default function ListSearchBar(){
    return <div className="bg-white w-full md:w-auto  flex  items-center gap-2 ring-[1.5px] ring-gray-300 px-2 rounded-full text-xs  ">
                    <CiSearch  width={14} height={14}/>
        <input type="text" placeholder="Search..." className="bg-transparent w-[200px] outline-none p-2" />
    </div>
}