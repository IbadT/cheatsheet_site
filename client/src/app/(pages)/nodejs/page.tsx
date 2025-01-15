"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;

const NodeJsPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto py-20"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по Node.js!🎉🌐
                    </Title>
                </Divider>
            </div>


            Node.js— это среда выполнения JavaScript на сервере, которая позволяет создавать высокопроизводительные
            веб-приложения. На этом курсе вы изучите основы Node.js, создание серверных приложений, работу с файлами и
            базами данных.

            Приготовьтесь к созданию мощных серверных приложений с Node.js!🚀
        </div>
    )
};

export default NodeJsPage;