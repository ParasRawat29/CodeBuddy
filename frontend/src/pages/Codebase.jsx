import React from "react";
import "../styles/codebase.css";
import { useState } from "react";
import { useEffect } from "react";
import CodelistTable from "../components/codebase/CodelistTable";
import { getData } from "../components/codebase/logic";

function Codebase() {
  const [codeList, setCodeList] = useState([]);
  const [render, setRender] = useState(true);
  useEffect(() => {
    getData(setCodeList);
  }, [render]);

  return (
    <div className="container" style={{ display: "block" }}>
      <h1 className="head">Codebase</h1>
      <CodelistTable data={codeList} setRender={setRender} />
    </div>
  );
}

export default Codebase;
