import { CgMore } from "react-icons/cg";

export default function Announcement(){
    return <div className="rounded-md bg-white p-4 ">
            <div className="flex items-center justify-between">
                <h1 className="text-gray-600 font-semibold text-xl">Announcements</h1>
                <span className="text-xs text-gray-400">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-5 ">
                <div className="bg-school-blue-light p-4 rounded-md">
                    <div className="flex items-center justify-between">
                            <h1 className="font-medium ">Lorem ipsum dolor sit.</h1>
                            <span className="text-xs text-gray-400 bg-white rounded-md  px-1 py-1">2025-01-05</span>
                    </div>
                    <p className=" text-sm text-gray-400 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem aliquam nostrum debitis..</p>
                </div>
                <div className="bg-school-yellow-light p-4 rounded-md">
                    <div className="flex items-center justify-between">
                            <h1 className="font-medium ">Lorem ipsum dolor sit.</h1>
                            <span className="text-xs text-gray-400 bg-white rounded-md  px-1 py-1">2025-01-05</span>
                    </div>
                    <p className=" text-sm text-gray-400 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem aliquam nostrum debitis..</p>
                </div>
                <div className="bg-school-purple-Light p-4 rounded-md">
                    <div className="flex items-center justify-between">
                            <h1 className="font-medium ">Lorem ipsum dolor sit.</h1>
                            <span className="text-xs text-gray-400 bg-white rounded-md  px-1 py-1">2025-01-05</span>
                    </div>
                    <p className=" text-sm text-gray-400 mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem aliquam nostrum debitis..</p>
                </div>
            </div>
    </div>

}