import {LinkedinOutlined, MailOutlined} from "@ant-design/icons";
import {ReactNode} from "react";
import Link from "next/link";

type TFooterInfo = {
    title: string;
    link: string;
    icons?: TIconLink[];
}

type TIconLink = {
    text: string;
    icon: ReactNode,
    link: string,
}

export const footerInfo: TFooterInfo[] = [
    {
        title: "Вопросы и ответы",
        link: "questions",
        icons: [],
    },
    {
        title: "Условия пользования",
        link: "terms-of-use",
        icons: [],
    },
    {
        title: "Поддержка",
        link: "support",
        icons: [],
    },
    {
        title: "Контакты",
        link: "contacts", // не выставлял page
        icons: [
            {
                text: "LinkedIn",
                icon: <LinkedinOutlined/>,
                link: "linkedin",
            },
            {
                text: "Gmail",
                icon: <MailOutlined/>,
                link: "gmail.com",
        }],
    },
    {
        title: "Подписка на новости",
        link: "subscribe-to-news",
        icons: [],
    },
    {
        title: "О проекте",
        link: "about-project",
        icons: [],
    },
]


export const Footer = () => {
    return (
        // <div className="w-full bg-gray-800 text-white">
        <div className="w-full bg-[#00101E] text-white">
            <div className="container mx-auto p-10">
                <div className="flex flex-wrap justify-between">
                    {footerInfo.map(({ title, link, icons }: TFooterInfo, index: number) => (
                        <div key={index} className="w-full md:w-1/3 lg:w-1/4 p-4">
                            <Link href={link}>
                                {title}
                            </Link>
                            <div className="flex flex-col items-start mt-2 space-y-1">
                                {icons?.map(({ text, icon, link }, iconIndex) => (
                                    <Link className={"flex space-x-1"} href={link} key={iconIndex}>
                                        {icon}
                                        <div>{text}</div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-10">
                    © {new Date().getFullYear()} IbadT Company. All rights reserved.
                </div>
            </div>
        </div>
    );
};
