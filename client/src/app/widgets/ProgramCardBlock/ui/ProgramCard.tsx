import { Card } from 'antd';
import Link from "next/link";

const { Meta } = Card;

// поменять цвет на серый
// при наведении пропадает border

export const ProgramCard = ({img, title, description, link}: {img: string, title: string, description: string, link: string}) => {
    return (
        <Link
            className={"transform transition-transform duration-300 hover:scale-105 overflow-hidden"}
            href={link}
        >
            <Card
                hoverable
                style={{ width: 200, height: 400 }}
                // cover={<img className={"h-[200px] object-cover hover:border-2 transition-transform duration-300 hover:scale-105"} alt={title} src={img} />}
                cover={<img className={"h-[200px] "} alt={title} src={img} />}
            >
                {/*<Meta className={"text-[8px] transition-transform duration-300 hover:text-[9px]"} title={title} description={description} />*/}
                <Meta className={"text-[8px]"} title={title} description={description} />
            </Card>
        </Link>
    )
};