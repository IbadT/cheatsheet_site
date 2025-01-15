import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {User} from "./entities/user.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {DatabaseModule} from "../database/database.module";

@Module({
  imports: [
      TypeOrmModule.forFeature([User]),
      DatabaseModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
