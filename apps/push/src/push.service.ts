import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';

@Processor('notification')
@Injectable()
export class PushService {
  constructor() {}

  @Process('send-push')
  async processNotification(job: Job) {
    const { userId } = job.data;
    console.log('userId', userId);
    await fetch(
      `https://webhook.site/180d9fbd-da09-47d3-a969-f38b3a60f80d?userId=${userId}`,
    );
  }
}
