import { Controller, Post, Body, BadRequestException, Get, UseGuards } from '@nestjs/common';
import { registerDTO } from '../user/register.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { loginDTO } from './login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) {}

    @Get('public')
    publicApi() {
        return 'its public api'
    }

    @Get('private')
    @UseGuards(JwtAuthGuard)
    privateApi() {
        return 'pass jwt'
    }

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
