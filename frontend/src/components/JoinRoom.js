import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateRandomId } from "../hepler";
import "../joinRoom.css";
import Toast from "./Toast";

function JoinRoom() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [opacity, setOpacity] = useState(0);
  const [toast, setToast] = useState({
    success: true,
    message: "",
  });

  const handleRoomCreate = () => {
    const rnd = generateRandomId(6);
    setRoomId(rnd);
    setToast(() => {
      return { success: true, message: "Room Created" };
    });
    setOpacity(1);
  };

  const handleRoomJoin = () => {
    if (roomId.trim() === "" || username.trim() === "") {
      setToast(() => {
        return {
          message: "Username and Room Id required",
          success: false,
        };
      });
      setOpacity(1);
      return;
    } else {
      navigate(`/editor/${roomId}`, {
        state: username,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setOpacity(0);
    }, 3000);
  }, [roomId, toast.message, toast.success]);

  return (
    <div className="joinContainer">
      <Toast
        success={toast.success}
        message={toast.message}
        opacity={opacity}
      />

      <div className="joinRoomWrapper">
        <div className="heading">
          <h1>Code Compiler</h1>
        </div>
        <div className="inputGroup">
          <label htmlFor="">Enter Invitation Room Id : </label>
          <input
            type="text"
            placeholder="Room Id"
            required
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button className="joinBtn" onClick={handleRoomJoin}>
          Join
        </button>
        <p>
          Dont have a room :{" "}
          <span onClick={() => handleRoomCreate()}>Create Room</span>
        </p>
      </div>
    </div>
  );
}

export default JoinRoom;
