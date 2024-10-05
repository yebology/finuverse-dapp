import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Navbar } from "./components/fixed/Navbar";
import { Footer } from "./components/fixed/Footer";
import { CourseForm } from "./views/CourseForm";
import { Profile } from "./views/Profile";
import CoursesPage from "./views/CoursesPage";
import CourseDetailPage from "./views/CourseDetailPage";

export const Content = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create_course" element={<CourseForm />} />
        <Route path="/profile" element={<Profile />}/>
        <Route path="/course" element={<CoursesPage />} />
        <Route path="/course/:id" element={<CourseDetailPage />} />
      </Routes>
      <Footer />
    </div>
  );
};