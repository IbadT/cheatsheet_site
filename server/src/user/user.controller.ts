import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ValidationPipe,
  UsePipes,
  UseGuards,
  Request,
  Req,
  Delete
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import {SignInDto} from "./dto/signin.dto";
import {ApiProperty, ApiSecurity, ApiTags} from "@nestjs/swagger";
import {IsNotEmpty, IsString} from "class-validator";
import {Roles} from "../guards/roles.decorator";
import {RolesGuard} from "../guards/roles.guard";
import {JwtAuthGuard} from "../guards/jwt.guard";
import {roles} from "../enums/roles.enum";
import { AuthGuard } from 'src/guards/auth.guard';
import { RefreshTokenDto } from './dto/refresh-token.dto';


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


  // @ApiSecurity('JWT-auth')
  // @UseGuards(AuthGuard, RolesGuard)
  // @Roles(roles.USER, roles.ADMIN)
  // @Get(":id")
  // async getProfile(@Param('id') id: string) {
  //   return this.userService.getUser(id);
  // }


  @ApiSecurity('JWT-auth')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(roles.USER, roles.ADMIN)
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
  async login(@Request() req) {
    return this.userService.login(req.user);
  }

  @Post("logout")
  async logout(@Body() body: CreateAuthDto) {

  }

  @Post("signOut")
  async signOut(@Body() body: CreateAuthDto) {

  };

  @Post('refresh-token') 
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) { 
    return this.userService.refreshToken(refreshTokenDto); 
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



  @Delete("delete-avatar/:id/:avatar_id")
  async deleteSelectedDefaultAvatar(@Param("id") id: string) {
    const deletedResult = this.userService.deleteSelectedDefaultAvatar(id);
    if(!deletedResult) {
      return {
        message: "Удаление аватарки произошло с ошибкой",
        status: 401
      }
    }
    return {
      message: "Удаление прошло успешно",
      status: "ok"
    }
  }


};
