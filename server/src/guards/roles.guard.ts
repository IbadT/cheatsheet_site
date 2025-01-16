import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user/entities/user.entity";
import {Repository} from "typeorm";
import {Role} from "../entities/role.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles || roles.length === 0) {
            return true; // если роли не заданы, доступ разрешен
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const userWithRoles: User = await this.userRepository.findOne({
            where: {
                id: user.id,
            },
            relations: ['role'],
        })

        // const userWithRoles = await this.prisma.user.findUnique({
        //     where: { id: user.id },
        //     include: { role: true },
        // });

        if (!userWithRoles) {
            throw new ForbiddenException('Пользователь не найден');
        }

        const roleMatch = roles.some(role => userWithRoles.role[role]);
        // const checkAdminRole = await this.rolesRepository.findOne({
        //     where: {
        //         id: userWithRoles.role,
        //     }
        // })
        //
        // if (roles.includes('ADMIN') && !checkAdminRole) {
        //     throw new ForbiddenException('У Вас нет прав администратора');
        // };

        if (!roleMatch) {
            throw new ForbiddenException('У Вас нет прав для выполнения этой операции');
        }

        // Дополнительная проверка на роль администратора

        return true;
    }
}