import React from "react";
import "./styles.css";
import { Link } from 'react-router-dom';
import Navbar from './navbar.jsx'
import Footer from "./footer.jsx";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const scaleUp = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.5 } }
};

function HomePage() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
<Navbar/>

      {/* Hero Section with Background */}
      <div className="h-[135vh] md:h-[100vh] relative bg-gray-900">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/src/assets/final1.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        
        {/* Navbar */}
        <Navbar className="relative z-10" />
        
        {/* Hero Content */}
        <motion.header 
          className="relative z-10 p-8 md:p-12 flex items-center justify-center h-[calc(100%-80px)]"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div 
            className="max-w-4xl space-y-6 text-center md:text-left"
            variants={containerVariants}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
              variants={itemVariants}
            >
              Your Health <span className="text-blue-400">Our Priority</span>
            </motion.h1>
            <motion.p 
              className="text-xl md:text-3xl text-gray-100"
              variants={itemVariants}
            >
              MediFinder - your one-stop solution to find medical facilities anywhere, everywhere
            </motion.p>
            <motion.div 
              className="flex flex-col md:flex-row gap-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <Link 
                to="/Signup" 
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started
              </Link>
              <Link 
                to="/pharmacyList" 
                className="bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Find Care
              </Link>
            </motion.div>
          </motion.div>
        </motion.header>
      </div>

      {/* About Section */}
      <motion.section 
        className="p-8 md:p-14 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-center mb-8"
            variants={itemVariants}
          >
            About <span className="text-blue-600">MediFinder</span>
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-center max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            At MediFinder, our mission is to connect people with the right medical care, quickly and easily thereby simplifying healthcare access.
            <br />
          <span className="text-blue-500 font-medium">
              We believe that access to quality healthcare should be effortless and efficient.
          </span>
            <br />
            Our platform allows users to search for real-time information on pharmacies,
            hospitals and medical personnel (doctors, nurses, etc) where and when they need them.
          </motion.p>
        </div>
      </motion.section>

      {/* Key Benefits */}
      <motion.section 
        className="p-8 md:p-14 bg-blue-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <motion.div 
            className="md:w-1/2"
            variants={itemVariants}
          >
            <img 
              src="/src/assets/facil-sec.jpeg" 
              alt="Medical team" 
              className="rounded-xl shadow-xl w-full h-auto object-cover"
            />
          </motion.div>
          <motion.div 
            className="md:w-1/2 space-y-6"
            variants={itemVariants}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-blue-800">Are you a medical service</h3>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Reach a wider audience, increasing visibility</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Showcase specialty and get reviews from patients</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>Connect with patients and manage bookings</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* Products/Services */}
      <motion.section 
        className="p-8 md:p-12 bg-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-12 text-gray-800"
            variants={itemVariants}
          >
            Access Your <span className="text-blue-600">Healthcare</span> Facility
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {[
              {
                title: "Easily find Pharmacy",
                description: "Anytime, everywhere.",
                link: "/pharmacyList",
                img: "./src/assets/happharma.jpg"
              },
              {
                title: "Get the nearest hospital",
                description: "From Your Location.",
                link: "/hospital",
                img: "./src/assets/hospital.jpg"
              },
              {
                title: "Need a Doctor",
                description: "Don't worry, search for one.",
                link: "/personel",
                img: "./src/assets/doctor.jpg"
              }
            ].map((service, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                variants={scaleUp}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={service.link} className="block">
                  <div className="overflow-hidden rounded-lg mb-4">
                    <img 
                      src={service.img} 
                      alt={service.title} 
                      className="w-full h-48 object-cover rounded-lg hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mt-4 text-gray-800">{service.title}</h3>
                  <p className="text-gray-600 mt-2">{service.description}</p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section 
        className="p-8 md:p-12 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
            variants={itemVariants}
          >
            Frequently Asked <span className="text-blue-600">Questions</span>
          </motion.h2>
          
          <motion.div 
            className="space-y-4"
            variants={containerVariants}
          >
            {[
              {
                question: "What is MediFinder?",
                answer: "It is an app that connects medical facilities with patients, making it easier for patients to find access to health care services."
              },
              {
                question: "Is MediFinder a free platform?",
                answer: "Yes, MediFinder is completely free for patients to use."
              },
              {
                question: "How do I register my Medical service?",
                answer: "Click on the Get Started button or Sign Up button to register your medical facility."
              },
              {
                question: "Can I book appointments through MediFinder?",
                answer: "Yes, our platform allows you to book appointments with healthcare providers directly."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer text-lg font-medium text-gray-800">
                    <span>{faq.question}</span>
                    <span className="transition-transform duration-300 group-hover:rotate-90">+</span>
                  </summary>
                  <p className="mt-4 text-gray-600">{faq.answer}</p>
                </details>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        className="py-16 px-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={scaleUp}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Healthcare Near You?</h2>
          <p className="text-xl mb-8">Join thousands of users who found their perfect healthcare provider through MediFinder</p>
          <Link 
            to="/Signup" 
            className="inline-block bg-white text-blue-600 hover:bg-gray-100 text-lg font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Now
          </Link>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;