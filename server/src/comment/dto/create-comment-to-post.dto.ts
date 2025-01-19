import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateCommentToPostDto {
    @ApiProperty({
        type: String,
        required: true, 
        description: "Текст комментария",
        example: "Первый комментарий к посту"
    })
    @IsNotEmpty()
    @IsString()
    text: string;

    @ApiProperty({
        type: String,
        required: true,
        description: "ID пользователя, который оставил комментария",
        example: "20ec594c-bd84-43d9-9b78-36b52883a4e7"
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    user_id: string

    @ApiProperty({
        type: String,
        required: true,
        description: "ID посту, которому ставится комментарий",
        example: "be358101-032a-4f16-9b2d-7a7e92aaac86"
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    post_id: string
}
