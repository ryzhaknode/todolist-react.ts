import {render, screen, fireEvent, within} from '@testing-library/react';
import TaskList from '../TaskList';
import { describe, it, expect, vi } from 'vitest';
import {TTask} from "../../App.tsx";

describe("TaskList Components tests ", () => {
    const mockTasks: TTask[] = [
        {
            id: '1',
            text: 'Test Task 1',
            completed: false,
            favorite: false,
            date: '10/04/2025',
        },
        {
            id: '2',
            text: 'Test Task 2 is a very long task text that should be truncated',
            completed: true,
            favorite: true,
            date: '11/04/2025',
        },
    ];
    const onTaskCompletion = vi.fn();
    const onTaskFavorite = vi.fn();
    const onDelete = vi.fn();

    it('renders task items', () => {
        render(<TaskList
            tasks={mockTasks}
            onTaskCompletion={onTaskCompletion}
            onTaskFavorite={onTaskFavorite}
            onDelete={onDelete}/>);

        expect(screen.getByText(/Test Task 1/i)).toBeInTheDocument();
        expect(screen.getByText(/10\/04\/2025/)).toBeInTheDocument();
        expect(screen.getByText(/Test Task 2/i)).toBeInTheDocument();
        expect(screen.getByText(/11\/04\/2025/)).toBeInTheDocument();
        expect(screen.getAllByRole('listitem')).toHaveLength(2);
    });


    it('calls onTaskCompletion when clicking the check circle', () => {
        render(
            <TaskList
                tasks={mockTasks}
                onTaskCompletion={onTaskCompletion}
                onTaskFavorite={onTaskFavorite}
                onDelete={onDelete}
            />
        );

        const buttons = screen.getAllByRole('button', { name: /toggle task completed/i });
        fireEvent.click(buttons[0]);
        expect(onTaskCompletion).toHaveBeenCalledWith('1');
    });

    it('calls onDelete when clicking the trash icon', () => {
        render(
            <TaskList
                tasks={mockTasks}
                onTaskCompletion={onTaskCompletion}
                onTaskFavorite={onTaskFavorite}
                onDelete={onDelete}
            />
        );

        const buttons = screen.getAllByRole('button', { name: /delete task/i });
        fireEvent.click(buttons[0]);
        expect(onDelete).toHaveBeenCalledWith('1');
    });

    it('renders empty state when no tasks', () => {
        render(
            <TaskList
                tasks={[]}
                onTaskCompletion={onTaskCompletion}
                onTaskFavorite={onTaskFavorite}
                onDelete={onDelete}
            />
        );

        expect(screen.getByText(/Empty Todo List/i)).toBeInTheDocument();
    });

    it('calls onDelete and removes task from UI', () => {
        const { rerender } = render(
            <TaskList
                tasks={mockTasks}
                onTaskCompletion={onTaskCompletion}
                onTaskFavorite={onTaskFavorite}
                onDelete={onDelete}
            />
        );

        const taskItem = screen.getByText('Test Task 1').closest('li')!;
        const deleteButton = within(taskItem).getByRole('button', { name: /delete task/i });

        fireEvent.click(deleteButton);

        // Колбек викликаний
        expect(onDelete).toHaveBeenCalledWith('1');

    });

})