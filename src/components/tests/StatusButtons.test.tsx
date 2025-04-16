import React from "react";
import {screen, fireEvent, render} from "@testing-library/react";
import SortTasks, { SortOption } from "../SortTasks";
import { vi } from "vitest";

describe("SortTasks", () => {
    const renderComponent = (selectedSort: SortOption = "default", onSelect = vi.fn()) => {
        render(<SortTasks selectedSort={selectedSort} onSelectFilter={onSelect} />);

    };

    it("рендерить кнопку сортування", () => {
        renderComponent();
        expect(screen.getByRole("button", { name: /sort/i })).toBeInTheDocument();
    });

    it("відкриває і закриває дропдаун при кліку на кнопку", () => {
        renderComponent();

        const button = screen.getByRole("button", { name: /sort/i });
        fireEvent.click(button);
        expect(screen.getByText("Sort by")).toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.queryByText("Sort by")).not.toBeInTheDocument();
    });

    it("викликає onSelectFilter при виборі опції", () => {
        const onSelectMock = vi.fn();
        renderComponent("default", onSelectMock);

        fireEvent.click(screen.getByRole("button", { name: /sort/i }));
        const item = screen.getByText("Due Date (Late First)");
        fireEvent.click(item);

        expect(onSelectMock).toHaveBeenCalledWith("date-desc");
    });

    it("закриває дропдаун при кліку поза межами", () => {
        renderComponent();

        fireEvent.click(screen.getByRole("button", { name: /sort/i }));
        expect(screen.getByText("Sort by")).toBeInTheDocument();

        fireEvent.mouseDown(document.body);
        expect(screen.queryByText("Sort by")).not.toBeInTheDocument();
    });

    it("виділяє активну опцію", () => {
        renderComponent("priority-asc");
        fireEvent.click(screen.getByRole("button", { name: /sort/i }));

        const selectedOption = screen.getByText("Priority (Low to High)");
        expect(selectedOption.className).toMatch(/bg-foreground/);
    });
});
