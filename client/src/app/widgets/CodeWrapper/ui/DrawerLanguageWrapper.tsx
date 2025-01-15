import {pythonDrawerList} from "@/helpers/drawerLists/pythonDrawerList";
import Link from "next/link";

type DrawerListProps = {
    id: number;
    title: string;
    link: string;
    isHead: boolean;
    passed: boolean
}

const DrawerLanguageWrapper = ({drawerList}: { drawerList: DrawerListProps[]}) => {
    return (
        <div className={"h-[800px] border border-1 border-gray-500 p-3 text-sm w-1/4 overflow-y-auto rounded-l-xl"}>
            <div className={"flex h-auto flex-col space-y-2"}>
                {drawerList.map(({id, title, link, isHead, passed}) => (
                        <Link
                            className={`p-5 bg-gray-100 border border-gray-500 rounded-xl ${ 
                                isHead 
                                    ? "text-black font-bold cursor-auto bg-gray-100 hover:text-black focus:outline-none" 
                                    : "flex justify-between text-gray-400 hover:bg-blue-500 transition-colors duration-300 hover:text-white" 
                            }`}
                            href={link}
                            key={id}
                        >
                            <div>
                                {title}
                            </div>
                            {!isHead && (
                                <div className={`my-auto w-2 h-2 rounded-full ${
                                    passed
                                        ? "bg-green-500" 
                                        : "bg-red-600"
                                }`}></div>
                            )}
                        </Link>
                ))}
            </div>
        </div>
)
};

export default DrawerLanguageWrapper;