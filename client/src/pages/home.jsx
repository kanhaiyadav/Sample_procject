import Form from "../Components/Form";
import { useSelector } from "react-redux";
import { selectTodos } from "../redux/Slice/TodoSlice/todo.selector";
import { MdAccessTime } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { setForm } from "../redux/Slice/FormSlice/formSlice";
import { openForm } from "../redux/Slice/FormSlice/formSlice";
import { setFormType } from "../redux/Slice/FormSlice/formSlice";

const Home = () => {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const edit = (todo) => {
        dispatch(setForm(todo));
        dispatch(openForm());
        dispatch(setFormType("edit"));
    };
    console.log(todos);
    return (
        <div className="w-[60%] flex flex-col gap-4">
            <Form />
            <main className="w-full flex-1 bg-gray-50 shadow-md rounded-3xl p-8">
                <div className="flex flex-col gap-2">
                    {todos.map((todo, index) => (
                        <div
                            key={index}
                            className={`flex flex-col px-4 py-2 text-black shadow-md rounded-xl
                             border-x-2 border-green-400
                            `}
                        >
                            <p className="p-0 m-0">{todo.task}</p>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-4">
                                    <span className="text-gray-600 text-sm flex gap-1 items-center">
                                        <LuCalendarDays />
                                        {todo.date}
                                    </span>
                                    <span className="text-gray-600 text-sm flex gap-1 items-center">
                                        <MdAccessTime />
                                        {todo.time}
                                    </span>
                                    <FaRegStar className="text-md text-gray-500 relative top-[1px] hover:text-green-500" />
                                    <FiEdit
                                        className="text-md text-gray-500 relative top-[1px] hover:text-green-500"
                                        onClick={() => {
                                            edit(todo);
                                        }}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    {todo.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="bg-green-50 outline-2 outline outline-green-400 text-gray-600 px-2 py-0 text-sm rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;
