import { Router } from "express";
import { addTodo } from "../../controllers/todo.js";
import { fetchTodos } from "../../controllers/todo.js";
const router = Router();

router.post('/add', addTodo);
router.get('/fetch/:userId', fetchTodos);

export default router;