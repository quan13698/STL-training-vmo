import { Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { Payload } from './payload';
require("dotenv").config();

@Injectable()
export class AuthService {
    constructor( private userService: UserService ){}

    signPayload(payload: Payload) {
        return sign(payload, process.env.SECRET_KEY, {expiresIn: '5d'})
    }

    async validateUser(payload: Payload) {
        return await this.userService.findByPayload(payload)
    }
}
