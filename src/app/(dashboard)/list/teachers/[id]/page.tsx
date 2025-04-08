import Announcement from "@/components/Announcement";
import { BigCalendar } from "@/components/BigCalendar";
import FormModal from "@/components/FormModal";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";
import { CiDroplet } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

export default function TeacherInformationPage() {
    return <div className="flex flex-col xl:flex-row flex-1 p-4 gap-4  ">
        <div className="w-full xl:w-2/3 ">
            <div className="flex flex-col  lg:flex-row gap-4">
                <div className="bg-school-blue flex py-6 px-4 flex-1 rounded-md gap-4">
                    <div className="w-1/3 ">
                        <Image
                            src={"https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200"}
                            alt=""
                            width={144}
                            height={144}
                            className="h-36 w-36 rounded-full object-cover"
                        />
                    </div>
                    <div className="w-2/3 flex flex-col justify-between gap-4">
                        <div className="flex  items-center gap-4">
                            <h1 className="text-xl font-semibold">Leonard Synder</h1>
                            <FormModal table="teacher" type="update" data={{
                                id: 1,
                                username: "deanguerrero",
                                email: "deanguerrero@gmail.com",
                                password: "password",
                                firstName: "Dean",
                                lastName: "Guerrero",
                                phone: "+1 234 567 89",
                                address: "1234 Main St, Anytown, USA",
                                bloodType: "A+",
                                dateOfBirth: "2000-01-01",
                                sex: "male",
                                img: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1200",
                  }} />
                        </div>

                            <p className="text-sm text-gray-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis, saepe!</p>
                    
                            <div className="flex justify-between items-center gap-2 flex-wrap text-xs font-medium">
                                <div className=" w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2 ">
                                    <CiDroplet width={14} height={14} />
                                    <span>A+</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2 ">
                                    <SlCalender width={14} height={14} />
                                    <span>January 2025</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2 ">
                                    <MdEmail width={14} height={14} />
                                    <span>user@gmail.com</span>
                                </div>
                                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3  flex items-center gap-2 ">
                                    <FaPhoneAlt width={14} height={14} />
                                    <span>+91 2343 3423</span>
                                </div>
                            </div>
                    </div>

                </div>
                <div className="flex-1 flex gap-4 flex-wrap justify-between">
                    <div className="bg-white  p-4 rounded-md flex gap-4 w-full md:w-[40$] xl:w-[45%] 2xl:w-[48%] ">
                        <Image src={'/singleAttendance.png'}
                            alt=""
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                        <div>
                            <h1 className="text-xl font-semibold">90%</h1>
                            <span className="text-sm text-gray-400">Attendance</span>
                        </div>
                    </div>
                    <div className="bg-white  p-4 rounded-md flex gap-4 w-full md:w-[40$] xl:w-[45%] 2xl:w-[48%] ">
                        <Image src={'/singleBranch.png'}
                            alt=""
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                        <div>
                            <h1 className="text-xl font-semibold">2</h1>
                            <span className="text-sm text-gray-400">Branches</span>
                        </div>
                    </div>
                    <div className="bg-white  p-4 rounded-md flex gap-4 w-full md:w-[40$] xl:w-[45%] 2xl:w-[48%] ">
                        <Image src={'/singleLesson.png'}
                            alt=""
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                        <div>
                            <h1 className="text-xl font-semibold">6</h1>
                            <span className="text-sm text-gray-400">Lessons</span>
                        </div>
                    </div>
                    <div className="bg-white  p-4 rounded-md flex gap-4 w-full md:w-[40$] xl:w-[45%] 2xl:w-[48%] ">
                        <Image src={'/singleClass.png'}
                            alt=""
                            width={24}
                            height={24}
                            className="w-6 h-6"
                        />
                        <div>
                            <h1 className="text-xl font-semibold">6</h1>
                            <span className="text-sm text-gray-400">Classes</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded-md h-[800px]">
                <h1 className="font-semibold text-xl">Teaher&apos;s Schedule</h1>
                <BigCalendar/>
            </div>
        </div>
        <div className="xl:w-1/3 w-full ">
        <div className="bg-white rounded-md p-4">
                <h1 className="font-semibold text-xl">Shortcuts</h1>
                <div className="flex flex-wrap mt-4 gap-4 text-gray-500 text-xs">
                    <Link className="rounded-md p-3 bg-school-blue-light" href={"/"}>Teacher&apos;s Classes</Link>
                    <Link className="rounded-md p-3 bg-school-purple" href={"/"}>Teacher&apos;s Students</Link>
                    <Link className="rounded-md p-3 bg-pink-50" href={"/"}>Teacher&apos;s Lessons</Link>
                    <Link className="rounded-md p-3 bg-school-blue-light" href={"/"}>Teacher&apos;s Exams</Link>
                    <Link className="rounded-md p-3 bg-school-yellow-light" href={"/"}>Teacher&apos;s Assignments</Link>
                </div>
        </div>
        <Performance/>
        <Announcement />
        </div>
    </div>
}