"use client"
import { Typography, Divider } from 'antd';
import DrawerLanguageWrapper from "@/app/widgets/CodeWrapper/ui/DrawerLanguageWrapper";
import {sshDrawerList} from "@/helpers/drawerLists/sshDrawerList";
const { Title } = Typography;

const CshPage = () => {
    return (
        <div className={"w-full pt-2"}>


            <div className={"p-5 mx-auto flex space-x-5"}>

                <DrawerLanguageWrapper drawerList={sshDrawerList} />

                <div className={"w-3/4"}>
                    <Divider plain>
                        <Title>
                            Добро пожаловать на курс по программированию на C#! 🎉💻
                        </Title>
                    </Divider>
                </div>

            </div>


            C# — это язык, который сочетает в себе мощь и простоту. На этом курсе мы изучим основные концепции C#,
            создание современных приложений, а также познакомимся с платформой .NET. Вы будете разрабатывать как
            консольные, так и веб-приложения, используя все возможности этого языка.

            Приготовьтесь к увлекательному обучению и новым знаниям! 🚀
        </div>
    )
};

export default CshPage;