import { useState } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/Slice/TodoSlice/TodoSlice";
import { createTodo } from "../redux/Slice/TodoSlice/TodoSlice";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../redux/Slice/userSlice/userSelector";

const Form = () => {
    const [focused, setFocused] = useState(false);
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState("");
    const [task, setTask] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [time, setTime] = useState("00:00");

    const dispatch = useDispatch();
    const userDetails = useSelector(selectUserDetails);

    const reset = () => {
        setTask("");
        setDate(new Date().toISOString().split("T")[0]);
        setTime("00:00");
        setTags([]);
    };

    const handleSubmit = (e) => {
        e.preventDefault;
        const todo = {
            _id: "temp",
            task: task,
            date: date,
            time: time,
            tags: tags,
            user: userDetails._id,
        };
        console.log(todo);
        dispatch(addTodo(todo));
        dispatch(createTodo(todo));
        reset();
        setFocused(false);
    };

    return (
        <div className="flex flex-col w-full p-0 transition-all items-center">
            <div
                className={`px-4 py-4 ${
                    focused
                        ? "bg-white h-[120px] border-b-4 border-green-400"
                        : "bg-gray-50 h-[60px]"
                } rounded-xl text-xl shadow-[0_1px_3px_1px_rgba(0,0,0,0.1)] focus-within:shadow-md z-10 transition-all duration-500
          w-full 
          flex flex-col
          `}
            >
                <textarea
                    placeholder="Enter your todo"
                    className=" outline-none peer w-full h-full bg-transparent flex-1"
                    required
                    onFocus={() => setFocused(true)}
                    onChange={(e) => setTask(e.target.value)}
                    value={task}
                />
                <div
                    className={`flex w-full h-fit ${
                        focused ? "block" : "hidden"
                    } gap-8`}
                >
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="text-sm text-gray-500 outline-none"
                    />
                    <input
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="text-sm text-gray-500"
                    />
                </div>
            </div>
            {focused && (
                <motion.div
                    initial={{ opacity: 0, y: -100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, type: "tween", delay: 0.2 }}
                    className=" flex items-center justify-between bg-green-100 border-2 border-t-0 border-green-400 w-[98%] p-4 rounded-b-xl z-[5] shadow-sm"
                >
                    <form
                        className="flex shadow-md rounded-full"
                        onSubmit={(e) => {
                            e.preventDefault();
                            setTags([...tags, tag]);
                            setTag("");
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Add Tags..."
                            className="py-2 px-4 rounded-l-full text-lg bg-white outline-none text-gray-600"
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="py-2 px-4 text-lg rounded-r-full bg-green-400 text-white hover:bg-green-500 transition-all"
                        >
                            Add
                        </button>
                    </form>
                    <div className="flex items-center gap-4">
                        <Button onClick={handleSubmit}>Submit</Button>
                        <Button
                            onClick={() => {
                                reset();
                                setFocused(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button onClick={reset}>Reset</Button>
                    </div>
                </motion.div>
            )}
            <div className="w-[98%] flex gap-2 mt-2">
                {tags.map((tag, index) => {
                    return (
                        <div
                            key={index}
                            className="gap-1 w-fit bg-green-100 text-gray-500 outline outline-2 outline-green-400 text-md px-2 py-1 rounded-full flex items-center cursor-default"
                        >
                            <span className="mt-[-2px]">{tag}</span>
                            <span
                                className="text-xl text-green-500 hover:text-red-500"
                                onClick={() => {
                                    setTags(tags.filter((t, i) => i !== index));
                                }}
                            >
                                <IoClose />
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default Form;
