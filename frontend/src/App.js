import { Route, Routes } from "react-router-dom";
import EditorComp from "./components/EditorComp";
import JoinRoom from "./components/JoinRoom";
function App() {
  return (
    <Routes>
      <Route path="/" exact element={<JoinRoom />} />
      <Route path="/editor/:roomId" exact element={<EditorComp />} />
    </Routes>
  );
}

export default App;
