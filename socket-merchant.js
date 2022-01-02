const io = require("socket.io-client")
const server = io("http://localhost:8000/requisition",{
              query: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTgyNGYwNjJhNmIwNDlhNGM5ZmI0MCIsImlhdCI6MTYxNjQxMjAwMn0.6x_P_5Dv6qnhx4VqHKBkuyWmso-2hQhHt9hzB0Ql2_0"
              }
            });
server.on("connect", () => {
    console.log("socket connected")
})

server.on("hello", (data) => {
    console.log("received", data)
})

server.on("invalidConnection", (data)=>{
    console.log(data)
})

//user creates a requisition
//the id will be used as the room name
//the expected users would be user and the merchant
server.emit("createRequisition", "60584166eb4dbd1ce4b24266")

server.on("newUser", (res)=>console.log(res))

server.on("err", (err)=>console.log(err));

// games.on("success", (res) => console.log(res));




