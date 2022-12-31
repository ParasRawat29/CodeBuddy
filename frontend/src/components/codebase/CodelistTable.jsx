import React from "react";
import { useState } from "react";
import MaximizeIcon from "../../icons/MaximizeIcon";
import ViewCodeModal from "./ViewCodeModal";
import "../../styles/ViewCodeModal.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getNewRoom } from "./logic";
import { useDispatch } from "react-redux";
import { codeActions } from "../../store/codeSlice";

function CodelistTable({ data }) {
  const [visibleMaxIcon, setVisibleMaxIcon] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOpenEditor = (index) => {
    getNewRoom()
      .then((res) => {
        const { language, code } = data[index];
        dispatch(
          codeActions.setLanguage({
            val: language,
            id: language === "py" ? 0 : 1,
          })
        );
        dispatch(codeActions.setCode({ code }));
        navigate(`/createRoom`);
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
                    {new Date(item.createdAt)
                      .toLocaleDateString("en-gb")
                      .substring(0, 10)}
                  </td>
                  <td>
                    {new Date(item.updatedAt)
                      .toLocaleDateString("en-gb")
                      .substring(0, 10)}
                  </td>
                  <td>
                    <button
                      className="openInEditorBtn"
                      onClick={() => handleOpenEditor(idx)}
                    >
                      open in editor
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default CodelistTable;
