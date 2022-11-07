import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { registerDTO } from '../user/register.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { loginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    @Post('register')
    async register(@Body() registerDTO: registerDTO) {
        const {email, password} = registerDTO;
        if(!email || !password) throw new BadRequestException('Missing email or password')
        const newUser = await this.userService.create(registerDTO);
        const payload = {
            email: newUser.email
        }
        const token = this.authService.signPayload(payload);
        return { newUser, token}
    }

    @Post('login')
    async login(@Body() loginDTO: loginDTO) {
        const user = await this.userService.checkLogin(loginDTO);
        const payload = {
            email: user.email
        }
        const token = this.authService.signPayload(payload);
        return {user, token}
    }
}
