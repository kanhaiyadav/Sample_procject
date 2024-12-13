import Form from "../Components/Form";
import { useSelector } from "react-redux";
import { selectTodos } from "../redux/Slice/TodoSlice/todo.selector";

const Home = () => {
    const todos = useSelector(selectTodos);
    console.log(todos);
    return (
        <div className="w-[60%] flex flex-col gap-4">
            <Form />
            <main className="w-full flex-1 bg-gray-50 shadow-md rounded-3xl p-8">
                <div className="flex flex-col gap-2">
                    {todos.map((todo) => (
                        <div
                            key={todo._id}
                            className="flex flex-col gap-2 p-4 text-black bg-white shadow-md rounded-xl"
                        >
                            <p>{todo._id}</p>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Home;
