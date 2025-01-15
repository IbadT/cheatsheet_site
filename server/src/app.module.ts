import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {databaseProviders} from "./database/providers";
import {User} from "./auth/entities/user.entity";
import {DatabaseModule} from "./database/database.module";
import {ConfigModule} from "@nestjs/config";

@Module({
  imports: [
      ConfigModule.forRoot(),
      DatabaseModule,
      // TypeOrmModule.forRoot({
      //     type: 'postgres',
      //     host: 'localhost',
      //     port: 5432,
      //     username: 'postgres',
      //     password: 'postgres',
      //     database: 'cheatsheet_site',
      //     // entities: [User],
      //     entities: [
      //         __dirname + '/**/*.entity{.ts,.js}',
      //     ],
      //     synchronize: true,
      // }),
      AuthModule
  ],
})
export class AppModule {}
