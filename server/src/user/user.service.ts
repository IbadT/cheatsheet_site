import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {SignInDto} from "./dto/signin.dto";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import {Role} from "../entities/role.entity";
import {CreateRole} from "./user.controller";


@Injectable()
export class UserService {
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
      @InjectRepository(Role)
      private readonly roleRepository: Repository<Role>,
      private readonly jwtService: JwtService,
  ) {}

  async getUser(id: string) {
    return await this.userRepository.findOne({
      where: {
        id
      },
      relations: ['role'],
    })
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

    // return this.userRepository.update(id, {
    //   role_id
    // })
  }





  async signIn(user: SignInDto) {
    const existingUser = await this.userRepository.findOne({
      where: {
        email: user.email,
      }
    });

    if(!existingUser) {
      throw new BadRequestException("Такого пользователя нет, нужно зарегистрироваться");
    }

    const comparePassword = await bcrypt.compare(user.password, existingUser.password);
    if(!comparePassword) {
      throw new BadRequestException("Неверное имя пользователя или пароль");
    }

    const payload = {sub: existingUser.id, email: user.email};
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  };


  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
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

    console.log(newUser)

    const createdUser = this.userRepository.create(newUser);
    await this.userRepository.save(createdUser);
    return this.login(createdUser);
  };



  async getProfile(id: string): Promise<{ user_name: string, bio: string, rating: number, email: string, avatar_id: any }> {
    const {user_name, bio, rating, email, avatar_id} = await this.userRepository.findOne({
      where: {
        id
      },
      relations: ['avatar_id'],
    });
    return {user_name, bio, rating, email, avatar_id};
  }








// добавить в параметры картинку в байтах
  async updateSelectedDefaultAvatar(id: string, avatar_id: string): Promise<{ message: string }> {
    return {message: avatar_id};
    const user = await this.userRepository.findOne({
      where: { id }
    });
    const result = await this.userRepository.save({
      ...user,
      // avatar_id: avatar_id,
    })
    if(!result) {
      throw new BadRequestException("При обновлении фотографии пользователя возникла ошибка")
    }
    return {
      message: "ok"
    }
  }

}
