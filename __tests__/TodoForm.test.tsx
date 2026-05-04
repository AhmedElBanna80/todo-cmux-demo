import { render, screen } from '@testing-library/react';
import { TodoForm } from '@/components/TodoForm';

describe('TodoForm', () => {
  it('renders form with input and submit button', () => {
    render(<TodoForm />);

    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Add Task' })).toBeInTheDocument();
  });

  it('input has required attribute', () => {
    render(<TodoForm />);

    const input = screen.getByPlaceholderText('Add a new task...') as HTMLInputElement;
    expect(input.required).toBe(true);
  });
});
