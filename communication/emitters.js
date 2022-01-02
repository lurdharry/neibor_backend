/*A emitter that accepts the socket.io instance and emits an hello event*/ 
exports.HelloEmitter = (socket) => {
    socket.emit("hello", "welcome_to_games_area")
    console.log("New Client in the games" )
}

