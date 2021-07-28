const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 5
    },
    lastName: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

// 화살표함수 쓰면 안 된다. 
userSchema.pre('save', function(next){
    let user = this;

    if(user.isModified('password')){
        // encrypt password
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err);
                user.password = hash;
                next();
            });
        });
    }
    else next();
})

/* 
Static methods apply to the entire model on which they are defined 
whereas instance methods apply only to a specific document within the collection. 
this in the context of a static method returns the entire model 
whereas this in the context of an instance method returns the document.

instance method는 document에 적용되는 method이며
static method는 model에 적용 되는 method이다.

일반적으로 instance method는 query로 찾은 document에 적용하는 method를 정의하기 위해 쓰고,
static method는 model을 통해 query를 하기위해 쓰인다. 
*/

// method를 할당하는 경우 화살표함수 쓰면 this가 undefined임: 화살표함수의 this는 언제나 상위 scope의 this를 가리킴
userSchema.methods.comparePassword = function(plainPassword, callback){
    bcrypt.compare(plainPassword, this.password, (err, isMatch) => { // compare user input & DB data
        if(err) return callback(err);
        callback(null, isMatch);
    })
};
// 화살표함수 쓰면 this가 undefined임
userSchema.methods.generateToken = function(callback) { // (err, user)
    let user = this;

    // create token using jsonwebtoken
    let token = jwt.sign(user._id.toHexString(), 'secret')

    user.token = token;
    user.save((err, doc) => {
        if(err) return callback(err);
        callback(null, user);
    })
    
}

userSchema.statics.findByToken = function(token, callback){
    let user = this;

    // decode token -> get decoded id
    jwt.verify(token, 'secret', (err, decoded) => {
        // compare client token & token in DB
        user.findOne({"_id": decoded, "token": token}, (err, user) => {
            if(err) return callback(err);
            callback(null, user);
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = {User};