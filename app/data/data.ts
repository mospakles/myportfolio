import { Experience, Project } from "./interface";

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Princeps Credit Systems Limited",
    location: "Lagos, Nigeria",
    position: "Front-End Developer",
    duration: "Mar 2023 - Present",
    description: [
      "Architected and optimized the frontend of a loan management system, improving performance, usability, and accessibility.",
      "Developed dynamic and reusable UI components, reducing development time by 30% and ensuring visual consistency.",
      "Collaborated with backend engineers and product managers to optimize workflows, leading to an intuitive and efficient loan application process.",
      "Enhanced state management using NgRx to ensure smooth handling of financial data and application states.",
    ],
    technologies: ["Angular", "TypeScript", "NgRx", "RxJS", "Tailwind CSS"],
  },
  {
    id: 2,
    company: "Spectra Risk Solutions",
    location: "London, UK",
    position: "Front-End Developer",
    duration: "Jan 2022 - Mar 2023",
    description: [
      "Designed and developed a real-time forex exchange platform, improving data visualization and accuracy for financial traders.",
      "Implemented secure authentication and authorization (OAuth, JWT), ensuring robust data protection and user privacy.",
      "Optimized frontend performance, reducing load times by 40%, enhancing accessibility for global users.",
      "Worked with GraphQL and REST APIs to ensure seamless data retrieval and interactions.",
    ],
    technologies: ["NextJs", "Redux"],
    remote: true,
  },
  {
    id: 3,
    company: "Maxfront Technologies",
    location: "Lagos, Nigeria",
    position: "Front-End Developer",
    duration: "Aug 2020 - Dec 2022",
    description: [
      "Led the development of a bidding platform, designing an intuitive user dashboard and admin panel for seamless management.",
      "Improved cross-browser compatibility and mobile responsiveness, increasing user engagement by 25%.",
      "Collaborated with the marketing team to enhance conversion-driven UI/UX elements, improving sign-up rates.",
    ],
    technologies: ["Angular", "RxJx"],
    remote: true,
  },
  {
    id: 4,
    company: "LinuxJobber",
    location: "Greenbelt, USA",
    position: "Front-End Developer Intern",
    duration: "Oct 2019 - Jun 2020",
    description: [
      "Assisted in frontend development for web applications, refining UI components for better responsiveness.",
      "Participated in code reviews, ensuring adherence to best coding practices and agile methodologies.",
      "Worked alongside senior developers to maintain and enhance existing projects.",
    ],
    technologies: ["React", "Zustand"],
    remote: true,
  },
];

export const projects: Project[] = [
  {
    id: 1,
    title: "Digisign",
    description:
      "A platform that redefines the standards of document signing, by integrating cutting-edge biometric signing capabilities which ensures the authenticity of the signer",
    technologies: ["Next", "TypeScript", "Redux", "Tailwind CSS"],
    image: "/digisign.png",
    liveUrl: "https://digisignit.com/",
    githubUrl: "https://github.com/mospakles/loan-management",
  },
  {
    id: 2,
    title: "BellFields Apartments",
    description: "A platform for booking apartments for stay",
    technologies: ["Next", "TypeScript", "Redux", "D3.js", "Tailwind CSS"],
    image: "/bellfield.png",
    liveUrl: "https://bellfieldsapartments.africa/",
    githubUrl: "https://github.com/mospakles/forex-platform",
  },
  {
    id: 3,
    title: "Koppoh",
    description:
      "An innovative solutions streamline understanding the unique challenges of African SMEs and Startups,",
    technologies: [
      "React",
      "Next.js",
      "Firebase",
      "Tailwind CSS",
      "WebSockets",
    ],
    image: "/koppoh.png",
    liveUrl: "https://koppoh.ng/",
    githubUrl: "https://github.com/mospakles/bidding-platform",
  },
  {
    id: 4,
    title: "Young Legend Website",
    description: "An entertainment website",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    image: "/lavid.png",
    liveUrl: "https://www.younglegend.net/",
    githubUrl: "https://github.com/mospakles/portfolio",
  },
  {
    id: 5,
    title: "Tango Brooks",
    description:
      "A platform to get real-time tracking, spending control, and guaranteed savings on every purchase",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    image: "/tango.png",
    liveUrl: "https://tangofuelcards.com/",
    githubUrl: "https://github.com/mospakles/portfolio",
  },
  {
    id: 4,
    title: "HR Desk",
    description: "A platform that provides comprehensive HR task management.",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    image: "/hrdesk.png",
    liveUrl: "https://hrdesk.africa/",
    githubUrl: "https://github.com/mospakles/portfolio",
  },
];

export const certifications = [
  {
    id: 1,
    name: "Frontend Development Program",
    issuer: "AltSchool Africa",
    date: "Sep 2023",
  },
  {
    id: 2,
    name: "Microsoft Certified: Azure Developer Associate",
    issuer: "Microsoft",
    date: "Dec 2022",
  },
  {
    id: 3,
    name: "Meta Front-End Developer Professional Certificate",
    issuer: "Coursera",
    date: "Apr 2022",
  },
  {
    id: 4,
    name: "Frontend Web Developer Nanodegree",
    issuer: "Udacity",
    date: "Nov 2021",
  },
  {
    id: 5,
    name: "Software Engineering Program",
    issuer: "ALX",
    date: "Mar 2022",
  },
];

export const education = [
  {
    id: 1,
    degree:
      "Master of Business Administration (MBA) – Entrepreneurship & Innovation",
    status: "In Progress, Jan 2025",
    institution: "Miva University, Abuja, Nigeria",
    period: "2023 - Present",
  },
  {
    id: 2,
    degree: "Bachelor of Science in Chemical Engineering",
    status: "",
    institution: "Obafemi Awolowo University, Ile-Ife, Osun, Nigeria",
    period: "2015 - 2022",
  },
];
