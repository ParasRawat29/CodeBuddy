import React, { useEffect } from "react";
import ACTIONS from "../../actions";

function Output({ output, socketRef }) {
  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.emit(ACTIONS.OUTPUT_CHANGED, { output });
    }
  }, [output, socketRef.current]);

  return (
    <div className="outputWrapper">
      <h4>Output</h4>
      <textarea readOnly className="output" value={output}></textarea>
    </div>
  );
}

export default Output;
