import React from "react";
import { FacultyGraph, PhDGraph, MPhilGraph } from "./graphcomponents/GraphComponents";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row mt-10 mr-6 rounded-xl  bg-gradient-to-r from-purple-600 to-purple-800 min-h-screen">
      {/* Main Content */}
      <main className="w-full p-5 space-y-8">

        {/* Faculty Graph */}
        <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg rounded-lg p-5"
      id="faculty"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="text-xl md:text-2xl font-semibold mb-3 text-purple-800"
      >
        Welcome to Admin Dashboard
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
        className="text-md text-purple-600"
      >
        Here you can manage all the settings and users.
      </motion.p>
      
    </motion.div>

        
        {/* Faculty Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-5"
          id="faculty"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-purple-800">
            Faculty Resume Data
          </h2>
          <div className="h-48 sm:h-64 md:h-80 lg:h-96 w-full">
            <FacultyGraph />
          </div>
        </motion.div>

        {/* PhD Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-5"
          id="phd"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-purple-800">
            PhD Passouts
          </h2>
          <div className="h-48 sm:h-64 md:h-80 lg:h-96 w-full">
            <PhDGraph />
          </div>
        </motion.div>

        {/* MPhil Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-lg rounded-lg p-5"
          id="mphill"
        >
          <h2 className="text-xl md:text-2xl font-semibold mb-3 text-purple-800">
            MPhil Passouts
          </h2>
          <div className="h-48 sm:h-64 md:h-80 lg:h-96 w-full">
            <MPhilGraph />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Dashboard;
