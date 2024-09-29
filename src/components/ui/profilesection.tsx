import { motion } from 'framer-motion';

interface ProfileSectionProps {
    profilePicture: string;
    username: string;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ profilePicture, username }) => {
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
            className="profile-section bg-white p-6 rounded-lg shadow-lg text-center border border-gray-300 flex flex-col items-center justify-center" 
        >
            <motion.img 
                src={profilePicture} 
                alt={`${username}'s profile`} 
                className="w-32 h-32 rounded-full border-4 mx-auto p-4" 
                initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }}   
            />
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                layout
                className="mt-4 text-xl font-semibold text-blue-400"
            >
                {username}
            </motion.p>
        </motion.div>
    );
};
  
export default ProfileSection;
