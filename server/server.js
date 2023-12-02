import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});
io.on("connection", (socket) => {
    console.log("socket connected", socket.id);
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`user with id ${socket.id} in room ${data}`);
    });
    socket.on("send_message", (data) => {
        // console.log(data, "this is the message");
        socket.to(data.room).emit("recieve_msg",data)
    
    });
    io.on("disconnect", () => {
        console.log(socket.id, "disconnected");
    });
});
server.listen(1010, () => console.log("server started on 1010"));
