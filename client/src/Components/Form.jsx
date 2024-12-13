import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/Slice/TodoSlice/TodoSlice";
import { createTodo } from "../redux/Slice/TodoSlice/TodoSlice";
import { useSelector } from "react-redux";
import { selectUserDetails } from "../redux/Slice/userSlice/userSelector";
import { updateLocalTodo } from "../redux/Slice/TodoSlice/TodoSlice";
import { updateTodo } from "../redux/Slice/TodoSlice/TodoSlice";
import { resetForm } from "../redux/Slice/FormSlice/formSlice";
import { closeForm } from "../redux/Slice/FormSlice/formSlice";
import { selectFormData } from "../redux/Slice/FormSlice/form.selector";
import { selectFormFocused } from "../redux/Slice/FormSlice/form.selector";
import { selectFormType } from "../redux/Slice/FormSlice/form.selector";
import { openForm } from "../redux/Slice/FormSlice/formSlice";


const Form = () => {
    
    

    const dispatch = useDispatch();
    const userDetails = useSelector(selectUserDetails);
    const formData = useSelector(selectFormData);
    const focused = useSelector(selectFormFocused);
    const formtype = useSelector(selectFormType);

    const [tags, setTags] = useState(formData.tags);
    const [tag, setTag] = useState(formData.tag);
    const [task, setTask] = useState(formData.task);
    const [date, setDate] = useState(formData.date);
    const [time, setTime] = useState(formData.time);

    useEffect(() => {
        setTags(formData.tags);
        setTag(formData.tag);
        setTask(formData.task);
        setDate(formData.date);
        setTime(formData.time);
    }, [formData]);

    const reset = () => {
        dispatch(resetForm());
    };

    const open = () => {
        dispatch(openForm());
    }

    const close = () => {
        dispatch(closeForm());
    }

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log(formData);
        if (formtype === "add") {
            dispatch(addTodo({_id: 'temp', task, date, time, tags, user: userDetails._id}));
            dispatch(createTodo({_id: 'temp', task, date, time, tags, user: userDetails._id }));
        } else {
            dispatch(updateLocalTodo({...formData, task, date, time, tags, user: userDetails._id }));
            dispatch(updateTodo({...formData, task, date, time, tags, user: userDetails._id }));
        }
        dispatch(closeForm());
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
                    onFocus={()=>{open()}}
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
                            onClick={close}
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
