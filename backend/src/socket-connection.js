const io = require('socket.io')

let socketServer = null

module.exports = (app, server) => {
    if (socketServer) return socketServer

    socketServer = io(server, {
        cors: {
          origin: "http://localhost:8080",
          methods: ["GET", "POST"]
        }
    });

    socketServer.on('connection', socket => {
        
        socket.on('join-room', eventId => {
            socket.join(eventId)
        })
    })

    return socketServer
}