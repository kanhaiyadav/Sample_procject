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
import { IoTrashOutline } from "react-icons/io5";
import { RiCheckboxMultipleLine } from "react-icons/ri";
import { deleteTodo } from "../redux/Slice/TodoSlice/TodoSlice";
import { deleteLocalTodo } from "../redux/Slice/TodoSlice/TodoSlice";

const Home = () => {
    const dispatch = useDispatch();
    const todos = useSelector(selectTodos);
    const edit = (todo) => {
        dispatch(setForm(todo));
        dispatch(openForm());
        dispatch(setFormType("edit"));
    };

    const deleteTd = (todo) => {
        dispatch(deleteLocalTodo(todo._id));
        dispatch(deleteTodo({ id: todo._id, userId: todo.user }));
    };

    return (
        <div className="w-[60%] flex flex-col gap-4">
            <div className="absolute top-0 left-0 flex items-center gap-2 p-4">
                <img src="/icon.svg" alt="" className="h-[40px]" />
                <h1>
                    <span className="text-2xl font-bold text-gray-700 font-f1">
                        Task
                    </span>
                    <span className="text-2xl font-bold text-gray-500 font-f1">
                        Helper
                    </span>
                </h1>
            </div>
            <Form />
            <main className="w-full flex-1 min-h-[50vh] max-h-[60vh] overflow-y-auto bg-gray-50 shadow-[0_5px_20px_2px_rgba(0,0,0,0.2)] rounded-3xl p-8">
                <div className="flex flex-col gap-2">
                    {todos.length === 0 ? (
                        <div className="w-full h-full flex items-center justify-center gap-4 flex-col">
                            <img src="/task_completed.png" alt="" className="w-[150px] mt-[50px]" />
                            <h1 className="text-xl text-gray-500 font-f1">
                                No tasks to show
                            </h1>
                        </div>
                    ) : (
                        todos.map((todo, index) => (
                            <div
                                key={index}
                                className={`flex flex-col px-4 py-2 text-black shadow-md rounded-xl
                             border-x-2 border-green-400 bg-green-50
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
                                        <IoTrashOutline
                                            className="text-lg text-gray-500 relative top-[1px] hover:text-red-500"
                                            onClick={() => {
                                                deleteTd(todo);
                                            }}
                                        />
                                        <RiCheckboxMultipleLine className="text-lg text-gray-500 relative top-[1px] hover:text-green-500" />
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
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;
