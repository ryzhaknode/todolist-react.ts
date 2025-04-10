import React, {useState } from 'react';
import '../styles/index.css';
interface CreateTaskProps {
    onCreateTask: (taskTxt: string) => void;
}
const CreateTask =  React.memo(({onCreateTask}: CreateTaskProps) => {
    const [inputValue, setInputValue] = useState("");
    const [isError, setIsError] = useState(false);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        const isInvalid = /[^a-zA-Zа-яА-Я0-9 ]/.test(value);

        if (!isInvalid) {
            setInputValue(value);
            setIsError(false);
        } else {
            setIsError(true);
            setTimeout(() => {
                setIsError(false);
            }, 500);
        }
    };

    const handleClickBtn = () => {
        onCreateTask(inputValue);
        setInputValue("");
    }

    return (
        <div className="flex space-x-2 relative">
            <input
                value={inputValue}
                onChange={handleInputChange}
                className={`px-3 h-10 py-2 border rounded-md w-full sm:w-[300px] ${isError ? 'border-red-500 shake' : ''}`}
                placeholder="Add a new task..."
            />
            <button disabled={inputValue === ""} onClick={handleClickBtn} className=" w-10 h-10 rounded-md font-bold p-2 bg-gray-900 text-white  hover:bg-gray-700 hover:scale-105 transition duration-300">+</button>
            <div
                className={`absolute ${isError ? 'z-10' : 'z-0'}  -bottom-15 sm:-bottom-10 left-0 w-[200px] sm:w-[300px] bg-red-100 text-red-700 border border-red-300 rounded-md px-3 py-2 text-sm shadow-md error-message opacity-1 ${true ? 'show' : ''}`}>
                <p>❌ Only letters and numbers are allowed.</p>
            </div>

        </div>
    );
});

export default CreateTask