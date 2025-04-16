import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SortTasks, { SortOption } from '../SortTasks';
import { vi } from 'vitest';


describe('SortTasks component', () => {
    const onSelectFilter = vi.fn();
    const renderComponent = (selectedSort: SortOption = 'default') => {
        render(<SortTasks selectedSort={selectedSort} onSelectFilter={onSelectFilter} />);
    };

    it('renders sort button', () => {
        renderComponent();
        expect(screen.getByRole('button', { name: /sort/i })).toBeInTheDocument();
    });

    it('opens and closes dropdown when sort button is clicked', () => {
        renderComponent();

        const button = screen.getByRole('button', { name: /sort/i });
        fireEvent.click(button);

        expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.queryByText(/Sort by/i)).not.toBeInTheDocument();
    });

    it('calls onSelectFilter with correct value when an option is clicked', () => {
        renderComponent();
        const button = screen.getByRole('button', { name: /sort/i });
        fireEvent.click(button);

        const option = screen.getByText(/Priority \(High to Low\)/i);
        fireEvent.click(option);

        expect(onSelectFilter).toHaveBeenCalledWith('priority-desc');
    });

    it('closes dropdown when clicking outside', () => {
        renderComponent();
        const button = screen.getByRole('button', { name: /sort/i });
        fireEvent.click(button);

        // Клік поза дропдауном
        fireEvent.mouseDown(document.body);
        expect(screen.queryByText(/Sort by/i)).not.toBeInTheDocument();
    });

});
