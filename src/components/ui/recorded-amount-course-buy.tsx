
import { motion } from 'framer-motion';

interface CourseBuyProps {
    courseCount: number; 
  }
  const CourseBuy: React.FC<CourseBuyProps> = ({ courseCount }) => {
    return (
        <motion.div
            whileHover={{ 
                scale: 1.02, 
                backgroundColor: '#F8F9FA',
                boxShadow: '0px 4px 30px rgba(0, 123, 255, 0.8)'
            }}
            whileTap={{ scale: 1.01 }}
            drag="x"
            dragConstraints={{ left: -100, right: 100 }} 
            className="course-buy bg-white p-4 rounded-md shadow-md text-center border border-gray-300" 
        >
        <label className="text-lg font-medium">Course Boughted</label>
        <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout
                className="text-2xl font-bold mt-2 text-blue-400"
            >
                {courseCount}
            </motion.p>
      </motion.div>
    );
  };
  export default CourseBuy;
  