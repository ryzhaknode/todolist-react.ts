import React, {useState} from "react";
import {FilterType} from "../components/StatusButtons.tsx";

export const useStatusButton = () => {
    const [statusButton, setStatusButton ] = useState<FilterType>('all');

    const handleClickStatusBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
        const filter = e.currentTarget.dataset.filter as FilterType;
        setStatusButton(filter)
    }

    return { statusButton, handleClickStatusBtn };

}