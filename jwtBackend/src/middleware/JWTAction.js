require('dotenv').config();
import jwt from "jsonwebtoken";

let unsecurePath = ["/", "/login", "register"]

const createToken = (payload) => {
    let key = process.env.JWT_SECRET;
    let data = null;

    // Synchronous
    try {
        let token = jwt.sign(payload, key, {expiresIn: process.env.JWT_EXPIRES_IN});
        data = token;
    } catch(err) {
        console.log(err);
    }
    
    return data;
    
    // Asynchronous
    // jwt.sign(payload, key, function(err, token) {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         console.log(token);
    //         data = token;
    //     }
    // })
    // return data;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let data = null;

    // Synchronous
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch(err) {
        console.log(err);
    }
    return data;

    // Asynchronous
    // jwt.verify(token, key, function(err, decoded) {
    //     if(err) {
    //         console.log(err);
    //     } else {
    //         data = decoded;
    //     }
    // })
    // return data;
}

const checkUserJWT = (req, res, next) => {
    if(unsecurePath.includes(res.path)) {
        return next();
    }

    let cookies = req.cookies;
    if(cookies && cookies.jwt) {
        let decoded = verifyToken(cookies.jwt);

        if(decoded) {
            req.user = decoded
            next();
        } else {
            return res.status(401).json({
                EM: "Not authenticated the user.",
                EC: -1,
                DT: ""
            })
        }
    } else {
        return res.status(401).json({
            EM: "Not authenticated the user.",
            EC: -1,
            DT: ""
        })
    }
}

const checkUserPermission = (req, res, next) => {   
    if(unsecurePath.includes(res.path)) {
        return next();
    }

    if(req.user) {
        let email = req.user.email;
        let roles = req.user?.groupWithRoles?.Roles;

        if(!roles || roles.length === 0) {
            return res.status(403).json({
                EM: "You don't permission to access this resource.",
                EC: -1,
                DT: ""
            })
        }

        let canAccess = roles.some(item => item.url === req.path);

        if(canAccess) {
            next();
        } else {
            return res.status(403).json({
                EM: "You don't permission to access this resource.",
                EC: -1,
                DT: ""
            })
        }
    } else {
        return res.status(401).json({
            EM: "Not authenticated the user.",
            EC: -1,
            DT: ""
        })
    }
}

module.exports = {
    createToken,
    verifyToken,
    checkUserJWT,
    checkUserPermission,
}