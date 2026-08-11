import React from 'react'
import { motion } from 'framer-motion'
import { User, Mail, Phone, MapPin, Edit3, Save } from 'lucide-react'

const ProfileCard = ({ 
  backgroundColor = "bg-white",
  textSize = "text-base",
  cardColor = "bg-white",
  textColor = "text-gray-800",
  borderRadius = "rounded-xl"
}) => {
  return (
    <motion.div 
      className={`${cardColor} ${borderRadius} shadow-lg p-6 mx-4 my-6 border border-gray-100 relative overflow-hidden transition-all duration-500`}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      {/* Card Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-50/50 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-50/30 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
      
      {/* Profile Content */}
      <div className="relative z-10">
        {/* Avatar Section */}
        <motion.div 
          className="flex flex-col items-center mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mb-3 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className={`${textSize} font-bold ${textColor} transition-all duration-300`}>
            Alex Morgan
          </h2>
          <p className={`text-sm text-gray-500 transition-all duration-300`}>
            UI/UX Designer
          </p>
        </motion.div>

        {/* Contact Information */}
        <motion.div 
          className="space-y-4 mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
              <Mail className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <p className={`${textColor} font-medium text-sm transition-all duration-300`}>
                alex.morgan@email.com
              </p>
              <p className="text-xs text-gray-400">Email</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary-50 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5 text-secondary-600" />
            </div>
            <div>
              <p className={`${textColor} font-medium text-sm transition-all duration-300`}>
                +1 (555) 123-4567
              </p>
              <p className="text-xs text-gray-400">Phone</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className={`${textColor} font-medium text-sm transition-all duration-300`}>
                San Francisco, CA
              </p>
              <p className="text-xs text-gray-400">Location</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex space-x-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-3 px-4 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center space-x-2">
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center justify-center space-x-2">
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </motion.div>

        {/* Status Indicator */}
        <motion.div 
          className="absolute top-4 right-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProfileCard