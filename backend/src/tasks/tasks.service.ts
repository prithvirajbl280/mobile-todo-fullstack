import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './schemas/task.schema';

@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) { }

    async create(createTaskDto: any, userId: string): Promise<Task> {
        const createdTask = new this.taskModel({ ...createTaskDto, user: userId });
        return createdTask.save();
    }

    async findAll(userId: string): Promise<Task[]> {
        return this.taskModel.find({ user: userId }).exec();
    }

    async findOne(id: string, userId: string): Promise<Task | null> {
        return this.taskModel.findOne({ _id: id, user: userId }).exec();
    }

    async update(id: string, updateTaskDto: any, userId: string): Promise<Task | null> {
        return this.taskModel.findOneAndUpdate({ _id: id, user: userId }, updateTaskDto, { new: true }).exec();
    }

    async remove(id: string, userId: string): Promise<Task | null> {
        return this.taskModel.findOneAndDelete({ _id: id, user: userId }).exec();
    }
}
