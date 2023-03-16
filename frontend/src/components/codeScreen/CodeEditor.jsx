import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../../actions";
import { useSelector } from "react-redux";

function CodeEditor({ socketRef, roomId, handleCodeInput }) {
  const editorRef = useRef(null);
  const { code } = useSelector((state) => state.code);

  useEffect(() => {
    async function init() {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const codeVal = instance.getValue();
        handleCodeInput(codeVal);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGED, {
            roomId,
            code: codeVal,
          });
        }
      });

      editorRef.current.setValue(code);
    }

    if (editorRef.current === null) init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGED, ({ code }) => {
        alert("lene wala");
        if (code !== null) editorRef.current.setValue(code);
      });
    }
  }, [socketRef.current]);

  return <textarea id="realtimeEditor" />;
}

export default CodeEditor;
