"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;

const SqlPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto py-20"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по SQL! 🎉🗄️
                    </Title>
                </Divider>
            </div>


            SQL (Structured Query Language) — это язык запросов, используемый для управления и манипуляции данными в
            реляционных базах данных. На этом курсе вы изучите основы SQL, создание запросов, управление базами данных и
            оптимизацию запросов.

            Готовы начать изучение языка, который лежит в основе работы с данными? Давайте приступим! 🚀
        </div>
    )
}

export default SqlPage;