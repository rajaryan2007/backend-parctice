const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Serve static files from the "public" folder
app.use(express.static('public'));

const users = new Set();

io.on("connection", (socket) => {
    console.log('A user connected');

    // Listen for join event
    socket.on("join", (userName) => {
        socket.userName = userName; // Save username to socket
        users.add(userName);

        // Notify others
        io.emit('userJoined', userName);

        // Send updated user list to all clients
        io.emit("userList", Array.from(users));
    });

    // Handle incoming chat message
    socket.on("chatMessage", ({ user, message }) => {
        // Broadcast to all clients
        io.emit("chatMessage", { user, message });
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
        if (socket.userName) {
            users.delete(socket.userName);
            io.emit("userList", Array.from(users));
            io.emit("userLeft", `${socket.userName} has left the chat`);
        }
        console.log("A user disconnected");
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
