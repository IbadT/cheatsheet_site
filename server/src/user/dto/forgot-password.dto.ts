import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ForgotPassword {
    @ApiProperty({
        type: String,
        required: true,
        description: "Нужно ввести имя пользователя или email",
        example: "ibadtoff@gmail.com"
    })
    @IsNotEmpty()
    @IsString()
    email_or_username: string
}