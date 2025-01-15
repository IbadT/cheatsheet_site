"use client"
import { Typography, Divider, List } from 'antd';
import CodeWithText from "@/app/widgets/CodeWrapper/ui/CodeWithText";
import {pythonDrawerList} from "@/helpers/drawerLists/pythonDrawerList";
import DrawerLanguageWrapper from "@/app/widgets/CodeWrapper/ui/DrawerLanguageWrapper";
import UserList from "@/app/widgets/userCard/ui/UserCard";


const { Title } = Typography;

const data = [
    "📱 Создание Telegram-ботов: Вы научитесь создавать интерактивных ботов, которые смогут автоматизировать задачи и общаться с пользователями.",
    "🔍 Разработка парсеров: Мы будем разрабатывать инструменты для сбора и анализа данных с веб-сайтов, что позволит вам работать с большими объемами информации.",
    "🌐 Веб-разработка: Познакомьтесь с мощью Django и FastAPI, создавая полноценные веб-приложения и API.",
]

const code = `import time

def timer(func):
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Время выполнения: {end_time - start_time} секунд")
        return result
    return wrapper
`;

const PythonPage = () => {
    return (
        <div className={"w-full pt-2"}>
            <div className={"p-5 mx-auto flex space-x-5"}>
                {/*<Skeleton active/>*/}

                <DrawerLanguageWrapper drawerList={pythonDrawerList}/>

                <div className={"w-3/4"}>
                    <UserList />

                    <CodeWithText code={code} text={"<div>какое-то описание</div>"}/>

                    <Divider plain>
                        <Title>
                            Добро пожаловать на курс Python разработки! 🎉🐍
                        </Title>
                    </Divider>

                    <div>
                        <p>Мы рады видеть вас среди участников нашего захватывающего путешествия в мир программирования на Python! В ближайшие недели мы вместе будем погружаться в разработку Telegram-ботов, создавать мощные парсеры данных, а также строить современные веб-сайты с использованием Django и FastAPI.</p>

                        <div className={"my-5"}>
                            <List
                                header={<Title level={3}>Вот что вас ждет:</Title>}
                                bordered
                                dataSource={data}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Typography.Text mark>✅</Typography.Text> {item}
                                    </List.Item>
                                )}
                            />
                        </div>

                        <p>Наш курс создан для того, чтобы вы получили практические навыки и уверенность в своих силах. Независимо от того, новичок вы в программировании или уже имеете опыт, мы уверены, что вы найдете для себя что-то новое и полезное.</p>

                        <p>Готовы начать это увлекательное путешествие? Давайте приступим! 🚀</p>

                        <p>Если у вас возникнут вопросы или потребуется помощь, наша команда всегда готова поддержать вас. Желаем вам успехов и увлекательного обучения!</p>

                        <Title className={"mt-2"} level={3}>С уважением, Ваша команда преподавателей Python курса</Title>

                    </div>
                </div>

            </div>
        </div>
    )
}

export default PythonPage;