import { TaskType } from '../types/task.type';
import http from './http';

export const TaskService = {
    async getAll() {
        const { data } = await http.get<TaskType[]>('/api/task');
        return data;
    },
    async save(body: TaskType) {
        const response = await http.post<TaskType>('/api/task', body);
        return response;
    },
    async get(taskId: number) {
        const { data } = await http.get<TaskType>(`/api/task/${taskId}`);
        return data;
    },
    async delete(taskId: number) {
        const response = await http.delete<{ message: string }>(`/api/task/${taskId}`);
        return response;
    },
    async update(taskId: number, data: TaskType) {
        const response = await http.put<TaskType>(`/api/task/${taskId}`, data);
        return response;
    },
}