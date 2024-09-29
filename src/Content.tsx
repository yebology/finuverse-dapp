import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Navbar } from "./components/fixed/Navbar";
import { Footer } from "./components/fixed/Footer";
import { CourseForm } from "./views/CourseForm";
import Profile from "./views/Profile";
import { Fetch } from "./views/Fetch";
// import { CompleteModal } from "./components/modals/CompleteModal";

export const Content = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create_course" element={<CourseForm />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/fetch" element={<Fetch />}/>
      </Routes>
      <Footer />
      {/* <CompleteModal /> */}
    </div>
  );
};