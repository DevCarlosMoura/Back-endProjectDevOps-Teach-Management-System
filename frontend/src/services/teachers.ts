import api from './api';

export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  bio?: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTeacherData {
  name: string;
  email: string;
  phone: string;
  specialization: string;
  bio?: string;
}

export const teacherService = {
  async getAll() {
    const response = await api.get<Teacher[]>('/teachers');
    return response.data;
  },

  async getById(id: string) {
    const response = await api.get<Teacher>(`/teachers/${id}`);
    return response.data;
  },

  async create(data: CreateTeacherData) {
    const response = await api.post<Teacher>('/teachers', data);
    return response.data;
  },

  async update(id: string, data: Partial<CreateTeacherData>) {
    const response = await api.put<Teacher>(`/teachers/${id}`, data);
    return response.data;
  },

  async delete(id: string) {
    await api.delete(`/teachers/${id}`);
  },
};
