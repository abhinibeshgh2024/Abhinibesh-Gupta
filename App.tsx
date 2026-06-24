import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart4, Brain, Cpu, LayoutTemplate, Palette, Database, Terminal, 
  Phone, Mail, MapPin, ExternalLink, Send, ArrowRight, 
  Sparkles, BookOpen, Menu, X, MessageSquare, 
  Github, Linkedin, Instagram, RefreshCw, ChevronUp, Bot, AlertCircle, Check, MessageCircle,
  Briefcase
} from 'lucide-react';

// Contact and links
const PHONE_NUMBER = '+919142543191';
const EMAIL_1 = 'infostarmedia133@gmail.com';
const EMAIL_2 = 'nexpploro@gmail.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/abhinibesh-gupta-758596265';
const GITHUB_URL = 'https://github.com/abhinibeshgh2024';
const INSTAGRAM_URL = 'https://www.instagram.com/abhinibeshgupta/';

// Skills with associated colors and icons
const SKILLS = [
  { name: 'Data Analysis', icon: BarChart4, color: 'text-google-blue', bg: 'bg-google-blue/10', border: 'border-google-blue/30', hoverBorder: 'hover:border-google-blue' },
  { name: 'Data Science', icon: Brain, color: 'text-google-red', bg: 'bg-google-red/10', border: 'border-google-red/30', hoverBorder: 'hover:border-google-red' },
  { name: 'Machine Learning', icon: Cpu, color: 'text-google-yellow', bg: 'bg-google-yellow/10', border: 'border-google-yellow/30', hoverBorder: 'hover:border-google-yellow' },
  { name: 'Frontend Development', icon: LayoutTemplate, color: 'text-google-green', bg: 'bg-google-green/10', border: 'border-google-green/30', hoverBorder: 'hover:border-google-green' },
  { name: 'UI/UX Design', icon: Palette, color: 'text-google-blue', bg: 'bg-google-blue/10', border: 'border-google-blue/30', hoverBorder: 'hover:border-google-blue' },
  { name: 'SQL Database', icon: Database, color: 'text-google-red', bg: 'bg-google-red/10', border: 'border-google-red/30', hoverBorder: 'hover:border-google-red' },
  { name: 'Python Programming', icon: Terminal, color: 'text-google-green', bg: 'bg-google-green/10', border: 'border-google-green/30', hoverBorder: 'hover:border-google-green' },
];

// Project specifications
const PROJECTS = [
  {
    title: "Advanced Multi-Metric Mail Analyzer and Assistant",
    link: "https://email-spam-detection-system-auqefbdapnvhfjefdfkmvo.streamlit.app/",
    description: "A strategic system using advanced machine learning for spam detection, email classification, and AI-enabled drafting assistance based on multiple routing parameters.",
    tags: ["Machine Learning", "Python", "NLP", "Streamlit"],
    accentColor: "border-l-4 border-[#4285F4]"
  },
  {
    title: "Smart City Finance Analyzer",
    link: "https://smart-city-finance-tracker-n2n4y4dxu6siuezvez9ntn.streamlit.app/",
    description: "A comprehensive governance and municipal transaction portal designed to track, budget, and audit financial transactions of a city, encouraging transparency.",
    tags: ["Data Visualization", "Finance Analytics", "Python", "Streamlit"],
    accentColor: "border-l-4 border-[#34A853]"
  },
  {
    title: "Eco Scan Food Carbon Footprints Tracker and Analyzer",
    link: null, // No link
    description: "An environmental intelligence model designed to accurately estimate the carbon footprints and lifecycle emission metrics of various food products and ingredients.",
    tags: ["Data Science", "Sustainability", "Python", "ML Modelling"],
    accentColor: "border-l-4 border-[#EA4335]"
  }
];

// Custom hook for Intersection Observer scroll entry animations
function useIntersectionObserver(className = 'reveal-section', activeClass = 'revealed') {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(activeClass);
            observer.unobserve(entry.target); // trigger animation only once
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const elements = document.querySelectorAll(`.${className}`);
    elements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [className, activeClass]);
}

export default function App() {
  useIntersectionObserver();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [emailDropdownOpen, setEmailDropdownOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([
    { role: 'assistant', content: "Hi! I'm Abhi-Bot, Abhinibesh's virtual assistant. Ask me about his GPA, Python projects, machine learning skills, or how to contact him!" }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  
  // Custom typewriter flashing animation values
  const [footerEmailText, setFooterEmailText] = useState(EMAIL_1);
  const [footerTextIndex, setFooterTextIndex] = useState(0);

  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const emailDropdownRef = useRef<HTMLDivElement>(null);

  // Auto scroll chat to bottom
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, chatLoading]);

  // Typewriter/Flashing Email Rotator in Footer
  useEffect(() => {
    const emails = [EMAIL_1, EMAIL_2];
    const timer = setInterval(() => {
      setFooterTextIndex(prev => (prev + 1) % emails.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const emails = [EMAIL_1, EMAIL_2];
    setFooterEmailText(emails[footerTextIndex]);
  }, [footerTextIndex]);

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (emailDropdownRef.current && !emailDropdownRef.current.contains(event.target as Node)) {
        setEmailDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || chatInput;
    if (!textToSend.trim()) return;

    const newMessages = [...chatMessages, { role: 'user', content: textToSend }];
    setChatMessages(newMessages);
    if (!customText) setChatInput('');
    setChatLoading(true);

    // Simulate AI thinking delay for a highly realistic interaction
    setTimeout(() => {
      const query = textToSend.toLowerCase().trim();
      let responseText = "";

      if (query.includes("gpa") || query.includes("cgpa") || query.includes("marks") || query.includes("result") || query.includes("qualifications") || query.includes("education") || query.includes("12th") || query.includes("btech") || query.includes("grade") || query.includes("usha") || query.includes("college")) {
        responseText = "I scored a 7.5 GPA in my B.Tech CSE at Usha Martin University, Ranchi, and obtained a 68.4% score in my 12th intermediate from BSK College.";
      } else if (query.includes("mail") || query.includes("analyzer") || query.includes("spam") || query.includes("detect") || query.includes("assistant")) {
        responseText = "My active Mail Analyzer project utilizes Python and machine learning to analyze spam flags and automate email drafting. You can access it via the project links.";
      } else if (query.includes("finance") || query.includes("smart city") || query.includes("tracker") || query.includes("municipal") || query.includes("budget")) {
        responseText = "The Smart City Finance Tracker is a Streamlit dashboard that visualizes public budgets, municipal spending, and governance metrics. The live link is shown above.";
      } else if (query.includes("eco scan") || query.includes("food") || query.includes("carbon") || query.includes("footprint") || query.includes("emission")) {
        responseText = "The Eco Scan project tracks the ecological carbon footprints of various food items using Python. It helps users model and decrease their climate impact easily.";
      } else if (query.includes("project") || query.includes("github") || query.includes("work")) {
        responseText = "I developed the Mail Analyzer app, Smart City Finance Tracker, and Eco Scan footprints project. Live links for active projects are listed directly in the portfolio.";
      } else if (query.includes("contact") || query.includes("phone") || query.includes("number") || query.includes("email") || query.includes("mail") || query.includes("whatsapp") || query.includes("reach") || query.includes("address") || query.includes("location") || query.includes("live")) {
        responseText = "Contact me on WhatsApp at +91 9142543191 or email me at infostarmedia133@gmail.com and nexpploro@gmail.com. I am based in Ranchi, Jharkhand.";
      } else if (query.includes("skills") || query.includes("python") || query.includes("sql") || query.includes("ml") || query.includes("machine learning") || query.includes("data science") || query.includes("frontend") || query.includes("ui") || query.includes("ux")) {
        responseText = "My skills include Machine Learning, Python, Data Science, SQL, and CSS layouts. I focus on building functional and data-driven modern user interfaces.";
      } else if (query.includes("experience") || query.includes("intern") || query.includes("internship") || query.includes("job")) {
        responseText = "I have completed two Data Science internships: a 6-week virtual internship at Upskill Campus, where I built an Agriculture Cultivation Analysis project and a Smart City Traffic Pattern Analyzer, and a 2-month virtual internship at Infotact Solutions, where I focused on machine learning models and dataset optimization without assigned projects.";
      } else if (query.includes("about") || query.includes("who is") || query.includes("overview") || query.includes("bio") || query.includes("ranchi") || query.includes("gupta") || query.includes("abhinibesh")) {
        responseText = "I am Abhinibesh Gupta from Ranchi, India. I am an undergraduate student specializing in Data Science, Machine Learning, and interactive web application workflows.";
      } else {
        responseText = "Hi! I am Abhi-Bot. Ask me about my B.Tech GPA, projects like the Mail Analyzer, my ML skills, or how you can contact me.";
      }

      setChatMessages(prev => [...prev, { role: 'assistant', content: responseText }]);
      setChatLoading(false);
    }, 600);
  };

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Preset question chips for the bot
  const BOT_CHIPS = [
    "What is your CGPA?",
    "Tell me about the Mail Analyzer.",
    "Give me your contact details.",
    "Do you have internship experience?"
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 pb-16 relative">
      {/* BACKGROUND DECORATIONS (Subtle Google Logo Colors) */}
      <div className="absolute top-0 left-0 right-0 h-[480px] bg-white border-b border-slate-100 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-google-blue/5 rounded-full blur-3xl"></div>
        <div className="absolute top-40 -right-4 bg-google-red/5 w-80 h-80 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 bg-google-yellow/5 w-96 h-96 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-1/4 bg-google-green/5 w-72 h-72 rounded-full blur-3xl"></div>
      </div>

      {/* HEADER SECTION */}
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 z-40 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="flex space-x-0.5">
              <span className="w-3 h-3 rounded-full bg-[#4285F4]"></span>
              <span className="w-3 h-3 rounded-full bg-[#EA4335]"></span>
              <span className="w-3 h-3 rounded-full bg-[#FBBC05]"></span>
              <span className="w-3 h-3 rounded-full bg-[#34A853]"></span>
            </div>
            <span className="font-display font-bold text-lg text-slate-800 tracking-tight">
              Abhinibesh <span className="text-google-blue">Gupta</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Overview', 'Qualifications', 'Experience', 'Skills', 'Projects', 'AI Assistant'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="font-medium text-sm text-slate-600 hover:text-google-blue transition-colors relative group py-1"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-google-blue group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-slate-100 bg-white"
            >
              <div className="px-4 py-3 space-y-2 flex flex-col">
                {['Overview', 'Qualifications', 'Experience', 'Skills', 'Projects', 'AI Assistant'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                    className="w-full text-left py-2 px-3 rounded-lg text-slate-600 hover:bg-slate-50 hover:text-google-blue font-medium transition-all text-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-6xl mx-auto px-4 pt-10 md:pt-16 space-y-24">
        
        {/* HERO / PERSONAL INFO SECTION */}
        <section id="hero" className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center geometric-card relative overflow-hidden">
          {/* Subtle Accent Stripe at top */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-google-blue via-google-red to-google-green"></div>
          
          {/* Avatar side */}
          <div className="md:col-span-4 flex flex-col items-center text-center">
            <div className="relative group p-1 rounded-full border-4 border-slate-100 bg-white shadow-md hover:shadow-lg transition-all duration-500">
              {/* Google logo colored rotating outer rings */}
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-google-blue via-google-red to-google-green opacity-40 blur-sm group-hover:opacity-75 transition duration-500"></div>
              
              <div className="relative rounded-full overflow-hidden w-44 h-44 bg-slate-50 flex items-center justify-center">
                <img 
                  src="/profile_picture_1782226295720_1782226933960.jpg" 
                  alt="Abhinibesh Gupta" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback visual illustration in case of any loading failure
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const initial = document.createElement('div');
                      initial.className = "flex items-center justify-center w-full h-full text-5xl font-extrabold text-white bg-gradient-to-tr from-google-blue via-google-red to-google-green";
                      initial.innerText = "AG";
                      parent.appendChild(initial);
                    }
                  }}
                />
              </div>
            </div>

            <span className="mt-4 px-3 py-1 rounded-full text-xs font-semibold bg-google-blue/10 text-google-blue flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-google-blue animate-pulse"></span>
              <span>Open for Internships & Projects</span>
            </span>
          </div>

          {/* Details side */}
          <div className="md:col-span-8 space-y-6 flex flex-col justify-center">
            <div className="space-y-2">
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight">
                Abhinibesh Gupta
              </h1>
              <p className="font-medium text-lg text-slate-500 flex items-center space-x-2">
                <MapPin className="text-google-red flex-shrink-0" size={18} />
                <span>Simlia, Ranchi, Jharkhand, India (JH, IND)</span>
              </p>
            </div>

            <p className="text-slate-600 leading-relaxed font-sans max-w-2xl">
              Hello! I am a passionate tech enthusiast and undergraduate Computer Science & Engineering student specializing in <strong className="text-google-blue">Data Analysis</strong>, <strong className="text-google-red">Data Science</strong>, and <strong className="text-google-green">Machine Learning</strong>. I love turning rich data sets into structural visual wisdom and strategic real-world solutions.
            </p>

            {/* CTA Contact Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              {/* WhatsApp Button */}
              <motion.a 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                href={`https://wa.me/${PHONE_NUMBER.replace('+', '')}?text=Hi`}
                target="_blank"
                rel="noreferrer"
                id="whatsapp-btn"
                className="inline-flex items-center space-x-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-5 py-3 rounded-xl font-medium text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Chat</span>
              </motion.a>

              {/* Email Dropdown Wrapper */}
              <div className="relative" ref={emailDropdownRef}>
                <motion.button 
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setEmailDropdownOpen(!emailDropdownOpen)}
                  id="email-trigger-btn"
                  className="inline-flex items-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-3 rounded-xl font-medium text-sm shadow-sm hover:shadow-md transition-all cursor-pointer"
                >
                  <Mail size={18} />
                  <span>Choose Email</span>
                  <span className="ml-1 text-[10px] bg-slate-700 text-slate-300 px-1.5 py-0.5 rounded-md">2 addresses</span>
                </motion.button>

                <AnimatePresence>
                  {emailDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20 p-2"
                    >
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 p-2.5 border-b border-slate-50 mb-1">
                        Select Email To Compose
                      </div>
                      
                      <div className="space-y-1">
                        {/* Option 1 */}
                        <div className="p-1 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between group">
                          <a 
                            href={`mailto:${EMAIL_1}`}
                            className="flex-grow text-left text-sm text-slate-700 font-semibold p-1.5 focus:outline-none block truncate"
                          >
                            <span className="text-xs text-google-blue font-extrabold uppercase block tracking-tight text-[9px] mb-0.5">Primary</span>
                            {EMAIL_1}
                          </a>
                          <button 
                            onClick={(e) => { e.stopPropagation(); copyToClipboard(EMAIL_1); }}
                            className="p-1.5 rounded text-slate-400 hover:text-slate-600 transition-colors"
                            title="Copy email"
                          >
                            {copiedEmail === EMAIL_1 ? <Check size={14} className="text-green-500" /> : <span className="text-xs font-normal">Copy</span>}
                          </button>
                        </div>

                        {/* Option 2 */}
                        <div className="p-1 rounded-lg hover:bg-slate-50 transition-colors flex items-center justify-between group">
                          <a 
                            href={`mailto:${EMAIL_2}`}
                            className="flex-grow text-left text-sm text-slate-700 font-semibold p-1.5 focus:outline-none block truncate"
                          >
                            <span className="text-xs text-google-green font-extrabold uppercase block tracking-tight text-[9px] mb-0.5">Alternative</span>
                            {EMAIL_2}
                          </a>
                          <button 
                            onClick={(e) => { e.stopPropagation(); copyToClipboard(EMAIL_2); }}
                            className="p-1.5 rounded text-slate-400 hover:text-slate-600 transition-colors"
                            title="Copy email"
                          >
                            {copiedEmail === EMAIL_2 ? <Check size={14} className="text-green-500" /> : <span className="text-xs font-normal">Copy</span>}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Instant Ask AI Quick trigger */}
              <button 
                onClick={() => setChatOpen(true)}
                className="inline-flex items-center space-x-1.5 bg-gradient-to-r from-google-blue/10 via-google-red/10 to-google-green/10 text-slate-700 hover:from-google-blue/20 hover:via-google-red/20 hover:to-google-green/20 border border-slate-200 px-5 py-3 rounded-xl font-medium text-sm transition-all"
              >
                <Sparkles size={16} className="text-google-blue animate-pulse" />
                <span>Ask AI Bot</span>
              </button>
            </div>
          </div>
        </section>

        {/* OVERVIEW / ABOUT ME SECTION */}
        <section id="overview" className="space-y-8 Scroll-mt-24 reveal-section">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-1 rounded-full bg-google-blue"></span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">Overview</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8 geometric-card space-y-4">
              <h3 className="text-lg font-bold text-slate-800">My Mission & Background</h3>
              
              <div className="space-y-4 text-slate-600 leading-relaxed font-sans text-sm sm:text-base">
                <p>
                  As an ambitious tech undergraduate student, I immerse myself daily at the intersection of data science and actionable backend architecture. My specialization in machine learning and data engineering enables me to build services that don't just compute data—they understand it.
                </p>
                <p>
                  My hands-on **internship experience** in data analytics gave me exposure to solving realistic industrial pain points, modeling performance datasets, and analyzing trends to steer strategic choices. I craft highly interactive user views and secure engines to deliver maximum utility.
                </p>
                <p>
                  I've engineered strategic real-world portals incorporating analytics, such as the <span className="text-google-blue font-semibold">Smart City Finance tracker</span>, the <span className="text-google-red">advanced multi-metric mail analyzer with assistant</span>, and various transparency dashboards for ease of municipal administration.
                </p>
              </div>
            </div>

            <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
              <div className="bg-slate-900 text-white p-6 rounded-2xl flex flex-col justify-between shadow-sm">
                <span className="font-mono text-google-yellow font-bold uppercase tracking-widest text-[10px]">Academic Record</span>
                <div>
                  <h4 className="text-4xl font-extrabold font-display text-white mt-2">7.5</h4>
                  <p className="text-slate-400 font-medium text-xs mt-1">Undergraduate B.Tech GPA</p>
                </div>
              </div>

              <div className="geometric-card flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-google-green/5 rounded-full -mr-8 -mt-8"></div>
                <span className="font-mono text-google-green font-bold uppercase tracking-widest text-[10px]">Intership Status</span>
                <div>
                  <h4 className="text-2xl font-bold font-display text-slate-800 mt-2">Experienced</h4>
                  <p className="text-slate-500 text-xs mt-1">Domain: Data Analytics & ML</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QUALIFICATIONS SECTION */}
        <section id="qualifications" className="space-y-8 scroll-mt-24 reveal-section">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-1 rounded-full bg-google-red"></span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">Qualifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Qualification Item 1 */}
            <div className="geometric-card relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 bg-[#EA4335]/10 text-[#EA4335] px-4 py-1.5 rounded-bl-xl text-xs font-semibold font-mono">
                12th INTERMEDIATE
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-red-50 text-[#EA4335] rounded-xl w-fit">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-800">BSK College, Maithon</h3>
                  <p className="text-slate-400 font-medium text-xs mt-1">Board / Council course certificate</p>
                </div>
                <p className="text-slate-600 font-sans text-sm leading-relaxed">
                  Successfully completed Intermediate standard qualifications with detailed focus on fundamental scientific disciplines and logic systems.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-slate-500 text-xs font-medium uppercase tracking-wide font-mono">Result Overview</span>
                <span className="font-display font-extrabold text-lg text-[#EA4335]">68.4% Score</span>
              </div>
            </div>

            {/* Qualification Item 2 */}
            <div className="geometric-card relative overflow-hidden flex flex-col justify-between group">
              <div className="absolute top-0 right-0 bg-[#34A853]/10 text-[#34A853] px-4 py-1.5 rounded-bl-xl text-xs font-semibold font-mono">
                DEGREE LEVEL
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-green-50 text-[#34A853] rounded-xl w-fit">
                  <Cpu size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-800">Usha Martin University, Ranchi</h3>
                  <p className="text-slate-400 font-medium text-xs mt-1">B.Tech in Computer Science and Engineering</p>
                </div>
                <p className="text-slate-600 font-sans text-sm leading-relaxed">
                  Deeply focused on CSE algorithms, data structures, data science methodologies, neural networking, database indexing, and visual modeling techniques.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-slate-500 text-xs font-medium uppercase tracking-wide font-mono">Academic GPA</span>
                <span className="font-display font-extrabold text-lg text-[#34A853]">7.5 GPA</span>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="space-y-8 scroll-mt-24 reveal-section">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-1 rounded-full bg-google-blue"></span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">Professional Experience</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Experience Item 1 */}
            <div className="geometric-card relative overflow-hidden flex flex-col justify-between group" id="exp-upskill">
              <div className="absolute top-0 right-0 bg-[#4285F4]/10 text-[#4285F4] px-4 py-1.5 rounded-bl-xl text-xs font-semibold font-mono">
                DATA SCIENCE INTERN
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 text-[#4285F4] rounded-xl w-fit">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-800">Upskill Campus</h3>
                  <p className="text-slate-400 font-medium text-xs mt-1">Virtual Internship • 6 Weeks (Remote)</p>
                </div>
                <div className="space-y-2.5">
                  <p className="text-slate-600 font-sans text-sm leading-relaxed">
                    Focused on creating high-quality, data-driven machine learning solutions and predictive models using Python scientific computing libraries.
                  </p>
                  <ul className="space-y-1.5 text-xs text-slate-500 font-sans list-disc pl-4 leading-relaxed">
                    <li><strong className="text-slate-700">Agriculture Cultivation Analysis</strong>: Evaluated soil attributes, meteorological factors, and crop yields to predict optimal agricultural cultivation patterns using decision tree and ensemble classifiers.</li>
                    <li><strong className="text-slate-700">Smart City Traffic Pattern Analyzer</strong>: Processed dynamic vehicle counts and peak load indexes to model municipal traffic flows, optimizing routing efficiency and traffic delays.</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-slate-500 text-xs font-medium uppercase tracking-wide font-mono">Core Technology Stack</span>
                <span className="font-mono text-xs text-[#4285F4] font-semibold">Python • Scikit-Learn • Data Science</span>
              </div>
            </div>

            {/* Experience Item 2 */}
            <div className="geometric-card relative overflow-hidden flex flex-col justify-between group" id="exp-infotact">
              <div className="absolute top-0 right-0 bg-[#FBBC05]/10 text-amber-700 px-4 py-1.5 rounded-bl-xl text-xs font-semibold font-mono">
                DATA SCIENCE INTERN
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-amber-50 text-[#FBBC05] rounded-xl w-fit">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-slate-800">Infotact Solutions</h3>
                  <p className="text-slate-400 font-medium text-xs mt-1">Virtual Internship • 2 Months (Remote)</p>
                </div>
                <div className="space-y-2.5">
                  <p className="text-slate-600 font-sans text-sm leading-relaxed">
                    Developed specialized predictive models, handled highly imbalanced log datasets, and worked on statistical regression forecasting.
                  </p>
                  <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-slate-400"></span>
                      No Specific Projects Assigned
                    </p>
                    <p className="text-slate-500 text-[11px] mt-1 font-sans leading-relaxed">
                      Focused entirely on core data engineering infrastructure pipelines, model tuning architectures, foundational statistical validations, and technical documentation templates.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
                <span className="text-slate-500 text-xs font-medium uppercase tracking-wide font-mono">Core Focus Area</span>
                <span className="font-mono text-xs text-amber-600 font-semibold">Foundational ML • Tuning • Pipelines</span>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="space-y-8 scroll-mt-24 reveal-section">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-1 rounded-full bg-google-yellow"></span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">Technical Skills</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {SKILLS.map((skill, index) => {
              const IconComponent = skill.icon;
              return (
                <div 
                  key={index}
                  className="geometric-skill-box flex flex-col justify-between group cursor-default"
                >
                  <div className="space-y-3">
                    <div className={`p-2.5 ${skill.bg} ${skill.color} rounded-lg w-fit transition-all duration-300`}>
                      <IconComponent size={20} />
                    </div>
                    <h3 className="font-display font-bold text-slate-800 text-sm group-hover:text-slate-900">
                      {skill.name}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-slate-300 group-hover:text-google-blue text-xs transition-colors">Specialty Domain</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-google-green"></span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="space-y-8 scroll-mt-24 reveal-section">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-1 rounded-full bg-google-green"></span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROJECTS.map((project, index) => (
              <div 
                key={index}
                className={`geometric-card flex flex-col justify-between group ${project.accentColor}`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-500 uppercase tracking-tight">
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.link ? (
                      <span className="p-1 text-google-blue rounded bg-google-blue/10">
                        <ExternalLink size={14} />
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[9px] font-extrabold uppercase bg-red-100 text-[#EA4335] tracking-tight">
                        Research
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-800 group-hover:text-google-blue transition-colors line-clamp-2">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 font-sans text-xs sm:text-sm leading-relaxed min-h-[64px] line-clamp-3">
                    {project.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-50">
                  {project.link ? (
                    <a 
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full inline-flex items-center justify-center space-x-1 p-2.5 rounded-xl border border-slate-100 hover:border-google-blue hover:bg-google-blue/5 text-xs text-slate-700 font-bold hover:text-google-blue transition-all"
                    >
                      <span>Explore Active Live Sandbox</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  ) : (
                    <div className="w-full text-center p-2.5 rounded-xl bg-slate-50 text-slate-400 text-xs font-semibold cursor-not-allowed">
                      Offline / Research Sandbox
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* DEDICATED ASSISTANT & CHAT INTEGRATION */}
        <section id="ai-assistant" className="space-y-8 scroll-mt-24 reveal-section">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-1 rounded-full bg-google-blue"></span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 tracking-tight">AI Advisor Assistant</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            {/* Assistant intro card */}
            <div className="md:col-span-5 bg-gradient-to-tr from-slate-900 to-slate-800 text-white p-6 sm:p-8 rounded-2xl flex flex-col justify-between relative overflow-hidden">
              {/* background design */}
              <div className="absolute inset-0 bg-grid-white/[0.03] -z-10"></div>
              <div className="absolute top-20 right-0 w-36 h-36 bg-google-blue/10 rounded-full blur-2xl"></div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-tr from-google-blue to-google-red rounded-2xl shadow-md">
                    <Bot size={28} className="text-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-xl tracking-tight text-white">Abhi-Bot</h3>
                    <p className="text-google-yellow font-semibold text-[10px] uppercase font-mono tracking-widest">Interactive Portfolio RAG</p>
                  </div>
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Have questions about Abhinibesh's course marks, project details, live sandboxes, or professional experience? 
                </p>
                <p className="text-slate-400 text-xs sm:text-sm">
                  Powered by <strong className="text-white">Gemini 3.5 Flash</strong>, I retrieve exact portfolio specifications in real-time to answer your inquiries immediately!
                </p>
              </div>

              <div className="space-y-3 mt-8">
                <div className="text-slate-400 text-xs font-medium uppercase font-mono tracking-wider">
                  Select Quick Questions:
                </div>
                <div className="flex flex-wrap gap-2">
                  {BOT_CHIPS.map((chip, index) => (
                    <button 
                      key={index}
                      onClick={() => handleSendMessage(chip)}
                      className="text-xs bg-slate-800 hover:bg-slate-700 hover:text-white text-slate-300 font-semibold px-3 py-1.5 rounded-lg border border-slate-700 transition-all text-left"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Active chat console inside section */}
            <div className="md:col-span-7 geometric-card p-0 flex flex-col h-[400px] overflow-hidden">
              {/* Chat view header */}
              <div className="bg-slate-50 border-b border-slate-100 px-5 py-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-google-green"></span>
                  <span className="font-display font-semibold text-sm text-slate-800">Abhi-Bot Active Console</span>
                </div>
                <button 
                  onClick={() => setChatMessages([{ role: 'assistant', content: "Console rebooted. How can I assist you today?" }])}
                  className="p-1.5 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                  title="Reset conversation"
                >
                  <RefreshCw size={14} />
                </button>
              </div>

              {/* Chat logs */}
              <div className="flex-grow p-4 overflow-y-auto space-y-3 font-sans text-sm">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-xl px-4 py-2.5 leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-google-blue text-white rounded-tr-none' 
                          : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/50'
                      }`}
                    >
                      {/* Standard text parser (support basic formatting if returned) */}
                      <p className="whitespace-pre-line text-xs sm:text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 rounded-xl rounded-tl-none border border-slate-200/50 px-4 py-3 flex space-x-1 items-center">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-300"></span>
                    </div>
                  </div>
                )}
                <div ref={endOfMessagesRef} />
              </div>

              {/* Chat action box */}
              <div className="p-3 border-t border-slate-100 bg-white">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                  className="flex space-x-2"
                >
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type inquiry (e.g., studies, code, email)..."
                    className="flex-grow rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-google-blue"
                  />
                  <button 
                    type="submit"
                    disabled={chatLoading}
                    className="bg-slate-950 hover:bg-slate-800 text-white p-2.5 sm:px-4 sm:py-2.5 rounded-xl transition-all cursor-pointer font-semibold text-sm flex items-center justify-center"
                  >
                    <Send size={15} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* SOCIAL CHANNELS */}
        <section className="text-center space-y-6 max-w-xl mx-auto py-6">
          <h3 className="font-display font-semibold text-slate-700 text-sm tracking-widest uppercase">Find Me Online</h3>
          
          <div className="flex justify-center items-center space-x-6">
            {/* LinkedIn */}
            <motion.a 
              whileHover={{ scale: 1.15, rotate: 2 }}
              href={LINKEDIN_URL}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-white rounded-full shadow-sm hover:shadow-md border border-slate-100 text-[#0077b5] hover:bg-[#0077b5]/10 hover:border-[#0077b5]/30 transition-all cursor-pointer"
            >
              <Linkedin size={22} />
            </motion.a>

            {/* GitHub */}
            <motion.a 
              whileHover={{ scale: 1.15, rotate: -2 }}
              href={GITHUB_URL}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-white rounded-full shadow-sm hover:shadow-md border border-slate-100 text-[#181717] hover:bg-[#181717]/10 hover:border-[#181717]/30 transition-all cursor-pointer"
            >
              <Github size={22} />
            </motion.a>

            {/* Instagram */}
            <motion.a 
              whileHover={{ scale: 1.15, rotate: 2 }}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="p-3 bg-white rounded-full shadow-sm hover:shadow-md border border-slate-100 text-[#e4405f] hover:bg-[#e4405f]/10 hover:border-[#e4405f]/30 transition-all cursor-pointer"
            >
              <Instagram size={22} />
            </motion.a>
          </div>
        </section>
      </main>

      {/* FLOATING CHAT TOGGLE (Abhi-Bot Sticky Bubble) */}
      <div className="fixed bottom-20 right-6 z-50">
        <AnimatePresence>
          {chatOpen && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-100 flex flex-col w-[320px] sm:w-[360px] h-[450px] overflow-hidden mb-3"
            >
              {/* Header */}
              <div className="bg-slate-900 text-white px-4 py-3 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-1 rounded-lg bg-google-blue">
                    <Bot size={18} className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-xs tracking-tight">Abhi-Bot</h4>
                    <span className="text-[9px] text-google-green font-bold uppercase tracking-wider block">Live AI Consultant</span>
                  </div>
                </div>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-all"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Chatlogs */}
              <div className="flex-grow p-4 overflow-y-auto space-y-3 font-sans text-xs">
                {chatMessages.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-lg px-3 py-2 leading-relaxed shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-google-blue text-white rounded-tr-none' 
                          : 'bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200/50'
                      }`}
                    >
                      <p className="whitespace-pre-line text-xs">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 rounded-lg rounded-tl-none border border-slate-200/50 px-3 py-2 flex space-x-1 items-center">
                      <span className="w-1.2 h-1.2 bg-slate-400 rounded-full animate-bounce"></span>
                      <span className="w-1.2 h-1.2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                      <span className="w-1.2 h-1.2 bg-slate-400 rounded-full animate-bounce delay-300"></span>
                    </div>
                  </div>
                )}
                <div ref={endOfMessagesRef} />
              </div>

              {/* Suggestions chips */}
              <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-50 flex items-center space-x-1 overflow-x-auto scrollbar-hide">
                {["What are your GPA marks?", "Mail Analyzer?"].map((chip, index) => (
                  <button 
                    key={index}
                    onClick={() => handleSendMessage(chip)}
                    className="text-[10px] bg-white text-slate-600 font-semibold px-2 py-1 rounded border border-slate-100 whitespace-nowrap hover:border-google-blue hover:text-google-blue transition-all"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              {/* Footer Input */}
              <div className="p-2.5 border-t border-slate-100 bg-white">
                <form 
                  onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
                  className="flex space-x-1.5"
                >
                  <input 
                    type="text" 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type inquiry..."
                    className="flex-grow rounded-lg border border-slate-200 px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-google-blue"
                  />
                  <button 
                    type="submit"
                    disabled={chatLoading}
                    className="bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-lg transition-all cursor-pointer font-bold flex items-center justify-center"
                  >
                    <Send size={12} />
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bubble toggle button */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-slate-900 hover:bg-slate-800 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer relative"
        >
          {chatOpen ? <X size={24} /> : <MessageSquare size={24} />}
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-google-red rounded-full border-2 border-white animate-pulse"></span>
        </motion.button>
      </div>

      {/* FIXED FOOTER WITH TYPEWRITER ANIMATION FLASHING */}
      <footer className="fixed bottom-0 left-0 right-0 h-14 bg-slate-900 text-white border-t border-slate-800 flex items-center justify-between px-4 sm:px-6 z-35 font-mono text-[10px] sm:text-xs">
        <div className="flex items-center space-x-1.5 text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-google-green animate-pulse"></span>
          <span className="hidden sm:inline">Active Client:</span>
          <span className="font-semibold text-white">Abhinibesh Gupta</span>
        </div>

        {/* Flashing / Typewriter rotating Email ID indicator */}
        <div className="flex items-center space-x-2 bg-slate-800 border border-slate-700/50 px-3 py-1.5 rounded-lg max-w-[200px] sm:max-w-none truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-google-blue"></span>
          <span className="text-[10px] uppercase font-bold text-slate-400 hidden md:inline">Contact ID:</span>
          
          <AnimatePresence mode="wait">
            <motion.span 
              key={footerEmailText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.4 }}
              className="text-[#FBBC05] font-extrabold cursor-pointer hover:underline footer-flash-animate"
              onClick={() => { copyToClipboard(footerEmailText); }}
              title="Click to copy"
            >
              {footerEmailText}
            </motion.span>
          </AnimatePresence>
          
          <span className="text-[9px] text-slate-500 font-bold ml-1 uppercase hidden md:inline">Click to Copy</span>
        </div>

        <div className="text-slate-400">
          Ranchi, JH, IND
        </div>
      </footer>
    </div>
  );
}
