import { Injectable } from '@nestjs/common';
import { MessageLoggerService } from './message-logger/message-logger.service';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from './config/config.types';
import { AppConfig } from './config/app.config';

@Injectable()
export class AppService {
  // inject message logger service by constructor
  constructor(
    private readonly messageLogger: MessageLoggerService,
    private configService: ConfigService<ConfigType>,
  ) {}

  getHello(): string {
    const message = this.messageLogger.log('Hello World!');
    const prefix = this.configService.get<AppConfig>('app')?.messagePrefix;
    return `${prefix} ${message}`;
  }
}
