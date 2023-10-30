import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Dummy Home Page</h1>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
