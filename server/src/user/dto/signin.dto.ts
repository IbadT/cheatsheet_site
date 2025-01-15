import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString, IsStrongPassword} from "class-validator";

export class SignInDto {
    @ApiProperty({
        type: String,
        required: true,
        description: 'Email',
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'username',
    })
    @IsNotEmpty()
    @IsString()
    user_name: string;

    @ApiProperty({
        type: String,
        required: true,
        description: 'Password',
    })
    // @IsStrongPassword()
    @IsString()
    @IsNotEmpty()
    password: string;
}