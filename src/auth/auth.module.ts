import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

// @Module({
//   imports: [
//     UsersModule,
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.register({
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '36000s' },
//     }),
//   ],
//   providers: [AuthService, JwtStrategy],
//   exports: [AuthService],
// })
// export class AuthModule {}
