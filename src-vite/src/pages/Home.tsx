import { motion } from "framer-motion";

export default function Home() {
  return (
    <div
      className={
        "Home bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center text-white p-8"
      }
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "500px",
      }}
    >
      {/* Welcome Message */}
      <motion.h1
        className="text-4xl font-bold text-center mt-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Our Awesome Website & Cool Data Tracker
      </motion.h1>

      {/* Card Layout */}
      <motion.div
        className="bg-white p-6 rounded-xl shadow-xl text-gray-800 mt-10 w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {/* Button */}
        <div className="flex justify-center"></div>
      </motion.div>
    </div>
  );
}
