import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type TaskDocument = Task & Document;

@Schema({ timestamps: true })
export class Task {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop()
    dateTime: Date;

    @Prop()
    deadline: Date;

    @Prop({ enum: ['Low', 'Medium', 'High'], default: 'Medium' })
    priority: string;

    @Prop({ default: false })
    completed: boolean;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
