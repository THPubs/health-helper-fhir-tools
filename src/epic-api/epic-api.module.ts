import { Module } from '@nestjs/common';
import { EpicApiController } from './epic-api.controller';
import { EpicApiService } from './epic-api.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [EpicApiController],
  providers: [EpicApiService],
})
export class EpicApiModule {}
