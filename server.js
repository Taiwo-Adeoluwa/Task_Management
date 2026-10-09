require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/database')

const taskRouter = require('./routes/taskRouter')

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/api/v1/task', taskRouter);

const PORT = process.env.PORT || 3122;

const startServer = async () => {
try {
await connectDB();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
} catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
}

};

startServer();