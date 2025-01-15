"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;

export const TypeScriptPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto py-20"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по TypeScript! 🎉📝
                    </Title>
                </Divider>
            </div>


            TypeScript — это надстройка над JavaScript, которая добавляет статическую типизацию и улучшает разработку
            крупных приложений. На этом курсе вы изучите основы TypeScript, работу с типами, интерфейсами и создание
            масштабируемых приложений.

            Приготовьтесь к повышению уровня своих навыков программирования с TypeScript! 🚀
        </div>
    )
}

export default TypeScriptPage;