import { Route, Routes } from "react-router-dom";
import Editor from "./pages/Editor";
import JoinOrCreateRoom from "./pages/JoinOrCreateRoom";
import JoinRoom from "./pages/JoinRoom";
import "./App.css";
function App() {
  return (
    <Routes>
      <Route path="/" exact element={<JoinOrCreateRoom />} />
      <Route path="/joinRoom" exact element={<JoinRoom join={true} />} />
      <Route path="/createRoom" exact element={<JoinRoom create={true} />} />
      <Route path="/editor/:roomId" exact element={<Editor />} />
    </Routes>
  );
}

export default App;
