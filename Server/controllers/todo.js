import Todo from "../Models/todo.js";
import User from "../Models/user.js";

export const addTodo = async (req, res) => {
    try {
        const { task, status, date, time, tags } = req.body;
        const user = await User.findById(req.body.user);
        console.log(user, req.body.user);
        const newTodo = new Todo({
            task,
            date,
            time,
            tags,
            user: req.body.user,
        });
        await newTodo.save();
        user.todos.push(newTodo._id);
        await user.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
};

export const fetchTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.params.userId });
        console.log(todos, req.params.userId);
        res.status(200).json(todos);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const { task, status, date, time, tags } = req.body;
        if (!Todo.isValidObjectId(id))
            return res.status(404).send("No todo with that id");
        const updatedTodo = { task, status, date, time, tags, _id: id };
        await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const { id, userId } = req.query;
        if (!Todo.isValidObjectId(id))
            return res.status(404).send("No todo with that id");
        await Todo.findByIdAndRemove(id);
        User.updateOne({ _id: userId }, { $pull: { todos: id } });
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}
