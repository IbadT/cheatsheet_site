"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;

const NestJsPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto py-20"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по Nest.js!🎉🛡️
                    </Title>
                </Divider>
            </div>


            Nest.js— это фреймворк для создания серверных приложений на Node.js, вдохновленный Angular. На этом курсе вы
            изучите основы Nest.js, создание REST API, работу с базами данных и многое другое.

            Приготовьтесь к созданию мощных серверных приложений с Nest.js!🚀
        </div>
    )
}

export default NestJsPage;