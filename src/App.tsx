import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import './App.css'

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CoursesPage />} />
                <Route path="/course/:id" element={<CourseDetailPage />} />
            </Routes>
        </Router>
    );
};

export default App;