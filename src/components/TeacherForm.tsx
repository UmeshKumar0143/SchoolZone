"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {z} from "zod"
import InputField from "./InputField"
import Image from "next/image"

const schema = z.object({
    username: z.string().min(3,{message:"Username must be 3 characters long!"}).max(20, {message:"User name can contain at most 20 characters!"}), 
    email: z.string().email({message:"Email is Required"}), 
    password: z.string().min(8, {message:"Password must be 8 characters long!"}), 
    firstname: z.string().min(1, {message:"First name is Required"}), 
    lastname: z.string().min(1, {message:"Last name is Required"}), 
    phone: z.number().min(8, {message:"Phone  number is Required"}),
    address: z.string().min(1, {message:"Address is required"}), 
    birthday: z.date(({message: "Date of birth is required"})), 
    bloodType: z.string().min(1, {message: "Blood Type is required"}), 
    sex: z.enum(["male", "female"],{message:"Gender is required"}), 
    img: z.instanceof(File, {message: "Image is required"}) 

})

type Inputs = z.infer<typeof schema>;
 



export default function TeacherForm({type, data}:{type:"update"| "create", data?: any}){

const {register, handleSubmit, formState: {errors}} = useForm<Inputs>({resolver: zodResolver(schema)}); 

   const SubmitForm = handleSubmit(data=> console.log(data)) ; 

    return <form action="" onSubmit={SubmitForm} className="flex flex-col gap-8  p-4">
        <h1 className="text-xl font-semibold">Create a new teacher</h1>
        <span className="text-xs text-gray-400 font-medium">Authentication Information</span>
        <div className="flex  flex-wrap justify-between">
        <InputField type="text" name="username" defaultValue={data?.username} register={register} error={errors?.username} label="Username"  />
        <InputField type="email" name="email" defaultValue={data?.email}  register={register} error={errors?.email} label="Email"  />
        <InputField type="password" name="password" defaultValue={data?.password}  register={register} error={errors?.password} label="Password"  />
        </div>
        <span className="text-xs text-gray-400 font-medium">Personal Information</span>
        <div className="flex flex-wrap  justify-between gap-4">
        <InputField type="text" name="firstname" defaultValue={data?.firstname} register={register} error={errors?.firstname} label="First Name"  />
        <InputField type="text" name="lastname" defaultValue={data?.lastname}  register={register} error={errors?.lastname} label="Last Name"  />
        <InputField type="text" name="phone" defaultValue={data?.phone} register={register} error={errors?.phone} label="Phone"  />
        <InputField type="text" name="address" defaultValue={data?.address}  register={register} error={errors?.address} label="Address"  />
        <InputField type="text" name="bloodType" defaultValue={data?.bloodType} register={register} error={errors?.bloodType} label="Blood Type"  />
        <InputField type="date" name="birthday" defaultValue={data?.birthday} register={register} error={errors?.birthday} label="Date of Birth"  />
        <div className="flex flex-col gap-2 w-full md:w-1/4">

        <label htmlFor="gender" className="text-xs text-gray-400">Gender</label>
        <select id="gender" className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full ">
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
        </select>
        {errors.sex?.message  && <p className="text-sm text-red-400">{errors.sex.message.toString()}</p>}
        </div>
        <div className="flex flex-col gap-2 w-full md:w-1/4 justify-center">
        <label htmlFor="upload" className="text-xs text-gray-400 flex items-center gap-2 cursor-pointer">
            <Image src={'/upload.png'} alt="upload" width={28} height={28} />
            Upload a photo </label>
        <input id="upload" type="file" {...register("img")} className="hidden" />
        {errors.img?.message  && <p className="text-sm text-red-400">{errors.img.message.toString()}</p>}
        </div>
    </div>
        <button  className="bg-blue-400 text-white p-2 font-medium rounded-md">{type=="create"?"Create": "Update"}</button>
    </form>
}