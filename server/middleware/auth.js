const {User} = require('../models/User');

const auth = (req, res, next) => {
    // 인증 처리
    // get token from client cookie
    // decode token and find user ? okay : no!
    const token = req.cookies.x_auth;

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