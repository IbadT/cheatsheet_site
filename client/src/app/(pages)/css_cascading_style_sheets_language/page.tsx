"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;

const CssPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по CSS3! 🎉🎨
                    </Title>
                </Divider>
            </div>


            CSS3 — это язык стилизации, который позволяет создавать красивые и отзывчивые веб-страницы. В течение курса
            вы изучите основы CSS3, работу с селекторами, макетами, анимацией и многим другим.

            Готовы создать визуально привлекательные веб-страницы? Давайте начнем! 🚀
        </div>
    )
};

export default CssPage;