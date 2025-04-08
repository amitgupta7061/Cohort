import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port : 8000});

wss.on("connection", function(socket){

    console.log('User connected')
    // setInterval(() => {
    //     socket.send("Current price of solana is " + Math.random());
    // }, 5000)

    socket.on("message", (event) => {
        if(event.toString() == "ping"){
            socket.send("pong");
        }
    })
})