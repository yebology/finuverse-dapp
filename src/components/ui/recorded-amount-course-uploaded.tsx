import { motion } from 'framer-motion';

interface CourseUploadedProps {
    courseUploaded: number; // Number of courses uploaded
}

const CourseUploaded: React.FC<CourseUploadedProps> = ({ courseUploaded }) => {
    return (
        <motion.div
            whileHover={{ 
                scale: 1.02, 
                backgroundColor: '#F8F9FA', 
                boxShadow: '0px 4px 30px rgba(0, 123, 255, 0.8)' // Blue glow effect on hover
            }}
            whileTap={{ scale: 1.01 }}
            drag="x"
            dragConstraints={{ left: -100, right: 100 }} 
            className="course-upload bg-white p-4 rounded-md shadow-md text-center border border-gray-300" 
        >
            <label className="text-lg font-medium">Course Uploaded</label>
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout
                className="text-2xl font-bold mt-2 text-blue-400"
            >
                {courseUploaded}
            </motion.p>
        </motion.div>
    );
};

export default CourseUploaded;
