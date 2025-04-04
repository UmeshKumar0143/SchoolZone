import SideBar from "@/components/SideBar";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

export default function  DashBoardlayout({children}:{children:ReactNode}){
    return <div className="h-screen flex ">
            <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] h-full ">
                <Link href={"/"} 
                className="flex justify-start items-center  gap-2 py-2"
                >
                <Image src="/logo.png" width={32} height={32} alt="logo" />
                <span className="hidden lg:block font-bold ">SchoolZone</span>
                </Link>
                <SideBar/>
            </div>
            <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] h-full bg-[#F7F8FA] overflow-scroll">r</div>
        </div>
}