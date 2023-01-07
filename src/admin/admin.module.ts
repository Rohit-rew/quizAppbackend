import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin';

@Module({
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}