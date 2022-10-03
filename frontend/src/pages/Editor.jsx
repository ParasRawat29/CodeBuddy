import React from "react";
import CodeScreen from "../components/codeScreen/CodeScreen";
import Navbar from "../components/navbar/Navbar";

function Editor() {
  return (
    <div className="container" style={{ justifyContent: "flex-start" }}>
      <Navbar />
      <CodeScreen />
    </div>
  );
}

export default Editor;
