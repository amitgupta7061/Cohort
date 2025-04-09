import { WebSocketServer, WebSocket } from 'ws';

const wss = new WebSocketServer({ port : 8080});

let userCnt = 0;
let allSocket : WebSocket[] = [];

wss.on("connection", (socket) => {
    allSocket.push(socket);
    userCnt = userCnt + 1; 
    console.log("user connected - " +  userCnt);

    socket.on("message", (message) => {
        console.log("message received " + message.toString());
        for(let i = 0; i < allSocket.length; i++){
            const sc = allSocket[i];
            sc.send(message.toString() + " sent from server")
        }
    })
    
})


