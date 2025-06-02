"use client";

import {
  AnimatePresence,
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
  FormData,
  FormErrors,
  Project,
  Skill,
  SubmitStatus,
} from "../data/interface";
import {
  SiAngular,
  SiFirebase,
  SiGit,
  SiGraphql,
  SiJavascript,
  SiMaterialdesign,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import {
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
  FaPhone,
  FaArrowUp,
  FaTimes,
  FaInstagram,
  FaTwitter,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { experiences, certifications, projects, education } from "../data/data";
import Link from "next/link";
import Image from "next/image";

const Homepage = () => {
  const skills: Skill[] = [
    {
      name: "React",
      icon: <SiReact className="text-indigo-500" size={24} />,
      category: "frontend",
    },
    {
      name: "Angular",
      icon: <SiAngular className="text-red-600" size={24} />,
      category: "frontend",
    },
    { name: "Next.js", icon: <SiNextdotjs size={24} />, category: "frontend" },
    {
      name: "TypeScript",
      icon: <SiTypescript className="text-blue-600" size={24} />,
      category: "frontend",
    },
    {
      name: "JavaScript",
      icon: <SiJavascript className="text-yellow-400" size={24} />,
      category: "frontend",
    },
    {
      name: "Redux",
      icon: <SiRedux className="text-purple-600" size={24} />,
      category: "state",
    },
    {
      name: "Tailwind CSS",
      icon: <SiTailwindcss className="text-blue-400" size={24} />,
      category: "styling",
    },
    {
      name: "Material UI",
      icon: <SiMaterialdesign className="text-blue-500" size={24} />,
      category: "styling",
    },
    {
      name: "Firebase",
      icon: <SiFirebase className="text-yellow-500" size={24} />,
      category: "backend",
    },
    {
      name: "Node.js",
      icon: <SiNodedotjs className="text-green-500" size={24} />,
      category: "backend",
    },
    {
      name: "GraphQL",
      icon: <SiGraphql className="text-pink-600" size={24} />,
      category: "backend",
    },
    {
      name: "Git",
      icon: <SiGit className="text-orange-600" size={24} />,
      category: "tools",
    },
  ];

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);

  const FORMSPREE_URL = "https://formspree.io/f/mdkgvblo";

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(
      (prev) =>
        ({
          ...prev,
          [name]: value,
        } as FormData)
    );

    // Clear submit status when user starts typing again
    if (submitStatus) {
      setSubmitStatus(null);
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    setSubmitStatus(null);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" } as FormData);
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const useAnimateOnScroll = () => {
    const controls = useAnimation();
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start("visible");
      }
    }, [controls, inView]);
    return {
      ref,
      controls,
      variants: {
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
        hidden: { opacity: 0, y: 50 },
      },
    };
  };

  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // New animation-related states
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const cursorRef = useRef({ x: 0, y: 0 });

  // Refs for sections
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Animation hooks
  const aboutAnimation = useAnimateOnScroll();
  const experienceAnimation = useAnimateOnScroll();
  const skillsAnimation = useAnimateOnScroll();
  const projectsAnimation = useAnimateOnScroll();
  const contactAnimation = useAnimateOnScroll();

  // Parallax effect for hero section
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Handle scroll to determine active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;

      if (
        homeRef.current &&
        scrollPosition <
          homeRef.current.offsetTop + homeRef.current.offsetHeight
      ) {
        setActiveSection("home");
      } else if (
        aboutRef.current &&
        scrollPosition <
          aboutRef.current.offsetTop + aboutRef.current.offsetHeight
      ) {
        setActiveSection("about");
      } else if (
        experienceRef.current &&
        scrollPosition <
          experienceRef.current.offsetTop + experienceRef.current.offsetHeight
      ) {
        setActiveSection("experience");
      } else if (
        skillsRef.current &&
        scrollPosition <
          skillsRef.current.offsetTop + skillsRef.current.offsetHeight
      ) {
        setActiveSection("skills");
      } else if (
        projectsRef.current &&
        scrollPosition <
          projectsRef.current.offsetTop + projectsRef.current.offsetHeight
      ) {
        setActiveSection("projects");
      } else if (contactRef.current) {
        setActiveSection("contact");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Enhanced mouse parallax effect for hero section
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      });
      // Store mouse position for potential custom cursor
      cursorRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Floating animation for skills
  const floatingAnimation = {
    hidden: { y: 0, opacity: 0 },
    visible: (i: number) => ({
      y: [0, -10, 0],
      opacity: 1,
      transition: {
        delay: i * 0.1,
        y: {
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse" as const,
          ease: "easeInOut",
        },
        opacity: { duration: 0.5 },
      },
    }),
  };

  // Playful button hover animation
  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        yoyo: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-50">
      {/* Custom cursor */}
      <AnimatePresence>
        {animationPlaying && (
          <motion.div
            className="fixed w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 mix-blend-screen pointer-events-none z-50"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            style={{
              x: cursorRef.current.x - 16,
              y: cursorRef.current.y - 16,
            }}
          />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md dark:bg-gray-900/90 shadow-lg transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2"
          >
            <motion.span
              className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, 0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              MO
            </motion.span>
            <h1 className="text-lg font-semibold dark:text-white">
              Motunrayo Odusina
            </h1>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex space-x-6"
          >
            {[
              "home",
              "about",
              "experience",
              "skills",
              "projects",
              "contact",
            ].map((item) => (
              <motion.li key={item} whileHover={{ scale: 1.05 }}>
                <button
                  onMouseEnter={() => setAnimationPlaying(true)}
                  onMouseLeave={() => setAnimationPlaying(false)}
                  onClick={() => scrollToSection(item)}
                  className={`text-sm font-medium py-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors relative ${
                    activeSection === item
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  {activeSection === item && (
                    <motion.span
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-600"
                      layoutId="activeSection"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              </motion.li>
            ))}
          </motion.ul>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"
            >
              <ul className="container mx-auto px-4 py-2 space-y-2">
                {[
                  "home",
                  "about",
                  "experience",
                  "skills",
                  "projects",
                  "contact",
                ].map((item) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.2,
                      delay:
                        0.1 *
                        [
                          "home",
                          "about",
                          "experience",
                          "skills",
                          "projects",
                          "contact",
                        ].indexOf(item),
                    }}
                    whileHover={{ scale: 1.03, x: 5 }}
                  >
                    <button
                      onClick={() => {
                        scrollToSection(item);
                        setIsMenuOpen(false);
                      }}
                      className={`w-full text-left py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                        activeSection === item
                          ? "text-indigo-600 dark:text-indigo-400 font-medium"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        ref={homeRef}
        className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden"
      >
        <motion.div
          style={{ y: y1, opacity }}
          className="container mx-auto px-4 relative z-10"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <motion.h2
                className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                FRONTEND DEVELOPER
              </motion.h2>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="inline-block">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="inline-block"
                  >
                    M
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="inline-block"
                  >
                    o
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="inline-block"
                  >
                    t
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="inline-block"
                  >
                    u
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                    className="inline-block"
                  >
                    n
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.0, duration: 0.5 }}
                    className="inline-block"
                  >
                    r
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                    className="inline-block"
                  >
                    a
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="inline-block"
                  >
                    y
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.3, duration: 0.5 }}
                    className="inline-block"
                  >
                    o
                  </motion.span>
                </span>
                <span className="inline-block ml-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.5 }}
                    className="inline-block"
                  >
                    O
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.5 }}
                    className="inline-block"
                  >
                    d
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.6, duration: 0.5 }}
                    className="inline-block"
                  >
                    u
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.7, duration: 0.5 }}
                    className="inline-block"
                  >
                    s
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8, duration: 0.5 }}
                    className="inline-block"
                  >
                    i
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.9, duration: 0.5 }}
                    className="inline-block"
                  >
                    n
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.0, duration: 0.5 }}
                    className="inline-block"
                  >
                    a
                  </motion.span>
                </span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-600 dark:text-gray-300 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.1, duration: 0.8 }}
              >
                Building beautiful, responsive, and user-friendly web
                applications with modern technologies.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.3, duration: 0.5 }}
              >
                <motion.a
                  href="#contact"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white rounded-md font-medium shadow-lg transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">Contact Me</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </motion.a>
                <motion.a
                  href="#projects"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-transparent border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-md font-medium transition-colors duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10">View Projects</span>
                  <span className="absolute top-0 left-0 w-full h-full bg-indigo-100 dark:bg-indigo-900/30 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                </motion.a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="md:w-1/2 flex justify-center"
              style={{ y: y2 }}
            >
              <div className="relative w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full opacity-20"
                  animate={{
                    scale: [1, 1.05, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                ></motion.div>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full overflow-hidden"
                  style={{
                    transform: `translate(${mousePosition.x * 20}px, ${
                      mousePosition.y * 20
                    }px)`,
                  }}
                  animate={{
                    boxShadow: [
                      "0 0 0 rgba(129, 140, 248, 0.5)",
                      "0 0 20px rgba(129, 140, 248, 0.5)",
                      "0 0 0 rgba(129, 140, 248, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                >
                  <div className="w-full h-full bg-[url('/me.jpg')] bg-cover bg-center"></div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="mt-16 flex flex-wrap justify-center md:justify-start gap-6"
          >
            <motion.a
              href="https://github.com/mospakles"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
              whileHover={{ scale: 1.1, y: -3 }}
            >
              <FaGithub size={18} />
              <span>GitHub</span>
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/motunrayo-odusina"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
              whileHover={{ scale: 1.1, y: -3 }}
            >
              <FaLinkedinIn size={18} />
              <span>LinkedIn</span>
            </motion.a>
            <motion.a
              href="mailto:motunrayodusina@gmail.com"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
              whileHover={{ scale: 1.1, y: -3 }}
            >
              <FaEnvelope size={18} />
              <span>Email</span>
            </motion.a>
            <motion.a
              href="https://api.whatsapp.com/send?phone=2348147441749"
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
              whileHover={{ scale: 1.1, y: -3 }}
            >
              <FaPhone size={18} />
              <span>Phone</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Background particles */}
        <div className="absolute inset-0 -z-10 opacity-10 dark:opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-indigo-500"
              initial={{
                x:
                  typeof window !== "undefined"
                    ? Math.random() * window.innerWidth
                    : Math.random() * 1200,
                y:
                  typeof window !== "undefined"
                    ? Math.random() * window.innerHeight
                    : Math.random() * 800,
                opacity: Math.random() * 0.5 + 0.3,
                scale: Math.random() * 0.6 + 0.2,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
              }}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      >
        <motion.div
          ref={aboutAnimation.ref}
          initial="hidden"
          animate={aboutAnimation.controls}
          variants={aboutAnimation.variants}
          className="container mx-auto px-4"
        >
          <div className="">
            <motion.div
              className="w-full"
              whileInView={{
                x: [-50, 0],
                opacity: [0, 1],
              }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <motion.h2 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-2">
                ABOUT ME
              </motion.h2>
              <h3 className="text-3xl font-bold mb-4 dark:text-white">
                Passionate Frontend Developer with an eye for design
              </h3>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  I&apos;m a dedicated frontend developer with 5+ years of
                  experience building modern, responsive web applications. My
                  journey in web development started with HTML, CSS, and
                  JavaScript, and has evolved to include modern frameworks like
                  React, Angular, and Next.js.
                </p>
                <p>
                  I specialize in creating intuitive user interfaces with a
                  focus on performance, accessibility, and responsive design. My
                  approach combines technical expertise with an understanding of
                  user experience principles to deliver applications that are
                  not only functionally robust but also visually appealing and
                  user-friendly.
                </p>
                <p>
                  When I&apos;m not coding, you can find me exploring new
                  technologies, contributing to open-source projects, or sharing
                  my knowledge through blog posts and community events.
                </p>
              </div>

              <motion.div
                className="mt-6 flex space-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="#contact"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white rounded-md font-medium shadow-md transition-all duration-300"
                >
                  Contact Me
                </motion.a>
                <motion.a
                  href="https://drive.google.com/file/d/1CuGcsNNK-ThkCemaA9hWHjFWWLNKEIBb/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-transparent border border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-800 rounded-md font-medium transition-colors duration-300"
                >
                  Download Resume
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        ref={experienceRef}
        className="py-16 md:py-24 transition-colors duration-300"
      >
        <motion.div
          ref={experienceAnimation.ref}
          initial="hidden"
          animate={experienceAnimation.controls}
          variants={experienceAnimation.variants}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-12">
            <motion.h2 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-2">
              MY JOURNEY
            </motion.h2>
            <h3 className="text-3xl font-bold mb-4 dark:text-white">
              Experience & Education
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A timeline of my professional experience and educational
              background
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Professional Experience */}
            <div className="mb-12">
              <motion.h4
                className="text-xl font-semibold mb-6 dark:text-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Professional Experience
              </motion.h4>

              <div className="relative border-l-2 border-indigo-200 dark:border-gray-700 pl-8 ml-4">
                {experiences.map((experience, index) => (
                  <motion.div
                    key={index}
                    className="mb-10 relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute -left-[41px] mt-1.5">
                      <motion.div
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </motion.div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                      <div className="flex flex-wrap justify-between items-center mb-2">
                        <h5 className="text-lg font-semibold dark:text-white">
                          {experience.position}
                        </h5>
                        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
                          {experience.duration}
                        </span>
                      </div>
                      <h6 className="text-gray-700 dark:text-gray-300 font-medium mb-3">
                        {experience.company} | {experience.location}
                      </h6>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                        {experience.description.map((desc, idx) => (
                          <li key={idx}>{desc}</li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {experience.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="max-w-4xl mx-auto py-16 px-4">
              {/* Education Section */}
              <motion.h4
                className="text-2xl font-bold mb-8 dark:text-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Education
              </motion.h4>

              <div className="relative border-l-2 border-indigo-200 dark:border-gray-700 pl-8 ml-4 mb-16">
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.id}
                    className="mb-10 relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute -left-[41px] mt-1.5">
                      <motion.div
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </motion.div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                      <div className="flex flex-wrap justify-between items-center mb-3">
                        <h5 className="text-lg font-bold dark:text-white">
                          {edu.degree}
                        </h5>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                          {edu.period}
                        </span>
                      </div>
                      <h6 className="text-gray-800 dark:text-gray-200 font-medium mb-2">
                        {edu.institution}
                      </h6>
                      {edu.status && (
                        <span className="text-gray-600 dark:text-gray-400 italic">
                          {edu.status}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Certifications Section */}
              <motion.h4
                className="text-2xl font-bold mb-8 dark:text-white"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Certifications
              </motion.h4>

              <div className="relative border-l-2 border-indigo-200 dark:border-gray-700 pl-8 ml-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    className="mb-10 relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="absolute -left-[41px] mt-1.5">
                      <motion.div
                        className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center"
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </motion.div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
                      <div className="flex flex-wrap justify-between items-center mb-2">
                        <h5 className="text-lg font-semibold dark:text-white">
                          {cert.name}
                        </h5>
                        <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
                          {cert.date}
                        </span>
                      </div>
                      <h6 className="text-gray-700 dark:text-gray-300 font-medium">
                        {cert.issuer}
                      </h6>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        ref={skillsRef}
        className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300"
      >
        <motion.div
          ref={skillsAnimation.ref}
          initial="hidden"
          animate={skillsAnimation.controls}
          variants={skillsAnimation.variants}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-12">
            <motion.h2 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-2">
              MY TOOLKIT
            </motion.h2>
            <h3 className="text-3xl font-bold mb-4 dark:text-white">
              Skills & Technologies
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Technologies and tools I use to bring products to life
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={floatingAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex flex-col items-center hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors duration-300 group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="mb-4 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300"
                >
                  {skill.icon}
                </motion.div>
                <h4 className="text-md font-medium dark:text-white">
                  {skill.name}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-2 capitalize">
                  {skill.category}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={projectsRef}
        className="py-16 md:py-24 transition-colors duration-300"
      >
        <motion.div
          ref={projectsAnimation.ref}
          initial="hidden"
          animate={projectsAnimation.controls}
          variants={projectsAnimation.variants}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-12">
            <motion.h2 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-2">
              MY WORK
            </motion.h2>
            <h3 className="text-3xl font-bold mb-4 dark:text-white">
              Featured Projects
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Check out some of my recent projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 flex flex-col group"
              >
                <div className="relative overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 w-full bg-gray-200 dark:bg-gray-800">
                    <div className="relative h-48 w-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        style={{ objectFit: "cover" }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white space-y-2">
                      <div className="flex gap-2">
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-indigo-600 rounded-md text-sm hover:bg-indigo-700 transition-colors duration-300"
                        >
                          Live Demo
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h4 className="text-lg font-semibold mb-2 dark:text-white">
                    {project.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={closeSuccessModal}
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              className="bg-white dark:bg-gray-900 rounded-lg p-8 max-w-md w-full mx-auto shadow-2xl border border-gray-200 dark:border-gray-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-4">
                  <FaCheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Thank you for reaching out! I&apos;ll get back to you as soon
                  as possible.
                </p>
                <div className="flex gap-3 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={closeSuccessModal}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white rounded-md font-medium transition-all duration-300"
                  >
                    Close
                  </motion.button>
                </div>
              </div>
              <button
                onClick={closeSuccessModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section
        id="contact"
        className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 min-h-screen"
      >
        <motion.div
          ref={contactAnimation.ref}
          initial="hidden"
          animate="visible"
          variants={contactAnimation.variants}
          className="container mx-auto px-4"
        >
          <div className="text-center mb-12">
            <motion.h2 className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 mb-2">
              GET IN TOUCH
            </motion.h2>
            <h3 className="text-3xl font-bold mb-4 dark:text-white">
              Contact Me
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or want to discuss opportunities? Feel free
              to reach out!
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex flex-col"
            >
              <h4 className="text-xl font-semibold mb-6 dark:text-white">
                Send Me a Message
              </h4>

              {/* Success/Error Messages */}
              {submitStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md flex items-center space-x-3"
                >
                  <FaExclamationTriangle className="text-red-600 dark:text-red-400" />
                  <span className="text-red-800 dark:text-red-200">
                    Sorry, there was an error sending your message. Please try
                    again.
                  </span>
                </motion.div>
              )}

              <div className="space-y-4 flex-grow">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.name
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.email
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div className="flex-grow flex flex-col">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={1}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-md border ${
                      errors.message
                        ? "border-red-300 dark:border-red-600"
                        : "border-gray-300 dark:border-gray-600"
                    } bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors duration-300 resize-vertical flex-grow`}
                    placeholder="Your message here..."
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  variants={buttonVariants}
                  whileHover={!isSubmitting ? "hover" : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                  className={`w-full px-6 py-3 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
                  } text-white rounded-md font-medium shadow-lg transition-all duration-300 relative overflow-hidden group mt-auto`}
                >
                  <span className="relative z-10">
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </span>
                  {!isSubmitting && (
                    <span className="absolute top-0 left-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                  )}
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md border border-gray-100 dark:border-gray-700 flex-grow flex flex-col">
                <h4 className="text-xl font-semibold mb-6 dark:text-white">
                  Contact Information
                </h4>
                <div className="space-y-6 flex-grow py-2">
                  <div className="flex items-start space-x-4">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-md text-indigo-600 dark:text-indigo-400">
                      <FaEnvelope size={20} />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email
                      </h5>
                      <a
                        href="mailto:motunrayodusina@gmail.com"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        motunrayodusina@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-md text-indigo-600 dark:text-indigo-400">
                      <FaPhone size={20} />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone
                      </h5>
                      <a
                        href="https://api.whatsapp.com/send?phone=2348147441749"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        +2348147441749
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-md text-indigo-600 dark:text-indigo-400">
                      <FaLinkedinIn size={20} />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        LinkedIn
                      </h5>
                      <a
                        href="https://linkedin.com/in/motunrayo-odusina"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        linkedin.com/in/motunrayo-odusina
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 p-3 rounded-md text-indigo-600 dark:text-indigo-400">
                      <FaGithub size={20} />
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        GitHub
                      </h5>
                      <a
                        href="https://github.com/mospakles"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                      >
                        github.com/mospakles
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <Link href="/">
                  <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
                    Motunrayo Odusina
                  </span>
                </Link>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Frontend developer passionate about creating beautiful,
                responsive, and user-friendly web applications with modern
                technologies.
              </p>
              <div className="flex space-x-4 mb-6">
                <motion.a
                  href="https://github.com/mospakles"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="bg-gray-800 hover:bg-indigo-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FaGithub size={18} />
                </motion.a>
                <motion.a
                  href="https://linkedin.com/in/motunrayo-odusina"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="bg-gray-800 hover:bg-indigo-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FaLinkedinIn size={18} />
                </motion.a>
                <motion.a
                  href="https://twitter.com/mospakles"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="bg-gray-800 hover:bg-indigo-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FaTwitter size={18} />
                </motion.a>
                <motion.a
                  href="https://instagram.com/mospakles"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="bg-gray-800 hover:bg-indigo-600 h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-300"
                >
                  <FaInstagram size={18} />
                </motion.a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#about"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#experience"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Experience
                  </a>
                </li>
                <li>
                  <a
                    href="#skills"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Skills
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Contact</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <FaEnvelope className="mt-1 text-indigo-400" size={16} />
                  <a
                    href="mailto:motunrayodusina@gmail.com"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    motunrayodusina@gmail.com
                  </a>
                </li>
                <li className="flex items-start space-x-2">
                  <FaPhone className="mt-1 text-indigo-400" size={16} />
                  <a
                    href="https://api.whatsapp.com/send?phone=2348147441749"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    +2348147441749
                  </a>
                </li>
                <li className="flex items-start space-x-2">
                  <FaLinkedinIn className="mt-1 text-indigo-400" size={16} />
                  <a
                    href="https://linkedin.com/in/motunrayo-odusina"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    /motunrayo-odusina
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Motunrayo Odusina. All rights
              reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 sm:mt-0">
              Designed and built with <span className="text-red-500">♥</span> by
              Motunrayo Odusina
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to top button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg z-30 transition-colors duration-300"
          >
            <FaArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Homepage;
