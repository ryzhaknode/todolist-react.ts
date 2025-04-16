import React, {useCallback, useMemo, useState} from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import CreateTask from "./components/CreateTask.tsx";
import TaskList from "./components/TaskList.tsx";
import StatusButtons from "./components/StatusButtons.tsx";
import SortTasks from "./components/SortTasks.tsx";
import {getFormattedDate} from "./features/getFormattedDate.ts";
import {useSortState} from "./hooks/useSortState.ts";
import {useStatusButton} from "./hooks/useStatusButton.ts";
import {parseDate} from "./features/parseDate.ts";

export type TTask = {
    id: string,
    text: string,
    completed: boolean,
    favorite: boolean,
    date: string,
}



function App() {
    const [tasks, setTasks] = useState<TTask[]>([
        {id: "1", text: 'Learn React', completed: true, favorite: false, date: "15/02/2025"},
        {id: "2", text: 'Build a todo app', completed: false, favorite: false, date: "16/02/2025"}
    ]);
    const {selectedSort, handleSelectFilter} = useSortState()
    const {statusButton, handleClickStatusBtn} = useStatusButton()

    const filteredAndSortedTasks: TTask[] = useMemo(() => {
        let result = tasks;
        switch (statusButton) {
            case 'active':
                result = tasks.filter(task => !task.completed);
                break;
            case 'completed':
                result = tasks.filter(task => task.completed);
                break;
            case 'all':
            default:
                result = tasks;
                break;
        }

        result = [...result]; // захист від мутацій
        switch (selectedSort) {
            case 'date-asc':
                return result.sort((a, b) =>
                    new Date(parseDate(a.date)).getTime() - new Date(parseDate(b.date)).getTime()
                );
            case 'date-desc':
                return result.sort((a, b) =>
                    new Date(parseDate(b.date)).getTime() - new Date(parseDate(a.date)).getTime()
                );
            case 'alpha-asc':
                return result.sort((a, b) => a.text.localeCompare(b.text));
            case 'alpha-desc':
                return result.sort((a, b) => b.text.localeCompare(a.text));
            case 'priority-asc':
                return result.sort((a, b) => Number(a.favorite) - Number(b.favorite));
            case 'priority-desc':
                return result.sort((a, b) => Number(b.favorite) - Number(a.favorite));
            default:
                return result;
        }
    }, [tasks, statusButton, selectedSort]);


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
                        <SortTasks selectedSort={selectedSort} onSelectFilter={handleSelectFilter}/>
                        <StatusButtons status={statusButton} onClickBtn={handleClickStatusBtn}/>
                        <TaskList tasks={filteredAndSortedTasks} onTaskCompletion={toggleTaskCompletion}
                                  onTaskFavorite={toggleTaskFavorite} onDelete={handleDeleteTask}/>
                    </div>
                    <h3 className="flex items-center p-6 pt-0 text-sm text-muted-foreground">
                        {`${tasks.filter(item => item.completed === false).length} items left`}
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
