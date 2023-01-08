import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

//env
import { ConfigModule } from '@nestjs/config';

//mongoose
import { MongooseModule } from '@nestjs/mongoose';

//modules
import { AdminQuizModule } from './admin/admin.module';
import { QuizesModule } from './quizes/quizes.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI || ''),
    AuthModule,
    AdminQuizModule,
    QuizesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
