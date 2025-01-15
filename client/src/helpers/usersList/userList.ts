export type TUser = {
    id: number;
    name: string;
    email: string;
    role: string;
    rating: number;
    friends: string[];
    bio: string;
    avatar: string;
}

const users: TUser[] = [
    {
        id: 1,
        name: "Иван Иванов",
        email: "ivan.ivanov@example.com",
        role: "Администратор",
        rating: 4.8,
        friends: ["Мария Петрова", "Алексей Сидоров"],
        bio: "Программист с 10-летним стажем, специализируюсь на веб-разработке.",
        avatar: "react-logo.png"
    },
    {
        id: 2,
        name: "Мария Петрова",
        email: "maria.petrova@example.com",
        role: "Пользователь",
        rating: 4.2,
        friends: ["Иван Иванов"],
        bio: "Люблю создавать новые проекты и делиться знаниями с другими.",
        avatar: "react-logo.png"
    },
    {
        id: 3,
        name: "Алексей Сидоров",
        email: "alexey.sidorov@example.com",
        role: "Модератор",
        rating: 4.5,
        friends: ["Иван Иванов"],
        bio: "Интересуюсь искусственным интеллектом и машинным обучением.",
        avatar: "react-logo.png"
    }
];

export default users;
