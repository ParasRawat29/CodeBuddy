import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { getSingleCode } from "./logic";
import ViewCode from "./ViewCode";

function ViewCodeModal({ modalOpen, setModalOpen, selectedId }) {
  const [codeData, setCodeData] = useState();

  useEffect(() => {
    if (modalOpen) {
      getSingleCode(selectedId, setCodeData);
    }
  }, [selectedId]);

  return (
    <>
      <div className="overlay" onClick={() => setModalOpen(false)}></div>
      <div className="content">
        <button
          className="closeBtn"
          onClick={() => setModalOpen(false)}
          style={{
            fontSize: "1rem",
          }}
        >
          X
        </button>

        <ViewCode codeData={codeData} />
      </div>
    </>
  );
}

export default ViewCodeModal;
