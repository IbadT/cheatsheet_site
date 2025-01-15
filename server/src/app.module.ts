import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {DatabaseModule} from "./database/database.module";
import {ConfigModule} from "@nestjs/config";
import { AvatarModule } from './avatar/avatar.module';

@Module({
  imports: [
      ConfigModule.forRoot(),
      DatabaseModule,
      UserModule,
      AvatarModule
  ],
})
export class AppModule {}
