import { useState, useEffect, useRef } from 'react';

import { motion } from 'framer-motion';
import { Shield, Database, Lock, UserCheck, Settings, Globe, Mail, Clock, FileText, Share2, Activity } from 'lucide-react';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const sectionRefs = useRef({});

  const sections = [
    { id: 'introduction', title: '1. Introduction', icon: <FileText className="w-5 h-5" /> },
    { id: 'information-we-collect', title: '2. Information We Collect', icon: <Database className="w-5 h-5" /> },
    { id: 'how-we-use', title: '3. How We Use Information', icon: <Activity className="w-5 h-5" /> },
    { id: 'data-protection', title: '4. Data Protection', icon: <Shield className="w-5 h-5" /> },
    { id: 'third-party', title: '5. Third-Party Services', icon: <Share2 className="w-5 h-5" /> },
    { id: 'cookies', title: '6. Cookies & Tracking', icon: <Settings className="w-5 h-5" /> },
    { id: 'retention', title: '7. Data Retention', icon: <Clock className="w-5 h-5" /> },
    { id: 'user-rights', title: '8. User Rights', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'external-links', title: '9. External Links', icon: <Globe className="w-5 h-5" /> },
    { id: 'changes', title: '10. Changes to Policy', icon: <Lock className="w-5 h-5" /> },
    { id: 'contact', title: '11. Contact Information', icon: <Mail className="w-5 h-5" /> },
  ];

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    const currentRefs = sectionRefs.current;
    Object.values(currentRefs).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      Object.values(currentRefs).forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full bg-gray-50 pt-32 pb-24 min-h-screen">
      {/* Header */}
      <div className="bg-navy-900 text-white py-16 mb-12 bg-tamil-pattern-light border-y-4 border-gold-500 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Shield className="w-12 h-12 text-gold-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Privacy Policy</h1>
            <p className="text-gray-300 text-lg">Last Updated: October 24, 2026</p>
          </motion.div>
        </div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gold-500 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
      </div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
          
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4 hidden lg:block">
            <div className="sticky top-32 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-navy-900 mb-6 uppercase tracking-wider text-sm border-b border-gray-100 pb-4">Table of Contents</h3>
              <nav className="flex flex-col gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-3 text-left px-3 py-2 rounded-lg transition-all text-sm font-medium ${
                      activeSection === section.id
                        ? 'bg-navy-50 text-gold-600 border-l-2 border-gold-500'
                        : 'text-gray-500 hover:bg-gray-50 hover:text-navy-900'
                    }`}
                  >
                    {section.icon}
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4 bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
            <div className="prose prose-lg max-w-none prose-headings:text-navy-900 prose-a:text-gold-600">
              
              <section id="introduction" ref={(el) => (sectionRefs.current['introduction'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <FileText className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">1. Introduction</h2>
                </div>
                <p>
                  Welcome to Nexiora Technologies ("we", "our", or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (https://nexiora-website.vercel.app) or use our Data Analytics and Business Intelligence consulting services, and tell you about your privacy rights and how the law protects you.
                </p>
                <p>
                  By using our Services, you agree to the collection and use of information in accordance with this Privacy Policy.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="information-we-collect" ref={(el) => (sectionRefs.current['information-we-collect'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Database className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">2. Information We Collect</h2>
                </div>
                <p>We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                  <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier, and title.</li>
                  <li><strong>Contact Data:</strong> includes corporate email address, billing address, and telephone numbers.</li>
                  <li><strong>Business Data:</strong> includes company name, industry, dataset descriptions, and analytical requirements necessary for providing our consulting services.</li>
                  <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                  <li><strong>Usage Data:</strong> includes information about how you use our website and services.</li>
                </ul>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="how-we-use" ref={(el) => (sectionRefs.current['how-we-use'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Activity className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">3. How We Use Information</h2>
                </div>
                <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                  <li>To register you as a new client and process your consultation requests.</li>
                  <li>To provide Data Analytics, Dashboard Development, and Business Intelligence services.</li>
                  <li>To manage our relationship with you, which includes notifying you about changes to our terms or privacy policy.</li>
                  <li>To administer and protect our business and this website (including troubleshooting, data analysis, testing, system maintenance, support, reporting, and hosting of data).</li>
                  <li>To deliver relevant website content and advertisements to you and measure or understand the effectiveness of the advertising we serve to you.</li>
                  <li>To use data analytics to improve our website, products/services, marketing, customer relationships, and experiences.</li>
                </ul>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="data-protection" ref={(el) => (sectionRefs.current['data-protection'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Shield className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">4. Data Protection & Security</h2>
                </div>
                <p>
                  As a data analytics firm, we understand the critical nature of data security. We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way, altered, or disclosed.
                </p>
                <p>
                  In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know. They will only process your personal data on our instructions, and they are subject to a strict duty of confidentiality. We have put in place procedures to deal with any suspected personal data breach and will notify you and any applicable regulator of a breach where we are legally required to do so.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="third-party" ref={(el) => (sectionRefs.current['third-party'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Share2 className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">5. Third-Party Services</h2>
                </div>
                <p>
                  We may share your data with select third parties for the purposes set out in Section 3. These may include:
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                  <li>Cloud service providers and infrastructure partners (e.g., MongoDB, Vercel).</li>
                  <li>Analytics tools and performance monitoring services.</li>
                  <li>Professional advisers including lawyers, bankers, auditors, and insurers.</li>
                  <li>Regulators and other authorities who require reporting of processing activities in certain circumstances.</li>
                </ul>
                <p className="mt-4">
                  We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="cookies" ref={(el) => (sectionRefs.current['cookies'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Settings className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">6. Cookies & Tracking Technologies</h2>
                </div>
                <p>
                  You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly. We use cookies primarily for tracking website performance and ensuring our authentication mechanisms (like the Admin Dashboard) function securely.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="retention" ref={(el) => (sectionRefs.current['retention'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Clock className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">7. Data Retention</h2>
                </div>
                <p>
                  We will only retain your personal data for as long as reasonably necessary to fulfil the purposes we collected it for, including for the purposes of satisfying any legal, regulatory, tax, accounting, or reporting requirements. We may retain your personal data for a longer period in the event of a complaint or if we reasonably believe there is a prospect of litigation in respect to our relationship with you.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="user-rights" ref={(el) => (sectionRefs.current['user-rights'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <UserCheck className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">8. Your Legal Rights</h2>
                </div>
                <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data. You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                  <li><strong>Request access</strong> to your personal data.</li>
                  <li><strong>Request correction</strong> of the personal data that we hold about you.</li>
                  <li><strong>Request erasure</strong> of your personal data.</li>
                  <li><strong>Object to processing</strong> of your personal data.</li>
                  <li><strong>Request restriction of processing</strong> of your personal data.</li>
                  <li><strong>Request the transfer</strong> of your personal data to you or to a third party.</li>
                  <li><strong>Withdraw consent at any time</strong> where we are relying on consent to process your personal data.</li>
                </ul>
                <p className="mt-4">If you wish to exercise any of the rights set out above, please contact us.</p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="external-links" ref={(el) => (sectionRefs.current['external-links'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Globe className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">9. External Links</h2>
                </div>
                <p>
                  This website may include links to third-party websites, plug-ins, and applications. Clicking on those links or enabling those connections may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy policy of every website you visit.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="changes" ref={(el) => (sectionRefs.current['changes'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Lock className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">10. Changes to Privacy Policy</h2>
                </div>
                <p>
                  We keep our privacy policy under regular review. This version was last updated on the date indicated at the top of this page. We may update this policy from time to time by publishing a new version on our website. You should check this page occasionally to ensure you are happy with any changes.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="contact" ref={(el) => (sectionRefs.current['contact'] = el)} className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Mail className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">11. Contact Information</h2>
                </div>
                <p>
                  If you have any questions about this Privacy Policy or our privacy practices, please contact our Data Privacy Manager in the following ways:
                </p>
                <div className="bg-navy-50 p-6 rounded-xl mt-6 border border-gray-100">
                  <p className="font-semibold text-navy-900 mb-2">Nexiora Technologies</p>
                  <p className="flex items-center gap-2 text-gray-600 mb-2">
                    <Mail className="w-4 h-4 text-gold-500" /> 
                    <a href="mailto:sanjaychandran29803@gmail.com" className="text-gold-600 hover:underline">sanjaychandran29803@gmail.com</a>
                  </p>
                  <p className="text-gray-600">
                    Website: <a href="https://nexiora-website.vercel.app" className="text-gold-600 hover:underline">nexiora-website.vercel.app</a>
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
