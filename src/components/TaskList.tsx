import React from 'react';
import checkIcon from "../assets/check-icon.svg";
import StarIcon from "./StarIcon.tsx";
import trashIcon from "../assets/trash_icon.svg";
import {TTask} from "../App.tsx";


interface TaskListProps {
    tasks: TTask[],
    onTaskCompletion: (id: string) => void;
    onTaskFavorite: (id: string) => void;
    onDelete: (id: string) => void;
}

const TaskList = ({tasks, onTaskCompletion, onTaskFavorite, onDelete}: TaskListProps) => {
    return (
        <div className="w-full border rounded">
            <ul className="always-scroll h-[300px] overflow-scroll flex flex-col rounded-sm m-1 gap-2 ">
                {tasks.length === 0 ? (
                    <li className="text-center text-muted-foreground">Empty Todo List 😊</li>
                ) : (
                    tasks.map((task: TTask) => (
                        <li key={task.id} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 flex-1">
                                <div
                                    onClick={() => onTaskCompletion(task.id)}
                                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${task.completed ? 'bg-primary' : 'border-primary'}`}
                                    role="button"
                                    aria-label="Toggle task completed"
                                >
                                    {task.completed && <img src={checkIcon} alt="Check Icon" className="icon"/>}
                                </div>

                                <div className="flex justify-between w-full">
                                <span className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                  {task.text.length < 17
                                      ? task.text
                                      : `${task.text.slice(0, 15).trim()}...`
                                  }

                                </span>
                                    <span className="text-xs px-2 py-1 rounded bg-red-100 text-red-800">
                                    {task.date}
                                </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 p-1">
                                <button onClick={() => onTaskFavorite(task.id)} aria-label="Toggle favorite">
                                    <StarIcon color={task.favorite ? 'yellow' : 'white'}/>
                                </button>
                                <button onClick={() => onDelete(task.id)} aria-label="Delete task">
                                    <img src={trashIcon} alt="Delete" className="icon"/>
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>


    );
};

export default TaskList;