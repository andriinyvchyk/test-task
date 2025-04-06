import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';
import { BullModule } from '@nestjs/bull';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'user',
      password: 'password',
      database: 'users_db',
      entities: [UserEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([UserEntity]),
    BullModule.registerQueue({
      name: 'notification',
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
