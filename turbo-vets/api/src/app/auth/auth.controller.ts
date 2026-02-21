import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Role } from '../entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(
    @Body() body: { email: string; password: string; role: Role, organizationId: string; },
  ) {
    return this.authService.register(
      body.email,
      body.password,
      body.role,
      body.organizationId,
    );
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      body.email,
      body.password,
    );
    return this.authService.login(user);
  }
}
