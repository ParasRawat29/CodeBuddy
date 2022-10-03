import React from "react";
import Output from "./Output";

function OutputComp({ output, socketRef, setOutput }) {
  return (
    <div className="outputContainer">
      <Output output={output} socketRef={socketRef} setOutput={setOutput} />
      {/* {socketRef.current &&
      
         <Videos socketRef={socketRef} roomId={roomId} /> 
      
      } */}
    </div>
  );
}

export default OutputComp;
