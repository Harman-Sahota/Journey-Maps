import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { user } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(
        @InjectModel(user.name)
        private userModel: mongoose.Model<user>
    ) {}
}
