import CodeWrapper from "@/app/widgets/CodeWrapper/ui/CodeWrapper";


const CodeWithText = ({text, code}: {text: string, code: string}) => {
    return (
        <div className={"flex justify-between space-x-5"}>
            <div className={"w-1/2 p-4 border border-solid border-1 rounded-[20px]"} dangerouslySetInnerHTML={{__html: text}}/>
            <CodeWrapper code={code} />
        </div>
    )
}

export default CodeWithText;