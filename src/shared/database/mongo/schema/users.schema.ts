/* eslint-disable prettier/prettier */
import {Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { UserStatus } from "src/common/enums/user.enum";
import { Document } from 'mongoose';

export type UserDocument = User & Document;


@Schema({ timestamps: true })
export class User extends Document {
    @Prop({type: String, required: true})
    name: string;

    @Prop({type: String, required: true, unique: true})
    email: string;

    @Prop({type: String, required: true})
    password: string;

    @Prop({type: String, enum: UserStatus,  default: UserStatus.ACTIVE})
    status: UserStatus;
    username: any;
}

export const UserSchema = SchemaFactory.createForClass(User);