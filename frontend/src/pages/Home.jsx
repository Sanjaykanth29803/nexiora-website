import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, PieChart, LineChart, Database, Cpu, Activity, TrendingUp, Layers, Lock, MonitorDot, CheckCircle } from 'lucide-react';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Home = () => {
  const services = [
    { icon: <BarChart3 className="w-8 h-8" />, title: 'Power BI Dashboard Development', desc: 'Custom, interactive dashboards that bring your data to life.' },
    { icon: <PieChart className="w-8 h-8" />, title: 'Business Intelligence Solutions', desc: 'End-to-end BI architectures for comprehensive enterprise reporting.' },
    { icon: <Activity className="w-8 h-8" />, title: 'Executive KPI Dashboards', desc: 'High-level metrics and performance indicators for leadership.' },
    { icon: <Layers className="w-8 h-8" />, title: 'Inventory Analytics', desc: 'Optimize stock levels, predict shortages, and reduce holding costs.' },
    { icon: <Cpu className="w-8 h-8" />, title: 'Manufacturing Analytics', desc: 'Track OEE, downtime, and production efficiency in real-time.' },
    { icon: <TrendingUp className="w-8 h-8" />, title: 'Sales Analytics', desc: 'Monitor pipeline, conversion rates, and revenue forecasting.' },
    { icon: <LineChart className="w-8 h-8" />, title: 'Finance Analytics', desc: 'Cash flow monitoring, budgeting, and expense tracking.' },
    { icon: <Database className="w-8 h-8" />, title: 'Data Cleaning & Automation', desc: 'Streamline raw data into structured, analysis-ready formats.' },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-navy-900 text-white overflow-hidden bg-tamil-pattern-light">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight"
            >
              Transform Your Business Data Into <span className="text-gold-500">Strategic Decisions</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              We design powerful Power BI dashboards, analytics solutions, automated reporting systems, and business intelligence platforms that help organizations grow through data-driven insights.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/book-consultation" className="px-8 py-4 bg-gold-500 text-navy-900 font-bold rounded hover:bg-gold-400 transition-colors flex items-center justify-center gap-2">
                Book Consultation <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#services" className="px-8 py-4 bg-navy-800 text-white font-semibold rounded hover:bg-navy-700 transition-colors border border-navy-700 flex items-center justify-center">
                View Services
              </a>
            </motion.div>
          </div>
        </div>
        {/* Abstract Data Visualization Background Accent */}
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold-500 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Our Analytics Services</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto"></div>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className="w-14 h-14 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900 mb-6 group-hover:bg-navy-900 group-hover:text-gold-500 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{service.desc}</p>
                <Link to="/book-consultation" className="text-navy-900 font-semibold text-sm flex items-center gap-1 group-hover:text-gold-600 transition-colors">
                  Learn More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Analytics Capabilities (Solutions) */}
      <section id="solutions" className="py-24 bg-navy-900 text-white relative overflow-hidden bg-tamil-pattern-light">
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Enterprise-Grade Analytics Capabilities</h2>
              <p className="text-gray-300 mb-8 text-lg leading-relaxed">
                We build highly sophisticated data models and dynamic visual layers that provide complete operational visibility across your organization.
              </p>
              
              <div className="bg-navy-800 border border-navy-700 p-6 rounded-lg mb-8 flex gap-4">
                <Lock className="w-8 h-8 text-gold-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold mb-2">Strict Client Confidentiality</h4>
                  <p className="text-sm text-gray-400">
                    Every analytics solution we build is customized for specific business needs. Due to strict confidentiality agreements, we do not publicly display real client dashboards or actual business data. We demonstrate our capabilities through secure, customized mockups during discovery calls.
                  </p>
                </div>
              </div>

              <Link to="/book-consultation" className="inline-flex items-center gap-2 text-gold-500 font-semibold hover:text-gold-400 transition-colors">
                Request a Custom Demo <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Abstract Analytics Illustration (No Real Dashboards, No Humans) */}
            <div className="w-full lg:w-1/2 relative">
              <div className="aspect-video bg-navy-800 rounded-xl border border-navy-700 shadow-2xl overflow-hidden relative">
                {/* Abstract Data Viz Elements */}
                <div className="absolute inset-0 p-8 flex flex-col gap-6 opacity-60">
                  <div className="flex justify-between items-center border-b border-navy-700 pb-4">
                    <div className="h-6 w-32 bg-navy-700 rounded"></div>
                    <div className="h-6 w-24 bg-navy-700 rounded"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-24 bg-navy-700/50 rounded flex flex-col justify-end p-4">
                         <div className="h-2 w-12 bg-gold-500/50 mb-2"></div>
                         <div className="h-6 w-16 bg-navy-600 rounded"></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex-grow flex items-end gap-2 pb-4">
                    {[40, 70, 45, 90, 65, 85, 55, 75, 40, 60, 80].map((h, i) => (
                      <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-navy-700 to-gold-500/40 rounded-t"></div>
                    ))}
                  </div>
                </div>
                {/* Overlay Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-navy-900 rounded-full border border-navy-700 flex items-center justify-center">
                    <MonitorDot className="w-10 h-10 text-gold-500" />
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* About Section (Vision & Mission) */}
      <section id="about" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square md:aspect-[4/3] group">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                  alt="Data Analytics Visualization" 
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-navy-900/20 mix-blend-multiply"></div>
                
                {/* Overlay Badge */}
                <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur p-4 rounded-xl shadow-lg border border-white/50 max-w-[200px]">
                  <div className="flex items-center gap-3 mb-1">
                    <TrendingUp className="w-6 h-6 text-gold-500" />
                    <span className="font-bold text-navy-900">Data-Driven</span>
                  </div>
                  <p className="text-xs text-gray-600 font-medium">Empowering startups to scale with precision.</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">About Nexiora<span className="text-gold-500">.</span></h2>
              <p className="text-gray-600 mb-10 text-lg leading-relaxed">
                We are a specialized data analytics and business intelligence consulting firm. We bridge the gap between complex raw data and strategic executive decisions, enabling growing organizations to operate with complete clarity.
              </p>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900 flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-navy-900 mb-2">Our Vision</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      To democratize enterprise-grade data intelligence, making advanced analytics accessible and actionable for agile, high-growth startups globally.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-navy-50 rounded-lg flex items-center justify-center text-navy-900 flex-shrink-0">
                    <Activity className="w-6 h-6 text-gold-500" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-navy-900 mb-2">Our Mission</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      To engineer robust, automated reporting architectures that eliminate manual data entry, uncover hidden operational bottlenecks, and drive measurable revenue growth for our clients.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gold-500 text-navy-900 border-y-4 border-navy-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Dashboards Created', val: '15+' },
              { label: 'Data Records Analyzed', val: '5M+' },
              { label: 'Analytics Solutions Delivered', val: '10+' },
              { label: 'Technologies Used', val: '8+' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl md:text-5xl font-black mb-2">{stat.val}</div>
                <div className="text-sm md:text-base font-semibold text-navy-800 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Proven Business Impact</h2>
            <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">Real-world applications of our analytics solutions.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Manufacturing Analytics Solution',
                problem: 'Limited visibility into operational performance and frequent machine downtime.',
                solution: 'Centralized Power BI reporting system connecting live IoT data from the factory floor.',
                impact: 'Improved decision-making, resulting in a 15% increase in OEE within 3 months.'
              },
              {
                title: 'Inventory Optimization',
                problem: 'Difficulty monitoring stock movement, leading to frequent stockouts and overstocking.',
                solution: 'Analytics-driven inventory visibility dashboard predicting stock depletion rates.',
                impact: 'Better planning and operational control, reducing holding costs by 22%.'
              },
              {
                title: 'Executive Sales Dashboard',
                problem: 'Regional managers lacked consolidated views of sales pipeline across different CRMs.',
                solution: 'Automated data pipeline feeding into a unified executive KPI monitoring dashboard.',
                impact: 'Eliminated 10+ hours of manual weekly reporting and improved forecast accuracy.'
              }
            ].map((study, index) => (
              <div key={index} className="border border-gray-200 p-8 rounded-xl bg-gray-50 hover:bg-white transition-colors">
                <h3 className="text-xl font-bold text-navy-900 mb-6">{study.title}</h3>
                
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-600 mb-1 block">Problem</span>
                  <p className="text-gray-700 text-sm leading-relaxed">{study.problem}</p>
                </div>
                
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-600 mb-1 block">Solution</span>
                  <p className="text-gray-700 text-sm leading-relaxed">{study.solution}</p>
                </div>
                
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-600 mb-1 block">Impact</span>
                  <p className="text-navy-900 font-semibold text-sm leading-relaxed">{study.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
