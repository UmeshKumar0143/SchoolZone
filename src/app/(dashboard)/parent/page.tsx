import Announcement from "@/components/Announcement";
import { BigCalendar } from "@/components/BigCalendar";
import EventCalander from "@/components/EventCalendar";

export default function ParentPage(){
    return <div className="p-4 flex gap-4 flex-col xl:flex-row flex-1 ">
            <div className="w-full xl:w-2/3">
            <div className="h-full bg-white p-4 rounded-md">
                <h1 className="text-xl font-semibold ">Schedule (Jhon Doe)</h1>
                <BigCalendar />
            </div>
            </div>
            <div className="w-full xl:w-1/3 ">
            <Announcement/>
            </div>
    </div>
}