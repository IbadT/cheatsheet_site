import {BadRequestException, Injectable, NotFoundException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {SignInDto} from "./dto/signin.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {Role} from "../entities/role.entity";
import {CreateRole} from "./user.controller";
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { jwtConstants } from './user.module';
import { AvatarService } from 'src/avatar/avatar.service';
import { roles } from 'src/enums/roles.enum';
import { ForgotPassword } from './dto/forgot-password.dto';


@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      @InjectRepository(Role)
      private readonly roleRepository: Repository<Role>,
      private readonly jwtService: JwtService,
      private readonly avatarService: AvatarService
  ) {}


  async getAdmin() {
    const role = await this.roleRepository.findOne({
      where: {
        role_name: roles.ADMIN
      }
    });
    
    if (!role) { 
      throw new NotFoundException('Роль "ADMIN" не найдена'); 
    };
    
    return await this.userRepository.findOne({ 
      where: {
        role: {
          id: role.id
        }
      },
      relations: ['role']
    });
  }


  async getByEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email }
    })
  }


  async getByUserName(user_name: string) {
    return await this.userRepository.findOne({
      where: { user_name }
    })
  }


  async editPassword(user: User) {
    const newPassword = this.generateRandomPassword();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    return await this.userRepository.update(user.id, { password: hashedPassword })
  }

  generateRandomPassword() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0; i < 10; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }




  async getUser(id: string) {
    return await this.userRepository.findOne({
      where: {
        id
      },
      relations: ['role'],
    })
  }



  async forgotPassword(body: ForgotPassword) {
    const existingUser = await this.getByEmail(body.email_or_username);
    if(!existingUser) {

    }
  }





  async addDefaultRoles(roleName: string) {
    const role = this.roleRepository.create({
      role_name: roleName
    });
    return await this.roleRepository.save(role);
  };




  async updateUserRole(id: string, role_id: string) {
    const existingUser = await this.userRepository.findOne({ where: {id}});
    if (!existingUser) {
      throw new BadRequestException(`Пользователя с id: ${id} не существует`)
    }

    const role = await this.roleRepository.findOne({
      where: {
        id: role_id
      }
    })

    return (await this.userRepository.update(id, {
      role
    })).affected
  };


  async signIn(user: SignInDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      },
      relations: ['role'],
    });

    if(!existingUser) {
      throw new BadRequestException("Такого пользователя нет, нужно зарегистрироваться");
    }

    const comparePassword = await bcrypt.compare(user.password, existingUser.password);
    
    if(!comparePassword) {
      throw new BadRequestException("Неверное имя пользователя или пароль");
    }

    const payload = {sub: existingUser.id, email: user.email, role: existingUser.role};
    
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  };


  // async login(user: User): Promise<{ access_token: string }> {
  async login(user: User): Promise<{ access_token: string, refresh_token: string }> {
    
    const payload = { email: user.email, id: user.id };
    // return { access_token: this.jwtService.sign(payload) };

    return { 
      access_token: this.jwtService.sign(payload), 
      refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }), // Выдача refresh token на 7 дней 
    };
  }

  async signUp(user: SignInDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      }
    });

    if(existingUser) {
      throw new BadRequestException("Пользователь с таким email уже существует")
    }

    const role = await this.roleRepository.findOne({
      where: {
        role_name: "USER"
      }
    });

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = {
      ...user,
      role,
      password: hashedPassword,
    };
    
    const createdUser = this.userRepository.create(newUser);
    await this.userRepository.save(createdUser);
    return this.login(createdUser);
  };



  async getProfile(id: string): Promise<{ user_name: string, bio: string, rating: number, email: string, avatar_id: any, role: any }> {
    const {user_name, bio, rating, email, avatar_id, role} = await this.userRepository.findOne({
      where: {
        id
      },
      relations: ['avatar_id', 'role'],
    });   
    
    return {
      user_name, 
      bio, 
      rating, 
      email, 
      avatar_id: avatar_id ? avatar_id.id : null,
      role
    };
  };









  async refreshToken(refreshTokenDto: RefreshTokenDto) { 
    const { refresh_token } = refreshTokenDto; 
    try { 
      const payload = this.jwtService.verify(refresh_token, { 
        secret: jwtConstants.secret 
      }); 
      console.log({ payload });
      

      const user = await this.findOneByUsername(payload.username); 
      
      if (!user) { 
        throw new UnauthorizedException('User not found'); 
      } 
      
      const newPayload = { username: user.user_name, sub: user.id, role: user.role }; 
      
      return { access_token: this.jwtService.sign(newPayload), }; 
    } catch (e) { 
      throw new UnauthorizedException('Invalid refresh token'); 
    } 
  };



  async findOneByUsername(user_name: string) {
    return await this.userRepository.findOne({
      where: {
        user_name
      },
      select: ['user_name', 'id', 'role']
    });
  };




// добавить в параметры картинку в байтах
  async updateSelectedDefaultAvatar(id: string, avatar_id: string): Promise<{ message: string, status: string }> {
    // return {message: avatar_id};
    const user = await this.userRepository.findOne({
      where: { id }
    });

    const avatar = await this.avatarService.getAvatarById(avatar_id);

    const result = await this.userRepository.save({
      ...user,
      avatar_id: avatar
    })

    if(!result) {
      throw new BadRequestException("При обновлении фотографии пользователя возникла ошибка")
    }
    
    return {
      message: "Аватарка успешно обновлена",
      status: "ok"
    }
  }






  async deleteSelectedDefaultAvatar(id: string) {
    return (await this.userRepository.update(id, {
      avatar_id: null
    })).affected;
  };









  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { user_name: username },
      relations: ['role']
    });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

}
