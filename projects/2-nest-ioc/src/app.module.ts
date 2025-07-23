import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonModule } from './person/person.module';
import { FieldInjectModule } from './field-inject/field-inject.module';
import { AaaModule } from './aaa/aaa.module';
import { BbbModule } from './bbb/bbb.module';
import { CccModule } from './ccc/ccc.module';

@Module({
  imports: [PersonModule, FieldInjectModule, AaaModule, BbbModule, CccModule],
  controllers: [AppController],
  providers: [
    {
      provide: AppService, // 通过provide指定token
      useClass: AppService,
    },
  ],
})
export class AppModule {}
