"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;

const MongoDbPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto py-20"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по MongoDB! 🎉🍃
                    </Title>
                </Divider>
            </div>


            MongoDB — это популярная NoSQL база данных, которая позволяет эффективно хранить и управлять данными. На
            этом курсе вы изучите основы MongoDB, работу с коллекциями и документами, а также создание масштабируемых
            приложений.

            Приготовьтесь к погружению в мир MongoDB и откройте для себя его возможности! 🚀
        </div>
    )
}

export default MongoDbPage;