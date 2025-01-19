
// import { Strategy } from 'passport-local';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import {UserService} from "../user/user.service";


// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//     constructor(private userService: UserService) {
//         super();
//     }

//     async validate(username: string, password: string): Promise<any> {
//         const user = await this.userService.validateUser(username, password);
//         console.log({ user });
//         if (!user) {
//             throw new UnauthorizedException();
//         }
//         return user;
//     }
// }







// import { Strategy } from 'passport-local';
import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      // usernameField: 'email',
      emailField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.userService.getByEmail(email);

    if (user == undefined) throw new UnauthorizedException('Неверный логин или пароль');
    const compare_password = await bcrypt.compare(user.password, password);
    if(!compare_password)throw new UnauthorizedException('Неверный логин или пароль');
    if (compare_password) return user;
  }
}











// // import { Strategy } from 'passport-local';
// import { Strategy } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { UserService } from 'src/user/user.service';
// import { UnauthorizedException } from '@nestjs/common';
// import * as bcrypt from 'bcrypt';
// import {User} from "../user/entities/user.entity";
//
// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//     constructor(private userService: UserService) {
//         super({
//             // usernameField: 'email',
//             emailField: 'email',
//             passwordField: 'password',
//         });
//     }
//
//
//     async validate(email: string, password: string) {
//
//         const user: User = await this.userService.getByEmail(email);
//
//         if (user == undefined) throw new UnauthorizedException('Неверный логин или пароль');
//         const compare_password = await bcrypt.compare(user.password, password);
//         if(!compare_password) throw new UnauthorizedException('Неверный логин или пароль');
//         if (compare_password) return user;
//     }
// }