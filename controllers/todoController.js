const Todo = require("../models/todo");

// GET all todos
exports.getTodos = async (req,res)=>{
    try{
        const todos = await Todo.find();
        res.json(todos);

    }catch(error){
        res.status(500).json({
            message:"Server error"
        });
    }
};

// CREATE todo
exports.createTodo = async (req,res)=>{
    try{
        const { text } = req.body;

        const todo = new Todo({ text });

        await todo.save();

        res.status(201).json(todo);

    }catch(error){
        res.status(500).json({
            message:"Server error"
        });
    }
};

// DELETE todo
exports.deleteTodo = async (req,res)=>{
    try{
        await Todo.findByIdAndDelete(req.params.id);

        res.json({
            message:"Todo deleted"
        });

    }catch(error){
        res.status(500).json({
            message:"Server error"
        });
    }
};
