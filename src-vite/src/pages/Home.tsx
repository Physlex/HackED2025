import { motion } from "framer-motion";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "500px",
      }}
    >
      <div className="Home bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen flex flex-col items-center text-white p-8 justify-center">
        {/* Welcome Message */}
        <motion.h1
          className="text-4xl font-bold text-center mt-10"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          font-family="Roboto"
        >
          <i> CD-Project-Blue: pointers-in-python</i>
        </motion.h1>

        <motion.h3
          className="text-lg text-center mt-2 max-w-2xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Troubleshoot your PS5 controller with real-time input monitoring,
          drift analysis, and connectivity tests. <br />
          Diagnose issues fast and keep your DualSense in peak condition. Test,
          fix, and game on!
        </motion.h3>

        {/* Card Layout 
            <motion.div
                className="bg-white p-6 rounded-xl shadow-xl text-gray-800 mt-10 w-full max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >*/}
        {/* Button */}
      </div>
    </div>
  );
}
