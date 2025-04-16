import React, {useEffect, useRef, useState} from 'react';
import sortIcon from "../assets/sort-icon.svg";
import {AnimatePresence, motion} from "framer-motion";
import arrowUpIcon from "../assets/arrowUp-icon.svg";

const items = [
    {label: 'Default', icon: 'arrow-up', value: 'default'},
    {label: 'Priority (High to Low)', icon: null, value: 'priority-desc'},
    {label: 'Priority (Low to High)', icon: null, value: 'priority-asc'},
    {label: 'Due Date (Early First)', icon: null, value: 'date-asc'},
    {label: 'Due Date (Late First)', icon: null, value: 'date-desc'},
    {label: 'Alphabetical (A-Z)', icon: null, value: 'alpha-asc'},
    {label: 'Alphabetical (Z-A)', icon: null, value: 'alpha-desc'},
] as const;

export type SortOption = (typeof items)[number]['value'];

interface SortTasksProps {
    selectedSort: SortOption;
    onSelectFilter: (string: SortOption) => void;
}

const SortTasks = ({selectedSort, onSelectFilter}: SortTasksProps) => {
    const [sortBtn, setSortBtn] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const handleSelectSortFilter = (filterValue: SortOption) => {
        onSelectFilter(filterValue)
        setSortBtn(false)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setSortBtn(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className='relative w-full' ref={dropdownRef}>
            <button
                onClick={() => setSortBtn(!sortBtn)}
                className="cursor-pointer w-full inline-flex items-center justify-center text-sm font-medium ring-offset-background h-9 rounded-md px-3 gap-1 border"
                type="button" id="radix-«r4»" aria-haspopup="menu" aria-expanded="false"
                data-state="closed">
                <img src={sortIcon} alt="Sort Icon" className="icon"/>
                Sort
            </button>
            {sortBtn && <AnimatePresence>
                <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    transition={{duration: 0.2}}
                    className="absolute w-full z-50 transform max-h-[503.5px] bg-white mt-1"
                >
                    <div
                        role="menu"
                        aria-orientation="vertical"
                        className="z-50 min-w-[8rem] max-w-[300px] sm:max-w-[450px] bg-popover border rounded-md shadow-md p-1 text-popover-foreground overflow-hidden"
                    >
                        <div className="px-2 py-1.5 text-sm font-semibold">Sort by</div>
                        <div role="separator" className="my-1 h-px bg-muted"/>
                        {items.map((item, index) => (
                            <div
                                key={index}
                                role="menuitem"
                                className={`${selectedSort === item.value && "bg-gray-300"} hover:bg-lime-50 transition duration-300 relative flex items-center justify-between gap-2 px-2 py-1.5 text-sm cursor-pointer ${
                                    selectedSort === item.value ? "bg-foreground text-accent-foreground" : ""
                                }`}
                                onClick={() => handleSelectSortFilter(item.value)}
                            >
                                <span>{item.label}</span>
                                {item.icon && <img src={arrowUpIcon} alt="default" className="icon"/>}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </AnimatePresence>
            }
        </div>
    );
};

export default SortTasks;