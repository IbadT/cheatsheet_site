import {Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe, UsePipes} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import {SignInDto} from "./dto/signin.dto";
import {ApiProperty, ApiTags} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";


export class CreateRole {
  @ApiProperty({
    type: String,
    required: true,
    description: 'Role name',
  })
  @IsString()
  @IsNotEmpty()
  role_name: string;
}



@ApiTags('User')
@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(":id")
  async getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }


  @Post("add-role")
  async addDefaultRoles(@Body() body: CreateRole) {
    return this.userService.addDefaultRoles(body.role_name);
  }


  @Patch("update-user-role/:id/:role_id")
  async updateUserRole(@Param('id') id: string, @Param('role_id') role_id: string) {
    return this.userService.updateUserRole(id, role_id);
  }



  // войти
  @Post("signIn")
  async signIn(@Body() body: SignInDto) {
    return this.userService.signIn(body);
  }


  @Post("signUp")
  async signUp(@Body() body: SignInDto) {
    return this.userService.signUp(body);
  }

  @Post("login")
  async login(@Body() body: CreateAuthDto) {

  }

  @Post("logout")
  async logout(@Body() body: CreateAuthDto) {

  }

  @Post("signOut")
  async signOut(@Body() body: CreateAuthDto) {

  };

  @Post("refreshToken")
  async refreshToken(@Body() body: CreateAuthDto) {

  }

  @Get('profile/:id')
  async getProfile(@Param('id') id: string) {
    return this.userService.getProfile(id);
  }


  // выбрать default avatar
  @Patch("update-avatar/:id/:avatar_id")
  async updateSelectedDefaultAvatar(@Param("id") id: string, @Param("avatar_id") avatar_id: string) {
    return this.userService.updateSelectedDefaultAvatar(id, avatar_id);
  }




};
