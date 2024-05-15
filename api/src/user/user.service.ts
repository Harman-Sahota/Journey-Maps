import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { user } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(user.name)
        private userModel: mongoose.Model<user>
    ) {}

    async findAll(){
        const users = await this.userModel.find()
        return users
    }
}
