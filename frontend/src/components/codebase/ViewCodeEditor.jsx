import CodeMirror from "codemirror";
import React, { useEffect, useRef } from "react";

function ViewCodeEditor({ code }) {
  const editorRef = useRef();
  function init() {
    editorRef.current = CodeMirror.fromTextArea(
      document.getElementById("realtimeEditor"),
      {
        mode: { name: "javascript", json: true },
        theme: "dracula",
        lineNumbers: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        readOnly: true,
      }
    );
  }

  useEffect(() => {
    if (!editorRef.current) init();
    if (editorRef.current) editorRef.current.setValue(code);
  }, [code]);
  return <textarea id="realtimeEditor" style={{ padding: "10px" }} />;
}

export default ViewCodeEditor;
