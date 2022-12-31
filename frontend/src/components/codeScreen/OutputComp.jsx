import React from "react";
import Output from "./Output";

function OutputComp({ socketRef }) {
  return (
    <div className="outputContainer">
      {/* <Output output={output} socketRef={socketRef} setOutput={setOutput} /> */}
      <Output socketRef={socketRef} />
      {/* {socketRef.current &&
      
         <Videos socketRef={socketRef} roomId={roomId} /> 
      
      } */}
    </div>
  );
}

export default OutputComp;
