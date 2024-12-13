import { Router } from "express";
import { addTodo } from "../../controllers/todo.js";
import { fetchTodos } from "../../controllers/todo.js";
import { updateTodo } from "../../controllers/todo.js";
import { deleteTodo } from "../../controllers/todo.js";

const router = Router();

router.post('/add', addTodo);
router.get('/fetch/:userId', fetchTodos);
router.patch('/update', updateTodo);
router.delete('/delete', deleteTodo);

export default router;