import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePostDto {
    @ApiProperty({
        type: String,
        example: "Первый пост",
        description: "Заголовок поста"
    })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({
        type: String,
        example: "Текст поста",
        description: ""
    })
    @IsNotEmpty()
    @IsString()
    text: string


}