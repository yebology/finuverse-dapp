import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Navbar } from "./fixed/Navbar";
import { Footer } from "./fixed/Footer";

export const Content = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
};
