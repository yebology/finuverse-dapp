import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import Header from './components/Header';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
    return (
        <Router>
            <ErrorBoundary>
                <Header />
                <Routes>
                    <Route path="/" element={<CoursesPage />} />
                    <Route path="/course/:id" element={<CourseDetailPage />} />
                </Routes>
                <Footer />
            </ErrorBoundary>
        </Router>
    );
};

export default App;