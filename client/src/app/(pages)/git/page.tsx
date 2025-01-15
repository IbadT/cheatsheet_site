"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;

const GitPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto py-20"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по Git! 🎉🔧
                    </Title>
                </Divider>
            </div>


            Git — это распределенная система управления версиями, которая позволяет эффективно отслеживать изменения в
            коде и сотрудничать с командой. На этом курсе вы изучите основы Git, работу с репозиториями, ветками и
            слияниями.

            Готовы к освоению одного из самых мощных инструментов для разработчиков? Давайте начнем! 🚀
        </div>
    )
}

export default GitPage;