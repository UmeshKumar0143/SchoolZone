import { FieldError } from "react-hook-form"

type Input =  {
    label: string;  
    type?: string; 
    error?: FieldError; 
    register: any; 
    name: string; 
    defaultValue?: string;
    InputProps? : React.InputHTMLAttributes<HTMLInputElement>; 
}

export default function InputField({label,type="text",error,name,defaultValue,register,InputProps}:Input){
     return  <div className="flex flex-col gap-2 w-full md:w-1/4">
        <label htmlFor={name} className="text-xs text-gray-400">{label}</label>
        <input {...register(name)} id={name} type={type} placeholder={defaultValue} className="ring-[1.5px]  ring-gray-300 p-2 rounded-md text-sm" {...InputProps} />
        {error?.message  && <p className="text-sm text-red-400">{error.message.toString()}</p>}
        </div>
}