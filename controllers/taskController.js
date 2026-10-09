const taskModel = require('../models/taskModel');

exports.createTask = async(req, res) => {
    try{
        const { title, description, status, dueDate } = req.body;

        if(!title || !description || !dueDate){
            return res.status(400).json({
                success: false,
                message: 'Title, description and due date are required'
            });
        }
        const task = await taskModel.create({
            title,
            description,
            status,
            dueDate
        });

        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getAllTasks = async (req, res) => {
try {
const page = parseInt(req.query.page, 10) || 1;
const limit = parseInt(req.query.limit, 10) || 10;

    if (page < 1 || limit < 1 || limit > 100) {
        return res.status(400).json({
            success: false,
            message: 'Page must be at least 1, and limit must be between 1 and 100'
        });
    }

    const skip = (page - 1) * limit;

    const [tasks, totalTasks] = await Promise.all([
        taskModel.find().sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit),
        taskModel.countDocuments()
    ]);

    const totalPages = Math.ceil(totalTasks / limit);

    return res.status(200).json({
        success: true,
        message: 'Tasks retrieved successfully',
        pagination: {
            totalTasks,
            totalPages,
            currentPage: page,
            limit,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
        },
        data: tasks
    });
} catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message
    });
}


};


exports.getTaskById = async(req, res) => {
    try{
        const { id } = req.params;
        const task = await taskModel.findById(id);
        if(!task){
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Task retrieved successfully',
            data: task
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, dueDate } = req.body;

    const task = await taskModel.findByIdAndUpdate(
      id,
      { title, description, status, dueDate },
      {
        new: true,
        runValidators: true
      }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await taskModel.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: task
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}; 
