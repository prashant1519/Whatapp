import { Server } from "socket.io";

const io = new Server(9000, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userData, socketId) => {
  // console.log(userData, "userData");
  // console.log(!users.some((user) => user.sub == userData.sub));
  if (!users.some((user) => user.sub == userData.sub)) {
    console.log(userData, "userdata below some");
    if (userData) {
      console.log(userData, "userData");
      users.push({ userData, socketId });
    }
  }
};
io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("addUsers", (userData) => {
    console.log("hello");
    addUser(userData, socket.id);
    console.log(users, "users inside addUsers");
    io.emit("getUsers", users);
  });
});
