"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;

const GolangPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto py-20"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по программированию на Go! 🎉⚙️
                    </Title>
                </Divider>
            </div>


            Go — это язык программирования, разработанный для создания высокопроизводительных и надежных приложений. На
            этом курсе вы изучите основы Go, работу с горутинами, создание веб-серверов и многое другое.

            Вас ждет увлекательное путешествие в мир Go! 🚀
        </div>
    )
}

export default GolangPage;