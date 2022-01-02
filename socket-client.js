const io = require("socket.io-client")
const server = io("http://localhost:8000/requisition",{
              query: {
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNTgyN2Y4OWUxMDUyMGZlMGVkNmFkZiIsImlhdCI6MTYxNjQwMDUyOX0.i-LUIW6JZkAMAWPp64M70rynGNlK5YDUKWczePRSnDk"
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




