import {useState} from "react";
import {SortOption} from "../components/SortTasks.tsx";

export const useSortState = () => {
    const [selectedSort, setSelectedSort] = useState<SortOption>('default');

    const handleSelectFilter = (sort: SortOption) => {
        setSelectedSort(sort)
    }

    return { selectedSort, handleSelectFilter };
}