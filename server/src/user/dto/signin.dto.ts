import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";

export class SignInDto {
    @ApiProperty({
        type: String,
        required: true,
        example: "ibadtoff@gmail.com",
        description: 'Email',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'ibadt',
        description: 'Имя пользователя',
    })
    @IsNotEmpty()
    @IsString()
    user_name: string;

    @ApiProperty({
        type: String,
        required: true,
        example: 'gts530200',
        description: 'Пароль',
    })
    // @IsStrongPassword()
    @IsString()
    @IsNotEmpty()
    password: string;
}