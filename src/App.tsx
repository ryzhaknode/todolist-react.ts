import {ReactNode, useCallback, useState} from 'react'
import trashIcon from './assets/trash_icon.svg';
import checkIcon from './assets/check-icon.svg';
import sortIcon from './assets/sort-icon.svg';
import arrowUpIcon from './assets/arrowUp-icon.svg';
import './App.css'

import {motion, AnimatePresence} from "framer-motion"
import CreateTask from "./components/CreateTask.tsx";
import StarIcon from "./components/StarIcon.tsx";

const items = [
    {label: 'Default', icon: 'arrow-up'},
    {label: 'Priority (High to Low)', icon: null},
    {label: 'Priority (Low to High)', icon: null},
    {label: 'Due Date (Early First)', icon: null},
    {label: 'Due Date (Late First)', icon: null},
    {label: 'Alphabetical (A-Z)', icon: null},
    {label: 'Alphabetical (Z-A)', icon: null},
];

function App() {
    const [selected, setSelected] = useState(null);
    const [sortBtn, setSortBtn] = useState(false);
    const [tasks, setTasks] = useState([
        {id: 1, text: 'Learn React', completed: true, favorite: false},
        {id: 2, text: 'Build a todo app', completed: false, favorite: false}
    ]);
    const handleCreateTask = useCallback((taskTxt: string) => {
        const newId: number = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;
        setTasks((tasks) => (
                [...tasks,
                    {
                        id: newId,
                        text: taskTxt,
                        completed: false,
                        favorite: false
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


    return (
        <>
            <header className='bg-gray-400 text-white p-5'>
                TODO LIST
            </header>
            <main className='flex flex-grow flex-col justify-center items-center'>
                <section className='rounded-lg shadow-sm border h-[500px] max-w-[300px] sm:max-w-[450px]'>
                    <h1 className='p-6 text-2xl font-semibold leading-none tracking-tight'>Todo List</h1>
                    <div className='px-6 pb-6 max-w-[400px] flex flex-col justify-center items-center gap-3'>
                        <CreateTask createCallback={handleCreateTask}/>
                        <div className='relative w-full'>
                            <button
                                onClick={() => setSortBtn(!sortBtn)}
                                className=" w-full inline-flex items-center justify-center text-sm font-medium ring-offset-background h-9 rounded-md px-3 gap-1 border"
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
                        <ul className="w-full flex flex-col space-y-2">
                            {tasks.map((task) => (
                                <li key={task.id} className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-2 flex-1">
                                        <div
                                            onClick={() => toggleTaskCompletion(task.id)}
                                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${task.completed ? 'bg-primary' : 'border-primary'}`}
                                        >
                                            {task.completed && <img src={checkIcon} alt="Trash Icon" className="icon"/>}
                                        </div>
                                        <div className='flex justify-between w-full'>
                                            <span
                                                className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                                 {task.text}
                                            </span>
                                            <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800">
                                                31/12/2023
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <button onClick={() => toggleTaskFavorite(task.id)}>
                                            <StarIcon color={task.favorite ? 'yellow' : 'white'}/>
                                        </button>
                                        <button
                                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors  h-10 w-10">
                                            <img src={trashIcon} alt="Trash Icon" className="icon"/>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
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
