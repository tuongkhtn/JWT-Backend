require('dotenv').config();
import jwt from "jsonwebtoken";

const createToken = () => {
    let payload = {
        name: 'tuong',
        address: 'quang nam'
    };
    let key = process.env.JWT_SECRET;
    let data = null;

    // Synchronous
    // try {
    //     let token = jwt.sign(payload, key);
    //     console.log(token);
    //     data = token;
    // } catch(err) {
    //     console.log(err);
    // }
    
    // return data;
    
    // Asynchronous
    jwt.sign(payload, key, function(err, token) {
        if(err) {
            console.log(err);
        } else {
            console.log(token);
            data = token;
        }
    })
    return data;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;

    // Synchronous
    // try {
    //     let decoded = jwt.verify(token, key);
    //     data = decoded;
    // } catch(err) {
    //     console.log(err);
    // }
    // return data;

    // Asynchronous
    jwt.verify(token, key, function(err, decoded) {
        if(err) {
            console.log(err);
        } else {
            data = decoded;
        }
    })
    return data;
}

module.exports = {
    createToken,
    verifyToken,
}