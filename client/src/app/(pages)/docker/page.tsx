"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;
import React from "react";

const DockerPage = () => {
    return (
        <div>
            <div className={"container mx-auto py-20"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по Docker и CI/CD! 🎉🐳
                    </Title>
                </Divider>
            </div>


            Docker — это инструмент для контейнеризации приложений, который упрощает развертывание и управление средами. На этом курсе вы изучите основы Docker, создание и управление контейнерами, а также внедрение CI/CD (непрерывная интеграция и доставка) для автоматизации процессов разработки.

            Приготовьтесь к созданию эффективных и надежных сред разработки с Docker и CI/CD! 🚀
        </div>
    )
};

export default DockerPage;