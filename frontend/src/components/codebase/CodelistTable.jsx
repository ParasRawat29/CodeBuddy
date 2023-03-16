import React from "react";
import { useState } from "react";
import MaximizeIcon from "../../icons/MaximizeIcon";
import ViewCodeModal from "./ViewCodeModal";
import "../../styles/ViewCodeModal.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFile, getNewRoom } from "./logic";
import { useDispatch } from "react-redux";
import { codeActions } from "../../store/codeSlice";
import { LANGUAGES } from "../../helper";
import DeleteIcon from "../../icons/DeleteIcon";

function CodelistTable({ data, setRender }) {
  const [visibleMaxIcon, setVisibleMaxIcon] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenEditor = (index) => {
    getNewRoom()
      .then((res) => {
        const { language, code, fileName, _id } = data[index];
        dispatch(
          codeActions.setLanguage({
            val: language,
            id:
              language === "py" ? LANGUAGES.PYTHON.id : LANGUAGES.JAVASCRIPT.id,
          })
        );
        dispatch(codeActions.setCode({ code }));
        sessionStorage.setItem("code", code);
        sessionStorage.setItem("ofn", fileName); // original File name
        dispatch(codeActions.setFileName({ fileName }));
        dispatch(codeActions.setNewFile({ newFile: false }));
        dispatch(codeActions.setFileId({ id: _id }));
        navigate(`/createRoom`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteClick = (id) => {
    deleteFile(id)
      .then((res) => {
        setRender((pre) => !pre);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!modalOpen) setSelectedId(null);
  }, [modalOpen]);

  return (
    <div className="tableWrapper">
      {setSelectedId && (
        <div className={`modalWrapper ${modalOpen ? "open" : ""}`}>
          <ViewCodeModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            selectedId={selectedId}
          />
        </div>
      )}
      {data?.length > 0 ? (
        <table>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--greenColor)" }}>
              <th># ID</th>
              <th className="large">Title</th>
              <th>Created At</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data &&
              data.map((item, idx) => {
                return (
                  <tr
                    key={idx}
                    onMouseOver={() => setVisibleMaxIcon(idx)}
                    onMouseLeave={() => setVisibleMaxIcon(-1)}
                  >
                    <td>{idx + 1}.</td>
                    <td
                      className="large"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <p style={{ width: "90%", wrap: "break-word" }}>
                        {item.fileName}
                      </p>
                      <button
                        onClick={() => {
                          setModalOpen(true);
                          setSelectedId(item.id);
                        }}
                        style={{
                          background: "transparent",
                        }}
                      >
                        <MaximizeIcon
                          width="20px"
                          height="20px"
                          cursor="pointer"
                          opacity={visibleMaxIcon === idx ? "1" : "0"}
                          transition="opacity 0.3s ease"
                          visibility={
                            visibleMaxIcon === idx ? "visible" : "hidden"
                          }
                        />
                      </button>
                    </td>
                    <td>
                      {new Date(item.createdOn)
                        .toLocaleDateString("en-gb")
                        .substring(0, 10)}
                    </td>
                    <td>
                      {new Date(item.updatedOn)
                        .toLocaleDateString("en-gb")
                        .substring(0, 10)}
                    </td>
                    <td
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <button
                        className="openInEditorBtn"
                        onClick={() => handleOpenEditor(idx)}
                      >
                        open in editor
                      </button>
                      <button
                        style={{
                          background: "transparent",
                          outline: "none",
                          margin: "0 3px",
                          padding: 0,
                        }}
                        onClick={() => handleDeleteClick(item._id)}
                      >
                        <DeleteIcon width={"20px"} height="20px" />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <h2 style={{ textAlign: "center", fontWeight: "lighter" }}>
            No Code saved
          </h2>
        </div>
      )}
    </div>
  );
}

export default CodelistTable;
