import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import JavaScriptIcon from "../../icons/JavaScriptIcon";
import PlayIcon from "../../icons/PlayIcon";
import PythonIcon from "../../icons/PythonIcon";
import SaveIcon from "../../icons/SaveIcon";
import { loginAction } from "../../store/loginSlice";
import Dropdown from "../Dropdown";
import CodeEditor from "./CodeEditor";
import SaveCodeModal from "./SaveCodeModal";

const DROP_LIST = [
  {
    id: 0,
    name: "javascript",
    value: "js",
    image: <JavaScriptIcon width="25px" height="30px" />,
  },
  {
    id: 1,
    name: "python",
    value: "py",
    image: <PythonIcon width="25px" height="30px" />,
  },
];

function EditorComp({
  handleRun,
  handleCodeInput,
  socketRef,
  roomId,
  handleLanguageChange,
}) {
  const alert = useAlert();
  const { code, language } = useSelector((state) => state.code);
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.user);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const handleSave = () => {
    if (!code || code.trim() === "") {
      alert.info("no code to save");
      return;
    } else if (!authenticated) {
      alert.info("Login To Save the code");
      dispatch(loginAction.setActive(1));
    } else {
      setSaveModalOpen(true);
    }
  };

  return (
    <div className="codeEditorWrapper">
      {saveModalOpen && (
        <SaveCodeModal
          modalOpen={saveModalOpen}
          setModalOpen={setSaveModalOpen}
        />
      )}
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
            onClick={() => handleSave()}
          >
            Save
            <SaveIcon width="20px" height="20px" margin="0 0 0 5px" />
          </button>
        </div>

        <Dropdown
          handleLanguageChange={handleLanguageChange}
          DROP_LIST={DROP_LIST}
          selected={language}
        />
      </div>
    </div>
  );
}

export default EditorComp;
