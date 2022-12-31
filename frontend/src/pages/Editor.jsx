import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CodeScreen from "../components/codeScreen/CodeScreen";
import { codeActions } from "../store/codeSlice";
import "../styles/auth.css";

function Editor() {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(codeActions.reset());
    };
  }, []);
  return (
    <div className="container" style={{ justifyContent: "flex-start" }}>
      <CodeScreen />
    </div>
  );
}

export default Editor;
