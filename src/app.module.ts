import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

//env
import { ConfigModule } from '@nestjs/config';

//mongoose
import { MongooseModule } from '@nestjs/mongoose';

//modules
import { AdminModule } from './admin/admin.module';
import { QuizesModule } from './quizes/quizes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    AuthModule,
    AdminModule,
    QuizesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
