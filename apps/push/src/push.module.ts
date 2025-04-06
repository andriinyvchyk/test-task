import { Module } from '@nestjs/common';
import { PushService } from './push.service';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification',
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
  ],
  controllers: [],
  providers: [PushService],
})
export class PushModule {}
