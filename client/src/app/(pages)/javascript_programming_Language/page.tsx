"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;

const JavaScriptPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto py-20"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по JavaScript! 🎉📱
                    </Title>
                </Divider>
            </div>


            JavaScript — это язык, который оживляет веб-страницы и делает их интерактивными. В течение курса вы изучите
            основы JavaScript, работу с DOM, создание динамических веб-приложений и многое другое. Вы научитесь
            создавать интерактивные интерфейсы и улучшать пользовательский опыт.

            Готовы к погружению в мир JavaScript? Давайте начнем! 🚀
        </div>
    )
}

export default JavaScriptPage;