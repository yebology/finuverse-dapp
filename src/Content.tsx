import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Navbar } from "./components/fixed/Navbar";
import { Footer } from "./components/fixed/Footer";
import { CourseForm } from "./views/CourseForm";
import { Fetch } from "./views/Fetch";
import { Profile } from "./views/Profile";
import CoursesPage from "./views/CoursesPage";
import CourseDetailPage from "./views/CourseDetailPage";
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
        <Route path="/course" element={<CoursesPage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />
      </Routes>
      <Footer />
      {/* <CompleteModal /> */}
    </div>
  );
};