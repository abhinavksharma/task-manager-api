//const express = require('express');

app.all('*',(req,res,next)=>{

    //const error = new Error('can't find ${req.originalurl}``);
})

app.use((error,req,res,next)=>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    res.status(error.statusCode).json({
        status:error.status,
        message: message

    });
    next();
});

module.exports = handleErrorCodes;