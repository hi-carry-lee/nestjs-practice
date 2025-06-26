import { Injectable } from '@nestjs/common';
import { MessageLoggerService } from './message-logger/message-logger.service';

@Injectable()
export class AppService {
  // inject message logger service by constructor
  constructor(private readonly messageLogger: MessageLoggerService) {}
  getHello(): string {
    const message = this.messageLogger.log('Hello World!');
    return message;
  }
}
