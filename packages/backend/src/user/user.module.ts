import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [forwardRef(() => AuthModule),JwtModule.register({})],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}
