import React from "react";

export type FilterType = 'all' | 'active' | 'completed';

interface StatusButtonsProps {
    onClickBtn: (status:  React.MouseEvent<HTMLButtonElement>) => void;
    status: FilterType;
}
const StatusButtons: React.FC = ({onClickBtn, status}: StatusButtonsProps ) => {

    return (
        <div className="bg-gray-100 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-3">
            <button
                type="button"
                data-filter="all"
                onClick={(e) => onClickBtn(e)}
                className={`px-3 font-medium rounded-sm py-1.5 ${status === "all" && "bg-white"}`}
                aria-label="Show all tasks"
            >
                All
            </button>
            <button
                type="button"
                data-filter="active"
                className={`px-3 font-medium rounded-sm py-1.5 ${status === "active" && "bg-white"}`}
                onClick={(e) => onClickBtn(e)}
                aria-label="Show active tasks"
            >
                Active
            </button>
            <button
                type="button"
                data-filter="completed"
                className={`px-3 font-medium rounded-sm py-1.5 ${status === "completed" && "bg-white"}`}
                onClick={(e) => onClickBtn(e)}
                aria-label="Show completed tasks"
            >
                Completed
            </button>
        </div>
    );
};

export default StatusButtons