const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const bodyPareser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config({ path: __dirname + "/.env" });

const codeRoutes = require("./routes/codeRoutes");
const userRoutes = require("./routes/userRoutes");
const { errorHandler } = require("./middlewares/error");
const ACTIONS = require("../frontend/src/actions");
const sequelize = require("./config/database");
const User = require("./model/user");
const Codes = require("./model/code");
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {});

app.use(bodyPareser.urlencoded({ extended: false }));
app.use(bodyPareser.json());
app.use(cookieParser());

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

app.use(userRoutes);
app.use(codeRoutes);

User.hasMany(Codes, { constraints: true, onDelete: "CASCADE" });

sequelize.sync().then(() => {
  server.listen(process.env.PORT || 5000, () => {
    console.log("Listening on port 5000");
  });
});

app.use(errorHandler);
///////********************* SOCKETS ****************************///// */

let socketIdMapUsername = {};
const maximum = 4;

function getAllConnectedClients(roomId) {
  // Map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: socketIdMapUsername[socketId],
      };
    }
  );
}

const getRoomSize = (roomId) => {
  const allClients = getAllConnectedClients(roomId);
  return allClients.length;
};

// socket related functions
io.on("connection", (socket) => {
  // listener for join event

  console.log("user connected ---->", socket.id);
  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    const usersInRoom = getRoomSize(roomId);
    if (usersInRoom > maximum) {
      socket.to(socket.id).emit(ACTIONS.ROOM_FULL);
      return;
    }

    socketIdMapUsername[socket.id] = username;
    socket.join(roomId);
    // notify every user in the room that XXXXXXX has joined the room
    const clients = getAllConnectedClients(roomId, io);
    clients.forEach((client) => {
      io.to(client.socketId).emit(ACTIONS.JOINED, {
        username,
        clients,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGED, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGED, {
      code,
    });
  });
  socket.on(ACTIONS.OUTPUT_CHANGED, ({ roomId, output }) => {
    console.log("op changed", output);
    socket.in(roomId).emit(ACTIONS.OUTPUT_CHANGED, {
      output,
    });
  });
  socket.on(ACTIONS.LANGUAGE_CHANGED, ({ roomId, language }) => {
    console.log("langugae changed to", language);
    socket.in(roomId).emit(ACTIONS.LANGUAGE_CHANGED, {
      language,
    });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ code, output, language, socketId }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGED, {
      code,
      language,
      output,
    });
  });

  socket.on(ACTIONS.JOIN_VIDEO, ({ roomId }) => {
    console.log("join video called for room id : ", roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach((client) => {
      io.to(client.socketId).emit(ACTIONS.ALL_USERS, { clients });
    });
  });

  socket.on(ACTIONS.OFFER, ({ sdp }) => {
    console.log("in offer");
    socket.broadcast.emit(ACTIONS.GET_OFFER, { sdp });
  });

  socket.on(ACTIONS.ANSWER, ({ sdp }) => {
    console.log("in answer");
    socket.broadcast.emit(ACTIONS.GET_ANSWER, { sdp });
  });

  socket.on(ACTIONS.CANDIDATE, ({ candidate }) => {
    console.log("in candidate", candidate);
    socket.broadcast.emit(ACTIONS.GET_CANDIDATE, { candidate });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((rid) => {
      socket.in(rid).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: socketIdMapUsername[socket.id],
      });
    });
    console.log("user disconnet->", socket.id);
    delete socketIdMapUsername[socket.id];
    socket.leave();
  });
});
