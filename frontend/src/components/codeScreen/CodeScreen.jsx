import React, { useEffect, useRef, useState } from "react";
import EditorComp from "./EditorComp";
import Videos from "./Videos";
import "../../styles/codeScreen.css";
import { initSocket } from "../../socket";
import ACTIONS from "../../actions";
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Toast from "../Toast";
import Users from "../Users";
import menu from "../../icons/menu.png";

import OutputComp from "./OutputComp";

function CodeScreen() {
  const [language, setLanguage] = useState("py");
  let socketRef = useRef(null);
  const [output, setOutput] = useState("");
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  // refs
  const codeRef = useRef("");
  const [toast, setToast] = useState({
    message: "",
    success: true,
    opacity: 0,
  });
  const [allClients, setAllClients] = useState([]);
  const [sidebarActive, setSidebarActive] = useState(false);

  // change code input
  function handleCodeInput(code) {
    codeRef.current = code;
  }

  // handle code run (make request to backend)
  async function handleRun() {
    if (codeRef.current.trim() === "") return;

    setOutput("executing...");
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language,
        code: codeRef.current,
      }),
    });
    const data = await res.json();

    // if there is error
    if (data.hasOwnProperty("error")) {
      let op = "Error : ";
      const error = data.error;
      let stderr = "";
      if (language === "py") stderr = error.stderr.split(",")[1];
      else if (language === "js") {
        stderr = error.stderr;
        op += "Line: ";
      }
      op += stderr;
      setOutput(op);
      socketRef.current.emit(ACTIONS.OUTPUT_CHANGED, { roomId, output: op });
    } else {
      // print the output
      const op = data.output;
      setOutput(op);
      socketRef.current.emit(ACTIONS.OUTPUT_CHANGED, { roomId, output: op });
    }
  }

  // error handling in case of socket error
  function handleError(err) {
    console.log("socket error: ", err);
    navigate("/");
  }

  // langugae change and emit the langugae change event
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    socketRef.current.emit(ACTIONS.LANGUAGE_CHANGED, {
      roomId,
      language: e.target.value,
    });
  };

  // socket initalization and events
  useEffect(() => {
    const init = async () => {
      if (!socketRef.current) {
        socketRef.current = await initSocket();
        socketRef.current.on("connect_error", (err) => handleError(err));
        socketRef.current.on("connect_failed", (err) => handleError(err));

        // emit join event
        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state,
        });

        // listen to joined event
        socketRef.current.on(
          ACTIONS.JOINED,
          ({ username, clients, socketId }) => {
            setAllClients(clients);
            // dont show joined messaege to user itself
            if (location.state !== username) {
              setToast(() => {
                return {
                  success: true,
                  message: `${username} joined`,
                  opacity: 1,
                };
              });
            }
            // emit event to server to sync code on join
            // socketRef.current.emit(ACTIONS.SYNC_CODE, {
            //   code,
            //   output,
            //   language,
            //   socketId,
            // });
          }
        );

        // listen to output changed event
        socketRef.current.on(ACTIONS.OUTPUT_CHANGED, ({ output }) => {
          if (output !== null) setOutput(output);
        });

        socketRef.current.on(ACTIONS.LANGUAGE_CHANGED, ({ language }) => {
          setLanguage(language);
        });
      }

      // listen on disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        setAllClients((pre) =>
          pre.filter((client) => client.socketId !== socketId)
        );
        setToast(() => {
          return {
            success: true,
            message: `${username} left the room`,
            opacity: 1,
          };
        });
      });
    };

    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
      }
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setToast((pre) => {
        return {
          ...pre,
          opacity: 0,
        };
      });
    }, 3000);
  }, [toast.opacity, toast.message, toast.success]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div
      className="container"
      style={{
        height: "calc(100% - 44px)",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "5px",
        paddingBottom: 0,
      }}
    >
      <section className="left" style={{ height: "100%", width: "60%" }}>
        <EditorComp
          handleRun={handleRun}
          handleCodeInput={handleCodeInput}
          socketRef={socketRef}
          roomId={roomId}
          language={language}
          handleLanguageChange={handleLanguageChange}
        />
      </section>
      <section className="right" style={{ height: "100%", width: "38%" }}>
        <OutputComp
          output={output}
          socketRef={socketRef}
          setOutput={setOutput}
        />
        <Videos />
      </section>
    </div>
  );
}

export default CodeScreen;
{
  /* <button
        className="usersBtn"
        onClick={() => setSidebarActive((pre) => !pre)}
        style={{
          fontSize: "1.2rem",
          padding: "3px 5px",
          color: "black",
          fontWeight: "600",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "30px",
          height: "30px",
        }}
      >
        {sidebarActive ? (
          "X"
        ) : (
          <img src={menu} alt="" width="20px" height="20px" />
        )}
      </button>
      <Users
        allClients={allClients}
        sidebarActive={sidebarActive}
        setToast={setToast}
        roomId={roomId}
        socketRef={socketRef}
      /> */
}
