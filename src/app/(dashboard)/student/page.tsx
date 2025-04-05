import Announcement from "@/components/Announcement";
import { BigCalendar } from "@/components/BigCalendar";
import EventCalander from "@/components/EventCalendar";

export default function StudentPage(){
    return <div className="p-4 flex gap-4 flex-col xl:flex-row ">
            <div className="w-full xl:w-2/3">
            <div className="h-full bg-white p-4 rounded-md">
                <h1 className="text-xl font-semibold ">Schedule (4A)</h1>
                <BigCalendar />
            </div>
            </div>
            <div className="w-full xl:w-1/3">
            <EventCalander/>
            <Announcement/>
            </div>
    </div>
}