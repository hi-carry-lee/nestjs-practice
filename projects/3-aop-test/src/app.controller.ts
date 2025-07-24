import {
  Controller,
  Get,
  Query,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
// import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { TestFilter } from './test.filter';
import { ValidatePipe } from './validate.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('appcontroller handler');
    return this.appService.getHello();
  }

  @Get('aaa')
  // @UseGuards(LoginGuard)
  aaa(): string {
    console.log('aaa...');
    return 'aaa';
  }

  @Get('bbb')
  @UseInterceptors(TimeInterceptor)
  bbb(): string {
    console.log('bbb...');
    return 'bbb';
  }

  @Get('ccc')
  @UseFilters(TestFilter)
  ccc(@Query('num', ValidatePipe) num: number): number {
    return num + 1;
  }
}
