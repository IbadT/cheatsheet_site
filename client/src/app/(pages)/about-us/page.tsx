"use client"
import {Typography, Divider, List} from 'antd';
const { Title } = Typography;


const dataLanguages = [
    "Python – простота и мощь, идеален для начинающих и профессионалов.",
    "JavaScript – язык, оживляющий веб-страницы и делающий их интерактивными.",
    "C++ – язык, который позволяет решать задачи высокой производительности.",
    "C# – идеален для разработки на платформе .NET.",
    "Go – язык, созданный для высокопроизводительных и масштабируемых приложений.",
    "SQL – язык запросов к базам данных.",
    "HTML5 и CSS3 – основа веб-разработки.",
    "TypeScript – надстройка над JavaScript для крупных проектов.",
    "Node.js – серверная платформа для выполнения JavaScript.",
    "React.js, Next.js – библиотеки и фреймворки для создания современных веб-приложений.",
    "Docker и Kubernetes – инструменты для контейнеризации и оркестрации приложений.",
]

const dataWhySelectUs = [
    "Качество обучения: Мы уделяем большое внимание качеству наших курсов. Каждый урок тщательно прорабатывается, чтобы вы получили максимальную пользу.",
    "Доступность: Наши курсы доступны 24/7, вы можете учиться в удобное для вас время и в вашем темпе.",
    "Поддержка и сообщество: Мы создали дружелюбное и активное сообщество, где вы можете общаться с другими учащимися, делиться опытом и получать помощь.",
    "Практические задания: Мы верим, что лучший способ научиться – это практика. Поэтому наши курсы насыщены практическими заданиями и проектами.",
    "Актуальность: Мы следим за последними трендами и обновляем наши курсы, чтобы вы всегда были в курсе новинок в мире программирования.",
]

const AboutUsPage = () => {
    return (
        <div className={"w-full py-20"}>
            <div className={"container mx-auto"}>
                <Divider plain>
                    <Title>
                        Добро пожаловать в наш мир программирования!
                    </Title>
                </Divider>

                <div>
                    Мы рады приветствовать вас на нашем сайте, который посвящен обучению программированию
                    всех языков! Наш
                    проект создан для того, чтобы сделать процесс обучения доступным, интересным и
                    увлекательным для всех,
                    независимо от вашего уровня подготовки. Независимо от того, новичок ли вы в мире кода
                    или опытный
                    программист, у нас найдется что-то полезное для каждого.
                </div>

                <Title level={2}>Наша миссия</Title>

                <div>
                    Наша миссия – помочь вам стать успешными программистами, открыть для себя новые
                    горизонты и реализовать свои
                    мечты. Мы верим, что программирование – это искусство, и каждый может научиться этому
                    искусству, если у него
                    есть желание и мотивация. Наша цель – создать для вас комфортные и продуктивные условия
                    для обучения,
                    предоставляя качественные и актуальные материалы, а также поддержку на каждом этапе
                    вашего пути.
                </div>


                <Title level={2}>Наши курсы</Title>

                <div className={"my-5"}>
                    <List
                        header={<Title level={3}>Мы предлагаем широкий спектр курсов по самым разным языкам
                            программирования:</Title>}
                        bordered
                        dataSource={dataLanguages}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography.Text mark>✅</Typography.Text> {item}
                            </List.Item>
                        )}
                    />
                </div>


                <div>
                    И это далеко не весь список! Мы постоянно обновляем и расширяем наш каталог курсов, чтобы вы
                    всегда имели
                    доступ к самым последним и актуальным знаниям.
                </div>

                <Title level={2}>Наши преподаватели</Title>

                <div>
                    Наша команда состоит из опытных преподавателей, которые являются настоящими профессионалами в
                    своих
                    областях. Каждый из них имеет многолетний опыт работы в индустрии и преподавания. Наши
                    преподаватели не
                    просто делятся теоретическими знаниями, но и привносят практический опыт, реальные кейсы и
                    вдохновение. Они
                    всегда готовы помочь, ответить на ваши вопросы и поддержать в сложных моментах.
                </div>


                <Title level={2}>Почему выбирают нас?</Title>


                <div className={"my-5"}>
                    <List
                        // header={<Title level={3}></Title>}
                        bordered
                        dataSource={dataWhySelectUs}
                        renderItem={(item) => (
                            <List.Item>
                                <Typography.Text mark>✅</Typography.Text> {item}
                            </List.Item>
                        )}
                    />
                </div>


                <Title level={2}>Наша история</Title>
                <div>
                    Наш проект родился из желания сделать мир программирования доступным для всех. Мы начали с
                    небольшого блога,
                    где делились своими знаниями и опытом. Постепенно наш проект вырос, привлекая все больше людей,
                    интересующихся программированием. Мы поняли, что можем помочь еще большему количеству людей и
                    решили создать
                    платформу для обучения. С тех пор мы постоянно растем и развиваемся, добавляя новые курсы,
                    улучшая материалы
                    и технологии.
                </div>

                <Title level={2}>Наши достижения</Title>
                <div>
                    Мы гордимся тем, что за время нашей работы мы помогли тысячам студентов достичь своих целей.
                    Многие из наших
                    выпускников нашли работу в престижных IT-компаниях, начали свои проекты или продолжили обучение
                    на более
                    высоких уровнях. Наши курсы получили высокие оценки и отзывы от студентов по всему миру.
                </div>

                <Title level={2}>Присоединяйтесь к нам!</Title>
                <div>
                    Мы приглашаем вас присоединиться к нашему сообществу и начать свое путешествие в мир
                    программирования.
                    Независимо от вашего уровня подготовки, у нас найдется курс, который поможет вам достичь новых
                    высот. Мы
                    уверены, что вместе мы сможем достичь больших успехов!
                </div>

                <div>
                    Если у вас есть вопросы или вам нужна помощь, не стесняйтесь обращаться к нам. Мы всегда рады
                    помочь и
                    поддержать вас на вашем пути к знаниям.
                </div>

                <Title level={3}>Добро пожаловать в наш мир программирования! Давайте творить будущее вместе! 🚀😊</Title>
            </div>
        </div>
    )
};

export default AboutUsPage;