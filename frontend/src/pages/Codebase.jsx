import React from "react";
import "../styles/codebase.css";
import { useState } from "react";
import { useEffect } from "react";
import CodelistTable from "../components/codebase/CodelistTable";
import { getData } from "../components/codebase/logic";
import Lottie from "react-lottie";
import Loading from "../icons/loading-state.json";

function Codebase() {
  const [codeList, setCodeList] = useState([]);
  const [render, setRender] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getData(setCodeList, setLoading);
  }, [render]);

  return (
    <div className="container" style={{ display: "block" }}>
      <h1 className="head">Codebase</h1>
      {loading && (
        <Lottie
          options={{
            loop: true,
            autoplay: true,
            animationData: Loading,
            rendererSettings: {
              preserveAspectRatio: "xMidYMid slice",
            },
          }}
          height={200}
          width={200}
        />
      )}
      {!loading && <CodelistTable data={codeList} setRender={setRender} />}
    </div>
  );
}

export default Codebase;
