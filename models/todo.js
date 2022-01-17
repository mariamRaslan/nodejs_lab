const Joi = require("joi");
const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
    value : {
        type: String,
        max:50,
        min:4,
        required: true
    }

});

const Todo = mongoose.model("todo" , todoSchema)

const validationSchema = Joi.object({
    value: Joi.string().min(4).max(50).required()
})
const validateTodo = (todo) =>{
    return validationSchema.validate(todo)
}
module.exports = {Todo,validateTodo}