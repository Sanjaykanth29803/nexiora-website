import { useState, useEffect, useRef } from 'react';

import { motion } from 'framer-motion';
import { Scale, FileText, CheckCircle, Lightbulb, MonitorDot, Handshake, Lock, AlertTriangle, AlertOctagon, Share2, RefreshCw, MapPin, Mail, UserCheck } from 'lucide-react';

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState('about');
  const sectionRefs = useRef({});

  const sections = [
    { id: 'about', title: '1. About Nexiora', icon: <FileText className="w-5 h-5" /> },
    { id: 'acceptance', title: '2. Acceptance of Terms', icon: <CheckCircle className="w-5 h-5" /> },
    { id: 'intellectual-property', title: '3. Intellectual Property', icon: <Lightbulb className="w-5 h-5" /> },
    { id: 'website-usage', title: '4. Website Usage Rules', icon: <MonitorDot className="w-5 h-5" /> },
    { id: 'service-engagement', title: '5. Service Engagement', icon: <Handshake className="w-5 h-5" /> },
    { id: 'client-responsibilities', title: '6. Client Responsibilities', icon: <UserCheck className="w-5 h-5" /> },
    { id: 'confidentiality', title: '7. Confidentiality', icon: <Lock className="w-5 h-5" /> },
    { id: 'disclaimer', title: '8. Analytics Disclaimer', icon: <AlertTriangle className="w-5 h-5" /> },
    { id: 'limitation', title: '9. Limitation of Liability', icon: <AlertOctagon className="w-5 h-5" /> },
    { id: 'third-party', title: '10. Third-Party Links', icon: <Share2 className="w-5 h-5" /> },
    { id: 'modifications', title: '11. Modifications', icon: <RefreshCw className="w-5 h-5" /> },
    { id: 'governing-law', title: '12. Governing Law', icon: <MapPin className="w-5 h-5" /> },
    { id: 'contact', title: '13. Contact Information', icon: <Mail className="w-5 h-5" /> },
  ];

  // Quick fix for UserCheck not imported from lucide-react in this file but used in sections array
  // Wait, I didn't import UserCheck. I will use a different icon or import it.
  // Actually, I can just define it directly in the import.
  // Since I can't change the import dynamically without re-writing, I'll use CheckCircle instead for Client Responsibilities in the render below if needed, but wait, I can just use a generic icon if it fails, or I just use one of the imported ones. Let's assume standard behavior. 
  // Wait, I can just change the icon in the sections array.
  
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
      const offset = 100;
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
            <Scale className="w-12 h-12 text-gold-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Terms & Conditions</h1>
            <p className="text-gray-300 text-lg">Last Updated: October 24, 2026</p>
          </motion.div>
        </div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold-500 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
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
              
              <section id="about" ref={(el) => (sectionRefs.current['about'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <FileText className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">1. About Nexiora Technologies</h2>
                </div>
                <p>
                  Nexiora Technologies is a specialized Data Analytics and Business Intelligence consulting company. We provide dashboard development, data engineering, and reporting solutions designed to help organizations transform raw data into strategic insights. Our website, https://nexiora-website.vercel.app, serves as a platform to showcase our capabilities and facilitate client engagements.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="acceptance" ref={(el) => (sectionRefs.current['acceptance'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <CheckCircle className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">2. Acceptance of Terms</h2>
                </div>
                <p>
                  By accessing or using our website and services, you agree to be bound by these Terms & Conditions. If you disagree with any part of these terms, you may not access our website or use our consulting services. These terms apply to all visitors, users, clients, and others who access or use the Service.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="intellectual-property" ref={(el) => (sectionRefs.current['intellectual-property'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Lightbulb className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">3. Intellectual Property Rights</h2>
                </div>
                <p>
                  The website and its original content, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by Nexiora Technologies and are protected by Indian and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                </p>
                <p>
                  Any custom dashboards, reporting architectures, or data models developed during a client engagement will be subject to the specific intellectual property terms outlined in our Master Service Agreement (MSA) signed prior to project commencement.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="website-usage" ref={(el) => (sectionRefs.current['website-usage'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <MonitorDot className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">4. Website Usage Rules</h2>
                </div>
                <p>You agree not to use the Website:</p>
                <ul className="list-disc pl-6 space-y-2 mt-4 text-gray-700">
                  <li>In any way that violates any applicable national, state, local, or international law or regulation.</li>
                  <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way.</li>
                  <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam", or any other similar solicitation.</li>
                  <li>To impersonate or attempt to impersonate Nexiora Technologies, a Nexiora Technologies employee, another user, or any other person or entity.</li>
                  <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Website, or which, as determined by us, may harm Nexiora Technologies or users of the Website.</li>
                </ul>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="service-engagement" ref={(el) => (sectionRefs.current['service-engagement'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Handshake className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">5. Service Engagement</h2>
                </div>
                <p>
                  Requesting a consultation through our website does not guarantee the initiation of a service contract. All consulting services, including data engineering and Power BI development, are subject to a formal proposal, statement of work (SOW), and a signed Master Service Agreement (MSA) which will govern the specific terms, deliverables, timelines, and payment schedules of the engagement.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="client-responsibilities" ref={(el) => (sectionRefs.current['client-responsibilities'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <CheckCircle className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">6. Client Responsibilities</h2>
                </div>
                <p>
                  To ensure the successful delivery of our analytics solutions, clients are responsible for providing timely access to necessary data sources, APIs, internal systems, and subject matter experts. Nexiora Technologies is not liable for project delays resulting from the client's failure to provide required resources or feedback in a timely manner.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="confidentiality" ref={(el) => (sectionRefs.current['confidentiality'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Lock className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">7. Confidentiality</h2>
                </div>
                <p>
                  As a Data Analytics consulting firm, we recognize the highly sensitive nature of our clients' business data. We maintain strict confidentiality protocols. Any data shared with us during discovery calls or project execution is bound by Non-Disclosure Agreements (NDAs). We do not use, share, or publish actual client data or proprietary dashboards in our public portfolio or marketing materials without explicit, written consent.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="disclaimer" ref={(el) => (sectionRefs.current['disclaimer'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <AlertTriangle className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">8. Analytics & Reporting Disclaimer</h2>
                </div>
                <p>
                  The analytics, dashboards, and reporting solutions provided by Nexiora Technologies are intended to assist in business decision-making based on the data provided by the client. We do not guarantee specific business outcomes, increased revenue, or reduced costs as a direct result of utilizing our analytics solutions. Business decisions made based on our reporting are made at the sole discretion and risk of the client.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="limitation" ref={(el) => (sectionRefs.current['limitation'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <AlertOctagon className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">9. Limitation of Liability</h2>
                </div>
                <p>
                  In no event shall Nexiora Technologies, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="third-party" ref={(el) => (sectionRefs.current['third-party'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Share2 className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">10. Third-Party Links</h2>
                </div>
                <p>
                  Our Service may contain links to third-party web sites or services that are not owned or controlled by Nexiora Technologies. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that Nexiora Technologies shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="modifications" ref={(el) => (sectionRefs.current['modifications'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <RefreshCw className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">11. Modifications to Terms</h2>
                </div>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="governing-law" ref={(el) => (sectionRefs.current['governing-law'] = el)} className="scroll-mt-32 mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <MapPin className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">12. Governing Law</h2>
                </div>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </section>

              <hr className="border-gray-100 my-8" />

              <section id="contact" ref={(el) => (sectionRefs.current['contact'] = el)} className="scroll-mt-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900">
                    <Mail className="w-5 h-5 text-gold-500" />
                  </div>
                  <h2 className="text-2xl font-bold m-0">13. Contact Information</h2>
                </div>
                <p>
                  If you have any questions about these Terms, please contact us:
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

export default TermsOfService;
