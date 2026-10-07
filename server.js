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

app.use('/api/v1', taskRouter);

connectDB();
const PORT = process.env.PORT || 3122;

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
});