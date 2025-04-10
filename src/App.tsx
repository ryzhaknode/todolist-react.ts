import {ReactNode, useCallback, useEffect, useState} from 'react'
import trashIcon from './assets/trash_icon.svg';
import checkIcon from './assets/check-icon.svg';
import sortIcon from './assets/sort-icon.svg';
import arrowUpIcon from './assets/arrowUp-icon.svg';
import './App.css'
import { v4 as uuidv4 } from 'uuid';

import {motion, AnimatePresence} from "framer-motion"
import CreateTask from "./components/CreateTask.tsx";
import StarIcon from "./components/StarIcon.tsx";
import TaskList from "./components/TaskList.tsx";

export const getFormattedDate = (): string => {
    const now = new Date();

    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();

    return `${day}/${month}/${year}`;
};

const items = [
    {label: 'Default', icon: 'arrow-up'},
    {label: 'Priority (High to Low)', icon: null},
    {label: 'Priority (Low to High)', icon: null},
    {label: 'Due Date (Early First)', icon: null},
    {label: 'Due Date (Late First)', icon: null},
    {label: 'Alphabetical (A-Z)', icon: null},
    {label: 'Alphabetical (Z-A)', icon: null},
];

export type TTask = {
    id: string,
    text: string,
    completed: boolean,
    favorite: boolean,
    date: string,
}

function App() {
    const [selected, setSelected] = useState(null);
    const [sortBtn, setSortBtn] = useState(false);
    const [tasks, setTasks] = useState<TTask[]>([
        {id: "1", text: 'Learn React', completed: true, favorite: false, date: "15/02/2025"},
        {id: "2", text: 'Build a todo app', completed: false, favorite: false, date: "16/02/2025"}
    ]);
     const handleCreateTask = useCallback((taskTxt: string) => {
        setTasks((tasks) => (
                [...tasks,
                    {
                        id: String(uuidv4()),
                        text: taskTxt,
                        completed: false,
                        favorite: false,
                        date: getFormattedDate()
                    }]
            )
        )
    }, [])

    const handleItemClick = (label) => {
        setSelected(label);
    };


    const toggleTaskCompletion = (id) => {
        setTasks(prevTasks =>
            prevTasks.map((task) =>
                task.id === id ? {...task, completed: !task.completed} : task
            )
        );
    };

    const toggleTaskFavorite = (id) => {
        setTasks(prevTasks =>
            prevTasks.map((task) =>
                task.id === id ? {...task, favorite: !task.favorite} : task
            )
        );

    };

    useEffect(()=>{
        console.log(tasks)
    },[tasks])

    const handleDeleteTask = (id) => {
        setTasks(prevTasks => prevTasks.filter((task) => task.id !== id));
    };


    return (
        <>
            <header className='bg-gray-400 text-white p-5'>
                TODO LIST
            </header>
            <main className='flex flex-grow flex-col justify-center items-center'>
                <section className='rounded-lg shadow-sm border min-h-[500px] max-w-[300px] sm:max-w-[450px]'>
                    <h1 className='p-6 text-2xl font-semibold leading-none tracking-tight'>Todo List</h1>
                    <div className='px-6 pb-6 max-w-[400px] flex flex-col justify-center items-center gap-3'>
                        <CreateTask onCreateTask={handleCreateTask}/>
                        <div className='relative w-full'>
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
                                                className={`hover:bg-lime-50 transition duration-300 relative flex items-center justify-between gap-2 px-2 py-1.5 text-sm cursor-pointer ${
                                                    selected === item.label ? "bg-foreground text-accent-foreground" : ""
                                                }`}
                                                onClick={() => handleItemClick(item.label)}
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

                        <div
                            className="bg-gray-100 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-3">
                            <button type='button' className='px-3 font-medium rounded-sm py-1.5 bg-white'
                                    aria-label="Show all tasks">
                                All
                            </button>
                            <button aria-label="Show active tasks">
                                Active
                            </button>
                            <button aria-label="Show completed tasks">
                                Completed
                            </button>
                        </div>
                        <TaskList tasks={tasks} onTaskCompletion={toggleTaskCompletion}
                                  onTaskFavorite={toggleTaskFavorite} onDelete={handleDeleteTask}/>
                    </div>
                    <h3 className="flex items-center p-6 pt-0 text-sm text-muted-foreground">
                        2 items left
                    </h3>
                </section>
            </main>
            <footer className='bg-gray-400 text-white p-5 '>
                FOOTER
            </footer>
        </>
    )
}

export default App
