"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;

const NextjsPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto py-20"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по Next.js!🎉📦
                    </Title>
                </Divider>
            </div>


            Next.js— это фреймворк для создания серверных рендеринг-приложений на React. На этом курсе вы изучите основы
            Next.js, создание статических и динамических страниц, маршрутизацию, и многое другое.

            Приготовьтесь к созданию мощных веб-приложений с Next.js!🚀
        </div>
    )
}

export default NextjsPage;