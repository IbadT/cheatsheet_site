import { Injectable, CanActivate, ExecutionContext, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {Role} from "../entities/role.entity";
import {roles as rolesEnum} from "../enums/roles.enum";


@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        // private prisma: PrismaService
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles || roles.length === 0) {
            return true; // если роли не заданы, доступ разрешен
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        if(!user.role) {
            throw new BadRequestException("У пользователя не назначена роль");
        }

        const userWithRoles = await this.userRepository.findOne({
            where: {
                id: user.sub,
            },
            relations: ['role'],
        })

        if (!userWithRoles) {
            throw new ForbiddenException('Пользователь не найден');
        }

        const role = await this.roleRepository.findOne({
            where: {
                id: userWithRoles.role.id
            }
        });

        if(roles.includes(rolesEnum.ADMIN) && role.role_name !== rolesEnum.ADMIN) {
            throw new ForbiddenException('У Вас нет прав администратора');
        }

        const roleMatch = roles.some(r => role.role_name === r);

        if (!roleMatch) {
            throw new ForbiddenException('У Вас нет прав для выполнения этой операции');
        }

        // Дополнительная проверка на роль администратора

        return true;
    }
}


















// import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { PrismaService } from 'src/prisma.service';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector, private prisma: PrismaService) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!roles) {
//       return true;
//     };

//     const request = context.switchToHttp().getRequest();
//     const user = request.user;

//     const userFromDb = await this.prisma.user.findUnique({
//       where: {
//         id: user.id
//       },
//       // include: {
//       //   role: true
//       // }
//     });
//     const role = await this.prisma.userRole.findUnique({
//       where: {
//         userId: user.id
//       }
//     });

//     if (!role.admin) {
//       // throw new ForbiddenException('You do not have the required permissions (ADMIN role required).');
//       throw new ForbiddenException('У Вас нет прав администратора');
//     };
//     return true;
//   }
// }
