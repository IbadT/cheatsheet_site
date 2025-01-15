import Link from "next/link";
import { Switch } from 'antd';

const navbarInfo = [
    // {
    //     title: "",
    //     link: "",
    // },
    {
        title: "Профиль",
        link: "profile",
    },
    {
        title: "Главная",
        link: "/",
    },
    {
        title: "Блог",
        link: "blog",
    },
    {
        title: "Форум",
        link: "forum",
    },
    {
        title: "Контакты",
        link: "contact",
    },
    {
        title: "О нас",
        link: "about-us",
    }
]

export const Navbar = () => {
    return (
        // <div className={"w-full h-[50px] bg-gray-800"}>
        <div className={"w-full h-[50px] bg-[#00101E]"}>
            <div className={"container h-full mx-auto"}>
                <div className={"h-full flex justify-between items-center"}>

                    <Link href={"/"} className={"w-[10%] bg-red-600 hover:cursor-pointer text-center"}>
                        IbadT
                    </Link>

                    <div className={"flex justify-around w-[80%] lg:w-1/2 ml-auto text-gray-400"}>
                        <Switch defaultChecked/>
                        {navbarInfo.map(({title, link}, index) => (
                            <Link href={link}
                                key={index}
                            >
                                <div className={"relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white after:scale-x-0 after:transition-transform after:duration-500 hover:after:scale-x-100 hover:cursor-pointer hover:text-white transform transition-all duration-300"}>
                                    {title}
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </div>
    )
};