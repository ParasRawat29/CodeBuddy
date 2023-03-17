import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Lottie from "react-lottie";
import { getSingleCode } from "./logic";
import ViewCode from "./ViewCode";
import Loading from "../../icons/loading-state.json";

function ViewCodeModal({ modalOpen, setModalOpen, selectedId }) {
  const [codeData, setCodeData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (modalOpen) {
      console.log(selectedId);
      getSingleCode(selectedId, setCodeData, setLoading);
    }
  }, [selectedId]);

  return (
    <>
      <div className="overlay" onClick={() => setModalOpen(false)}></div>
      <div className="content">
        {loading ? (
          <>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: Loading,
                rendererSettings: {
                  preserveAspectRatio: "xMidYMid slice",
                },
              }}
              height={100}
              width={100}
            />
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </>
  );
}

export default ViewCodeModal;
