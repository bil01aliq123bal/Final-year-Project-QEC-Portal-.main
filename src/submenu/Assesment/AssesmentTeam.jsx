import React from 'react';
import { motion } from 'framer-motion';

// Team picture URL
const teamPicture = "/Images/training1.png"; // Replace with actual team picture URL

// QEC members data
const qecMembers = [
  { 
    id: 1, 
    name: 'Dr Saifullah Khan', 
    position: 'Director, Quality Enhancement Cell (QEC)', 
    description: 'Dr. Saifullah Khan leads the QEC with a vision to uphold and advance the standards of academic and administrative excellence at Abbottabad UST. His commitment lies in fostering a culture of continuous improvement, ensuring that students and faculty thrive in an environment dedicated to quality education and innovation.'
  },
  { 
    id: 2, 
    name: 'Mr Khayyam Shehzad', 
    position: 'Assistant Director, Quality Enhancement Cell (QEC)', 
    description: 'Mr. Khayyam Shehzad plays a vital role in implementing quality assurance measures at Abbottabad UST. His collaborative approach and strategic focus drive initiatives that enhance academic standards, streamline administrative processes, and create an empowering atmosphere for both faculty and students.'
  },
  { 
    id: 3, 
    name: 'Mr Muhammad Arif Khan', 
    position: 'Deputy Director, Quality Enhancement Cell (QEC)', 
    description: 'With a strong commitment to academic and administrative excellence, Mr. Muhammad Arif Khan is dedicated to fostering a culture of quality at Abbottabad UST. His efforts ensure continuous improvement and support the growth and success of students and faculty alike.'
  },
  { 
    id: 4, 
    name: 'Mr Ahsan Abdul Rauf', 
    position: 'Deputy Director, Quality Enhancement Cell (QEC)', 
    description: 'Mr. Ahsan Abdul Rauf contributes to the QEC\'s mission by overseeing and promoting quality assurance practices. His role involves collaborating with stakeholders to ensure that the institution consistently meets and exceeds the benchmarks of academic and administrative excellence.'
  },
];

// Animation Variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const AssesmentTeam = () => {
  return (
    <div className="min-h-screen pt-10 mr-2 flex flex-col justify-between p-4 sm:p-8 lg:p-12 bg-gradient-to-r from-purple-100 to-purple-300">
      <motion.div 
        className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto flex-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Team Picture */}
        <img 
          src={teamPicture} 
          alt="Assessment Team" 
          className="w-full h-auto object-cover"
        />
        
        <div className="p-6 text-center">
          <h1 className="text-2xl font-bold text-purple-800 mb-2">Our Assessment Team</h1>
          <p className="text-gray-600">Committed to excellence in education and student support.</p>
        </div>

        {/* QEC Members */}
        <div className="p-4 space-y-4">
          {qecMembers.map((member) => (
            <motion.div 
              key={member.id} 
              className="bg-purple-50 p-4 rounded-lg shadow-md border border-purple-200"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <h2 className="text-xl font-semibold text-purple-800">{member.name}</h2>
              <p className="text-md text-purple-600">{member.position}</p>
              <p className="text-sm text-gray-500 mt-2">
                {member.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer with a subtle line */}
      <footer className="bg-gray-800 text-white py-4 mt-8 rounded-xl bg-gradient-to-r from-purple-700 to-purple-900">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Abbottabad University. All rights reserved.
          </p>
          <ul className="flex justify-center space-x-4 mt-2">
            <li>
              <a href="/privacy-policy" className="text-white hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-of-service" className="text-white hover:underline">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/contact-us" className="text-white hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default AssesmentTeam;
