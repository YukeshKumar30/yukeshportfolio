// ────────────────────────────────────────────────────────────────
// PORTFOLIO CONTENT — single source of truth.
// Edit this file to update copy, links, and assets across the site.
// Replace every "CONFIGURE:" value before deploying.
// ────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Yukesh Kumar R',
  role: 'Web Developer / Full Stack Development',
  location: 'Based in Tamil Nadu, India',
  email: 'yukiraja760@gmail.com',
  phone: '+91 7092307662',
  linkedin: 'https://www.linkedin.com/in/yukesh-kumar-9a12b',
  github: 'https://github.com/YukeshKumar30',
  // CONFIGURE: path to the resume PDF, placed in /public.
  resumeUrl: '/resume.pdf'
}

export const hero = {
  headline: 'Crafting digital experiences with code and intention.',
  subcopy:
    "I'm Yukesh Kumar, a web developer building thoughtful, responsive digital experiences — from interactive applications to real-world client websites."
}

export const about = {
  statement: 'Beyond the code, I build experiences that connect ideas with people.',
  paragraphs: [
    "I'm an MCA graduate with a foundation in web development, frontend technologies, Python, SQL, and responsive application design. My path started in the classroom, but it took shape through building — a three-month full stack internship, an academic AI interview trainer, and a live website for a real business client.",
    'I care about the details that make an interface feel considered: how type sits on a page, how a layout holds together at every screen size, how quickly something loads. Right now I\'m focused on growing as a full stack developer, one project at a time.'
  ],
  // Portrait image in /public
  portraitSrc: '/yukesh.jpg'
}

export const education = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Nehru Institute of Information Technology and Management, Coimbatore',
    period: '2024 – 2026',
    detail: 'CGPA: 8.42'
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Jamal Mohamed College, Tiruchirappalli',
    period: '2021 – 2024',
    detail: '73%'
  }
]

export const schoolEducation = [
  {
    title: 'Higher Secondary (HSC)',
    standard: '12 (HSC)',
    school: 'AKT Academy Matric Higher Secondary School',
    location: 'Kallakurichi',
    year: '2021',
    percentage: '78.9%'
  },
  {
    title: 'Secondary School (SSLC)',
    standard: '10 (SSLC)',
    school: 'AKT Academy Matric Higher Secondary School',
    location: 'Kallakurichi',
    year: '2019',
    percentage: '75.6%'
  }
]

export const experience = [
  {
    year: '2026',
    title: 'Web Development Intern',
    org: 'EL Codamics, Coimbatore',
    period: '3 months',
    description:
      'Completed a Full Stack Development internship, working with HTML, CSS, JavaScript, and Python under the guidance of senior developers — gaining practical exposure to both frontend development and backend logic.'
  },
  {
    year: '2026',
    title: 'MCA Completed',
    org: 'Nehru Institute of Information Technology and Management',
    period: 'CGPA 8.42',
    description: 'Completed postgraduate study in computer applications, building on a foundation in programming, databases, and web technologies.'
  },
  {
    year: '2024',
    title: 'BCA Completed',
    org: 'Jamal Mohamed College, Tiruchirappalli',
    period: '73%',
    description: 'Completed undergraduate study in computer applications, establishing the fundamentals of programming and software development.'
  }
]

export const skills = {
  Frontend: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Responsive Web Design'],
  'Backend & Database': ['Python', 'SQL'],
  'Development Tools': ['Git', 'GitHub', 'Visual Studio Code'],
  'Additional Skills': ['Graphic Design', 'Content Writing', 'Social Media Marketing']
}

export const projects = [
  {
    number: '01',
    name: 'Kallai Gift Center',
    category: 'Client Project — Business Website',
    badge: 'Real Client Project',
    description:
      'A live business website developed for Kallai Gift Center, a Kallakurichi-based business spanning gifts, photography, and events. Delivered end to end — from layout and responsive implementation to deployment.',
    approach:
      'Built a clean, responsive interface tailored to how customers browse a gifting and events business, with attention to readable layout across devices and a straightforward path to contact the business.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://kallai-gift-center.vercel.app/',
    repoUrl: null,
    // Client project preview screenshot
    previewSrc: '/kallai-gift-center.png'
  },
  {
    number: '02',
    name: 'AI Virtual Interview Trainer',
    category: 'Academic Project — Real-Time Feedback',
    badge: 'Academic Project',
    description:
      'A web-based virtual interview trainer that simulates mock interviews and surfaces real-time performance feedback, with a responsive frontend and a SQL-backed store for interview data and feedback reports.',
    approach:
      'Implemented the interface layer in HTML, CSS, and JavaScript, with Python-based logic handling interview flow and SQL managing storage — connecting a usable frontend to real backend logic.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Python', 'SQL'],
    liveUrl: null,
    // CONFIGURE: add the repository URL once available.
    repoUrl: null,
    previewSrc: '/interview-ai.png'
  }
]

export const contact = {
  headline: 'Have something worth building?',
  subcopy: "Let's turn your next idea into a thoughtful digital experience."
}

export const nav = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' }
]
