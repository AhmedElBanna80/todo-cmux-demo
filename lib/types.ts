export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export interface FormState {
  success?: boolean;
  error?: string;
}
