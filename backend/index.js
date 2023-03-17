const express = require("express");
const cors = require("cors");
const http = require("http");
const bodyPareser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

require("dotenv").config({ path: __dirname + "/.env" });
const ACTIONS = require("../frontend/src/actions");
const codeRoutes = require("./routes/codeRoutes");
const userRoutes = require("./routes/userRoutes");
const roomRoutes = require("./routes/roomRoutes");
const { errorHandler } = require("./middlewares/error");

const app = express();
app.use(
  cors({
    credentials: true,
    origin: true,
  })
);

const server = http.createServer(app);

app.use(bodyPareser.urlencoded({ extended: false }));
app.use(bodyPareser.json());
app.use(cookieParser());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(userRoutes);
app.use(codeRoutes);
app.use("/room", roomRoutes);

/***********************    SOCKETS   *******************************/

//   let socketIdMapUsername = {};
let socketIdMapUsername = new Map();
//   const maximum = 4;

function getAllRooms() {
  return Array.from(io.sockets.adapter.rooms);
}

function isRoomIdEmpty(id) {
  const allRooms = getAllRooms();
  if (allRooms.length === 0) return true;
  let room = allRooms.find((item) => item[0] === id);
  if (room) return false;
  else return true;
}

function validateRoomId(id) {
  const allRooms = getAllRooms();
  if (allRooms.length === 0) return true;
  let room = allRooms.find((item) => item[0] === id);
  if (room) return true;
  else return false;
}

function validateRoomExist(id) {
  const allRooms = getAllRooms();
  if (allRooms.length === 0) return false;
  let room = allRooms.find((item) => item[0] === id);
  if (room) return true;
  else return false;
}

function getAllConnectedClients(roomId) {
  // Map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: socketIdMapUsername.get(socketId),
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
    //   if (usersInRoom) {
    //     socket.to(socket.id).emit(ACTIONS.ROOM_FULL);
    //     return;
    //   }

    socketIdMapUsername.set(socket.id, username);
    //   socketIdMapUsername[socket.id] = username
    socket.join(roomId);
    /* notify every user in the room that XXXXXXX has joined the room */
    const clients = getAllConnectedClients(roomId, io);

    //   console.log("all rooms : ", getAllRooms());
    clients.forEach((client) => {
      // if (client.socketId !== socket.id)
      io.to(client.socketId).emit(ACTIONS.JOINED, {
        username,
        clients,
        currentUser: client.socketId,
        joinedUserSocketId: socket.id,
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
  socket.on(ACTIONS.LANGUAGE_CHANGED, ({ roomId, item }) => {
    console.log("langugae changed to", item);
    socket.in(roomId).emit(ACTIONS.LANGUAGE_CHANGED, {
      item,
    });
  });

  socket.on(
    ACTIONS.SYNC_CODE,
    ({ code, output, language, joinedUserSocketId }) => {
      io.to(joinedUserSocketId).emit(ACTIONS.CODE_CHANGED, {
        code,
        language,
        output,
      });
    }
  );

  // socket.on(ACTIONS.JOIN_VIDEO, ({ roomId }) => {
  //   console.log("join video called for room id : ", roomId);
  //   const clients = getAllConnectedClients(roomId);
  //   clients.forEach((client) => {
  //     io.to(client.socketId).emit(ACTIONS.ALL_USERS, { clients });
  //   });
  // });

  // socket.on(ACTIONS.OFFER, ({ sdp }) => {
  //   console.log("in offer");
  //   socket.broadcast.emit(ACTIONS.GET_OFFER, { sdp });
  // });

  // socket.on(ACTIONS.ANSWER, ({ sdp }) => {
  //   console.log("in answer");
  //   socket.broadcast.emit(ACTIONS.GET_ANSWER, { sdp });
  // });

  // socket.on(ACTIONS.CANDIDATE, ({ candidate }) => {
  //   console.log("in candidate", candidate);
  //   socket.broadcast.emit(ACTIONS.GET_CANDIDATE, { candidate });
  // });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((rid) => {
      socket.in(rid).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        //   username: socketIdMapUsername[socket.id],
        username: socketIdMapUsername.get(socket.id),
      });
    });
    console.log("user disconnet->", socket.id);
    //   delete socketIdMapUsername[socket.id];
    socketIdMapUsername.delete(socket.id);
    socket.leave();
  });
});

mongoose.connect(process.env.MONGO_URL).then((res) => {
  console.log("database connected");
  server.listen(process.env.PORT || "5000", () => {
    console.log(`server running at port ${process.env.PORT}`);
  });
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit();
  });
});

/*******************           deploy           ******************* */
app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
///////////////////////////////////////////////////////////////////////////

app.use(errorHandler);

module.exports.isRoomIdEmpty = isRoomIdEmpty;
module.exports.validateRoomId = validateRoomId;
module.exports.validateRoomExist = validateRoomExist;

module.exports.app = app;
