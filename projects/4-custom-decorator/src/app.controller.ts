import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AaaGuard } from './aaa.guard';
import { Aaa } from './aaa.decorator';
import { Bbb } from './bbb.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Aaa('admin-test')
  @UseGuards(AaaGuard)
  getHello(): string {
    return this.appService.getHello();
  }

  @Bbb('hello1', 'admin-hello1')
  @UseGuards(AaaGuard)
  getHello1(): string {
    return 'this is hello1';
  }
}
