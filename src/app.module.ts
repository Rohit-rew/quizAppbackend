import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

//env
import { ConfigModule } from '@nestjs/config';

//mongoose
import { MongooseModule } from '@nestjs/mongoose';

//modules
import { AdminQuizModule } from './admin/admin.module';
import { QuizesModule } from './quizes/quizes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    AuthModule,
    AdminQuizModule,
    QuizesModule,
  ],
})
export class AppModule {}
