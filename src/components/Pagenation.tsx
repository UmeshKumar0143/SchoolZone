"use client"
import { ITEM_PER_PAGE } from "@/lib/setting";
import { useRouter } from "next/navigation";

export default function Pagination({count, page}: {count:number, page: number}){
    
    const router = useRouter(); 
     
    const hasPrev = ITEM_PER_PAGE*(page-1)>0; 
    const hasNext = ITEM_PER_PAGE*(page-1) + ITEM_PER_PAGE < count; 
    const changePage = (newPage:number) => {
        const params = new URLSearchParams(window.location.search); 
        params.set("params", newPage.toString()); 
        router.push(`${window.location.pathname}?page=${newPage}`); 
    }

    return <div className="p-4 flex justify-between items-center text-gray-500">
        <button onClick={()=>changePage(page-1)}  disabled={!hasPrev} className="py-2 px-4 hover:cursor-pointer bg-slate-200 font-semibold disabled:cursor-not-allowed disabled:opacity-50 text-xs">Prev</button>
        <div className="flex items-center text-sm gap-2">
            {Array.from({length:Math.ceil(count/ITEM_PER_PAGE)}).map((_,index)=>{
                const pageIndex = index+1; 
                return <button onClick={()=>changePage(pageIndex)}  key={index} className={`px-2 rounded-sm ${page==pageIndex?"bg-school-blue": "bg-gray-200"} hover:cursor-pointer`}>{pageIndex}</button>
            }

            )}
        </div>
        <button onClick={()=>changePage(page+1)} disabled={!hasNext}   className="py-2 px-4 bg-slate-200 font-semibold disabled:cursor-not-allowed disabled:opacity-50 text-xs hover:cursor-pointer">Next</button>
    </div>
}