import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Navbar } from "./components/fixed/Navbar";
import { Footer } from "./components/fixed/Footer";
import { CompleteModal } from "./components/modals/CompleteModal";

export const Content = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
      {/* <CompleteModal /> */}
    </div>
  );
};
