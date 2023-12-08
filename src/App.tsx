import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavBar from "./components/Navigation/NavBar";
import Home from "./pages/Home/Home";
import { ConfigProvider } from "./contexts/ConfigContextProvider";

const App: React.FC = () => {
  return (
    <ConfigProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};

export default App;
