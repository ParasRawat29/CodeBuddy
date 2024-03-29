import io from "socket.io-client";

export const initSocket = async () => {
  // const options = {
  //   "force new connection": false,
  //   reconnectionAttempt: "Infinity",
  //   timeout: 10000,
  //   upgrade: true,
  //   transports: ["websocket"],
  //   socket = io(ENDPOINT, );
  // };
  // console.log(process.env.REACT_APP_BACKEND_URL);
  return io(`${process.env.REACT_APP_BACKEND_URL}`, {
    cors: {
      withCredentials: true,
    },
    upgrade: false,
    transports: ["websocket", "polling"],
  });
};
