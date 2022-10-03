import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/joinOrCreateRoom.css";

import ArrowRight from "../icons/ArrowRight";
import Heading from "../components/Heading";

function JoinOrCreateRoom() {
  const naviagte = useNavigate();

  return (
    <div className="container">
      <Heading shadow={true} />
      <div
        className="wrapper"
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <div
          className="transparentCard"
          style={{
            width: "40%",
            height: "fit-content",
            maxWidth: "300px",
          }}
        >
          <div
            className="innerWrapper"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 className="emoji">💻</h1>
            <button
              onClick={() => naviagte("/createRoom")}
              className="actionBtn createBtn"
            >
              Create Room
              <ArrowRight
                color="#FFD90F"
                width="50px"
                height="40px"
                margin="0 0 0 1rem"
              />
            </button>
          </div>
        </div>
        <div
          className="transparentCard"
          style={{
            width: "40%",
            height: "fit-content",
            maxWidth: "300px",
          }}
        >
          <div
            className="innerWrapper"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1 className="emoji">🚀</h1>
            <button
              className="actionBtn joinBtn"
              onClick={() => naviagte("/joinRoom")}
            >
              Join Room{" "}
              <ArrowRight
                width="50px"
                height="40px"
                margin="0 0 0 1rem"
                color="#63D776"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JoinOrCreateRoom;
