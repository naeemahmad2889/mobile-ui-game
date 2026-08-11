import React from 'react'
import { motion } from 'framer-motion'

// Floating particles background effect
export const FloatingParticles = ({ theme = 'light' }) => {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            theme === 'dark' 
              ? 'bg-white/10' 
              : 'bg-primary-500/10'
          }`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, -100],
            opacity: [0, 0.7, 0],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  )
}

// Success animation overlay
export const SuccessAnimation = ({ isVisible, onComplete }) => {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      onAnimationComplete={onComplete}
      className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl"
        >
          ✓
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Loading wave animation
export const LoadingWave = ({ isVisible }) => {
  if (!isVisible) return null

  return (
    <div className="flex items-center space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 bg-primary-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.15,
          }}
        />
      ))}
    </div>
  )
}

// Ripple effect for buttons
export const RippleEffect = ({ children, onClick, className = "" }) => {
  const [ripples, setRipples] = React.useState([])

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    const newRipple = {
      x,
      y,
      size,
      id: Date.now(),
    }

    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)

    if (onClick) onClick(e)
  }

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </motion.div>
  )
}

// Gradient text animation
export const AnimatedGradientText = ({ children, className = "" }) => {
  return (
    <motion.div
      className={`bg-gradient-to-r from-primary-500 via-purple-500 to-primary-500 bg-clip-text text-transparent bg-size-200 ${className}`}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    >
      {children}
    </motion.div>
  )
}

// Morphing shape background
export const MorphingShape = ({ theme = 'light' }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className={`absolute -top-24 -right-24 w-48 h-48 ${
          theme === 'dark' ? 'bg-purple-900/20' : 'bg-primary-200/30'
        } rounded-full blur-3xl`}
        animate={{
          scale: [1, 1.2, 0.8, 1],
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ['50%', '40%', '60%', '50%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute -bottom-24 -left-24 w-64 h-64 ${
          theme === 'dark' ? 'bg-blue-900/20' : 'bg-secondary-200/30'
        } rounded-full blur-3xl`}
        animate={{
          scale: [0.8, 1, 1.3, 0.8],
          rotate: [360, 270, 180, 90, 0],
          borderRadius: ['60%', '50%', '40%', '60%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

// Pulse animation for status indicators
export const PulseIndicator = ({ color = "green", size = "sm" }) => {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
    lg: "w-4 h-4"
  }

  return (
    <div className="relative">
      <motion.div
        className={`${sizeClasses[size]} bg-${color}-500 rounded-full`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className={`absolute inset-0 ${sizeClasses[size]} bg-${color}-400 rounded-full`}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}

// Stagger animation container
export const StaggerContainer = ({ children, className = "" }) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Magnetic button effect
export const MagneticButton = ({ children, onClick, className = "" }) => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const deltaX = (e.clientX - centerX) / 4
    const deltaY = (e.clientY - centerY) / 4

    setMousePosition({ x: deltaX, y: deltaY })
  }

  return (
    <motion.button
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setMousePosition({ x: 0, y: 0 })
      }}
      onMouseMove={handleMouseMove}
      animate={{
        x: isHovered ? mousePosition.x : 0,
        y: isHovered ? mousePosition.y : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}