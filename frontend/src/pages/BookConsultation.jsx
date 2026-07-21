import { useState } from 'react';
import axios from 'axios';
import { Building2, User, Mail, Phone, Briefcase, IndianRupee, Calendar, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const BookConsultation = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    companyName: '',
    email: '',
    phone: '',
    industry: '',
    requiredService: '',
    budget: '',
    meetingDate: '',
    requirement: ''
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: null, enquiryId: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null, enquiryId: null });

    try {
      // Uses Vite proxy in dev, relative path in production
      const response = await axios.post('/api/enquiries', formData);
      if (response.data.success) {
        setStatus({
          loading: false,
          success: true,
          error: null,
          enquiryId: response.data.data.enquiryId
        });
        setFormData({
          customerName: '', companyName: '', email: '', phone: '',
          industry: '', requiredService: '', budget: '', meetingDate: '', requirement: ''
        });
      }
    } catch (error) {
      console.error(error);
      setStatus({
        loading: false,
        success: false,
        error: error.response?.data?.error || 'Something went wrong. Please try again.',
        enquiryId: null
      });
    }
  };

  const industries = ['Manufacturing', 'Retail & E-commerce', 'Finance & Banking', 'Healthcare', 'Supply Chain & Logistics', 'Technology', 'Other'];
  const services = ['Power BI Dashboard Development', 'Business Intelligence Solutions', 'Executive KPI Dashboards', 'Data Cleaning & Engineering', 'Reporting Automation', 'Predictive Analytics', 'Consulting & Strategy'];
  const budgets = ['Under ₹50,000', '₹50,000 - ₹1,00,000', '₹1,00,000 - ₹5,00,000', 'Over ₹5,00,000', 'To be discussed'];

  return (
    <div className="pt-28 pb-20 bg-gray-50 min-h-screen bg-tamil-pattern">
      <div className="container mx-auto px-6">
        
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">Request a Consultation</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Ready to transform your data into actionable insights? Fill out the form below and our analytics team will get back to you to schedule a discovery call.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
            {status.success ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-navy-900 mb-4">Enquiry Received!</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Thank you for reaching out to Nexiora Technologies. Your request has been successfully submitted.
                </p>
                <div className="bg-gray-50 p-6 rounded-lg inline-block border border-gray-200 mb-8">
                  <p className="text-sm text-gray-500 mb-1">Your Request ID</p>
                  <p className="text-2xl font-bold text-navy-900">{status.enquiryId}</p>
                </div>
                <p className="text-gray-500">
                  We've sent a confirmation email to your inbox. Our team will review your requirements and contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 md:p-12">
                
                {status.error && (
                  <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                    <p className="text-red-700">{status.error}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  {/* Contact Info */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-navy-900 border-b border-gray-200 pb-2">Contact Information</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" name="customerName" required value={formData.customerName} onChange={handleChange} className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-navy-900 focus:border-navy-900 outline-none transition-all" placeholder="John Doe" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-navy-900 outline-none transition-all" placeholder="Acme Corp" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="email" name="email" required value={formData.email} onChange={handleChange} className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-navy-900 outline-none transition-all" placeholder="john@example.com" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-navy-900 outline-none transition-all" placeholder="+91 98765 43210" />
                      </div>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-navy-900 border-b border-gray-200 pb-2">Project Details</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Briefcase className="h-5 w-5 text-gray-400" />
                        </div>
                        <select name="industry" required value={formData.industry} onChange={handleChange} className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-navy-900 outline-none appearance-none bg-white">
                          <option value="">Select Industry</option>
                          {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Required Service *</label>
                      <select name="requiredService" required value={formData.requiredService} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-navy-900 outline-none bg-white">
                        <option value="">Select Primary Service</option>
                        {services.map(srv => <option key={srv} value={srv}>{srv}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Budget *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <IndianRupee className="h-5 w-5 text-gray-400" />
                        </div>
                        <input 
                          type="text" 
                          name="budget" 
                          required
                          value={formData.budget} 
                          onChange={handleChange} 
                          className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-navy-900 outline-none transition-all" 
                          placeholder="e.g., ₹50,000 or Flexible" 
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Meeting Date *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar className="h-5 w-5 text-gray-400" />
                        </div>
                        <input type="date" name="meetingDate" required value={formData.meetingDate} onChange={handleChange} className="pl-10 w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-navy-900 outline-none" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Requirement Description *</label>
                  <p className="text-xs text-gray-500 mb-2">Please describe your current data challenges and what you hope to achieve.</p>
                  <textarea 
                    name="requirement" 
                    required 
                    value={formData.requirement} 
                    onChange={handleChange} 
                    rows="5"
                    className="w-full p-4 border border-gray-300 rounded focus:ring-2 focus:ring-navy-900 outline-none resize-none" 
                    placeholder="We are looking to centralize our manufacturing data to build real-time KPI dashboards..."
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="submit" 
                    disabled={status.loading}
                    className="bg-navy-900 hover:bg-navy-800 text-white font-semibold py-4 px-8 rounded-md transition-all flex items-center gap-2 w-full md:w-auto justify-center disabled:opacity-70"
                  >
                    {status.loading ? (
                      <><Loader2 className="animate-spin h-5 w-5" /> Processing Request...</>
                    ) : (
                      'Book Consultation'
                    )}
                  </button>
                </div>
                
              </form>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default BookConsultation;
