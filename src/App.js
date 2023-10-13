import "./App.css";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { loggedInRoutes, publicRoutes } from "./user/routes/routes";
import Home from "./user/components/pages/Home/Home";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <div>Hello</div>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
