import React from "react";
import JavaScriptIcon from "../../icons/JavaScriptIcon";
import PlayIcon from "../../icons/PlayIcon";
import PythonIcon from "../../icons/PythonIcon";
import CodeEditor from "./CodeEditor";

function EditorComp({
  handleRun,
  handleCodeInput,
  socketRef,
  roomId,
  language,
  handleLanguageChange,
}) {
  return (
    <div className="codeEditorWrapper">
      <div className="codeContainer">
        <CodeEditor
          handleCodeInput={handleCodeInput}
          socketRef={socketRef}
          roomId={roomId}
        />
        <div className="buttonsWrapper">
          <button
            className="actionBtn runBtn"
            style={{ marginLeft: "10px" }}
            onClick={handleRun}
          >
            Run
            <PlayIcon width="20px" height="30px" margin="0 0 0 5px" />
          </button>
          <button
            className="actionBtn saveBtn"
            style={{ marginLeft: "10px" }}
            onClick={handleRun}
          >
            Save
          </button>
        </div>
        <div className="dropdownWrapper">
          <select
            name=""
            id=""
            onChange={handleLanguageChange}
            value={language}
          >
            <option value="py">
              <PythonIcon width="50" height="50" /> py
            </option>
            <option value="js">
              <JavaScriptIcon width="50" height="50" />
              js
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default EditorComp;
