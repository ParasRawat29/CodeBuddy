import React, { useState } from "react";
import { useAlert } from "react-alert";
import SaveIcon from "../../icons/SaveIcon";
import FormInput from "../FormInput";
import { saveCode } from "./logic";

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

  const [filename, setFilename] = useState();
  const handleChange = (e) => {
    setFilename(e.target.value);
  };

  const handleSaveSubmit = (e) => {
    e.preventDefault();
    saveCode(alert, filename)
      .then((res) => {
        alert.success(res);
      })
      .catch((err) => {
        alert.error(err.response.data.message);
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
            <div
              className="buttonsWrapper"
              style={{ justifyContent: "center" }}
            >
              <button
                className="actionBtn saveBtn"
                style={{ marginLeft: "10px", borderRadius: 0 }}
                type="submit"
              >
                Save
                <SaveIcon width="20px" height="20px" margin="0 0 0 5px" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SaveCodeModal;
