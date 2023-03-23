import React from "react";
import { Route, Routes } from "react-router-dom";
import Editor from "./pages/Editor";
import JoinOrCreateRoom from "./pages/JoinOrCreateRoom";
import JoinRoom from "./pages/JoinRoom";
import "./App.css";
import { useEffect } from "react";
import { loadUser } from "./logic";
import Codebase from "./pages/Codebase";
import Protected from "./components/Protected";
import Auth from "./components/loginPopup/Auth";
import { useSelector } from "react-redux";
import Navbar from "./components/navbar/Navbar";
import { PeerProvider } from "./providers/Peer";

function App() {
  const { active } = useSelector((state) => state.login);
  const { authenticated } = useSelector((state) => state.user);
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="app">
      <PeerProvider>
        {active !== 0 && <Auth />}
        <Navbar showLogo={true} />
        <Routes>
          <Route path="/" exact element={<JoinOrCreateRoom />} />
          <Route path="/joinRoom" exact element={<JoinRoom join={true} />} />
          <Route
            path="/createRoom"
            exact
            element={<JoinRoom create={true} />}
          />
          <Route path="/editor/:roomId" exact element={<Editor />} />
          <Route
            path="/codebase"
            exact
            element={
              <Protected authenticated={authenticated}>
                <Codebase />
              </Protected>
            }
          />
        </Routes>
      </PeerProvider>
    </div>
  );
}

export default App;
