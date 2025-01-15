"use client"
import { Typography, Divider, List, Skeleton } from 'antd';
import React, { useEffect } from "react";
const { Title, Text } = Typography;

const ReactPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto py-20"}>
                <div className={"flex justify-center"}>
                    <img
                        src="/react-logo.png"
                        className={"animate-[spin_10s_linear_infinite]"}
                        alt=""
                    />
                </div>

                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по React.js!🎉⚛️
                    </Title>
                </Divider>

                React.js— это библиотека для создания пользовательских интерфейсов. На этом курсе вы изучите основы React.js, создание компонентов, управление состоянием и разработку динамических веб-приложений.

                Готовы к разработке современных веб-интерфейсов с React.js?
                <Title level={3}>Давайте начнем! 🚀</Title>
            </div>
        </div>
    )
}

export default ReactPage;