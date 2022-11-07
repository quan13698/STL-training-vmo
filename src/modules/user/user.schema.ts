import mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import { Document } from "mongoose";

export const USER_SCHEMA_NAME = 'user'

export const UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }
})

UserSchema.pre('save', async function (next: any) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});

export interface IUser extends Document {
    email: string;
    password: string
}