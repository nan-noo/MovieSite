const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const {User} = require('./models/User');
const config = require('./config/key');
const {auth} = require('./middleware/auth');
const router = require('./routes/user');

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

app.get('/', (req, res) => res.send('Hello World! hihi'));

app.get('/api/hello', (req, res) => res.send('welcome!!'));

app.use('/api/users', router);

app.listen(port, () => console.log(`Listening on port ${port}...`))