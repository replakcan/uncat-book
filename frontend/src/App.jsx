import { Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import Testingo from "./pages/TestPage";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/events/:eventId" element={<Home />} />
        <Route path="/" element={<Testingo />} />
      </Routes>
    </main>
  );
}

export default App;
