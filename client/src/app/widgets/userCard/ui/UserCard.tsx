"use client"
import userList, {TUser} from "@/helpers/usersList/userList";
import {Avatar, Button, message, Space} from 'antd';
import {UserOutlined} from "@ant-design/icons";

function UserCard({ user }: {user: TUser}) {
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Запрос в друзья отправлен',
        });
    };

    return (
        <div className="bg-white border w-1/2 border-gray-300 rounded-lg p-6 m-4 shadow-lg transform transition-transform hover:scale-105 text-center">
            {/*<img src={user.avatar} alt={user.name} className={"w-24 h-24 rounded-full mx-auto"} />*/}
            <Avatar size={64} icon={<UserOutlined />} />
            <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
            <p className="text-gray-700 mb-1">Email: {user.email}</p>
            <p className="text-gray-700 mb-1">Роль: {user.role}</p>
            {/*<p className="text-gray-700 mb-1">Рейтинг: {user.rating}</p>*/}
            <p>Рейтинг: {user.rating}<Rating value={user.rating}/></p>
            <p className="text-gray-700 mb-1">Описание: {user.bio}</p>
            <p className="text-gray-700 mb-4">Друзья: {user.friends.join(', ')}</p>
            {contextHolder}
            <Button size={"large"} type={"primary"} onClick={success}>Добавить в друзья</Button>
        </div>
    );
}

function UserList() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Список пользователей</h1>
            <div className="flex flex-wrap justify-around">
                {userList.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}





function Rating({ value }: {value: number}) {
    const fullStars = Math.floor(value);
    const halfStar = value % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className="flex items-center">
            {[...Array(fullStars)].map((_, index) => (
                <svg key={index} className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.978 5.262.042c.973.008 1.374 1.251.588 1.818l-4.204 3.073 1.573 4.943c.285.895-.755 1.637-1.54 1.13l-4.405-3.106-4.404 3.106c-.785.507-1.825-.234-1.54-1.13l1.573-4.943-4.204-3.073c-.786-.567-.385-1.81.588-1.818l5.262-.042 1.618-4.978z" />
                </svg>
            ))}
            {halfStar && (
                <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <defs>
                        <linearGradient id="half">
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="50%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    <path fill="url(#half)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.978 5.262.042c.973.008 1.374 1.251.588 1.818l-4.204 3.073 1.573 4.943c.285.895-.755 1.637-1.54 1.13l-4.405-3.106-4.404 3.106c-.785.507-1.825-.234-1.54-1.13l1.573-4.943-4.204-3.073c-.786-.567-.385-1.81.588-1.818l5.262-.042 1.618-4.978z" />
                </svg>
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <svg key={index} className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.618 4.978 5.262.042c.973.008 1.374 1.251.588 1.818l-4.204 3.073 1.573 4.943c.285.895-.755 1.637-1.54 1.13l-4.405-3.106-4.404 3.106c-.785.507-1.825-.234-1.54-1.13l1.573-4.943-4.204-3.073c-.786-.567-.385-1.81.588-1.818l5.262-.042 1.618-4.978z" />
                </svg>
            ))}
        </div>
    );
}

// export default Rating;
export default UserList;