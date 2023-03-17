import React, { useState } from "react";
import { useAlert } from "react-alert";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "../../icons/SaveIcon";
import { codeActions } from "../../store/codeSlice";
import FormInput from "../FormInput";
import { saveCode } from "./logic";
import Loading from "../../icons/loading-state.json";
const INPUTS = [
  {
    id: 1,
    name: "filename",
    type: "text",
    placeholder: "Enter Filename",
    errorMessage:
      "Filename should be atleast 3 characters long no special character except _ (underscore)",
    label: "File Name",
    pattern: "[A-Za-z0-9_ ]{3,}",
    required: true,
  },
];
function SaveCodeModal({ modalOpen, setModalOpen }) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { fileName, fileId } = useSelector((state) => state.code);
  const [filename, setFilename] = useState(fileName);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFilename(e.target.value);
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    setError(null);
    saveCode(alert, filename, fileId)
      .then((res) => {
        dispatch(codeActions.setFileName({ fileName: filename }));
        setLoading(false);
        alert.success(res);
        setModalOpen(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.response.data.message);
      });
  };

  return (
    <>
      <div id="myModal" className="modal">
        <div className="modal-content transparentCard">
          <span className="close" onClick={() => setModalOpen(false)}>
            &times;
          </span>

          <form onSubmit={handleSaveSubmit}>
            {INPUTS.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={filename}
                onChange={handleChange}
              />
            ))}
            {error && (
              <p
                style={{
                  textAlign: "center",
                  color: "indianred",
                  marginBottom: "10px",
                }}
              >
                {error}
              </p>
            )}
            <div
              className="buttonsWrapper"
              style={{ justifyContent: "center" }}
            >
              <button
                className="actionBtn saveBtn"
                style={{ marginLeft: "10px", borderRadius: 0 }}
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    Saving...
                    <Lottie
                      options={{
                        loop: true,
                        autoplay: true,
                        animationData: Loading,
                        rendererSettings: {
                          preserveAspectRatio: "xMidYMid slice",
                        },
                      }}
                      height={50}
                      width={50}
                    />
                  </>
                ) : (
                  <>
                    Save
                    <SaveIcon width="20px" height="20px" margin="0 0 0 5px" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SaveCodeModal;
