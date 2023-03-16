import React from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { getShortname } from "../../helper";
import Avatar from "../avatar";
import "../../styles/sidebar.css";
import Circular from "../buttons/circular";
import Menu from "../../icons/Menu";

function Sidebar({ clients, roomId, sidebarActive, setSidebarActive }) {
  const alert = useAlert();
  const navigate = useNavigate();
  async function handleCopyRoom() {
    try {
      await navigator.clipboard.writeText(roomId);
      alert.success("Room Id copied");
    } catch (err) {
      alert.error("Room Id cannot be copied");
      console.error(err);
    }
  }
  return (
    <div
      className="sidebarWrapper"
      style={{
        width: "250px",
        height: "100%",
        position: "absolute",
        padding: "10px 0",
        transform: `translateX(${sidebarActive ? "0" : "-200%"})`,
        zIndex: 100,
        background: "var(--backgroundColor)",
        transition: "all 0.5s ease",
      }}
    >
      <Circular className={"closeBtn"} onClick={() => setSidebarActive(false)}>
        <Menu width={"20px"} height={"20px"} color="var(--yellowColor)" />
      </Circular>
      <div className="header">
        <div
          style={{
            color: "white",
            textAlign: "center",

            // background: "pink",
            width: "100%",
            height: "40px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Joined Users
        </div>
      </div>

      <div
        className="allClientsWrapper"
        style={{
          height: "calc(100% - 120px)",
          overflowY: "auto",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        {clients.map((client) => {
          return (
            <div
              className="clientNameWrapper"
              style={{
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar text={getShortname(client.username)} />
              <p
                className="clientName"
                style={{
                  fontSize: "0.9rem",
                  wordWrap: "break-word",
                  textAlign: "center",
                  color: "white",
                  maxWidth: "50px",
                }}
              >
                {client.username.length > 10
                  ? client.username.substr(0, 10) + "..."
                  : client.username}
              </p>
            </div>
          );
        })}
      </div>

      <div className="footer">
        <button
          className="actionBtn copyRoomIdBtn"
          onClick={() => {
            handleCopyRoom();
          }}
        >
          Copy Room ID
        </button>
        <button
          className="actionBtn leaveRoomBtn"
          onClick={() => {
            sessionStorage.removeItem("code");
            navigate("/");
          }}
        >
          Leave
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
