"use client"
import { Typography, Divider } from 'antd';
const { Title } = Typography;

const HtmlPage = () => {
    return (
        <div className={"w-full"}>
            <div className={"container mx-auto py-20"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать на курс по HTML5! 🎉🌐
                    </Title>
                </Divider>
            </div>


            HTML5 — это основа веб-разработки. На этом курсе вы изучите основы HTML5, создание семантически правильных и
            доступных веб-страниц, а также работу с мультимедийными элементами и формами.

            Приготовьтесь к созданию красивых и функциональных веб-страниц! 🚀
        </div>
    )
}

export default HtmlPage;