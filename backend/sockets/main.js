
const namespace = "/";
let io = null;

exports.registerMainNamespace = rIO => {
    io = rIO;
    const mainNamespace = io.of(namespace);

    mainNamespace.on("connection", socket => {
        console.log("new client socket connected...", socket.id)

        socket.on("message", arg => {
            console.log("message received\n ", arg);
        })
    })
}
exports.sendSocketNotification = ({ userId, ...params }) => {
    const mainNamespace = io.of(namespace);

    for(let [id, socket] of mainNamespace.sockets) {
        if(socket.userId === userId) {
            socket.emit("notification:add", params);
            return;
        }
    }
}