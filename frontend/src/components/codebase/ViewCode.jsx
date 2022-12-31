import React from "react";
import PythonIcon from "../../icons/PythonIcon";
import JavaScriptIcon from "../../icons/JavaScriptIcon";
import "../../styles/viewCode.css";
import ViewCodeEditor from "./ViewCodeEditor";

const LANGICON = {
  py: <PythonIcon width="30px" height="30px" />,
  js: <JavaScriptIcon width="30px" height="30px" />,
};

function ViewCode({ codeData }) {
  return (
    <div className="viewCodeWrapper" style={{ textAlign: "left" }}>
      <div className="header" style={{ display: "flex" }}>
        <div className="field">
          <label className="label">Filename : </label>
          <span>{codeData?.fileName || ""}</span>
        </div>
        <div className="field">
          <label className="label">Langugage : </label>
          {codeData && LANGICON[codeData.language]}
        </div>
        <div className="field">
          <label className="label">Created On : </label>
          <span>
            {codeData &&
              new Date(codeData.createdAt.substr(0, 10)).toLocaleDateString(
                "en-gb"
              )}
          </span>
        </div>
      </div>
      <hr />
      <h2 style={{ marginTop: "1rem", textDecoration: "underline" }}>Code</h2>
      <ViewCodeEditor code={codeData?.code || ""} />
    </div>
  );
}

export default ViewCode;
