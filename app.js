const express =require("express");
const socket =require("socket.io");
const http =require("http");
const { Chess } =require("chess.js");
const path =require("path");
const { log } = require("console");
const PORT=3000 || process.env.PORT;

const app=express();

const server=http.createServer(app);
const io=socket(server);

const chess=new Chess();
let players={};
let currentPlayer ="W";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/",(req,res)=>{
    res.render("index.ejs",{title: "Chess game"});
});

io.on("connection",(uniqueSocket)=>{
    console.log("connected");
    

    //assign roles
    if(!players.white){
       players.white=uniqueSocket.id;
       uniqueSocket.emit("playerColor","W");     
    }
    else if(!players.black){
        players.black=uniqueSocket.id;
        uniqueSocket.emit("playerColor","B");
    }else{
        uniqueSocket.emit("spectatorRole");
    }
    
    //if disconnected
    uniqueSocket.on("disconnect",()=>{
        if(uniqueSocket.id === players.white){
            delete players.white;
        }
        else if(uniqueSocket.id === players.black){
            delete players.black;
        }
    });

   //if some move
   uniqueSocket.on("move",(move)=>{
    try{
        if(chess.turn() === "w" && uniqueSocket.id !== players.white) return;
        if(chess.turn() === "b" && uniqueSocket.id !== players.black) return;

        const result=chess.move(move);
        if(result){
            currentPlayer=chess.turn();
            io.emit("move",move);
            io.emit("boardState",chess.fen());
        }else{
            console.log("Invalid move :",move);
            uniqueSocket.emit("InvalidMove",move);
        }

    }
    catch(err){
        console.log(err);
        console.log("Invalid move:",move);

    }
   })
   
});

server.listen(PORT, ()=>{
     console.log("server is running on port: "+PORT);
});
