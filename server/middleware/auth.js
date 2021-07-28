const {User} = require('../models/User');

let auth = (req, res, next) => {
    // 인증 처리
    // get token from client cookie
    // decode token and find user ? okay : no!
    let token = req.cookies.x_auth;

    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false, 
            error: true
        });

        // 편의를 위해 저장
        req.token = token;
        req.user = user;

        next(); // middleware이기 때문
    });
};

module.exports = {auth};