import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import Heading from "../components/Heading";
import ArrowRight from "../icons/ArrowRight";
import "../styles/form.css";
import { newRoom, validateRoom } from "./logic";
import { useAlert } from "react-alert";
const INPUTS = [
  {
    id: 1,
    name: "roomId",
    type: "text",
    placeholder: "enter room id",
    errorMessage: "",
    label: "Room Id",
    pattern: "^[A-Za-z0-9]{3,16}$",
    required: true,
  },
  {
    id: 2,
    name: "username",
    type: "text",
    placeholder: "Username",
    errorMessage:
      "Username should be 3-16 characters and shouldn't include any special character!",
    label: "Username",
    pattern: "^[A-Za-z0-9 ]{3,16}$",
    required: true,
  },
];

function JoinRoom({ join = false, create = false }) {
  const navigate = useNavigate();
  const alert = useAlert();
  const [values, setValues] = useState({
    roomId: "",
    username: "",
  });
  const [error, setError] = useState(null);
  const handleRoomJoin = () => {
    if (values.roomId.trim() === "" || values.username.trim() === "") return;
    else {
      setError(null);
      if (join) {
        validateRoom(values.roomId)
          .then(() => {
            navigate(`/editor/${values.roomId}`, {
              state: values.username,
            });
          })
          .catch((err) => {
            // alert.info(err);
            setError(err);
          });
      } else {
        navigate(`/editor/${values.roomId}`, {
          state: values.username,
        });
      }
    }
  };

  const handleChange = (e) => {
    setValues((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleRoomJoin();
  };

  useEffect(() => {
    if (create && !values.roomId) {
      newRoom()
        .then((res) => {
          console.log(res);
          setValues((pre) => ({ ...pre, roomId: res.id }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div className="container">
      <Heading shadow={true} />
      <div
        className="transparentCard"
        style={{
          borderRadius: "17px",
          width: "400px",
        }}
      >
        <h3
          style={{
            color: "white",
            fontFamily: "Kanit",
            fontWeight: 400,
            fontSize: "1.4rem",
            textAlign: "center",
          }}
        >
          {create ? <>Create Room</> : <>Join Room</>}
        </h3>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {error && (
            <p style={{ color: "indianred" }}>
              {values.roomId} : {error}
            </p>
          )}
          {INPUTS.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              disabled={create && input.name === "roomId" ? true : false}
              onChange={handleChange}
            />
          ))}
          {join && (
            <button type="submit" className="actionBtn joinBtn">
              JOIN
              <ArrowRight
                width="50px"
                height="30px"
                margin="0 0 0 1rem"
                color="#63D776"
              />
            </button>
          )}
          {create && (
            <button type="submit" className="actionBtn createBtn">
              CREATE
              <ArrowRight
                width="50px"
                height="30px"
                margin="0 0 0 1rem"
                color="#FFD90F"
              />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default JoinRoom;
