
const EVENTS = {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    MESSAGE: 'message'
};

export default (http: any) => {
    let io = require('socket.io')(http)
    io.on(EVENTS.CONNECT, (socket: any) => {
        socket.on(EVENTS.MESSAGE, (msg: any) => {
            socket.emit(EVENTS.MESSAGE,
                `${msg}`
            )
        })

        socket.on(EVENTS.DISCONNECT, (socket: any) => {
            socket.emit("user left")
        })
    })
}