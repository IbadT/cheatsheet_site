"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;

const RedisPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto py-20"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по Redis! 🎉🔴
                    </Title>
                </Divider>
            </div>


            Redis — это база данных в памяти, которая используется для кэширования и быстрой обработки данных. На этом
            курсе вы изучите основы Redis, работу с ключами и значениями, настройку и оптимизацию производительности.

            Готовы к изучению высокопроизводительной базы данных? Давайте начнем! 🚀
        </div>
    )
}

export default RedisPage;