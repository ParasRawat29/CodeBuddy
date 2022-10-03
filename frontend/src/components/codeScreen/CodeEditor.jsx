import React, { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import ACTIONS from "../../actions";

function CodeEditor({ socketRef, roomId, handleCodeInput }) {
  const editorRef = useRef(null);

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
        const code = instance.getValue();
        handleCodeInput(code);
        if (origin !== "setValue") {
          socketRef.current.emit(ACTIONS.CODE_CHANGED, {
            roomId,
            code,
          });
        }
      });
    }

    if (editorRef.current === null) init();
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGED, ({ code }) => {
        if (code !== null) editorRef.current.setValue(code);
      });
    }
  }, [socketRef.current]);

  return <textarea id="realtimeEditor" />;
}

export default CodeEditor;
