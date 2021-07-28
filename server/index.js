const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const {User} = require('./models/User');
const config = require('./config/key');
const {auth} = require('./middleware/auth');

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

app.post('/api/users/register', (req, res) => {
    // register user info to DB
    const user = new User(req.body);

    user.save((err, doc) => {
        if(err) return res.json({registerSuccess: false, err})
        return res.status(200).json({registerSuccess: true})
    });
});

app.post('/api/users/login', (req, res) => {
    // 1. check if there is the same email address in DB
    // 2. if there is, check password
    // 3. if it correct, create token
    
    // 1.
    User.findOne({email: req.body.email}, (err, userInfo) => {
        if(!userInfo){
            return res.json({
                loginSuccess: false,
                message: "일치하는 e-mail이 없습니다."
            });
        }
        userInfo.comparePassword(req.body.password, (err, isMatch) => { // 2.
            if(!isMatch) return res.json({
                loginSuccess: false, 
                message: "잘못된 비밀번호입니다."
            });
            userInfo.generateToken((err, user) => { // 3.
                if(err) return res.status(400).send(err);
                // 쿠키에 토큰 저장
                res.cookie("x_auth", user.token).status(200).json({
                    loginSuccess: true,
                    userId: user._id
                })
            })
        })
        
    })
})

app.get('/api/users/auth', auth, (req, res) => {
    // middleware 통과 -> authentcation success
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false: true, // admin != 0
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastName: req.user.lastName,
        role: req.user.role,
        image: req.user.image
    });
})

app.get('/api/users/logout', auth, (req, res) => {
    User.findOneAndUpdate({_id: req.user._id}, {token: ""}, (err, user) => {
        if(err) return res.json({
            logoutSuccess: false,
            err
        });
        return res.status(200).send({
            logoutSuccess: true
        });
    })
})

app.listen(port, () => console.log(`Listening on port ${port}...`))