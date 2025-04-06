import { ReactNode } from "react";

export default function Table({columns, renderRow, data}: {columns: {header: String, accessor: string , classname?: string}[]; renderRow: (item:any)=>ReactNode; data: any[]}){
    return <table className="w-full mt-4"
    >
        <thead>
            <tr>
                {columns.map((cols,index)=><th className={cols.classname} key={index}>{cols.header}</th>)}
            </tr>
        </thead>
        <tbody> {data.map((item)=> renderRow(item))} </tbody>
    </table>
}