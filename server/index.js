const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const config = require('./config/key');
const userRouter = require('./routes/user');
const favoriteRouter = require('./routes/favorite');
const commentRouter = require('./routes/comment');

const port = 5000;
const app = express();

// application/json
app.use(express.json());
app.use(cookieParser());
// application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// connect to DB
mongoose.connect( config.mongoURI, {
    // error 방지
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('MongoDB connected...'))
.catch( err => console.log(err));

app.use('/api/users', userRouter);

app.use('/api/favorite', favoriteRouter);

app.use('/api/comment', commentRouter);

app.listen(port, () => console.log(`Listening on port ${port}...`))