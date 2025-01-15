import { ProgramCard } from "@/app/widgets/ProgramCardBlock/ui/ProgramCard";
import {cheatsheetsArray} from "@/helpers/cheatsheetsArray";


export const ProgramCardBlock = () => {
    return (
        <div className={"w-full"}>
            <div className={"container m-auto"}>
                <div className={"flex flex-wrap p-10"}>
                    {
                        cheatsheetsArray.map(({ img, title, description, link }, index) => (
                            <div key={index} className={"w-full md:w-1/3 p-4 flex justify-center"}>
                                <ProgramCard img={img} title={title} description={description} link={link}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}