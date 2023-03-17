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

import OutputComp from "./OutputComp";
import { useDispatch, useSelector } from "react-redux";
import { codeActions } from "../../store/codeSlice";
import { useAlert } from "react-alert";
import { runCode } from "./logic";
import Sidebar from "../sidebar";
import Circular from "../buttons/circular";
import Menu from "../../icons/Menu";

function CodeScreen() {
  const alert = useAlert();
  const { language, code, output, fileId } = useSelector((state) => state.code);
  let socketRef = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [allClients, setAllClients] = useState([]);
  const [sidebarActive, setSidebarActive] = useState(false);

  // change code input
  function handleCodeInput(code) {
    dispatch(codeActions.setCode({ code }));
    sessionStorage.setItem("code", code);
  }

  // handle code run (make request to backend)
  async function handleRun() {
    if (code.trim() === "") return;

    dispatch(codeActions.setOutput({ output: "executing..." }));
    runCode()
      .then(({ data }) => {
        const op = data.output;
        dispatch(codeActions.setOutput({ output: op }));
        socketRef.current.emit(ACTIONS.OUTPUT_CHANGED, {
          roomId,
          output: op,
        });
      })
      .catch((err) => {
        let op = "Error : ";
        const error = err.split(",");
        let stderr = "";
        console.log(error);
        if (language.val === "py") {
          stderr = error[1];
          if (error[2]) stderr += error[2];
        } else if (language.val === "js") {
          stderr = err;
          op += "Line: ";
        }
        op += stderr;
        dispatch(codeActions.setOutput({ output: op }));
        socketRef.current.emit(ACTIONS.OUTPUT_CHANGED, {
          roomId,
          output: op,
        });
      });
  }

  // error handling in case of socket error
  function handleError(err) {
    console.log("socket error: ", err);
    navigate("/");
  }

  // langugae change and emit the langugae change event
  const handleLanguageChange = (item) => {
    dispatch(codeActions.setLanguage({ val: item.value, id: item.id }));
    socketRef.current.emit(ACTIONS.LANGUAGE_CHANGED, {
      roomId,
      item,
    });
  };

  // socket initalization and events
  useEffect(() => {
    const init = async () => {
      if (!socketRef.current) {
        socketRef.current = await initSocket();
        socketRef.current.on("connect_error", (err) => handleError(err));
        socketRef.current.on("connect_failed", (err) => handleError(err));
        socketRef.current.on("close", (ev) => console.log(ev));
        // emit join event
        socketRef.current.emit(ACTIONS.JOIN, {
          roomId,
          username: location.state,
        });

        // listen to joined event
        socketRef.current.on(
          ACTIONS.JOINED,
          ({ username, clients, joinedUserSocketId, currentUser }) => {
            setAllClients(clients);
            // dont show joined messaege to user itself
            if (location.state !== username) {
              alert.success(`${username} joined the room`);
            }
            // emit event to server to sync code on join

            if (currentUser !== joinedUserSocketId) {
              console.log(code, output, language);
              socketRef.current.emit(ACTIONS.SYNC_CODE, {
                code,
                output,
                language,
                joinedUserSocketId,
              });
            }
          }
        );

        // listen to output changed event
        socketRef.current.on(ACTIONS.OUTPUT_CHANGED, ({ output }) => {
          if (output !== null) dispatch(codeActions.setOutput({ output }));
        });

        socketRef.current.on(ACTIONS.LANGUAGE_CHANGED, ({ item }) => {
          dispatch(codeActions.setLanguage({ val: item.value, id: item.id }));
        });
      }

      // listen on disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        setAllClients((pre) =>
          pre.filter((client) => client.socketId !== socketId)
        );
        alert.success(`${username} left the room`);
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
    const preRoom = sessionStorage.getItem("cr");
    if (preRoom !== roomId && !fileId) {
      sessionStorage.removeItem("code");
      sessionStorage.removeItem("ofn");
      sessionStorage.setItem("cr", roomId);
    }
  }, []);

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
        position: "relative",
      }}
    >
      <Sidebar
        clients={allClients}
        setSidebarActive={setSidebarActive}
        sidebarActive={sidebarActive}
        roomId={roomId}
      />
      <Circular
        styles={{ position: "absolute", top: 0, left: 0 }}
        onClick={() => setSidebarActive(true)}
      >
        <Menu width={"20px"} height={"20px"} color="var(--yellowColor)" />
      </Circular>
      <section
        className="left"
        style={{
          height: "100%",
          width: "60%",
          marginLeft: `${sidebarActive ? "250px" : "40px"}`,
          transition: "all 0.5s ease",
        }}
      >
        <EditorComp
          handleRun={handleRun}
          handleCodeInput={handleCodeInput}
          socketRef={socketRef}
          roomId={roomId}
          handleLanguageChange={handleLanguageChange}
        />
      </section>

      <section
        className="right"
        style={{
          height: "100%",
          width: `${sidebarActive ? "calc(38% - 250px)" : "36%"}`,
          transition: "all 0.5s ease",
        }}
      >
        <OutputComp socketRef={socketRef} />
        {/* <Videos /> */}
      </section>
    </div>
  );
}

export default CodeScreen;
