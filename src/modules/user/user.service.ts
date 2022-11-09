import { Injectable, HttpException, HttpStatus, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { loginDTO } from '../auth/login.dto';
import { registerDTO } from './register.dto';
import { IUser } from './user.schema';
import * as bcrypt from 'bcrypt'
import { Payload } from '../auth/payload';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('user') private userModel: Model<IUser>
    ) { }

    async create(registerDTO: registerDTO) {
        const {email} = registerDTO;
        const user = await this.userModel.findOne({email: email});
        if(user) {
            throw new HttpException('user existing', HttpStatus.BAD_REQUEST)
        }
        const createdUser = new this.userModel(registerDTO);
        await createdUser.save()
        return this.userInfoReturning(createdUser)
    }
    
    async checkLogin(userDTO: loginDTO) {
        const { email, password } = userDTO;
        const checkUser = await this.userModel.findOne({email: email});
        if(!checkUser){
            throw new BadRequestException('user does not exist')
        }
        if(await bcrypt.compare(password, checkUser.password)){
            return this.userInfoReturning(checkUser)
        }else {
            throw new BadRequestException('invalid cridential')
        }
    }

    userInfoReturning (user: IUser) {
        const showUserInfo = user.toObject();
        delete showUserInfo['password'];
        return showUserInfo
    }

    async findByPayload(payload: Payload) {
        const { email } = payload;
        return await this.userModel.findOne({ email});
    }
}
