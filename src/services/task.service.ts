import { TaskType } from '../types/task.type';
import http from './http';

export const TaskService = {
    async getAll() {
        const { data } = await http.get<TaskType[]>('/task');
        return data;
    },
    async save(body: TaskType) {
        const response = await http.post<TaskType>('/task', {
            task: body.task,
            description: body.description
        });
        return response;
    },
    async get(taskId: number) {
        const { data } = await http.get<TaskType>(`/task/${taskId}`);
        return data;
    },
    async delete(taskId: number) {
        const response = await http.delete<{ message: string }>(`/task/${taskId}`);
        return response;
    },
    async update(taskId: number, body: TaskType) {
        const response = await http.put<TaskType>(`/task/${taskId}`, body);
        return response;
    },
}