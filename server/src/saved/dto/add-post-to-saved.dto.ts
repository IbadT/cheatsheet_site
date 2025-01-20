import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class AddPostToSavedDto {
    @ApiProperty({
        type: String,
        required: true,
        description: "ID пользователя, который сохранил пост",
        example: "20ec594c-bd84-43d9-9b78-36b52883a4e7"
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    user_id: string

    @ApiProperty({
        type: String,
        required: true,
        description: "ID поста, который пользователь сохранил",
        example: "e698ec86-d2a5-4c1f-8450-14cdacac4113",
    })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    post_id: string
}
