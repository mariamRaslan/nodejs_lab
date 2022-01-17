const express = require("express");
const {Todo,validateTodo} = require("../models/todo");
const { auth } = require("../middleware");
const { catchAsyncErrors } = require("../middleware")


const router = express.Router();

router.get("/",catchAsyncErrors( async (req, res) => {
    throw new Error("unable to connect to database")
    const todos = await Todo.find();
    res.json(todos);
}));

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findById(id)
    if (!todo) return res.status(404).json({ message: "todo not found" })
    res.json(todo);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id)
    if (!todo) return res.status(404).json({ message: "todo not found" })
    res.json(todo);
});

router.put("/:id",catchAsyncErrors(async (req, res) => {
    const { error } = validateTodo(req.body);
    if (error) return res.status(400).json({message:error.details[0].message})
    const { id } = req.params;
    const { value } = req.body;
    const todo = await Todo.findById(id)
    if (!todo) return res.status(404).json({ message: "todo not found" })
    todo.value = value;
    
    await todo.save();
    res.json(todo);
}));


router.post("/", auth, async (req, res) => {
    const { error } = validateTodo(req.body);
    if (error) return res.status(400).json({message:error.details[0].message})
    const newtodo = new Todo (req.body);
    await newtodo.save();
    res.json(newtodo);
});

module.exports = router