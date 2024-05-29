import AlbumForm from "./components/AlbumForm/AlbumForm";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/AlbumForm" element={<AlbumForm />}></Route>
      </Routes>
    </div>
  );
}

export default App;
