const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const bodyPareser = require("body-parser");

const ACTIONS = require("../frontend/src/actions");
const { generateFile } = require("./generateFile");
const { executePython } = require("./execPython");
const executeJs = require("./execJs");
const path = require("path");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server);
app.use(bodyPareser.urlencoded({ extended: false }));
app.use(bodyPareser.json());

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

console.log(path.resolve(__dirname, "..", "frontend", "build", "index.html"));
app.post("/run", async (req, res, next) => {
  const { language = "py", code } = req.body;
  if (code == "") {
    return res.json({ success: false, error: "empty Code body" }).status(400);
  }

  try {
    const filePath = await generateFile(language, code);
    let output;
    switch (language) {
      case "py":
        output = await executePython(filePath);
        break;
      case "js":
        output = await executeJs(filePath);
      default:
        break;
    }
    return res.status(200).json({ filePath, output });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
});

let socketIdMapUsername = {};

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

io.on("connection", (socket) => {
  console.log("socket connected : ", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    socketIdMapUsername[socket.id] = username;
    socket.join(roomId);

    // notify every user in the room that XXXXX has joined the room
    const clients = getAllConnectedClients(roomId);
    console.log(clients);
    clients.forEach((client) => {
      socket.to(client.socketId).emit(ACTIONS.JOINED, {
        username,
        clients,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGED, ({ roomId, code, output, language }) => {
    socket.in(roomId).emit(ACTIONS.SYNC_CODE, {
      code,
      output,
      language,
    });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: socketIdMapUsername[socket.id],
      });
    });
    delete socketIdMapUsername[socket.id];
    socket.leave();
  });
});

server.listen(5000, () => {
  console.log("Listening on port 5000");
});
