import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StatusButtons, { FilterType } from "../StatusButtons";
import {vi} from "vitest";

describe("StatusButtons", () => {
    const renderComponent = (status: FilterType, onClick = vi.fn()) => {
        render(<StatusButtons status={status} onClickBtn={onClick} />);
    };

    it("рендерить всі кнопки", () => {
        renderComponent("all");

        expect(screen.getByText("All")).toBeInTheDocument();
        expect(screen.getByText("Active")).toBeInTheDocument();
        expect(screen.getByText("Completed")).toBeInTheDocument();
    });

    it("виділяє правильну кнопку (bg-white)", () => {
        renderComponent("active");

        const activeBtn = screen.getByText("Active");
        expect(activeBtn.className).toContain("bg-white");

        const allBtn = screen.getByText("All");
        const completedBtn = screen.getByText("Completed");

        expect(allBtn.className).not.toContain("bg-white");
        expect(completedBtn.className).not.toContain("bg-white");
    });

    it("викликає onClickBtn при кліку", () => {
        const onClickMock = vi.fn();
        renderComponent("all", onClickMock);

        const activeBtn = screen.getByText("Active");
        fireEvent.click(activeBtn);

        expect(onClickMock).toHaveBeenCalledTimes(1);
        expect(onClickMock.mock.calls[0][0]).toHaveProperty("type", "click");
    });
});
