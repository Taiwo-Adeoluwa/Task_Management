const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'in progress', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: true
    },
},{ timestamps: true });

const taskModel = mongoose.model('Task', taskSchema);

module.exports = taskModel;