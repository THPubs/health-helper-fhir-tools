import { Controller, Get } from '@nestjs/common';
import { EpicApiService } from './epic-api.service';
import { Patient } from '../types';

@Controller()
export class EpicApiController {
  constructor(private readonly epicApiService: EpicApiService) {}

  @Get()
  getPatients(): Promise<Patient[]> {
    return this.epicApiService.getPatients();
  }
}
