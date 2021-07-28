// according to env
if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod');
}
else{ // local development
    console.log("dev mode")
    module.exports = require('./dev');
}