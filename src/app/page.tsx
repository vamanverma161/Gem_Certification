"use client";

import { useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useInView as useInViewHook } from "react-intersection-observer";
import {
  ChevronDown,
  Shield,
  FileText,
  Search,
  CheckCircle,
  Sparkles,
  Gem,
  Award,
  Zap,
  Menu,
  X,
  Home as HomeIcon,
  Info,
  Briefcase,
  BookOpen,
  Microscope,
  Mail,
} from "lucide-react";

// Splash Screen Component
const SplashScreen = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-amber-400 border-t-transparent"
        />
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
          International Gem
        </h1>
        <p className="text-amber-400 text-lg md:text-xl font-semibold">
          Certification Laboratory
        </p>
      </motion.div>
    </motion.div>
  );
};

// Typing Animation Component
const TypingAnimation = ({ words, delay = 0 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting && displayText === currentWord) {
          setTimeout(() => setIsDeleting(true), 1500);
        } else if (isDeleting && displayText === "") {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        } else {
          setDisplayText((prev) => {
            if (isDeleting) {
              return prev.slice(0, -1);
            }
            return currentWord.slice(0, prev.length + 1);
          });
        }
      },
      isDeleting ? 50 : 100,
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, words]);

  return (
    <span className="inline-flex items-center">
      <span className="text-amber-400 font-semibold">{displayText}</span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-0.5 h-6 bg-amber-400 ml-2"
      />
    </span>
  );
};

// Sidebar Component
const Sidebar = ({ isOpen, onClose }) => {
  const navigationLinks = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "About", href: "/about", icon: Info },
    { name: "Our Services", href: "/service", icon: Briefcase },
    { name: "Gemology", href: "/gemology", icon: BookOpen },
    { name: "Gems Identification", href: "/identification", icon: Microscope },
    { name: "Gems Report", href: "/report", icon: FileText },
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full md:w-96 bg-black/95 backdrop-blur-xl"
          >
            {/* Close Button */}
            <div className="flex justify-end p-6">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={24} className="text-white" />
              </motion.button>
            </div>

            {/* Logo */}
            <div className="px-8 mb-12">
              <div className="flex items-center gap-3 mb-2">
                <Gem size={40} className="text-amber-400" />
                <div>
                  <h2 className="text-xl font-bold text-white">IGCL</h2>
                  <p className="text-amber-400 text-sm font-semibold">
                    International Gem Certification
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="px-6">
              <ul className="space-y-2">
                {navigationLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                    >
                      <a
                        href={link.href}
                        onClick={onClose}
                        className="group flex items-center gap-4 px-6 py-4 rounded-xl hover:bg-white/10 transition-all duration-300"
                      >
                        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                          <Icon size={20} className="text-amber-400" />
                        </div>
                        <span className="text-white text-lg font-medium group-hover:text-amber-400 transition-colors relative">
                          {link.name}
                          <motion.span
                            initial={{ width: 0 }}
                            whileHover={{ width: "100%" }}
                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600"
                          />
                        </span>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </nav>

            {/* Footer in Sidebar */}
            {/* <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
              <p className="text-gray-500 text-sm text-center">
                © {new Date().getFullYear()} IGCL. All Rights Reserved.
              </p>
            </div> */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Section Wrapper for scroll animations
const SectionWrapper = ({ children, delay = 0 }) => {
  const [ref, inView] = useInViewHook({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  );
};

// Main Home Component
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const gemTypes = [
    {
      name: "Diamond",
      icon: Gem,
      description: "Natural diamonds graded with precision and expertise",
    },
    {
      name: "Ruby",
      icon: Sparkles,
      description: "Rare rubies certified for authenticity and quality",
    },
    {
      name: "Sapphire",
      icon: Award,
      description: "Blue and fancy sapphires with detailed analysis",
    },
    {
      name: "Emerald",
      icon: Zap,
      description: "Colombian and Zambian emeralds with origin reports",
    },
    {
      name: "Pearl",
      icon: Shield,
      description: "Natural and cultured pearl identification services",
    },
    {
      name: "Lab-Grown Diamonds",
      icon: FileText,
      description: "Comprehensive testing for laboratory-grown stones",
    },
  ];

  const certificationPoints = [
    {
      icon: CheckCircle,
      text: "Identifies natural, treated, or synthetic gems",
    },
    { icon: Shield, text: "Protects against fraud and misrepresentation" },
    { icon: Award, text: "Builds buyer trust and confidence" },
    { icon: FileText, text: "Increases resale and insurance value" },
  ];

  const processSteps = [
    {
      step: "01",
      title: "Gem Submission",
      description: "Submit your gemstone for evaluation",
    },
    {
      step: "02",
      title: "Scientific Testing",
      description: "Advanced spectroscopic analysis",
    },
    {
      step: "03",
      title: "Identification",
      description: "Comprehensive gemological examination",
    },
    {
      step: "04",
      title: "Certification",
      description: "Official report with detailed findings",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {showSplash && <SplashScreen />}

      {/* Hamburger Menu Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        onClick={() => setIsSidebarOpen(true)}
        className="fixed top-6 right-6 z-40 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-amber-400/50 transition-all duration-300 group"
      >
        <Menu
          size={24}
          className="text-white group-hover:text-amber-400 transition-colors"
        />
      </motion.button>

      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-amber-950/10 to-black" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center"
            >
              <Gem size={48} className="text-black" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              Trusted Gem & Diamond
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                Certification Laboratory
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto mb-8"
            >
              Authenticating gemstones with scientific precision, ensuring
              transparency, and delivering trusted certifications that stand the
              test of time.
            </motion.p>

            {/* Typing Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-xl md:text-2xl mb-10"
            >
              <TypingAnimation
                words={["Natural", "Certified", "Authentic", "Verified"]}
              />
            </motion.div>

            {/* CTA Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold rounded-lg hover:from-amber-300 hover:to-amber-500 transition-all duration-300 shadow-lg hover:shadow-amber-500/25"
            >
              Verify Your Gem
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown size={32} className="text-amber-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Intro Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <SectionWrapper delay={0.2}>
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
                Authenticating True Value of Your Gemstones
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed text-center">
                Our certified gemologists combine decades of expertise with
                state-of-the-art analytical instruments to provide accurate,
                reliable gemstone identification and certification. Every
                gemstone undergoes rigorous testing to ensure authenticity and
                proper disclosure of any treatments.
              </p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Certified Gem Types Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <SectionWrapper delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Certified Gem Types
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              We provide comprehensive certification services for a wide range
              of precious and semi-precious gemstones
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gemTypes.map((gem, index) => {
                const Icon = gem.icon;
                return (
                  <motion.div
                    key={gem.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 30px rgba(251, 191, 36, 0.2)",
                    }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 transition-all duration-300 group"
                  >
                    <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center group-hover:from-amber-400/30 group-hover:to-amber-600/30 transition-all">
                      <Icon size={32} className="text-amber-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {gem.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{gem.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Why Certification Matters Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <SectionWrapper delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Why Gem Certification Matters
            </h2>

            <div className="space-y-6">
              {certificationPoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.15 }}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 flex items-start gap-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon size={24} className="text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {point.text.split(". ")[0]}
                      </h3>
                      <p className="text-gray-400 text-sm">
                        {point.text.split(". ").slice(1).join(". ")}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Certification Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <SectionWrapper delay={0.2}>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Certification Process
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Our streamlined four-step process ensures accurate and timely
              certification
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.15 }}
                  className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-xl p-6 text-center relative"
                >
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-black font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="text-amber-400 text-sm font-semibold mb-2">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                  {index < processSteps.length - 1 && (
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 0.8 + index * 0.15 }}
                      className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-amber-400 to-transparent"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Gem Verification CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <SectionWrapper delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="backdrop-blur-2xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-2xl p-8 md:p-12 text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Search size={40} className="text-black" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Verify Your Gem Instantly
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Enter your certificate number to instantly verify the
                authenticity and view detailed specifications of your certified
                gemstone.
              </p>
              <motion.button
                whileHover={{
                  boxShadow: "0 0 40px rgba(251, 191, 36, 0.4)",
                  scale: 1.05,
                }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-gradient-to-r from-amber-400 to-amber-600 text-black font-bold rounded-lg text-lg transition-all duration-300"
              >
                Check Gem Report
              </motion.button>
            </motion.div>
          </SectionWrapper>
        </div>
      </section>

      {/* Trust Statement Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          <SectionWrapper delay={0.2}>
            <div className="text-center">
              <div className="flex justify-center gap-8 mb-8">
                {[Shield, Award, FileText].map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center"
                  >
                    <Icon size={28} className="text-amber-400" />
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto"
              >
                Our laboratory operates under strict international standards,
                utilizing advanced gemological equipment and following
                established protocols to ensure every certification meets the
                highest levels of accuracy and integrity.
              </motion.p>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gem size={32} className="text-amber-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              IGCL
            </span>
          </div>
          <p className="text-gray-400 mb-4">
            International Gem Certification Laboratory
          </p>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>
      </footer>
    </div>
  );
}
