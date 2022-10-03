import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";

function Users({ allClients, sidebarActive, roomId, setToast, socketRef }) {
  const navigate = useNavigate();
  const containerStyles = {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    top: "2.8rem",
    right: "0rem",
    height: "100%",
    width: "200px",
    backgroundColor: "rgba(0,0,0,0.5)",
    backdropFilter: "blur(8px)",
    color: "white",
    padding: "0.5rem",
    zIndex: "1",
    transform: `translateX(${sidebarActive ? "0" : "200px"})`,
    transition: "all 0.5s ease",
  };
  const clientsContainerStyles = {
    height: "75%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    minHeight: "300px",
  };
  const buttonsWrapperStyles = {
    display: "block",
    width: "100%",
  };

  const buttonStyle = {
    display: "block",
    fontSize: "1.1rem",
    width: "100%",
    padding: "5px ",
    margin: "10px 0",
    cursor: "pointer",
    borderRadius: "5px",
  };

  async function handleCopyRoom() {
    try {
      await navigator.clipboard.writeText(roomId);
      setToast(() => {
        return {
          message: "Room ID has been copied to your clipboard",
          success: true,
          opacity: 1,
        };
      });
    } catch (err) {
      setToast(() => {
        return {
          message: "Could not copy the Room ID",
          success: false,
          opacity: 1,
        };
      });
      console.error(err);
    }
  }

  return (
    <div className="usersContainer" style={containerStyles}>
      <div className="clientsContainer" style={clientsContainerStyles}>
        {allClients.map((client) => {
          return (
            <div
              className="clientWrap"
              style={{
                width: "60px",
                height: "60px",
                textAlign: "center",
                margin: "10px",
              }}
            >
              <Avatar
                name={client.username}
                size={50}
                round="10px"
                color="#d614c6"
              />
              <span
                className="clientName"
                style={{ fontFamily: "sans-serif", fontSize: "0.8rem" }}
              >
                {client.username}
              </span>
            </div>
          );
        })}
      </div>

      <div className="buttons" style={buttonsWrapperStyles}>
        <button
          style={buttonStyle}
          onClick={() => {
            handleCopyRoom();
          }}
        >
          Copy Room ID
        </button>
        <button
          style={{
            ...buttonStyle,
            backgroundColor: "#dd2f2f",
            color: "white",
            fontWeight: "900",
          }}
          onClick={() => {
            navigate("/");
          }}
        >
          Leave
        </button>
      </div>
    </div>
  );
}

export default Users;
