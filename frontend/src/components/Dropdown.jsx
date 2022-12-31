import React, { useState } from "react";

import UpDown from "../icons/UpDown";
import "../styles/dropdown.css";

function Dropdown({ DROP_LIST, handleLanguageChange, selected }) {
  // const [selected, setSelected] = useState({
  //   id: 1,
  //   val: DROP_LIST[1].value,
  // });
  const [open, setOpen] = useState(false);

  const handleSelect = (item) => {
    // setSelected({
    //   id: item.id,
    //   val: item.value,
    // });

    handleLanguageChange(item);
    setOpen(false);
  };

  return (
    <div className="dropdownWrapper">
      <div className="dropdownToggle" onClick={() => setOpen((pre) => !pre)}>
        {DROP_LIST[selected.id].image}
        <i className="toggleBtn">
          <UpDown
            width="20px"
            height="20px"
            style={{
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
          />
        </i>
      </div>

      <section
        style={{
          display: open ? "block" : "hidden",
          height: open ? "100%" : "0",
          overflow: "hidden",
        }}
      >
        <div className="dropdownListWrapper">
          <ul className="dropdownList">
            {DROP_LIST.map((item) => {
              if (item.id === selected.id) return <></>;
              return <li onClick={() => handleSelect(item)}>{item.image}</li>;
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

export default Dropdown;
