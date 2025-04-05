export default function Pagination(){
    return <div className="p-4 flex justify-between items-center text-gray-500">
        <button disabled className="py-2 px-4 bg-slate-200 font-semibold disabled:cursor-not-allowed disabled:opacity-50 text-xs">Prev</button>
        <div className="flex items-center text-sm gap-2">
            <button className="px-2 rounded-sm bg-school-blue hover:cursor-pointer">1</button>
            <button className="px-2 rounded-sm ">2</button>
            <button className="px-2 rounded-sm ">3</button>
            ...
            <button className="px-2 rounded-sm ">10</button>
        </div>
        <button  className="py-2 px-4 bg-slate-200 font-semibold disabled:cursor-not-allowed disabled:opacity-50 text-xs hover:cursor-pointer">Next</button>
    </div>
}