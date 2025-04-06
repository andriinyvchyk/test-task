import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './user.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectQueue('notification') private readonly notificationQueue: Queue,
    private readonly userRepository: UserRepository,
  ) {}

  async createUser({ username }: CreateUserDto): Promise<UserEntity> {
    console.log('userName');

    const user = await this.userRepository.save({
      username,
    });

    await this.notificationQueue.add(
      'send-push',
      { userId: user.id },
      { delay: 86400000 },
    );

    return {
      id: user.id,
      username,
    };
  }
}
