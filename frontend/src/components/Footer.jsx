import { BarChart2, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  const getHref = (path) => {
    return path.startsWith('/#') && location.pathname === '/' ? path.substring(1) : path;
  };
  return (
    <footer id="contact" className="bg-navy-900 text-white pt-20 pb-10 bg-tamil-pattern-light">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <BarChart2 className="h-8 w-8 text-gold-500" />
              <span className="text-2xl font-bold tracking-tight text-white">
                Nexiora<span className="text-gold-500">.</span>
              </span>
            </div>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Turning Business Data Into Better Decisions. We specialize in Data Analytics, Power BI, and Business Intelligence solutions for modern enterprises.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/in/sanjaykanth-chandran" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center text-gray-300 hover:bg-gold-500 hover:text-navy-900 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-navy-800 pb-2 inline-block">Services</h4>
            <ul className="space-y-3">
              <li><a href={getHref('/#services')} className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Power BI Dashboards</a></li>
              <li><a href={getHref('/#services')} className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Business Intelligence</a></li>
              <li><a href={getHref('/#services')} className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Executive KPIs</a></li>
              <li><a href={getHref('/#services')} className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Reporting Automation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-navy-800 pb-2 inline-block">Company</h4>
            <ul className="space-y-3">
              <li><a href={getHref('/#about')} className="text-gray-400 hover:text-gold-500 text-sm transition-colors">About Us</a></li>
              <li><a href={getHref('/#solutions')} className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Solutions</a></li>
              <li><a href={getHref('/#case-studies')} className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Case Studies</a></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-gold-500 text-sm transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white border-b border-navy-800 pb-2 inline-block">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:sanjaychandran29803@gmail.com" className="text-gray-400 text-sm hover:text-gold-500 transition-colors">sanjaychandran29803@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <svg className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                <a href="https://www.linkedin.com/in/sanjaykanth-chandran" target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-gold-500 transition-colors">LinkedIn Profile</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Nexiora Technologies. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy</Link>
            <Link to="/terms-of-service" className="text-gray-500 hover:text-white text-sm transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
