import { Typography } from 'antd';
const { Text } = Typography;


const CodeWrapper = ({ code }: { code: string }) => {
    return (
        // <div className="relative bg-gray-800 text-white p-4 rounded-md">
        // <div className="relative bg-[#4169E1] text-white p-4 rounded-md">
        <div className="bg-[#2E659A] text-white p-4 rounded-xl flex justify-between items-start w-1/2">
            <div>
                <pre className="overflow-auto h-auto text-[10px]">
                    <code>
                      {code}
                    </code>
                </pre>
            </div>
            <div>
                <Text copyable={{ text: code }}/>
            </div>
        </div>
    );
};

export default CodeWrapper;
