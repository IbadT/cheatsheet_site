"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;

const ExpressJsPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto py-20"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по Express.js!🎉🚀
                    </Title>
                </Divider>
            </div>


            Express.js— это минималистичный фреймворк для создания веб-приложений на Node.js.На этом курсе вы изучите
            основы Express.js, создание маршрутов, работу с middleware и разработку API.

            Готовы к созданию быстрых и легких веб-приложений с Express.js?Давайте начнем! 🚀
        </div>
    )
}

export default ExpressJsPage;