import "../App.css";
import CodeEditor from "./CodeEditor";
import React, { useEffect, useRef, useState } from "react";
import { initSocket } from "../socket";
import ACTIONS from "../actions";
import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import Toast from "./Toast";

function EditorComp() {
  // hooks for data
  let socketRef = useRef(null);
  const editorRef = useRef(null);

  const location = useLocation();
  const { roomId } = useParams();
  const navigate = useNavigate();

  // states
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("py");
  const [theme, setTheme] = useState("monokai");
  const [toast, setToast] = useState({
    message: "",
    success: true,
    opacity: 0,
  });

  // change code input
  function handleCodeInput(e) {
    setCode(() => e);
  }

  // handle code run (make request to backend)
  async function handleRun() {
    if (code.trim() === "") return;
    setOutput("executing...");
    const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/run`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language: language,
        code: code,
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
    } else {
      // print the output
      const op = data.output;
      setOutput(op);
    }
  }

  // error handling in case of socket error
  function handleError(err) {
    console.log("socket error: ", err);
    navigate("/");
  }

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
        socketRef.current.on(ACTIONS.JOINED, ({ username, clients }) => {
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            language,
            output,
            code,
          });

          if (location.state !== username) {
            setToast(() => {
              return {
                success: true,
                message: `${username} joined`,
                opacity: 1,
              };
            });
          }
        });
      }

      socketRef.current.on(ACTIONS.SYNC_CODE, ({ code, output, language }) => {
        setCode(code);
        setOutput(output);
        setLanguage(language);
      });

      // listen on disconnected
      socketRef.current.on(ACTIONS.DISCONNECTED, ({ sockeId, username }) => {
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

  useEffect(() => {
    if (socketRef.current)
      socketRef.current.emit(ACTIONS.CODE_CHANGED, {
        roomId,
        code,
        output,
        language,
      });
  }, [code, output, language, roomId]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  return (
    <div className="App">
      <Toast
        message={toast.message}
        opacity={toast.opacity}
        success={toast.success}
      />
      <h1 className="heading">Code Compiler</h1>
      <div className="container">
        <div className="codeContainer">
          <CodeEditor
            ref={editorRef}
            handleCodeInput={handleCodeInput}
            language={language}
            theme={theme}
            code={code}
          />
          <button className="runBtn" onClick={() => handleRun()}>
            Run
          </button>
        </div>
        <div className="outputContainer">
          <div className="custom">
            <div className="wrapper langWrapper">
              <select
                onChange={(e) => {
                  setLanguage(e.target.value);
                  setOutput("");
                }}
                value={language}
              >
                <option value="py">Python</option>
                <option value="js">JavaScript</option>
              </select>
            </div>
            <div className="wrapper themeWrapper">
              <select onChange={(e) => setTheme(e.target.value)}>
                <option value="monokai">monokai</option>
                <option value="github">github</option>
                <option value="tomorrow">tomorrow</option>
                <option value="solarized_dark">solarized dark</option>
                <option value="twilight">twilight</option>
                <option value="terminal">terminal</option>
              </select>
            </div>
          </div>
          <div className="outputWrapper">
            <h4>Output</h4>
            <textarea readOnly className="output" value={output}></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditorComp;
