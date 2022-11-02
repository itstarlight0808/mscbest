const socketIO = require("socket.io");
const jwt = require("jsonwebtoken");
const config = require("../config");
const { registerMainNamespace } = require("./main");

let io = null;

exports.initSocket = httpServer => {
    io = new socketIO.Server(httpServer, {
        cors: "*"
    })
    io.use((socket, next) => {
        console.log("******SOCKET Middleware*********")
        const token = socket.handshake.auth.token;

        jwt.verify(token, config.JWT_SECRET, (err, decode) => {
            if (err) {
                console.log(err)
                return next(new Error("invalid token"));
            }
            socket.userId = socket.handshake.auth.userId;
            next();
        });
    })

    registerMainNamespace(io);
}