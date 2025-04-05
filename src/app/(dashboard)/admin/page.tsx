import UserCard from "@/components/UserCard";

export default function AdminPage(){
    return <div className="flex gap-4 p-4 flex-col md:flex-row rounded-2xl min-w-[130px]">

        <div className="w-full lg:w-2/3   ">

         <div className="flex gap-4 justify-between flex-wrap">
            <UserCard type="student"/>
            <UserCard type="teacher"/>
            <UserCard type="parent"/>
            <UserCard type="staff"/>
         </div>
        </div>
        <div className="w-full lg:w-1/3  ">r</div>
    </div>
}