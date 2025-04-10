import {render, screen, fireEvent, waitFor} from '@testing-library/react';
import CreateTask from '../CreateTask'; // Замість цього шляху додайте правильний шлях до вашого компонента
import {vi} from 'vitest'; // Імпортуємо vi з vitest

describe('CreateTask Component', () => {
    it('renders input and btc ', () => {
        render(<CreateTask onCreateTask={() => {
        }}/>);
        expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
        expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should updates input value on valid change', () => {
        render(<CreateTask onCreateTask={() => {
        }}/>);
        const input = screen.getByPlaceholderText(/add a new task/i);
        fireEvent.change(input, {target: {value: "Clean car"}});
        expect(input).toHaveValue("Clean car")
    });

    it('should validate input value on valid change', () => {
        render(<CreateTask onCreateTask={() => {
        }}/>);
        const input = screen.getByPlaceholderText(/add a new task/i);
        fireEvent.change(input, {target: {value: "!-~@#$%^*"}});
        expect(input).toHaveValue("")
    });

    it('should updates input value on valid change', () => {
        render(<CreateTask onCreateTask={() => {
        }}/>);
        const input = screen.getByPlaceholderText(/add a new task/i);
        fireEvent.change(input, {target: {value: "!"}});
        expect(screen.getByText(/❌ Only letters and numbers are allowed./i)).toBeInTheDocument()
    });

    it('should call onCrateTask', () => {
        const mockCreateTask = vi.fn();
        render(<CreateTask onCreateTask={mockCreateTask}/>);
        const input = screen.getByPlaceholderText(/add a new task/i);
        const button = screen.getByRole('button');
        fireEvent.change(input, {target: {value: "Clean car"}});
        fireEvent.click(button);
        expect(mockCreateTask).toHaveBeenCalledTimes(1);
        expect(mockCreateTask).toHaveBeenCalledWith("Clean car")
    });

    it('shouldnt call with empty onCrateTask', () => {
        const mockCreateTask = vi.fn();
        render(<CreateTask onCreateTask={mockCreateTask}/>);
        const input = screen.getByPlaceholderText(/add a new task/i);
        const button = screen.getByRole('button');
        fireEvent.change(input, {target: {value: ""}});
        fireEvent.click(button);
        expect(mockCreateTask).toHaveBeenCalledTimes(0);

    });





});
